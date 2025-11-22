import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Path to your built static frontend
const publicPath = path.join(__dirname, "..", "dist", "public");

// Serve ALL static files
app.use(express.static(publicPath));
app.use("/assets", express.static(path.join(publicPath, "assets")));
app.use("/images", express.static(path.join(publicPath, "images")));
app.use("/gallery", express.static(path.join(publicPath, "gallery")));
app.use("/videos", express.static(path.join(publicPath, "videos")));

// SPA fallback (for React/Vite routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

export default app;

