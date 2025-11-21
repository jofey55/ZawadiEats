import { fileURLToPath } from "url";
import path from "path";
import express, { Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { log } from "./vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// JSON + raw body handling
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

app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const pathUrl = req.path;
  let captured: any;

  const original = res.json;
  res.json = function (body, ...args) {
    captured = body;
    return original.apply(res, [body, ...args]);
  };

  res.on("finish", () => {
    if (pathUrl.startsWith("/api

