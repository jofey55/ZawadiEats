import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mime from "mime-types";

// ----------------------------------------------------
// FORCE EXPRESS + RAILWAY TO RECOGNIZE WEBP MIME TYPE
// ----------------------------------------------------
mime.types["webp"] = "image/webp";

// Resolve paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create express app
const app = express();

// Path to built client folder
const publicPath = path.join(__dirname, "../dist/public");

// ----------------------------------------------------
// STATIC ROUTE: IMAGES (MUST BE FIRST!)
// ----------------------------------------------------
app.use(
  "/images",
  express.static(path.join(publicPath, "images"), {
    maxAge: "365d",
    immutable: true,
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".webp")) {
        res.setHeader("Content-Type", "image/webp");
      }
    },
  })
);

// ----------------------------------------------------
// OTHER STATIC ROUTES (SECOND)
// ----------------------------------------------------
app.use("/assets", express.static(path.join(publicPath, "assets")));
app.use("/gallery", express.static(path.join(publicPath, "gallery")));
app.use("/videos", express.static(path.join(publicPath, "videos")));

// ----------------------------------------------------
// MAIN STATIC SERVE (THIRD — AFTER ALL SUBROUTES)
// ----------------------------------------------------
app.use(express.static(publicPath));

// ----------------------------------------------------
// SPA FALLBACK (LAST ONLY)
// ----------------------------------------------------
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// ----------------------------------------------------
// START SERVER
// ----------------------------------------------------
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
