# Portfolio Setup Guide

This guide will help you configure your portfolio website with all necessary credentials and personal information.

# 📧 EmailJS Setup (Contact Form)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month)
3. Verify your email address

### Step 2: Add Email Service
1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection instructions
5. Note down your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Set up your template with these variables:
   ```
   Subject: New Contact from {{from_name}}
   
   From: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   ```
4. Save and note down your **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to **Account** > **General**
2. Find your **Public Key** (e.g., `aBcDeFgHiJkLmNo`)

### Step 5: Update Configuration
Open `src/config/emailjs.config.ts` and replace:
```typescript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'your_actual_public_key',
  SERVICE_ID: 'your_actual_service_id',
  TEMPLATE_ID: 'your_actual_template_id',
};
```

---

## 🔗 Social Links Configuration

### Update Social Media Links

Open `src/components/sections/HomeSection.tsx` and update:
```typescript
const SOCIAL_LINKS = {
  github: 'https://github.com/YOUR_USERNAME',
  linkedin: 'https://linkedin.com/in/YOUR_USERNAME',
  leetcode: 'https://leetcode.com/YOUR_USERNAME',
  instagram: 'https://instagram.com/YOUR_USERNAME',
};
```

Open `src/components/sections/ContactSection.tsx` and update the same links.

---

## 📄 Resume Setup

### Add Your Resume Link

1. Upload your resume to Google Drive
2. Get the shareable link (make sure it's set to "Anyone with the link can view")
3. Open `src/components/Navbar.tsx`
4. Update the `RESUME_LINK` constant:
   ```typescript
   const RESUME_LINK = 'https://drive.google.com/file/d/YOUR_FILE_ID/view';
   ```

**Alternative:** You can also use:
- Dropbox link
- OneDrive link
- Direct PDF link from your hosting

---

## 🎨 Personalization

### Update Your Name
Open `src/components/sections/HomeSection.tsx` and change:
```typescript
const name = "YOUR_NAME";
```

### Update Your Title/Role
In the same file, update:
```typescript
<p className="font-orbitron text-xl md:text-2xl text-cosmic-cyan tracking-wide">
  Your Professional Title | Your Specialization
</p>
```

### Update Your Introduction
Update the introduction paragraph:
```typescript
<motion.p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
  Your personal introduction and what you do...
</motion.p>
```

---

## 🌐 Deploy Your Portfolio

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Deploy (automatically detects Vite)

### Option 2: Netlify
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `dist`

### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Update `vite.config.ts` base path
4. Run: `npm run deploy`

---

## ✅ Testing Checklist

Before going live, test:

- [ ] All navbar links scroll to correct sections
- [ ] Resume button opens your resume in new tab
- [ ] All social media links work correctly
- [ ] Contact form validates email properly
- [ ] Contact form sends emails (check your EmailJS dashboard)
- [ ] Website is responsive on mobile
- [ ] All animations work smoothly
- [ ] No console errors

---

## 🆘 Troubleshooting

### Contact Form Not Sending Emails
1. Check browser console for errors
2. Verify EmailJS configuration in `src/config/emailjs.config.ts`
3. Check EmailJS dashboard for usage limits
4. Ensure email service is properly connected

### Resume Button Not Working
1. Check if the link is publicly accessible
2. Test the link in incognito/private mode
3. Ensure the link doesn't require authentication

### Social Links Not Working
1. Verify URLs are correct
2. Check for typos in usernames
3. Ensure links start with `https://`

---

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Review the configuration files
3. Test in different browsers
4. Clear cache and reload

---

**Happy Coding! 🚀**
