import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, FileText, Home, User, Code, FolderKanban, Award, Briefcase, Mail, Sun, Moon } from 'lucide-react';
import LottieLogo from './LottieLogo';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Skills', href: '#skills', icon: Code },
  { name: 'Projects', href: '#projects', icon: FolderKanban },
  { name: 'Certifications', href: '#certifications', icon: Award },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const RESUME_LINK = 'https://drive.google.com/file/d/1jbN_sofgm6omlt9ITIYxjzcQIE9iMiuw/view?usp=sharing';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [blinkingItem, setBlinkingItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    
    const setupObserver = () => {
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        observer = new IntersectionObserver(
          ([entry]) => {
            setIsFooterVisible(entry.isIntersecting);
          },
          {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: 0.05,
          }
        );
        observer.observe(footerElement);
      }
    };

    setupObserver();

    let retryCount = 0;
    const retryInterval = setInterval(() => {
      if (observer) {
        clearInterval(retryInterval);
        return;
      }
      setupObserver();
      retryCount++;
      if (retryCount > 10) {
        clearInterval(retryInterval);
      }
    }, 200);

    return () => {
      clearInterval(retryInterval);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 100;
          setIsScrolled(scrolled);
          const sections = navItems.map(item => item.href.substring(1));
          const scrollPosition = window.scrollY + window.innerHeight / 2;
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                if (activeSection !== section) {
                  setActiveSection(section);
                  setBlinkingItem(section);
                  setTimeout(() => setBlinkingItem(null), 500);
                }
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    e.preventDefault();
    const sectionId = href.substring(1);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
      setBlinkingItem(sectionId);
      setActiveSection(sectionId);
      setTimeout(() => setBlinkingItem(null), 500);
    }
    setIsOpen(false);
  };

  const handleResumeClick = () => {
    window.open(RESUME_LINK, '_blank');
  };

  return (
    <>
      <div className="fixed top-[39px] right-[52px] md:right-[68px] z-[100] hidden lg:block">
        <ThemeToggle className="!p-3 !rounded-xl shadow-xl backdrop-blur-md border-cosmic-cyan/20 bg-background/40" />
      </div>

      <AnimatePresence>
        {(!isScrolled || isOpen) && (
          <motion.nav
            className="fixed top-0 left-0 right-0 z-50 px-2 md:px-4 py-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-5xl mx-auto relative">
              <div className="nav-glass !overflow-visible px-6 md:px-8 py-3 flex items-center justify-between backdrop-blur-md">
                <motion.a
                  href="#home"
                  className="relative flex items-center h-12 w-12 md:h-16 md:w-16 flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  onClick={(e) => handleNavClick(e, '#home', 'Home')}
                >
                  <LottieLogo className="absolute top-1/2 left-0 -translate-y-1/2 h-16 w-16 md:h-24 md:w-24" />
                </motion.a>

                <div className="hidden lg:flex items-center gap-4 xl:gap-6">
                  {navItems.map((item, index) => {
                    const section = item.href.substring(1);
                    const isActive = activeSection === section;
                    const isBlinking = blinkingItem === section;
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href, item.name)}
                        className={`font-orbitron text-xs xl:text-sm relative group ${isActive ? 'text-cosmic-cyan' : 'text-muted-foreground hover:text-cosmic-cyan'} transition-colors whitespace-nowrap`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        {item.name}
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-cosmic-cyan transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                        <AnimatePresence>
                          {isBlinking && (
                            <motion.span
                              className="absolute inset-0 -m-2 rounded-lg bg-cosmic-cyan/20 border-2 border-cosmic-cyan pointer-events-none"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1.05, 1.05, 1] }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                          )}
                        </AnimatePresence>
                      </motion.a>
                    );
                  })}
                  <motion.button
                    onClick={handleResumeClick}
                    className="flex items-center gap-2 px-3 xl:px-4 py-2 font-orbitron text-xs xl:text-sm bg-cosmic-cyan/10 border border-cosmic-cyan/50 rounded-lg text-cosmic-cyan hover:bg-cosmic-cyan/20 hover:border-cosmic-cyan hover:shadow-[0_0_15px_rgba(94,234,212,0.3)] transition-all duration-300 whitespace-nowrap"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <FileText size={16} />
                    Resume
                  </motion.button>
                </div>

                <div className="lg:hidden flex items-center gap-3 relative z-[100]">
                  <ThemeToggle className="!p-2 text-foreground bg-transparent border-none" />
                  <button
                    className="text-foreground p-2 -mr-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                  >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>

              {/* Small Dropdown Menu for Mobile */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="lg:hidden mt-2 nav-glass overflow-hidden w-48 absolute right-0 top-full z-50 rounded-2xl border border-white/5 py-2 shadow-2xl backdrop-blur-xl"
                    initial={{ height: 0, opacity: 0, scale: 0.95 }}
                    animate={{ height: 'auto', opacity: 1, scale: 1 }}
                    exit={{ height: 0, opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col">
                      {navItems.map((item) => {
                        const section = item.href.substring(1);
                        const isActive = activeSection === section;
                        return (
                          <button
                            key={item.name}
                            onClick={(e) => {
                              handleNavClick(e as any, item.href, item.name);
                              setIsOpen(false);
                            }}
                            className={`px-6 py-3 font-orbitron text-xs text-left w-full transition-colors flex items-center gap-3 ${isActive ? 'bg-cosmic-cyan/10 text-cosmic-cyan' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'}`}
                          >
                            <item.icon size={14} className={isActive ? 'text-cosmic-cyan' : 'text-muted-foreground/50'} />
                            {item.name}
                          </button>
                        );
                      })}
                      <div className="px-3 pt-2 mt-2 border-t border-white/5">
                        <button
                          onClick={handleResumeClick}
                          className="flex items-center justify-center gap-2 w-full py-2.5 font-orbitron text-[10px] bg-cosmic-cyan/10 border border-cosmic-cyan/30 rounded-xl text-cosmic-cyan hover:bg-cosmic-cyan/20 transition-all font-bold"
                        >
                          <FileText size={14} />
                          RESUME
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isScrolled && !isFooterVisible && (
          <motion.nav
            className="hidden lg:flex fixed left-6 top-0 bottom-0 z-50 flex-col justify-center"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="nav-glass p-3 rounded-2xl flex flex-col gap-3 my-auto backdrop-blur-md">
              {navItems.map((item, index) => {
                const section = item.href.substring(1);
                const isActive = activeSection === section;
                const Icon = item.icon;
                return (
                  <motion.div key={item.name} className="relative group">
                    <motion.a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.name)}
                      className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${isActive ? 'bg-cosmic-cyan/20 text-cosmic-cyan shadow-[0_0_15px_rgba(94,234,212,0.4)]' : 'text-muted-foreground hover:bg-cosmic-cyan/10 hover:text-cosmic-cyan'}`}
                    >
                      <Icon size={20} />
                    </motion.a>
                    <div className="absolute left-full ml-4 px-4 py-2 glass-card rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-[100] shadow-[0_4px_16px_rgba(94,234,212,0.3)] border border-cosmic-cyan/20">
                      <span className="font-orbitron text-sm text-cosmic-cyan font-semibold">{item.name}</span>
                    </div>
                  </motion.div>
                );
              })}
              <div className="pt-2 mt-2 border-t border-border/30">
                <button onClick={handleResumeClick} className="flex items-center justify-center w-12 h-12 rounded-xl bg-cosmic-cyan/10 text-cosmic-cyan hover:bg-cosmic-cyan/20 transition-all shadow-sm">
                  <FileText size={20} />
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isScrolled && isMobile && !isOpen && (
          <motion.div
            className="lg:hidden fixed top-6 right-6 z-[100] flex flex-col gap-3"
            initial={{ scale: 0, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -20 }}
          >
            <ThemeToggle className="!p-3 !rounded-xl shadow-xl backdrop-blur-md border-cosmic-cyan/20 bg-background/40" />
            <motion.button
              className="w-12 h-12 flex items-center justify-center rounded-xl nav-glass text-cosmic-cyan shadow-xl border border-cosmic-cyan/30"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1 }}
            >
              <Menu size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
