import { fileURLToPath } from "url";
import path from "path";
import express, { Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { log } from "./vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Allow raw body for signature verification
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

// URL encoded parser
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  const url = req.path;
  let captured: any;

  const original = res.json;
  res.json = function (body, ...args) {
    captured = body;
    return original.apply(res, [body, ...args]);
  };

  res.on("finish", () => {
    if (url.startsWith("/api")) {
      const time = Date.now() - start;
      let line = `${req.method} ${url} ${res.statusCode} in ${time}ms`;
      if (captured) line += ` :: ${JSON.stringify(captured)}`;
      log(line);
    }
  });

  next();
});

// STATIC FILES (fix for images, gallery and assets)
const publicPath = path.join(__dirname, "../dist/public");

app.use("/images", express.static(path.join(publicPath, "images")));
app.use("/gallery", express.static(path.join(publicPath, "gallery")));
app.use("/assets", express.static(path.join(publicPath, "assets")));
app.use(express.static(publicPath));

(async () => {
  const server = await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500;
    const msg = err.message || "Internal Server Error";
    log("ERROR: " + msg);
    res.status(status).json({ message: msg });
  });

  // SPA fallback
  app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });

  // Start server
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(
    { port, host: "0.0.0.0", reusePort: true },
    () => log("Serving on port " + port)
  );
