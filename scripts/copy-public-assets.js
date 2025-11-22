#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const src = path.join(root, 'client/public');
const dest = path.join(root, 'dist/public');

if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

function copy(srcPath, destPath) {
  if (!fs.existsSync(srcPath)) return;
  if (fs.statSync(srcPath).isDirectory()) {
    if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
    for (const f of fs.readdirSync(srcPath)) {
      copy(path.join(srcPath, f), path.join(destPath, f));
    }
  } else {
    fs.copyFileSync(srcPath, destPath);
  }
}

copy(src, dest);
