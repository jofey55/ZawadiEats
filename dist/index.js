// server/index.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var publicPath = path.join(__dirname, "..", "dist", "public");
if (!fs.existsSync(publicPath)) {
  console.error("\u274C ERROR: dist/public not found at:", publicPath);
} else {
  console.log("\u2705 Serving static files from:", publicPath);
}
app.use(express.static(publicPath));
app.use("/assets", express.static(path.join(publicPath, "assets")));
app.use("/images", express.static(path.join(publicPath, "images")));
app.use("/gallery", express.static(path.join(publicPath, "gallery")));
app.use("/videos", express.static(path.join(publicPath, "videos")));
app.get("*", (req, res) => {
  const indexFile = path.join(publicPath, "index.html");
  if (!fs.existsSync(indexFile)) {
    console.error("\u274C index.html NOT FOUND:", indexFile);
    return res.status(500).send("index.html missing");
  }
  res.sendFile(indexFile);
});
app.use((err, req, res, next) => {
  console.error("\u274C Express error:", err);
  res.status(500).send("Server error");
});
var PORT = process.env.PORT || 3e3;
app.listen(PORT, () => {
  console.log(`\u{1F680} Server running on port ${PORT}`);
});
var index_default = app;
export {
  index_default as default
};
