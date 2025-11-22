// server/index.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var publicPath = path.join(__dirname, "..", "dist", "public");
app.use(express.static(publicPath));
app.use("/assets", express.static(path.join(publicPath, "assets")));
app.use("/images", express.static(path.join(publicPath, "images")));
app.use("/gallery", express.static(path.join(publicPath, "gallery")));
app.use("/videos", express.static(path.join(publicPath, "videos")));
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
var index_default = app;
export {
  index_default as default
};
