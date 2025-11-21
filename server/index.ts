import { fileURLToPath } from "url";
import path from "path";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { log } from "./vite"; // keep log only

// ESM dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Capture raw body
declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

// API logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: any;

  const originalJson = res.json;
  res.json = function (body, ...args) {
    capturedJsonResponse = body;
    return originalJson.apply(res, [body, ...args]);
  };

  res.on("finish", () => {
    if (path.startsWith("/api")) {
      let msg = `${req.method} ${path} ${res.statusCode} in ${
        Date.now() - start
      }ms`;

      if (capturedJsonResponse) {
        msg += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (msg.length > 80) msg = msg.slice(0, 79) + "…";
      log(msg);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500;
    res.status(status).json({ message: err.message || "Internal Server Error" });
  });

  // 🚨 DEVELOPMENT ONLY: Load Vite middleware
  if (process.env.NODE_ENV === "development") {
    const { createViteServer } = await import("./vite.js");
    const vite = await createViteServer(app);
    app.use(vite.middlewares);
  }
// PRODUCTION: serve client build
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "public");

  app.use(express.static(distPath));

  // Serve assets: images, gallery, videos, etc.
  app.use("/assets", express.static(path.join(distPath, "assets")));
  app.use("/images", express.static(path.join(distPath, "images")));
  app.use("/gallery", express.static(path.join(distPath, "gallery")));
  app.use("/videos", express.static(path.join(distPath, "videos")));

  // SPA fallback
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}


  // Start server
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();

