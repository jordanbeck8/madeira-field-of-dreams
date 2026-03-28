# Madeira Field of Dreams

Fundraising and community awareness site for the Sellman Park baseball field renovation.

## Local Development

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Build for Production

```bash
npm run build
```

Output goes to `dist/` — this is what you deploy.

## Deploy to Cloudflare Pages (Recommended)

### 1. Buy the Domain

1. Go to https://dash.cloudflare.com
2. Domain Registration → Register Domain
3. Search `madeirafieldofdreams.com` → Purchase (~$10/yr)

### 2. Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
gh repo create madeira-field-of-dreams --public --push
```

Or create the repo manually at github.com and push.

### 3. Connect to Cloudflare Pages

1. Cloudflare Dashboard → Workers & Pages → Create
2. Connect to Git → Select your repo
3. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy

### 4. Add Custom Domain

1. In your Cloudflare Pages project → Custom domains
2. Add `madeirafieldofdreams.com`
3. DNS configures automatically since domain is on Cloudflare

SSL is automatic. Done.

## Alternative: Netlify

```bash
npm run build
```

Then drag the `dist/` folder onto https://app.netlify.com/drop

Add custom domain in Netlify dashboard → Domain settings.

## Security

- `_headers` file sets CSP, X-Frame-Options, HSTS-ready headers
- Contact form has honeypot field and input validation
- No external JS dependencies beyond React + Lucide icons
- All images served from same origin
- Image cache headers set to 1 year immutable

## Contact Form

Currently client-side only (logs to console). To wire up:

### Option A: Formspree (easiest, free tier available)
1. Sign up at formspree.io
2. Create a form, get your endpoint URL
3. In App.jsx, replace the console.log in handleSubmit with a fetch to your Formspree endpoint

### Option B: Cloudflare Workers
Create a worker that receives the POST and forwards via Mailgun/SES.
