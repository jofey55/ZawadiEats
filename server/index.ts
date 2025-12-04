import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create express app
const app = express();

// Path to Vite-built public folder
const publicPath = path.join(__dirname, "../dist/public");

// -------------------------------------------------------
//  ENABLE 1-YEAR CACHING FOR IMAGES (REAL SPEED BOOST)
// -------------------------------------------------------
app.use("/images", (req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  next();
});

// Serve optimized local images
app.use(
  "/images",
  express.static(path.join(__dirname, "../images"), {
    immutable: true,
    etag: true,
    lastModified: true,
  })
);

// -------------------------------------------------------
//  STATIC FILES (JS, CSS, ASSETS)
// -------------------------------------------------------
app.use(express.static(publicPath));
app.use("/assets", express.static(path.join(publicPath, "assets")));
app.use("/gallery", express.static(path.join(publicPath, "gallery")));
app.use("/videos", express.static(path.join(publicPath, "videos")));

// -------------------------------------------------------
//  SPA FALLBACK — serve index.html for all other routes
// -------------------------------------------------------
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

export default app;

