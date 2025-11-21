import { fileURLToPath } from "url";
import path from "path";
import express, { Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { createViteServer, log } from "./vite";

// ESM __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Parse JSON + rawBody
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

// Basic logger
app.use((req, res, next) => {
  const start = Date.now();
  const pathUrl = req.path;
  let capturedJsonResponse: any;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    if (pathUrl.startsWith("/api")) {
      const duration = Date.now() - start;
      let line = `${req.method} ${pathUrl} ${res.statusCode} in ${duration}ms`;

      if (capturedJsonResponse) {
        line += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (line.length > 150) line = line.slice(0, 149) + "…";
      log(line);
    }
  });

  next();
});

(async () => {
  // Register API routes first
  const server = await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const msg = err.message || "Internal Server Error";
    res.status(status).json({ message: msg });
    log(\`ERROR: \${msg}\`);
  });

  // 👉 PRODUCTION STATIC FILE SERVING FIX
  if (process.env.NODE_ENV === "production") {
    const publicDir = path.join(__dirname, "../dist/public");

    app.use("/assets", express.static(path.join(publicDir, "assets")));
    app.use("/images", express.static(path.join(publicDir, "images")));
    app.use("/gallery", express.static(path.join(publicDir, "gallery")));

    app.get("*", (_req, res) => {
      res.sendFile(path.join(publicDir, "index.html"));
    });
  } else {
    const vite = await createViteServer(app);
    app.use(vite.middlewares);
  }

  const port = parseInt(process.env.PORT || "5000", 10);

  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => log(\`Serving on port \${port}\`)
  );
})();

