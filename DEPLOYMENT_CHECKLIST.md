# 📋 Firebase Deployment Checklist

Use this checklist to ensure a smooth deployment to Firebase Hosting.

## Pre-Deployment Checklist

### ✅ Environment Setup

- [ ] Firebase CLI installed globally (`npm install -g firebase-tools`)
- [ ] Logged into Firebase (`firebase login`)
- [ ] Firebase project created in [Firebase Console](https://console.firebase.google.com/)
- [ ] Firebase initialized in project directory (`firebase init hosting`)

### ✅ Configuration Files

- [ ] `firebase.json` exists in project root
- [ ] `.firebaserc` exists with correct project ID
- [ ] `.gitignore` includes Firebase-specific files
- [ ] `.env.production` created with production values (NOT committed to Git)

### ✅ Environment Variables

- [ ] `VITE_RAILWAY_API_URL` set to production Railway API URL
- [ ] `VITE_SUPABASE_URL` verified and correct
- [ ] `VITE_SUPABASE_ANON_KEY` verified and correct
- [ ] No sensitive keys exposed in client-side code

### ✅ Code Quality

- [ ] All console.log statements removed or disabled in production
- [ ] No hardcoded API keys or secrets
- [ ] All imports working correctly
- [ ] No linter errors (`npm run lint` if available)
- [ ] All TypeScript errors resolved (if using TypeScript)

### ✅ Build Test

- [ ] `npm run build` completes successfully
- [ ] No build errors or warnings
- [ ] `dist` folder created with all assets
- [ ] `dist/index.html` exists
- [ ] Assets folder contains CSS and JS files

### ✅ Local Preview Test

- [ ] `npm run preview` runs successfully
- [ ] Website loads at `http://localhost:4173`
- [ ] All pages navigate correctly
- [ ] AI Search Demo works
- [ ] Waitlist form submits successfully
- [ ] Contact button opens email client
- [ ] No console errors in browser (F12)
- [ ] Mobile responsive design works

### ✅ API Integration

- [ ] Railway API is deployed and running
- [ ] Railway API URL is correct in `.env.production`
- [ ] Test search query returns results
- [ ] API endpoints responding correctly
- [ ] CORS configured on Railway API for Firebase domain

### ✅ Database

- [ ] Supabase project is active
- [ ] Waitlist table exists
- [ ] Supabase credentials are correct
- [ ] Test waitlist submission works

## Deployment Steps

### 1. Build for Production

```bash
npm run build
```

**Expected output:**
```
✓ built in X seconds
```

- [ ] Build completed successfully
- [ ] No errors in terminal

### 2. Test Build Locally

```bash
npm run preview
```

- [ ] Preview server starts
- [ ] Test all features work
- [ ] No console errors

### 3. Deploy to Firebase

```bash
firebase deploy --only hosting
```

**OR**

```bash
npm run deploy
```

- [ ] Deployment starts
- [ ] Files uploaded successfully
- [ ] Deployment completes

### 4. Verify Deployment

- [ ] Firebase provides deployment URL
- [ ] Copy and open the URL
- [ ] Website loads correctly

## Post-Deployment Checklist

### ✅ Functionality Tests

Visit your deployed site and test:

- [ ] Home page loads correctly
- [ ] All sections visible (Hero, Search Demo info, AI-Assisted Applications, Footer)
- [ ] "Try AI Search Now" button works
- [ ] Contact button opens email client
- [ ] Navigate to Search Demo page (`/search-demo`)
- [ ] Search Demo page loads
- [ ] Search functionality works (enter query, get results)
- [ ] Results display correctly
- [ ] "Back to home" link works
- [ ] Privacy Policy link works (`/privacy-policy`)
- [ ] Waitlist form submission works
- [ ] Toast notifications appear

### ✅ Cross-Browser Testing

Test on multiple browsers:

- [ ] Google Chrome
- [ ] Mozilla Firefox
- [ ] Safari (Mac/iOS)
- [ ] Microsoft Edge
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### ✅ Performance

- [ ] Page loads in < 3 seconds
- [ ] Images load quickly
- [ ] No layout shifts
- [ ] Smooth animations

### ✅ Mobile Testing

- [ ] Responsive design works
- [ ] Navigation menu accessible
- [ ] Forms are usable
- [ ] Buttons are tap-friendly
- [ ] Text is readable

### ✅ SEO & Meta Tags

- [ ] Page title shows correctly
- [ ] Favicon displays
- [ ] Meta description set
- [ ] Open Graph tags (for social sharing)

### ✅ Security

- [ ] HTTPS enabled (automatic with Firebase)
- [ ] No mixed content warnings
- [ ] API keys not exposed in client code
- [ ] Security headers configured

### ✅ Analytics & Monitoring

- [ ] Firebase Analytics enabled (optional)
- [ ] Google Analytics tracking (if configured)
- [ ] Error monitoring set up (optional)

## Custom Domain Setup (Optional)

- [ ] Custom domain purchased
- [ ] Add custom domain in Firebase Console
- [ ] DNS records updated at domain registrar
- [ ] Domain verification completed
- [ ] SSL certificate provisioned (automatic, may take 24 hours)
- [ ] Test custom domain works

## Troubleshooting

### If deployment fails:

1. [ ] Check Firebase CLI is logged in: `firebase login`
2. [ ] Verify project ID in `.firebaserc` is correct
3. [ ] Ensure `dist` folder exists: `npm run build`
4. [ ] Check Firebase Console for quota/billing issues
5. [ ] Try deploying again: `firebase deploy --only hosting`

### If site is blank/white screen:

1. [ ] Open browser DevTools (F12)
2. [ ] Check Console for errors
3. [ ] Verify environment variables are correct
4. [ ] Rebuild: `npm run build`
5. [ ] Redeploy: `firebase deploy --only hosting`

### If API calls fail:

1. [ ] Verify Railway API is running
2. [ ] Check Railway API URL in `.env.production`
3. [ ] Test API directly in browser
4. [ ] Check CORS settings on Railway
5. [ ] Rebuild and redeploy

### If forms don't work:

1. [ ] Check Supabase credentials
2. [ ] Verify Supabase project is active
3. [ ] Test Supabase connection in browser console
4. [ ] Check network tab for failed requests

## Rollback Plan

If you need to rollback to a previous version:

```bash
# List all deployments
firebase hosting:releases:list

# View specific deployment
firebase hosting:clone SOURCE_SITE_ID:SOURCE_VERSION TARGET_SITE_ID
```

## Monitoring

After deployment, monitor:

- [ ] Firebase Hosting dashboard for traffic
- [ ] Supabase dashboard for waitlist signups
- [ ] Railway dashboard for API usage
- [ ] Browser console for errors
- [ ] User feedback

## Next Steps

After successful deployment:

- [ ] Share website URL with team
- [ ] Test with real users
- [ ] Monitor analytics
- [ ] Set up custom domain (if needed)
- [ ] Configure CI/CD for automatic deployments (optional)
- [ ] Set up monitoring/alerts
- [ ] Document any issues encountered

## Emergency Contacts

- **Firebase Support:** [https://firebase.google.com/support](https://firebase.google.com/support)
- **Railway Support:** [https://railway.app/help](https://railway.app/help)
- **Supabase Support:** [https://supabase.com/support](https://supabase.com/support)

---

## 🎉 Deployment Complete!

Once all items are checked, your AIpply website is live on Firebase Hosting!

**Deployment URL:** `https://your-project-id.web.app`

---

**Last Updated:** Use this checklist for every deployment to ensure consistency and quality.

