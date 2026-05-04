import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState } from 'react';

const ThemeToggleLamp = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (document.documentElement.classList.contains('light') ? 'light' : 'dark');
    }
    return 'dark';
  });

  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  
  // Stretch the string as we pull
  const stringHeight = useTransform(springY, [0, 100], [40, 140]);
  
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  const handleDragEnd = (_, info) => {
    // If pulled down far enough, toggle theme
    if (info.offset.y > 100) {
      toggleTheme();
    }
  };

  return (
    <div className="fixed top-0 right-[5%] z-[100] hidden lg:flex flex-col items-center">
      {/* The String */}
      <motion.div 
        style={{ height: stringHeight }}
        className="w-[2px] bg-gradient-to-b from-zinc-700 via-cosmic-cyan to-amber-400"
      />
      
      {/* The Lamp Handle/Bulb */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.8 }}
        onDragEnd={handleDragEnd}
        style={{ y }}
        whileDrag={{ cursor: 'grabbing' }}
        className="cursor-pointer flex flex-col items-center group relative pointer-events-auto"
      >
        {/* Bulb Base */}
        <div className="w-4 h-2 bg-zinc-800 rounded-t-sm border-x border-zinc-700" />
        
        {/* The Bulb */}
        <div 
          className={`w-8 h-10 rounded-full flex flex-col items-center justify-center transition-all duration-300 relative ${
            theme === 'dark' 
            ? 'bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] border-amber-300/50' 
            : 'bg-zinc-200 shadow-inner border-zinc-400'
          } border-[3px]`}
        >
          {/* Inner Filament */}
          <div className={`w-0.5 h-4 rounded-full ${theme === 'dark' ? 'bg-amber-100' : 'bg-zinc-400'} opacity-50`} />
          
          {/* Subtle Label */}
          <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-orbitron text-amber-500 uppercase tracking-widest whitespace-nowrap bg-background/80 px-2 py-1 rounded backdrop-blur-sm border border-border/50 shadow-xl">
            Pull to {theme === 'dark' ? 'Light' : 'Dark'}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ThemeToggleLamp;
