#!/bin/bash
set -e

# fix permissions for static files
chmod -R 755 dist/public
chmod -R 644 dist/public/images/*
chmod -R 644 dist/public/assets/*
chmod 644 dist/public/index.html

echo "✅ Permissions fixed"

