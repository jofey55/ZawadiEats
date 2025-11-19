# 🚂 Railway Quick Start - Zawadi Restaurant

## ✅ Your Project is Ready!

All necessary files have been configured for Railway deployment. You can deploy immediately.

---

## 🚀 Deploy in 3 Steps

### Step 1: Connect to Railway

**Option A: GitHub (Recommended)**
1. Push your code to GitHub
2. Go to https://railway.app
3. Click "Start a New Project" → "Deploy from GitHub"
4. Select your repository

**Option B: Railway CLI**
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Step 2: Add Database

In Railway dashboard:
1. Click "New" → "Database" → "PostgreSQL"
2. Railway automatically sets `DATABASE_URL` for you
3. Done! Your app connects automatically

### Step 3: Deploy

Railway automatically:
- Runs `npm install`
- Runs `npm run build` (builds React + Express)
- Runs `npm start` (starts your server)

**Your site will be live at:** `https://your-app.railway.app`

---

## 🗄️ Database Options

### Railway PostgreSQL (Easiest)
- Built-in PostgreSQL database
- Automatic `DATABASE_URL` configuration
- Free 1GB storage

### Neon PostgreSQL (Current Setup)
- Already configured in your project
- Serverless PostgreSQL
- Just add `DATABASE_URL` to Railway environment variables

---

## 🔑 Environment Variables

Required in Railway dashboard:

| Variable | Value | Source |
|----------|-------|--------|
| `DATABASE_URL` | PostgreSQL connection string | Railway or Neon |
| `NODE_ENV` | `production` | Manual |

---

## ✨ What's Been Configured

✅ **Database Layer**
- `server/db.ts` - Drizzle ORM initialization
- `server/storage.ts` - PostgreSQL storage implementation
- Automatic fallback to in-memory storage for local development

✅ **Build Configuration**
- `railway.json` - Railway deployment settings
- `.railwayignore` - Files excluded from deployment
- Existing build scripts work perfectly

✅ **Database Schema**
- Already defined in `shared/schema.ts`
- Includes: orders, reviews, feedback, catering inquiries, job applications, contact messages

---

## 📊 How It Works

**Development (Replit):**
```
No DATABASE_URL → Uses MemStorage (in-memory)
Data resets on restart
```

**Production (Railway):**
```
DATABASE_URL set → Uses PgStorage (PostgreSQL)
Data persists in database
```

---

## 🧪 Test Your Deployment

After deploying:

1. **Homepage:** `https://your-app.railway.app`
   - Should load restaurant homepage with carousel

2. **Menu:** Click "Order for Pickup"
   - Should show menu items (bowls, quesadillas, etc.)

3. **API:** `https://your-app.railway.app/api/reviews`
   - Should return empty array `[]` (no reviews yet)

4. **Submit Order:** Complete an order
   - Check Railway logs to see order saved to database

---

## 📝 Prepare Database (Before First Use)

After deploying, run migrations to create tables:

```bash
# Via Railway CLI
railway run npm run db:push

# Or manually in Railway dashboard
# Go to your deployment → Variables → Add this command to run once:
npm run db:push
```

This creates all tables (orders, reviews, feedback, etc.) in your PostgreSQL database.

---

## 🐛 Troubleshooting

### "DATABASE_URL is not set"
- Add `DATABASE_URL` in Railway environment variables
- Or add Railway PostgreSQL database (sets automatically)

### "Could not find build directory"
- Railway runs `npm run build` automatically
- Check build logs in Railway dashboard

### API returns 500 errors
- Check database tables exist: Run `npm run db:push`
- Check Railway logs for error details

---

## 📞 Support

- **Railway Docs:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **Drizzle ORM:** https://orm.drizzle.team

---

## 🎯 Next Steps

1. **Deploy to Railway** (follow Step 1-3 above)
2. **Run database migrations** (`npm run db:push`)
3. **Test your site** (order flow, forms, etc.)
4. **Add custom domain** (optional, in Railway settings)

**That's it!** Your restaurant site is live! 🎉
