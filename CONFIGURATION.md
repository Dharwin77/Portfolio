# Quick Configuration Refere

All the places you need to update with your personal information:

## 📧 Email Configuration
**File:** `src/config/emailjs.config.ts`
```typescript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',      // Replace with your EmailJS Public Key
  SERVICE_ID: 'YOUR_SERVICE_ID_HERE',      // Replace with your EmailJS Service ID
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID_HERE',    // Replace with your EmailJS Template ID
};
```

## 🔗 Social Links (2 places to update)

### 1. Home Section
**File:** `src/components/sections/HomeSection.tsx`
```typescript
const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',           // Line ~8
  linkedin: 'https://linkedin.com/in/yourusername',    // Line ~9
  leetcode: 'https://leetcode.com/yourusername',       // Line ~10
  instagram: 'https://instagram.com/yourusername',     // Line ~11
};
```

### 2. Contact Section
**File:** `src/components/sections/ContactSection.tsx`
```typescript
const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',           // Line ~10
  linkedin: 'https://linkedin.com/in/yourusername',    // Line ~11
  leetcode: 'https://leetcode.com/yourusername',       // Line ~12
  instagram: 'https://instagram.com/yourusername',     // Line ~13
};
```

## 📄 Resume Link
**File:** `src/components/Navbar.tsx`
```typescript
const RESUME_LINK = 'https://drive.google.com/file/d/YOUR_RESUME_ID/view';  // Line ~15
```

## 👤 Personal Information
**File:** `src/components/sections/HomeSection.tsx`

### Name (Line ~52)
```typescript
const name = "DHARWIN";  // Change to your name
```

### Professional Title (Line ~135-137)
```typescript
<p className="font-orbitron text-xl md:text-2xl text-cosmic-cyan tracking-wide">
  Software Developer | AI & Full-Stack Enthusiast  // Change to your title
</p>
```

### Introduction (Line ~144-148)
```typescript
<motion.p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
  Passionate about crafting innovative solutions...  // Change to your intro
</motion.p>
```

---

## 🚀 Start Development Server
```bash
npm run dev
```

## 🏗️ Build for Production
```bash
npm run build
```

## 📦 Preview Production Build
```bash
npm run preview
```

---

## ⚠️ Important Notes

1. **EmailJS is required** for the contact form to work
2. Update **both** HomeSection.tsx and ContactSection.tsx for social links
3. Make sure your resume link is **publicly accessible**
4. Test all links before deploying

---

## 🎨 Color Customization (Optional)
**File:** `src/index.css` (Lines 12-50)
- Modify CSS custom properties to change the color scheme
- Main colors: `--cosmic-purple`, `--cosmic-cyan`, `--cosmic-blue`
