import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <motion.footer
      className="relative py-8 px-4 border-t border-border/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-orbitron text-sm text-muted-foreground">
            © 2024
          </span>
          <span className="gradient-text font-orbitron font-bold">
            Dharwin S
          </span>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Crafted with ✨ in the cosmos
        </p>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-orbitron text-sm text-muted-foreground hover:text-cosmic-cyan transition-colors"
          whileHover={{ y: -2 }}
        >
          Back to Top ↑
        </motion.button>
      </div>
    </motion.footer>
  );
};
