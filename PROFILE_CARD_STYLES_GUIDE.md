# Profile Card

# 🎨 Available Profile Card Styles

Your portfolio now features **4 professional profile card designs** that you can easily switch between.

---

## 📋 Card Style Options

### 1️⃣ **Minimal Corporate Card** (`'minimal'`)
- ✅ Clean, professional design
- ✅ Perfect for recruiters
- ✅ Soft shadow with rounded corners
- ✅ Subtle hover effects
- ✅ Corporate-friendly aesthetic

**Best for:** Traditional corporate environments, formal presentations

---

### 2️⃣ **Glassmorphism Card** (`'glass'`) ⭐ **DEFAULT**
- ✅ Modern frosted glass effect
- ✅ Premium look and feel
- ✅ Background blur
- ✅ Smooth glow on hover
- ✅ Contemporary design

**Best for:** Modern portfolios, creative professionals, tech industry

---

### 3️⃣ **Neon Outline / Glow Card** (`'neon'`)
- ✅ Futuristic design
- ✅ Glowing border
- ✅ Circular profile frame
- ✅ Animated glow ring
- ✅ Eye-catching appearance

**Best for:** Creative roles, gaming industry, tech startups

---

### 4️⃣ **Floating Interactive Card** (`'floating'`)
- ✅ 3D tilt effect on hover
- ✅ Floating animation
- ✅ Depth shadow
- ✅ Shine effect
- ✅ Interactive experience

**Best for:** Interactive portfolios, UX/UI designers, developers

---

## 🔄 How to Switch Card Styles

### **Step 1:** Open the HomeSection component
File: `src/components/sections/HomeSection.tsx`

### **Step 2:** Find the configuration at the top
```typescript
// Configuration: Choose your profile card style
// Options: 'minimal', 'glass', 'neon', 'floating'
const PROFILE_CARD_STYLE = 'glass'; // Change this to switch card styles
```

### **Step 3:** Change the value to your preferred style
```typescript
const PROFILE_CARD_STYLE = 'neon'; // Now using Neon Glow Card!
```

### **Step 4:** Save and refresh your browser
The new card style will appear instantly! ✨

---

## 🖼️ Adding Your Profile Photo

Currently, the cards use a placeholder. To add your actual photo:

### **Option 1: Direct URL**
```typescript
<ProfileCardVariants.glass 
  imageUrl="https://your-image-url.com/photo.jpg" 
  alt="Your Name"
/>
```

### **Option 2: Local Image**
1. Place your photo in `public/` folder (e.g., `public/profile.jpg`)
2. Update the card:
```typescript
<ProfileCardVariants.glass 
  imageUrl="/profile.jpg" 
  alt="Your Name"
/>
```

---

## 🎯 Quick Switch Examples

```typescript
// For corporate interviews
const PROFILE_CARD_STYLE = 'minimal';

// For creative portfolios
const PROFILE_CARD_STYLE = 'glass';

// For tech startups
const PROFILE_CARD_STYLE = 'neon';

// For interactive demos
const PROFILE_CARD_STYLE = 'floating';
```

---

## 📱 Mobile Optimization

All card styles are **fully responsive** and automatically:
- ✅ Center on mobile devices
- ✅ Adjust sizing for small screens
- ✅ Disable heavy animations on mobile for performance
- ✅ Maintain professional appearance

---

## 🎨 Customizing Card Styles

Want to customize a card style? Edit `src/components/ProfileCard.tsx`

Each card variant is a separate component:
- `MinimalCorporateCard`
- `GlassmorphismCard`
- `NeonGlowCard`
- `FloatingInteractiveCard`

You can modify colors, sizes, animations, and effects!

---

## ✅ Footer Removed

The footer has been completely removed as requested:
- ✅ No footer section
- ✅ No empty space at bottom
- ✅ Page ends cleanly at Contact section
- ✅ Professional appearance

---

## 🚀 Performance Tips

1. **Keep only one card active** at a time for best performance
2. **Heavy animations** are optimized for desktop
3. **Mobile devices** get lighter animation versions
4. All cards use **Framer Motion** for smooth 60fps animations

---

**Your portfolio now has professional, swappable profile card designs! 🎉**

Choose the style that best represents your brand and easily switch between them anytime!
