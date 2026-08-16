# Professional Portfolio Websit

A modern, interactive portfolio website built with React, TypeScript, and Framer Motion featuring smooth animations, unique navbar effects, and a fully functional contact form.

## ✨ Features

- **🎨 Unique Blink Navigation**: Interactive navbar with smooth blink animations on click and scroll
- **📄 Resume Button**: One-click access to your resume in a new tab
- **🔗 Social Integration**: GitHub, LinkedIn, LeetCode, and Instagram links with hover effects
- **📧 Contact Form**: Fully functional email form with real-time validation using EmailJS
- **🎭 Smooth Animations**: Professional animations powered by Framer Motion
- **📱 Responsive Design**: Perfect display on desktop and mobile devices
- **🌌 Cosmic Theme**: Modern, corporate-friendly design with space-themed aesthetics

## 🚀 Quick Start

### Prerequisites
- Node.js & npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

## ⚙️ Configuration

**Before deploying, you MUST configure:**

1. **EmailJS** - For contact form to work
2. **Social Links** - GitHub, LinkedIn, LeetCode, Instagram
3. **Resume Link** - Google Drive or direct link
4. **Personal Info** - Name, title, introduction

📖 **See [CONFIGURATION.md](./CONFIGURATION.md) for quick reference**
📚 **See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions**

## 📋 Configuration Checklist

- [ ] Set up EmailJS account and update `src/config/emailjs.config.ts`
- [ ] Update social links in `HomeSection.tsx` and `ContactSection.tsx`
- [ ] Add resume link in `Navbar.tsx`
- [ ] Update your name in `HomeSection.tsx`
- [ ] Update professional title and introduction
- [ ] Test contact form email delivery
- [ ] Test all social links
- [ ] Test resume button

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **EmailJS** - Contact form email delivery
- **Lucide React** - Icons
- **Shadcn/ui** - UI components

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy Options

**Vercel (Recommended)**
1. Push to GitHub
2. Import repository at [vercel.com](https://vercel.com)
3. Deploy automatically

**Netlify**
1. Push to GitHub
2. Import at [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

**GitHub Pages**
```bash
npm install --save-dev gh-pages
# Add deploy scripts to package.json
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── HomeSection.tsx        # Hero section with intro
│   │   ├── AboutSection.tsx       # About me
│   │   ├── SkillsSection.tsx      # Skills showcase
│   │   ├── ProjectsSection.tsx    # Projects portfolio
│   │   ├── CertificationsSection.tsx  # Certifications
│   │   └── ContactSection.tsx     # Contact form
│   ├── Navbar.tsx                 # Navigation with blink effect
│   └── ui/                        # Reusable UI components
├── config/
│   └── emailjs.config.ts          # EmailJS configuration
├── hooks/                         # Custom React hooks
├── lib/                           # Utility functions
└── pages/
    └── Index.tsx                  # Main page

## 🎨 Customization

### Colors
Edit `src/index.css` to modify the color scheme:
- `--cosmic-purple`: Primary purple
- `--cosmic-cyan`: Accent cyan
- `--cosmic-blue`: Secondary blue

### Animations
Adjust animation timing in component files:
- Navbar blink: 500ms (Navbar.tsx)
- Section transitions: Framer Motion variants
- Button hovers: Tailwind classes

## 🧪 Testing

Before deployment:
1. Test contact form with real EmailJS credentials
2. Verify all social links open correctly
3. Check resume button opens in new tab
4. Test responsive design on mobile
5. Verify smooth scroll between sections
6. Check all animations work properly

## ⚠️ Important Notes

1. **EmailJS Setup Required**: Contact form won't work without proper EmailJS configuration
2. **Social Links**: Update in both HomeSection and ContactSection
3. **Resume Link**: Must be publicly accessible (no authentication required)
4. **Email Validation**: Real-time validation prevents invalid submissions

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

---

**Built with ❤️ using React, TypeScript, and Framer Motion**

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
