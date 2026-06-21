import { motion, AnimatePresence, Variants, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CipherText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState(text.split('').map(() => ' '));
  const chars = "!<>-_/[]{}—=+*^?#";
  
  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    
    text.split('').forEach((char, i) => {
      if (char === ' ') {
        setDisplayText(prev => {
          const next = [...prev];
          next[i] = ' ';
          return next;
        });
        return;
      }

      const startTimeout = setTimeout(() => {
        let count = 0;
        const maxCounts = 8 + Math.floor(Math.random() * 10);
        
        const interval = setInterval(() => {
          setDisplayText(prev => {
            const next = [...prev];
            next[i] = chars[Math.floor(Math.random() * chars.length)];
            return next;
          });
          count++;
          
          if (count >= maxCounts) {
            clearInterval(interval);
            setDisplayText(prev => {
              const next = [...prev];
              next[i] = text[i];
              return next;
            });
          }
        }, 40);
        
      }, delay + i * 100);
      
      timeouts.push(startTimeout);
    });

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [text, delay]);

  return (
    <motion.h1 
      aria-label="Dharwin S | Professional Full-Stack Developer & ML Engineer"
      className="font-space-grotesk text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mb-2 text-cosmic-cyan relative z-10"
    >
      <span className="sr-only">Dharwin S | Professional Full-Stack Developer & ML Engineer</span>
      <span aria-hidden="true" className="flex flex-wrap justify-center lg:justify-start gap-x-1 gap-y-2">
        {displayText.map((letter, i) => (
          <motion.span
            key={i}
            className={`inline-block ${letter === ' ' ? 'w-[0.3cm] sm:w-[0.5cm]' : ''} text-cosmic-cyan select-none`}
            whileHover={{ 
              scale: 1.2, 
              y: -5
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
};

export const HomeSection = () => {
  const roles = ["Full-Stack Developer", "ML Engineer"];
  const [roleIndex, setRoleIndex] = useState(0);
  
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  
  const spotlightBackground = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.25) 0%, transparent 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(50);
    mouseY.set(50);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="home" className="section-container relative overflow-hidden flex items-center justify-center py-10 md:py-6 min-h-fit md:min-h-screen">
      <div className="absolute inset-0 pointer-events-none" />

      <motion.div
        className="relative z-20 grid grid-cols-1 items-center max-w-7xl mx-auto px-6 md:px-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-3 text-center pt-12 sm:pt-24 lg:pt-28">
          <motion.div 
            variants={itemVariants} 
            className="flex justify-center mb-6"
          >
            <motion.div 
              className="relative w-40 h-40 sm:w-52 lg:w-60 h-auto aspect-square group cursor-none rounded-full overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: spotlightBackground }}
              />
              <motion.img
                src="/dharwin-s-profile.jpg"
                alt="Dharwin S - Professional Full-Stack Developer and ML Engineer, profile photo"
                title="Dharwin S | Full-Stack Developer & ML Engineer"
                className="w-full h-full rounded-full object-cover transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110 shadow-[0_0_50px_rgba(94,234,212,0.1)]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center mb-2">
            <CipherText text="DHARWIN S" delay={500} />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 font-orbitron text-sm sm:text-base md:text-lg lg:text-xl tracking-wide min-h-[1.5em]"
          >
            <span className="text-foreground/80 whitespace-nowrap">I&apos;m a</span>
            <div className="relative overflow-hidden h-full flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[roleIndex]}
                  initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-cosmic-cyan font-bold whitespace-nowrap"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            An AI & Data Science student passionate about building intelligent applications and full-stack web solutions. I love solving real-world problems using technology and continuously learning new tools to grow as a developer.
          </motion.p>

          <motion.div variants={itemVariants} className="flex justify-center gap-4 pt-4 mb-2">
            {[
              { icon: 'github', href: 'https://github.com/Dharwin77', color: 'text-foreground', shadow: 'hover:shadow-[0_0_20px_rgba(94,234,212,0.2)]' },
              { icon: 'linkedin', href: 'https://www.linkedin.com/in/dharwin-s/', color: 'text-[#0077b5]', shadow: 'hover:shadow-[0_0_20px_rgba(0,119,181,0.2)]' },
              { icon: 'leetcode', href: 'https://leetcode.com/u/dharwins/', color: 'text-[#ffa116]', shadow: 'hover:shadow-[0_0_200px_rgba(255,161,22,0.2)]' },
              { icon: 'instagram', href: 'https://www.instagram.com/s.dharwin_24?igsh=cXJyeDlveGwzZDd3', color: 'text-[#e4405f]', shadow: 'hover:shadow-[0_0_20px_rgba(228,64,95,0.2)]' }
            ].map((social, idx) => (
              <motion.a
                key={social.icon}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-lg social-btn-bg transition-all duration-300 ${social.color} ${social.shadow}`}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
              >
                {social.icon === 'github' && (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                )}
                {social.icon === 'linkedin' && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#0077b5" />
                    <path d="M8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="white" />
                  </svg>
                )}
                {social.icon === 'leetcode' && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 5.5L8.5 12L11.5 18.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.5 8.5L13.5 12L15.5 15.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 12H21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {social.icon === 'instagram' && <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.558.217.957.477 1.377.896.419.42.679.819.896 1.377.163.422.358 1.057.412 2.227.059 1.265.071 1.646.071 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.217.558-.477.957-.896 1.377-.42.419-.819.679-1.377.896-.422.163-1.057.358-2.227.412-1.265.059-1.646.071-4.85.071s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.558-.217-.957-.477-1.377-.896-.419-.42-.679-.819-.896-1.377-.163-.422-.358-1.057-.412-2.227-.059-1.265-.071-1.646-.071-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.217-.558.477-.957.896-1.377.42-.419.819-.679 1.377-.896.422-.163 1.057-.358 2.227-.412 1.265-.059 1.646-.071 4.85-.071zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.148.258-2.911.554-.789.306-1.459.715-2.126 1.383-.668.667-1.077 1.337-1.383 2.126-.298.763-.499 1.634-.556 2.911-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.057 1.277.258 2.148.556 2.911.306.789.715 1.459 1.383 2.126.667.668 1.337 1.077 2.126 1.383.763.298 1.634.499 2.911.556 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.057 2.148-.258 2.911-.554.789-.306 1.459-.715 2.126-1.383.668-.667 1.077-1.337 1.383-2.126.298-.763.499-1.634.556-2.911.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.057-1.277-.258-2.148-.556-2.911-.306-.789-.715-1.459-1.383-2.126-.667-.668-1.337-1.077-2.126-1.383-.763-.298-1.634-.499-2.911-.556-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>


    </section>
  );
};
