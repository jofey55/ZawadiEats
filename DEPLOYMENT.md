# Deployment Guide for Zawadi Restaurant

## Important: Platform Selection

This application uses a **long-running Express server** that is not compatible with Vercel's serverless architecture. 

**Recommended Platforms** (in order of recommendation):
1. **Railway** - Easiest, automatic deployments from Git
2. **Render** - Great free tier, simple setup
3. **Fly.io** - Excellent performance, affordable

❌ **Not Compatible**: Vercel (requires serverless refactoring)

---

## Option 1: Deploy to Railway (Recommended)

Railway is the easiest platform for full-stack Node.js apps like this one.

### Setup Steps

1. **Sign up at [railway.app](https://railway.app)**
   - Connect your GitHub account

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add PostgreSQL Database**
   - Click "+ New"
   - Select "Database" → "PostgreSQL"
   - Railway automatically sets `DATABASE_URL` environment variable

4. **Configure Environment Variables**
   - Go to your app service → Variables tab
   - Add optional Toast POS credentials:
     ```
     TOAST_CLIENT_ID=your_client_id
     TOAST_CLIENT_SECRET=your_client_secret
     TOAST_RESTAURANT_GUID=your_restaurant_guid
     ```

5. **Configure Build Settings** (Usually auto-detected)
   - Build Command: `npm run build`
   - Start Command: `npm start`

6. **Deploy**
   - Railway automatically deploys on every git push
   - Your app will be live at `yourapp.railway.app`

7. **Run Database Migrations**
   - In Railway dashboard, open your service terminal
   - Run: `npm run db:push`

### Cost
- Free tier: $5/month credit (usually enough for small apps)
- Paid tier: Pay for what you use (~$10-20/month for this app)

---

## Option 2: Deploy to Render

### Setup Steps

1. **Sign up at [render.com](https://render.com)**

2. **Create PostgreSQL Database**
   - Click "New +" → "PostgreSQL"
   - Note the connection details

3. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your Git repository
   - Configure:
     - **Name**: zawadi-restaurant
     - **Build Command**: `npm run build`
     - **Start Command**: `npm start`
     - **Instance Type**: Free (or paid for better performance)

4. **Add Environment Variables**
   - In service settings → Environment
   - Add:
     ```
     DATABASE_URL=your_postgres_connection_string
     NODE_ENV=production
     ```
   - Optional Toast POS credentials:
     ```
     TOAST_CLIENT_ID=your_client_id
     TOAST_CLIENT_SECRET=your_client_secret
     TOAST_RESTAURANT_GUID=your_restaurant_guid
     ```

5. **Deploy**
   - Render automatically deploys from main branch
   - Manual deploys: Click "Manual Deploy" → "Deploy latest commit"

6. **Run Database Migrations**
   - Use Render Shell or connect remotely
   - Run: `npm run db:push`

### Cost
- Free tier: Available (with limitations)
- Paid tier: $7/month for web service + database costs

---

## Option 3: Deploy to Fly.io

### Setup Steps

1. **Install Fly CLI**
   ```bash
   # macOS/Linux
   curl -L https://fly.io/install.sh | sh

   # Windows
   powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
   ```

2. **Sign up and Login**
   ```bash
   fly auth signup
   # or
   fly auth login
   ```

3. **Initialize Fly App**
   ```bash
   fly launch
   ```
   - Follow prompts to configure your app
   - Say "Yes" to PostgreSQL when asked

4. **Configure Secrets**
   ```bash
   # Toast POS (optional)
   fly secrets set TOAST_CLIENT_ID=your_client_id
   fly secrets set TOAST_CLIENT_SECRET=your_client_secret
   fly secrets set TOAST_RESTAURANT_GUID=your_restaurant_guid
   ```

5. **Deploy**
   ```bash
   fly deploy
   ```

6. **Run Database Migrations**
   ```bash
   fly ssh console
   npm run db:push
   exit
   ```

### Cost
- Free tier: 3 shared-cpu VMs (enough for small apps)
- Paid tier: Usage-based pricing

---

## Environment Variables Reference

### Required Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `DATABASE_URL` | PostgreSQL connection string | Automatically set by Railway/Render/Fly.io |
| `NODE_ENV` | Environment mode | Set to `production` |
| `PORT` | Server port | Usually auto-set by platform |

### Optional Variables (Toast POS Integration)

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `TOAST_CLIENT_ID` | Toast API Client ID | [dev.toasttab.com](https://dev.toasttab.com/) |
| `TOAST_CLIENT_SECRET` | Toast API Secret | [dev.toasttab.com](https://dev.toasttab.com/) |
| `TOAST_RESTAURANT_GUID` | Restaurant identifier | [dev.toasttab.com](https://dev.toasttab.com/) |

**Note**: Toast POS integration is optional. The app works in placeholder mode without these credentials.

---

## Post-Deployment Steps

### 1. Update Google Analytics (Optional)

Edit `client/index.html` before deploying and replace the placeholder:

```html
<!-- Change this -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>

<!-- To your actual Measurement ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"></script>
```

Also update the gtag config:
```javascript
gtag('config', 'G-YOUR-ACTUAL-ID');
```

### 2. Test the Deployment

Visit your deployed URL and verify:
- [ ] Homepage loads correctly
- [ ] Menu displays with all photos
- [ ] Color-coded category headers appear (Appetizers=amber, Bowls=green, Quesadillas=orange, Sambusa=pink, Drinks=cyan)
- [ ] Order buttons link to Uber Eats and DoorDash
- [ ] Contact form submits successfully
- [ ] All pages are accessible (/order, /contact, /catering, /jobs, /feedback)
- [ ] Photos load properly

### 3. Custom Domain (Optional)

Each platform has custom domain support:
- **Railway**: Settings → Domains → Add Custom Domain
- **Render**: Settings → Custom Domains → Add Custom Domain
- **Fly.io**: `fly certs add yourdomain.com`

SSL certificates are automatically provisioned.

---

## File Structure Verification

All required files are ready for deployment:

```
✓ client/public/images/     # All menu & gallery photos (10 menu items + 6 gallery images)
✓ client/src/menu.json      # Menu data with correct image paths
✓ server/index.ts          # Express server
✓ server/routes.ts         # API routes
✓ shared/schema.ts         # Database schema
✓ package.json             # Build & start scripts configured
✓ .env.example             # Environment variables template
```

---

## Production Checklist

Before going live:

- [ ] Choose deployment platform (Railway, Render, or Fly.io)
- [ ] Create PostgreSQL database
- [ ] Set environment variables (`DATABASE_URL`, etc.)
- [ ] Deploy application
- [ ] Run database migrations (`npm run db:push`)
- [ ] Update Google Analytics ID (optional)
- [ ] Add Toast POS credentials (optional)
- [ ] Configure custom domain (optional)
- [ ] Test all pages and functionality
- [ ] Verify all menu photos load
- [ ] Check mobile responsiveness
- [ ] Test all external links (Uber Eats, DoorDash, social media)
- [ ] Verify contact form works
- [ ] Test online ordering flow

---

## Troubleshooting

### Build Fails

- Ensure all dependencies are listed in `package.json`
- Check Node.js version (20.x recommended)
- Review build logs for specific errors

### Database Connection Issues

- Verify `DATABASE_URL` format is correct
- Check database is running and accessible
- Ensure database allows connections from deployment platform IPs
- Test connection locally first

### Images Not Loading

- All images are in `client/public/images/` ✓
- Image paths use `/images/...` format ✓
- Check build output includes images
- Verify static file serving is working

### Toast POS Integration Issues

- App works without Toast credentials (placeholder mode)
- Verify credentials are correct at https://dev.toasttab.com/
- Check environment variables are set correctly
- Review server logs for API errors

---

## Support Resources

- **Railway**: [docs.railway.app](https://docs.railway.app)
- **Render**: [render.com/docs](https://render.com/docs)
- **Fly.io**: [fly.io/docs](https://fly.io/docs)

For app-specific questions, refer to `replit.md` documentation.
