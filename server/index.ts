import express, { Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Allow raw body (needed for Toast API)
declare module "http" {
  interface IncomingMessage {
    rawBody: any;
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

// Basic request logger
app.use((req, res, next) => {
  const start = Date.now();
  let capturedJson: any;

  const originalJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJson = bodyJson;
    return originalJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    if (req.path.startsWith("/api")) {
      const duration = Date.now() - start;
      let line =
        "API " +
        req.method +
        " " +
        req.path +
        " " +
        res.statusCode +
        " in " +
        duration +
        "ms";

      if (capturedJson) {
        const jsonStr = JSON.stringify(capturedJson);
        line += " :: " + jsonStr;
      }

      if (line.length > 200) line = line.slice(0, 199) + "...";
      console.log(line);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const msg = err.message || "Internal Server Error";

    console.log("ERROR:", msg);
    res.status(status).json({ message: msg });
  });

  // Serve static frontend in production
  if (process.env.NODE_ENV === "production") {
    const publicPath = path.join(__dirname, "..", "dist", "public");
    app.use(express.static(publicPath));

    // SPA fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(publicPath, "index.html"));
    });
  }

  const port = parseInt(process.env.PORT || "5000", 10);

  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      console.log("Serving on port " + port);
    }
  );
})();

