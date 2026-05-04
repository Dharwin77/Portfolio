import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (document.documentElement.classList.contains('light') ? 'light' : 'dark');
    }
    return 'dark';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`p-2 rounded-lg bg-cosmic-cyan/10 border border-cosmic-cyan/30 text-cosmic-cyan hover:bg-cosmic-cyan/20 transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
};
