# Deployment Guide: chainofthought.xyz

This guide walks you through deploying the Yotta Report to the internet using Render.

## 📋 Prerequisites

Before you start, make sure you have:

- ✅ GitHub account with this repo pushed
- ✅ Render account (free at https://render.com)
- ✅ Domain: chainofthought.xyz (registered)
- ✅ Anthropic API Key (free at https://console.anthropic.com)

---

## 🚀 Deployment Steps

### Step 1: Push Code to GitHub

Make sure your code is committed and pushed:

```bash
git add .
git commit -m "Prepare for deployment to Render"
git push origin main
```

**Important:** Don't commit your `.env` file! It should already be in `.gitignore`.

### Step 2: Create Render Account & Connect GitHub

1. Go to https://render.com
2. Click "Sign up with GitHub"
3. Authorize Render to access your GitHub account
4. On the dashboard, click "New +" → "Web Service"

### Step 3: Create Web Service on Render

1. **Select Repository:** Choose the yotta-report repo
2. **Configure Build & Start:**
   - Runtime: `Node`
   - Region: `Oregon` (or nearest to you)
   - Branch: `main`
   - Build Command: `npm install && npm run build`
   - Start Command: `NODE_ENV=production npm start`

3. **Plan:** Select "Starter" ($7/month)

4. **Environment Variables:** Click "Advanced" and add:
   ```
   NODE_ENV = production
   ANTHROPIC_API_KEY = sk-ant-your-actual-key-here
   CORS_ORIGIN = https://chainofthought.xyz
   PORT = 3001
   ```

5. Click "Create Web Service"

Render will now deploy your app! This takes 2-5 minutes. You'll get a temporary URL like `yotta-report.onrender.com`.

### Step 4: Connect Your Domain

Once deployment finishes:

1. In Render dashboard, go to your service settings
2. Click "Custom Domains"
3. Enter: `chainofthought.xyz`
4. Copy the CNAME value (something like `yotta-report.onrender.com`)

5. Go to your domain registrar (GoDaddy, Namecheap, etc.):
   - Add a CNAME record:
     - Name: `@` or leave blank
     - Type: `CNAME`
     - Value: `yotta-report.onrender.com` (or whatever Render gave you)

6. Wait 5-15 minutes for DNS to propagate

7. Render will auto-create SSL certificate for HTTPS ✅

### Step 5: Verify Deployment

Visit your site:

```
https://chainofthought.xyz
```

You should see the report! Check:
- ✅ Frontend loads
- ✅ "Latest Developments" section shows data
- ✅ HTTPS works (lock icon in browser)

### Step 6: Monitor the API

Check health endpoint:

```
https://chainofthought.xyz/health
```

You should see:
```json
{
  "status": "ok",
  "timestamp": "...",
  "env": "production"
}
```

---

## 🔧 Troubleshooting

### "No developments found" message

**Problem:** The section isn't loading data.

**Fix:**
1. Check Render logs for errors
2. Verify ANTHROPIC_API_KEY is set in Render dashboard
3. Visit `/health` endpoint to confirm server is running

### SSL certificate not working

**Problem:** "Your connection is not private" error.

**Fix:**
1. Wait 10-15 minutes after adding domain
2. Render auto-creates certificate (no action needed)
3. Clear browser cache and try again

### Slow initial load

**Problem:** First request takes 5-10 seconds.

**Fix:**
1. Render starts the service on first request
2. Wait 30 seconds for it to warm up
3. Second request will be much faster

### Domain not resolving

**Problem:** `chainofthought.xyz` doesn't work.

**Fix:**
1. Check DNS settings at your registrar
2. Verify CNAME is correct
3. Run this to check: `nslookup chainofthought.xyz`
4. Wait up to 24 hours for full propagation

---

## 📊 Managing Your Deployment

### View Logs

In Render dashboard:
1. Click your service
2. Go to "Logs" tab
3. See real-time errors and info

### Update Code

Just push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Render automatically redeploys!

### Update Environment Variables

1. Go to service settings
2. Click "Environment"
3. Edit any variable
4. Service automatically redeploys

### Scale Up

If you get heavy traffic:

1. Go to service settings
2. Change "Plan" from Starter to Standard ($12/month)
3. Gets more CPU/memory

---

## 💰 Costs

- **Render Web Service:** $7/month (Starter)
- **Anthropic API:** Free tier = ~1M tokens/month
  - Tweet summarization uses ~500-2000 tokens per request
  - With 6-hour caching, typically $0-5/month
- **Domain:** $10-15/year (your registrar)

**Total: ~$17-27/month**

---

## 🔐 Security Best Practices

### Environment Variables

**Never commit secrets!** Keep in `.env` locally, set in Render dashboard only.

Your `.env` file:
```
ANTHROPIC_API_KEY=sk-ant-xxx
```

Should NOT be in GitHub. It's in `.gitignore`, so you're good.

### API Endpoints

The backend is not exposed directly - only through `/api/yotta` routes.

The Express server:
1. Serves static frontend files
2. Handles `/api/yotta/*` API requests
3. Has CORS configured for your domain

### Monitoring

Check logs regularly in Render dashboard to spot issues.

---

## 🆘 Support

If things break:

1. **Check Render logs** - usually has error messages
2. **Visit `/health` endpoint** - confirms server is running
3. **Verify environment variables** - ANTHROPIC_API_KEY set correctly
4. **Check tweets service** - visit `/api/yotta/developments/raw` to see raw tweets

---

## 📝 Next Steps

After deployment:

1. Share your site: `https://chainofthought.xyz`
2. Monitor performance in Render dashboard
3. Collect feedback from users
4. Update code as needed (just git push)
5. Monitor API costs on Anthropic dashboard

---

## 🚀 Quick Reference

**One-line health check:**
```bash
curl https://chainofthought.xyz/health
```

**Check raw tweet data:**
```bash
curl https://chainofthought.xyz/api/yotta/developments/raw
```

**Force cache clear (for testing):**
```bash
curl -X POST https://chainofthought.xyz/api/yotta/developments/cache/clear
```

---

Good luck! Your site will be live on the internet within 10-15 minutes! 🎉
