import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Establishing connection...');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const statuses = [
      'Gathering core experiences...',
      'Visualizing the destination...',
      'Let the journey begin'
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 8 + 2;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setStatus(statuses[statuses.length - 1]);
        setIsLoaded(true);
        // Automatically transition after a brief pause when fully loaded
        setTimeout(() => {
          onComplete();
        }, 1200);
      } else {
        const statusIndex = Math.floor((currentProgress / 100) * (statuses.length - 1));
        setStatus(statuses[statusIndex]);
      }
      setProgress(currentProgress);
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030305] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Deep Cosmic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_100%)]" />
      
      {/* Subtle Starfield Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(1px 1px at 20px 30px, white, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 40px 70px, white, rgba(0,0,0,0)),
                          radial-gradient(1.5px 1.5px at 150px 150px, white, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 300px 200px, white, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 500px 300px, white, rgba(0,0,0,0))`,
          backgroundSize: '550px 550px',
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-cosmic-purple/5 to-transparent pointer-events-none" />


      {/* Welcome Layout */}
      <div className="relative flex flex-col items-center justify-center z-10 w-full px-4 gap-4 sm:gap-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-2"
        >
          <img 
            src="/favicon.ico" 
            alt="Logo" 
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
          />
        </motion.div>

        {/* Welcome Text */}
        <motion.h1 
          className="text-xl sm:text-2xl md:text-3xl font-orbitron font-bold text-center tracking-[0.1em]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <span className="text-white">Welcome to </span>
          <span className="text-cosmic-cyan">My Journey</span>
        </motion.h1>

        {/* Enhanced Energy Filling Bar */}
        <div className="flex flex-col items-center gap-4 mt-2">
          <div className="w-48 sm:w-64 md:w-80 h-[1px] bg-white/10 relative">
            {/* The Filled Progress */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cosmic-purple via-cosmic-blue to-cosmic-cyan"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            >
              {/* Traveling Light Head (The 'different' behavior) */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="w-8 h-8 bg-cosmic-cyan/30 blur-xl rounded-full" />
                <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_6px_rgba(0,255,255,0.6)]" />
              </div>
            </motion.div>
          </div>

          {/* Status Text Wrapper */}
          <div className="h-4 overflow-hidden flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={status}
                className="font-orbitron font-medium text-[10px] sm:text-[11px] tracking-[0.4em] text-white/40 uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {status}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>


      {/* Flash Effect on Complete */}
      {isLoaded && (
        <motion.div 
          className="absolute inset-0 bg-cosmic-cyan z-50 mix-blend-overlay pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ delay: 0.2, duration: 0.8 }}
        />
      )}
    </motion.div>
  );
};
