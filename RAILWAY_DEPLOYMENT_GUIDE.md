# 🚂 Railway Deployment Guide for Zawadi Restaurant

## ✅ Your Project is Ready for Railway!

Your current setup is **already Railway-compatible**. No code changes needed.

---

## 📋 Pre-Deployment Checklist

- [x] Express server binds to `process.env.PORT` (✅ Done in `server/index.ts`)
- [x] Build script compiles both client and server (✅ `npm run build`)
- [x] Start script runs production server (✅ `npm start`)
- [x] Database uses connection string from env (✅ `DATABASE_URL`)
- [x] Static files served from `dist/public/` (✅ Configured in `server/vite.ts`)

---

## 🚀 Deployment Steps

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Railway deployment"
   git push origin main
   ```

2. **Go to Railway:**
   - Visit https://railway.app
   - Click "Start a New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Environment Variables:**
   - Railway will auto-detect Node.js
   - Add these environment variables in Railway dashboard:
     - `DATABASE_URL` - Your PostgreSQL connection string
     - `NODE_ENV` - Set to `production`

4. **Railway will automatically:**
   - Run `npm install`
   - Run `npm run build` (builds client + server)
   - Run `npm start` (starts Express on port assigned by Railway)

### Option 2: Deploy from Local Directory

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Initialize project:**
   ```bash
   railway init
   ```

4. **Deploy:**
   ```bash
   railway up
   ```

5. **Add environment variables:**
   ```bash
   railway variables set DATABASE_URL="your-neon-postgres-url"
   railway variables set NODE_ENV="production"
   ```

6. **Open your deployed app:**
   ```bash
   railway open
   ```

---

## 🗄️ Database Setup

### Using Railway PostgreSQL (Simple)

1. In Railway dashboard, click "New" → "Database" → "PostgreSQL"
2. Railway automatically sets `DATABASE_URL` environment variable
3. Your app connects automatically!

### Using Neon PostgreSQL (Current Setup)

1. Keep your existing Neon database
2. Add `DATABASE_URL` to Railway environment variables:
   ```
   postgresql://username:password@hostname/database?sslmode=require
   ```
3. Your app already uses `@neondatabase/serverless` - perfect for Railway!

---

## 🔍 Verify Deployment

After deploying, check:

1. **Logs:** `railway logs` - Should show "serving on port XXXX"
2. **Homepage:** Visit your Railway URL - Should load the restaurant site
3. **API:** Visit `https://your-app.railway.app/api/reviews` - Should return JSON
4. **Menu:** Click "Order for Pickup" - Should show menu items

---

## 🐛 Troubleshooting

### Build Fails

**Error:** `Cannot find module 'vite'`
- **Fix:** Railway installs dependencies automatically. Check `package.json` is committed.

### Server Won't Start

**Error:** `EADDRINUSE`
- **Fix:** Already handled! Your server uses `process.env.PORT` from Railway.

### Database Connection Error

**Error:** `DATABASE_URL is not defined`
- **Fix:** Add `DATABASE_URL` environment variable in Railway dashboard.

### Static Files Not Loading

**Error:** 404 on images/CSS
- **Fix:** Build process already configured. Ensure `npm run build` completed successfully.

---

## 📊 Current Build Configuration

**Your existing scripts (perfect for Railway):**

```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js"
  }
}
```

**Build output:**
- Client: `dist/public/` (HTML, CSS, JS, images)
- Server: `dist/index.js` (Express server bundle)

**Server serves:**
- Static files from `dist/public/`
- API routes from `/api/*`
- SPA fallback to `index.html`

---

## 🎯 Environment Variables Needed

Set these in Railway dashboard:

| Variable | Value | Required |
|----------|-------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes |
| `NODE_ENV` | `production` | ✅ Yes |
| `PORT` | *Auto-set by Railway* | Auto |

---

## ✨ Post-Deployment

After successful deployment:

1. **Test the full ordering flow:**
   - Browse menu items
   - Add items to cart
   - Complete checkout

2. **Test database operations:**
   - Submit feedback form
   - Submit catering inquiry
   - Check data persists

3. **Set up custom domain (optional):**
   - Railway Settings → Domains
   - Add your custom domain

---

## 📞 Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway

---

**Your app is ready to deploy!** 🎉

Just push to GitHub and connect to Railway - no code changes needed!
