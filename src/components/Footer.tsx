import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Phone, ArrowUp, ExternalLink } from 'lucide-react';

export const Footer = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
      setTheme(currentTheme);
    };
    window.addEventListener('theme-changed', handleThemeChange);
    return () => window.removeEventListener('theme-changed', handleThemeChange);
  }, []);

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/Dharwin77' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/dharwin-s/' },
    { name: 'Instagram', icon: () => (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.558.217.957.477 1.377.896.419.42.679.819.896 1.377.163.422.358 1.057.412 2.227.059 1.265.071 1.646.071 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.217.558-.477.957-.896 1.377-.42.419-.819.679-1.377.896-.422.163-1.057.358-2.227.412-1.265.059-1.646.071-4.85.071s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.558-.217-.957-.477-1.377-.896-.419-.42-.679-.819-.896-1.377-.163-.422-.358-1.057-.412-2.227-.059-1.265-.071-1.646-.071-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.217-.558.477-.957.896-1.377.42-.419.819-.679 1.377-.896.422-.163 1.057-.358 2.227-.412 1.265-.059 1.646-.071 4.85-.071zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.148.258-2.911.554-.789.306-1.459.715-2.126 1.383-.668.667-1.077 1.337-1.383 2.126-.298.763-.499 1.634-.556 2.911-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.057 1.277.258 2.148.556 2.911.306.789.715 1.459 1.383 2.126.667.668 1.337 1.077 2.126 1.383.763.298 1.634.499 2.911.556 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.057 2.148-.258 2.911-.554.789-.306 1.459-.715 2.126-1.383.668-.667 1.077-1.337 1.383-2.126.298-.763.499-1.634.556-2.911.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.057-1.277-.258-2.148-.556-2.911-.306-.789-.715-1.459-1.383-2.126-.667-.668-1.337-1.077-2.126-1.383-.763-.298-1.634-.499-2.911-.556-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ), url: 'https://www.instagram.com/s.dharwin_24' }
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' }
  ];

  const resources = [
    { label: 'GitHub Repository', href: 'https://github.com/Dharwin77/Portfolio', external: true },
    { label: 'Healix System', href: 'https://healix-doctor-appointment-system-t3.vercel.app/', external: true },
    { label: 'Supermarket POS', href: 'https://super-market-frontend-five.vercel.app', external: true },
    { label: 'House 3D Platform', href: 'https://house-design-platform.vercel.app', external: true }
  ];

  // ── Theme-based palette ──────────────────────────────────────────
  const isLight = theme === 'light';

  // Light mode: bright cosmic cyan (site brand color)
  const footerBg = isLight
    ? 'linear-gradient(135deg, #00c8c8 0%, #06B6D4 50%, #00a8c8 100%)'
    : 'linear-gradient(135deg, #020817 0%, #0a0e2a 40%, #060d1e 100%)';

  const topGlow = isLight
    ? 'rgba(255,255,255,0.30)'
    : 'rgba(6,182,212,0.12)';

  const bottomGlow = isLight
    ? 'rgba(0,180,200,0.40)'
    : 'rgba(99,102,241,0.08)';

  const dividerColor = isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.06)';

  const headingColor    = isLight ? '#ffffff' : '#38bdf8';
  const bodyText        = isLight ? 'rgba(255,255,255,0.90)' : 'rgba(148,163,184,0.85)';
  const mutedText       = isLight ? 'rgba(255,255,255,0.70)' : 'rgba(100,116,139,0.8)';
  const accentCyan      = isLight ? '#ffffff' : '#22d3ee';
  const accentHighlight = isLight ? '#ffffff' : '#67e8f9';

  const iconBg     = isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.04)';
  const iconBorder = isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.08)';

  const dotBg       = isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.08)';
  const bottomBarBg = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.03)';
  const bottomBarBorder = isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.05)';

  return (
    <motion.footer
      id="footer"
      className="relative pt-16 pb-8 px-6 overflow-hidden z-20"
      style={{ background: footerBg }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Decorative glows */}
      <div
        className="absolute top-0 left-1/4 w-[350px] h-[120px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: topGlow }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[280px] h-[160px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: bottomGlow }}
      />

      {/* Top border shimmer */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${accentCyan}50, transparent)` }}
      />

      <div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12"
        style={{ borderBottom: `1px solid ${dividerColor}` }}
      >
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <span
              className="font-orbitron font-extrabold text-lg tracking-wider uppercase"
              style={{ color: accentHighlight }}
            >
              Dharwin S
            </span>
          </div>
          <p className="text-xs md:text-sm leading-relaxed font-medium max-w-sm" style={{ color: bodyText }}>
            Professional Full-Stack Developer &amp; ML Engineer. Crafting highly optimized, secure web architectures and intelligent computer vision applications.
          </p>
          <div className="flex gap-3 pt-2">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg"
                  style={{
                    background: iconBg,
                    border: `1px solid ${iconBorder}`,
                    color: bodyText
                  }}
                  whileHover={{ scale: 1.12, y: -2, color: accentCyan, borderColor: `${accentCyan}40` }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-2 space-y-3.5">
          <h4
            className="font-orbitron font-bold text-xs uppercase tracking-widest"
            style={{ color: headingColor }}
          >
            Explore
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs flex items-center gap-1.5 group transition-colors duration-200"
                  style={{ color: mutedText }}
                  onMouseEnter={e => (e.currentTarget.style.color = accentHighlight)}
                  onMouseLeave={e => (e.currentTarget.style.color = mutedText)}
                >
                  <span
                    className="w-1 h-1 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200"
                    style={{ background: accentCyan }}
                  />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Work Column */}
        <div className="md:col-span-2 space-y-3.5">
          <h4
            className="font-orbitron font-bold text-xs uppercase tracking-widest"
            style={{ color: headingColor }}
          >
            Featured
          </h4>
          <ul className="space-y-2">
            {resources.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs flex items-center gap-1 group transition-colors duration-200"
                  style={{ color: mutedText }}
                  onMouseEnter={e => (e.currentTarget.style.color = accentHighlight)}
                  onMouseLeave={e => (e.currentTarget.style.color = mutedText)}
                >
                  <span>{link.label}</span>
                  {link.external && (
                    <ExternalLink
                      className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Availability Column */}
        <div className="md:col-span-3 space-y-4">
          <h4
            className="font-orbitron font-bold text-xs uppercase tracking-widest"
            style={{ color: headingColor }}
          >
            Availability
          </h4>

          <div
            className="flex items-center gap-2.5 py-2 px-3.5 rounded-2xl w-fit"
            style={{
              background: isLight ? 'rgba(0,0,0,0.20)' : 'rgba(16,185,129,0.08)',
              border: isLight ? '1px solid rgba(0,0,0,0.25)' : '1px solid rgba(16,185,129,0.18)'
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLight ? 'bg-white' : 'bg-emerald-400'}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isLight ? 'bg-white' : 'bg-emerald-500'}`} />
            </span>
            <span
              className="text-[10px] font-orbitron font-bold uppercase tracking-widest"
              style={{ color: isLight ? '#ffffff' : '#34d399' }}
            >
              Open to Opportunities
            </span>
          </div>

          <div className="space-y-2 text-xs font-medium pt-1" style={{ color: bodyText }}>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accentCyan }} />
              <a
                href="mailto:dharwinsangamani@gmail.com"
                style={{ color: bodyText }}
                onMouseEnter={e => (e.currentTarget.style.color = accentHighlight)}
                onMouseLeave={e => (e.currentTarget.style.color = bodyText)}
                className="transition-colors duration-200"
              >
                dharwinsangamani@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accentCyan }} />
              <span>+91 8072126400</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accentCyan }} />
              <span>TamilNadu, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
          <span className="font-orbitron text-xs" style={{ color: mutedText }}>
            © {new Date().getFullYear()}
          </span>
          <span className="font-orbitron text-xs font-bold tracking-wider" style={{ color: accentHighlight }}>
            DHARWIN S
          </span>
          <span style={{ color: dividerColor }} className="hidden sm:inline">|</span>
          <span className="text-[10px] sm:text-xs" style={{ color: mutedText }}>
            All rights reserved. Crafted in the cosmos.
          </span>
        </div>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-orbitron text-xs flex items-center gap-1.5 py-1.5 px-3.5 rounded-full transition-all duration-300"
          style={{
            color: mutedText,
            background: bottomBarBg,
            border: `1px solid ${bottomBarBorder}`
          }}
          whileHover={{
            y: -3,
            color: accentHighlight,
            borderColor: `${accentCyan}40`
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </motion.footer>
  );
};
