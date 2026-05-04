# 📧 EmailJS Setup - Step-by-Step Guide

Follow these exact steps to receive messages from your contact form.

## Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (top right)
3. Create account with your email
4. Verify your email address

---

## Step 2: Connect Your Email Service

1. **Login to EmailJS Dashboard**
2. Click **"Email Services"** in left sidebar
3. Click **"Add New Service"**
4. **Choose your email provider:**
   - Gmail (recommended)
   - Outlook
   - Yahoo
   - Or other

### For Gmail (Most Common):
1. Select **Gmail**
2. Click **"Connect Account"**
3. Sign in with your Gmail account
4. Allow EmailJS permissions
5. **IMPORTANT:** Copy your **Service ID** 
   - Example: `service_abc1234`
   - You'll need this later!

---

## Step 3: Create Email Template

1. Click **"Email Templates"** in left sidebar
2. Click **"Create New Template"**
3. **Set up template exactly like this:**

### Template Settings:

**Template Name:** `Portfolio Contact Form` (or any name you want)

**Subject:**
```
New Contact Message from {{from_name}}
```

**Content (Body):**
```
You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. Click **"Save"**
5. **IMPORTANT:** Copy your **Template ID**
   - Example: `template_xyz5678`
   - You'll need this later!

---

## Step 4: Get Your Public Key

1. Click **"Account"** in left sidebar (or your profile icon)
2. Click **"General"** tab
3. Find **"Public Key"** section
4. **IMPORTANT:** Copy your **Public Key**
   - Example: `AbCdEfGhIjKlMnO`
   - You'll need this later!

---

## Step 5: Update Your Configuration File

Now you have these 3 pieces of information:
- ✅ Service ID: `service_abc1234`
- ✅ Template ID: `template_xyz5678`
- ✅ Public Key: `AbCdEfGhIjKlMnO`

### Open this file in your editor:
**File:** `src/config/emailjs.config.ts`

### Replace the placeholder values with your real credentials:

**BEFORE:**
```typescript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',
  SERVICE_ID: 'YOUR_SERVICE_ID_HERE',
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID_HERE',
};
```

**AFTER (with your actual values):**
```typescript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'AbCdEfGhIjKlMnO',        // Your actual Public Key
  SERVICE_ID: 'service_abc1234',        // Your actual Service ID
  TEMPLATE_ID: 'template_xyz5678',      // Your actual Template ID
};
```

### Save the file!

---

## Step 6: Test Your Contact Form

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Open your website** (usually `http://localhost:5173`)

3. **Go to Contact section**

4. **Fill out the form:**
   - Enter your name
   - Enter your email
   - Write a test message: "Testing contact form"

5. **Click "Send Message"**

6. **Check your email inbox** (the one connected to EmailJS)
   - You should receive the message within seconds!

---

## ✅ Success Checklist

- [ ] Created EmailJS account
- [ ] Connected email service (Gmail/Outlook)
- [ ] Created email template with correct variables
- [ ] Copied Service ID
- [ ] Copied Template ID
- [ ] Copied Public Key
- [ ] Updated `src/config/emailjs.config.ts` with real credentials
- [ ] Saved the file
- [ ] Tested the contact form
- [ ] Received test email successfully

---

## 🔧 Troubleshooting

### Still getting "Failed to send message"?

**Check 1: Are credentials correct?**
- Double-check Service ID, Template ID, and Public Key
- No extra spaces or quotes
- Values are inside the quotes

**Check 2: Template variables match?**
Your template MUST use these exact variables:
- `{{from_name}}`
- `{{from_email}}`
- `{{message}}`

**Check 3: Email service connected?**
- Go to EmailJS Dashboard > Email Services
- Make sure your service shows "Connected"

**Check 4: Check browser console**
- Press F12 to open browser console
- Look for any error messages
- Share them if you need help

**Check 5: EmailJS free tier limits**
- Free tier: 200 emails/month
- Check if you've exceeded limit

---

## 📊 Monitor Your Emails

**EmailJS Dashboard:**
1. Login to EmailJS
2. Click **"Email Log"** to see all sent emails
3. Check if your test message appears there

---

## 🎉 Once It Works

After successful testing:
1. Your contact form is **LIVE** ✅
2. Anyone can send you messages ✅
3. Messages arrive at your email ✅
4. No backend needed ✅

---

## 💡 Important Notes

1. **Keep credentials private** - Don't share them publicly
2. **Free tier limit** - 200 emails/month (upgrade if needed)
3. **Spam protection** - EmailJS has built-in spam protection
4. **Email delivery** - Usually instant, max 1-2 minutes

---

## 🆘 Need Help?

If you're stuck:
1. Check EmailJS dashboard for errors
2. Verify template variables match exactly
3. Test with a simple message first
4. Check browser console for detailed errors

---

**You're almost there! Just update those 3 credentials and you're done! 🚀**
