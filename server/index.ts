import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ---------- STATIC FRONTEND ROOT ----------
const publicPath = path.join(__dirname, "..", "dist", "public");

// Confirm folder exists so server doesn't silently crash
if (!fs.existsSync(publicPath)) {
  console.error("❌ ERROR: dist/public not found at:", publicPath);
} else {
  console.log("✅ Serving static files from:", publicPath);
}

// ---------- STATIC FILE ROUTES ----------
app.use(express.static(publicPath));
app.use("/assets", express.static(path.join(publicPath, "assets")));
app.use("/images", express.static(path.join(publicPath, "images")));
app.use("/gallery", express.static(path.join(publicPath, "gallery")));
app.use("/videos", express.static(path.join(publicPath, "videos")));

// ---------- SPA FALLBACK ----------
app.get("*", (req, res) => {
  const indexFile = path.join(publicPath, "index.html");

  if (!fs.existsSync(indexFile)) {
    console.error("❌ index.html NOT FOUND:", indexFile);
    return res.status(500).send("index.html missing");
  }

  res.sendFile(indexFile);
});

// ---------- GLOBAL ERROR HANDLER ----------
app.use((err, req, res, next) => {
  console.error("❌ Express error:", err);
  res.status(500).send("Server error");
});

// ---------- START SERVER (REQUIRED FOR RAILWAY) ----------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;

