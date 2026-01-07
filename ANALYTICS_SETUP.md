# Google Analytics Setup Guide

## 🔧 How to Activate Analytics Tracking

Your site is ready for Google Analytics, but you need to add your tracking ID:

### Step 1: Create Google Analytics Account

1. Go to https://analytics.google.com
2. Click "Start measuring"
3. Create an account (use any name)
4. Create a property:
   - Property name: QbitsOnly
   - Timezone: Your timezone
   - Currency: Your currency
5. Fill in business details
6. Accept terms

### Step 2: Set Up Data Stream

1. Choose platform: **Web**
2. Website URL: `https://qbitsonly.com`
3. Stream name: `QbitsOnly Website`
4. Click "Create stream"

### Step 3: Get Your Tracking ID

You'll see a **Measurement ID** like: `G-XXXXXXXXXX`

Copy this ID!

### Step 4: Add to Your Website

Replace `G-XXXXXXXXXX` with your actual ID in these files:

**File: `index.html`** (line ~24)
```html
gtag('config', 'G-XXXXXXXXXX');  ← Replace this
```

**Do a global find and replace:**
```bash
cd /Users/sumamgai/Desktop/qbitsonly
find . -name "*.html" -type f -exec sed -i '' 's/G-XXXXXXXXXX/G-YOUR-REAL-ID/g' {} +
```

Or manually replace in each HTML file.

### Step 5: Push to GitHub

```bash
git add .
git commit -m "Add real Google Analytics ID"
git push origin main
```

### Step 6: Verify It's Working

1. Visit your website: https://qbitsonly.com
2. Go to Google Analytics → Reports → Realtime
3. You should see yourself as an active user!

---

## 📊 What You'll See in Analytics

After 24-48 hours, you'll get data on:

- **Page views** - How many times each page is visited
- **Users** - How many unique visitors
- **Sessions** - How long people stay
- **Locations** - Where visitors are from
- **Devices** - Desktop, mobile, tablet breakdown
- **Traffic sources** - How people found your site
- **Popular pages** - Which lessons are most viewed

---

## 🔒 Privacy Note

Google Analytics uses cookies to track users. Consider adding a privacy policy page if you're concerned about GDPR compliance.

---

## Alternative: View GitHub Repo Traffic

You can always check repository traffic at:
https://github.com/decode007/qbitsonly/graphs/traffic

This shows visitors to the GitHub repo (not the website), but gives some insights.

---

Need help? The Analytics setup takes about 5 minutes total!

