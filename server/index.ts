import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create express app
const app = express();

// Path to your built client
const publicPath = path.join(__dirname, "../dist/public");

// -------------------------------------------------------
//  ENABLE 1-YEAR CACHING FOR /images (LIVE SPEED BOOST)
// -------------------------------------------------------
app.use(
  "/images",
  express.static(path.join(__dirname, "../images"), {
    maxAge: "365d",
    immutable: true,
    etag: true,
    lastModified: true,
  })
);

// -------------------------------------------------------
//  STATIC FILE ROUTES (other folders — no caching change)
// -------------------------------------------------------
app.use(express.static(publicPath));
app.use("/assets", express.static(path.join(publicPath, "assets")));
app.use("/gallery", express.static(path.join(publicPath, "gallery")));
app.use("/videos", express.static(path.join(publicPath, "videos")));

// -------------------------------------------------------
//  SPA FALLBACK (keep this last)
// -------------------------------------------------------
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

export default app;

