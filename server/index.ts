import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// -------------------------------------------------------
//  SERVE OPTIMIZED IMAGES (THIS MUST BE FIRST AND ONLY)
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
//  STATIC BUILD FILES
// -------------------------------------------------------
const publicPath = path.join(__dirname, "../dist/public");

app.use(express.static(publicPath));
app.use("/assets", express.static(path.join(publicPath, "assets")));
app.use("/gallery", express.static(path.join(publicPath, "gallery")));
app.use("/videos", express.static(path.join(publicPath, "videos")));

// -------------------------------------------------------
//  SPA FALLBACK
// -------------------------------------------------------
app.get("*", (_req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

export default app;
