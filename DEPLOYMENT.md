# Vercel Deployment Guide for Zawadi Restaurant

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Database**: PostgreSQL database (Vercel Postgres, Neon, Supabase, or any PostgreSQL provider)
3. **Toast POS Credentials** (Optional): For online ordering integration

## Quick Deploy

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Follow prompts to link project and configure
```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository (GitHub, GitLab, or Bitbucket)
3. Configure project settings:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

## Environment Variables

Add these environment variables in Vercel Dashboard → Settings → Environment Variables:

### Required Variables

```
DATABASE_URL=postgresql://user:password@host:port/database_name
```

### Optional Variables (Toast POS Integration)

```
TOAST_CLIENT_ID=your_client_id
TOAST_CLIENT_SECRET=your_client_secret
TOAST_RESTAURANT_GUID=your_restaurant_guid
```

Get Toast POS credentials from: https://dev.toasttab.com/

## Database Setup

### Using Vercel Postgres

1. In Vercel Dashboard, go to Storage → Create Database → Postgres
2. Copy the `DATABASE_URL` connection string
3. Add to Environment Variables
4. Run database migrations:
   ```bash
   npm run db:push
   ```

### Using External PostgreSQL (Neon, Supabase, etc.)

1. Create a PostgreSQL database with your provider
2. Get the connection string
3. Add `DATABASE_URL` to Vercel Environment Variables
4. Run database migrations:
   ```bash
   npm run db:push
   ```

## Post-Deployment Steps

### 1. Update Google Analytics

Edit `client/index.html` and replace the placeholder:

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

Visit your Vercel URL and verify:
- [ ] Homepage loads correctly
- [ ] Menu displays with all photos
- [ ] Color-coded category headers appear
- [ ] Order buttons link to Uber Eats and DoorDash
- [ ] Contact form works
- [ ] All pages are accessible

### 3. Custom Domain (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain (e.g., zawadirestaurant.com)
3. Follow DNS configuration instructions
4. SSL certificate will be automatically provisioned

## Build Configuration

The project is configured with:
- **Build Command**: `npm run build`
  - Builds React frontend with Vite
  - Bundles Express backend with esbuild
- **Start Command**: `npm start`
  - Runs production server from `dist/index.js`
- **Output**: `dist/` directory

## File Structure for Deployment

```
├── client/
│   ├── public/
│   │   └── images/          # All menu & gallery photos ✓
│   └── src/
│       └── menu.json        # Menu data ✓
├── server/
│   ├── index.ts            # Express server ✓
│   └── routes.ts           # API routes ✓
├── shared/
│   └── schema.ts           # Database schema ✓
├── package.json            # Build & start scripts ✓
├── vercel.json            # Vercel configuration ✓
└── .env.example           # Environment variables template ✓
```

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json` (not `devDependencies` if needed at runtime)
- Verify Node.js version compatibility (20.x recommended)

### Database Connection Issues

- Ensure `DATABASE_URL` is correctly formatted
- Check firewall rules allow Vercel IP addresses
- Test connection string locally first

### Images Not Loading

- All images are in `client/public/images/` ✓
- Image paths in code use `/images/...` ✓
- Verify images were included in the build

### Toast POS Not Working

- Toast integration works in placeholder mode without credentials
- Add `TOAST_CLIENT_ID`, `TOAST_CLIENT_SECRET`, `TOAST_RESTAURANT_GUID` for full functionality
- Verify credentials are correct at https://dev.toasttab.com/

## Production Checklist

Before going live:

- [ ] All photos in `client/public/images/` directory
- [ ] `DATABASE_URL` environment variable set
- [ ] Database migrations run (`npm run db:push`)
- [ ] Google Analytics ID updated (optional)
- [ ] Toast POS credentials added (optional)
- [ ] Custom domain configured (optional)
- [ ] Test all pages and functionality
- [ ] Verify mobile responsiveness
- [ ] Check all external links (Uber Eats, DoorDash, social media)

## Support

For Vercel-specific issues, visit [vercel.com/docs](https://vercel.com/docs)

For app-specific questions, refer to the main `README.md` or `replit.md` documentation.
