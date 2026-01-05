# Deployment Guide for QbitsOnly

This guide covers multiple ways to deploy your QbitsOnly quantum learning website to production.

## Prerequisites

- Git installed and repository connected to GitHub
- Domain name configured (qbitsonly.com) if using custom domain

## Deployment Options

### Option 1: GitHub Pages (Recommended - Free & Easy)

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Select `main` branch and `/ (root)` folder
   - Click Save

2. **Custom Domain (Optional):**
   - In the GitHub Pages settings, add your custom domain: `qbitsonly.com`
   - Update your DNS provider with these records:
     ```
     Type: A
     Name: @
     Value: 185.199.108.153
     Value: 185.199.109.153
     Value: 185.199.110.153
     Value: 185.199.111.153
     
     Type: CNAME
     Name: www
     Value: yourusername.github.io
     ```

3. **HTTPS:**
   - GitHub Pages automatically provides free SSL certificate
   - Enable "Enforce HTTPS" in the settings

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

Your site will be live at `https://yourusername.github.io/qbitsonly` or your custom domain!

---

### Option 2: Netlify (Great for CI/CD)

1. **Sign up** at [netlify.com](https://netlify.com)

2. **Deploy from Git:**
   - Click "New site from Git"
   - Connect your GitHub account
   - Select the `qbitsonly` repository
   - Build settings (leave empty for static site):
     - Build command: (leave empty)
     - Publish directory: `/`
   - Click "Deploy site"

3. **Custom Domain:**
   - Go to Site settings → Domain management
   - Add custom domain: `qbitsonly.com`
   - Follow the DNS configuration instructions

4. **HTTPS:**
   - Automatic with Let's Encrypt
   - Enabled by default

5. **Continuous Deployment:**
   - Every push to `main` branch automatically deploys
   - Build previews for pull requests

---

### Option 3: Vercel (Fast & Modern)

1. **Sign up** at [vercel.com](https://vercel.com)

2. **Import Project:**
   - Click "New Project"
   - Import your Git repository
   - Framework Preset: Other
   - No build command needed
   - Click "Deploy"

3. **Custom Domain:**
   - Go to Project Settings → Domains
   - Add `qbitsonly.com`
   - Update your DNS:
     ```
     Type: CNAME
     Name: @
     Value: cname.vercel-dns.com
     ```

4. **Automatic deployments** on every push

---

### Option 4: Traditional Web Hosting (cPanel/FTP)

1. **Build the site** (already done - static files)

2. **Upload via FTP:**
   - Connect to your hosting provider via FTP client (FileZilla, etc.)
   - Navigate to `public_html` or `www` folder
   - Upload all files from your project

3. **Alternative - cPanel File Manager:**
   - Log in to cPanel
   - Open File Manager
   - Navigate to `public_html`
   - Upload all files
   - Extract if uploaded as .zip

4. **Configure Domain:**
   - Point your domain to your hosting server's IP
   - Update nameservers if needed

5. **HTTPS:**
   - Use Let's Encrypt (usually built into cPanel)
   - Or purchase SSL certificate from hosting provider

---

### Option 5: Amazon S3 + CloudFront

1. **Create S3 Bucket:**
   ```bash
   aws s3 mb s3://qbitsonly.com
   ```

2. **Enable Static Website Hosting:**
   - Go to S3 bucket → Properties → Static website hosting
   - Index document: `index.html`
   - Error document: `index.html`

3. **Upload Files:**
   ```bash
   aws s3 sync . s3://qbitsonly.com --exclude ".git/*" --exclude "node_modules/*"
   ```

4. **Make Public:**
   - Add bucket policy to allow public read access

5. **CloudFront Distribution:**
   - Create CloudFront distribution
   - Origin: Your S3 bucket
   - Enable HTTPS with AWS Certificate Manager (free)

6. **Configure DNS:**
   - Point domain to CloudFront distribution

---

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify all internal links work
- [ ] Check external links (Quirk simulator, GitHub, etc.)
- [ ] Test on mobile devices
- [ ] Verify HTTPS is working
- [ ] Test Quirk simulator iframe loads
- [ ] Check Google Search Console submission
- [ ] Test page load speed (Google PageSpeed Insights)
- [ ] Verify custom domain works (with and without www)
- [ ] Test all lessons navigate correctly
- [ ] Check footer links

---

## Performance Optimization

### 1. Enable Compression
Most hosting platforms enable gzip/brotli automatically. Verify with:
```bash
curl -H "Accept-Encoding: gzip" -I https://qbitsonly.com
```

### 2. Cache Headers
Add to `.htaccess` (if using Apache):
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

### 3. CDN for Assets
- Google Fonts already on CDN
- Consider Cloudflare for additional caching

---

## SEO Setup

1. **Google Search Console:**
   - Add property: `https://qbitsonly.com`
   - Submit sitemap: `https://qbitsonly.com/sitemap.txt`

2. **Google Analytics (Optional):**
   - Create GA4 property
   - Add tracking code to all pages

3. **Meta Tags:**
   - Already included in all pages
   - Update Open Graph images if desired

---

## Monitoring

1. **Uptime Monitoring:**
   - [UptimeRobot](https://uptimerobot.com) - Free
   - [Pingdom](https://pingdom.com)

2. **Analytics:**
   - Google Analytics
   - [Plausible](https://plausible.io) - Privacy-friendly alternative

---

## Quick Deploy Script

Create `deploy.sh`:
```bash
#!/bin/bash
echo "Deploying QbitsOnly..."
git add .
git commit -m "Update content"
git push origin main
echo "Deployed! Check your hosting platform for build status."
```

Make executable:
```bash
chmod +x deploy.sh
```

Run:
```bash
./deploy.sh
```

---

## Troubleshooting

### Issue: Custom domain not working
- Wait 24-48 hours for DNS propagation
- Check DNS records with `dig qbitsonly.com` or online DNS checker
- Verify nameservers point to hosting provider

### Issue: HTTPS showing warning
- Wait for SSL certificate provisioning (can take a few hours)
- Verify domain ownership with hosting provider
- Check that HTTPS is enforced in settings

### Issue: Quirk simulator not loading
- Check iframe CSP headers
- Verify external site is accessible
- Check browser console for errors

---

## Support

For deployment issues:
- GitHub Issues: https://github.com/decode007/qbitsonly/issues
- Platform-specific documentation linked above

---

**Recommended:** Start with **GitHub Pages** for simplicity, then move to **Netlify** or **Vercel** if you need more features (analytics, forms, serverless functions, etc.)

