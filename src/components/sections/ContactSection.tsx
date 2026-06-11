import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Code2, Instagram, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/config/emailjs.config';

// Configuration: Update these links with your actual profile URLs
const SOCIAL_LINKS = {
  github: 'https://github.com/Dharwin77',
  linkedin: 'https://www.linkedin.com/in/dharwin-s/',
  leetcode: 'https://leetcode.com/u/dharwins/',
  instagram: 'https://www.instagram.com/s.dharwin_24?igsh=cXJyeDlveGwzZDd3',
};

const socialLinks = [
  { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
  { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
  { icon: Code2, href: SOCIAL_LINKS.leetcode, label: 'LeetCode' },
  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  const [showRocketGlow, setShowRocketGlow] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [confettiCount, setConfettiCount] = useState(80);

  // Adjust confetti count based on screen size
  useEffect(() => {
    const updateConfettiCount = () => {
      if (window.innerWidth < 768) {
        setConfettiCount(40); // Mobile: fewer particles
      } else if (window.innerWidth < 1024) {
        setConfettiCount(60); // Tablet
      } else {
        setConfettiCount(80); // Desktop
      }
    };
    updateConfettiCount();
    window.addEventListener('resize', updateConfettiCount);
    return () => window.removeEventListener('resize', updateConfettiCount);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [emailError, setEmailError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  // Email validation regex
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, email });

    if (email === '') {
      setEmailError('');
      setIsEmailValid(false);
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      setIsEmailValid(false);
    } else {
      setEmailError('');
      setIsEmailValid(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    if (!isEmailValid) {
      toast.error(emailError || 'Please enter a valid email address');
      return;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return;
    }

    setIsSubmitting(true);
    setShowRocket(true);

    // Delay email sending to show rocket animation
    setTimeout(async () => {
      try {
        // Prepare template parameters
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        };

        console.log('Sending email with params:', templateParams);
        console.log('Using Service ID:', EMAILJS_CONFIG.SERVICE_ID);
        console.log('Using Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);

        // Send email using EmailJS send method
        const result = await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        );

        console.log('✅ EmailJS Success:', result);

        // Elegant animation sequence
        // Phase 1: Rocket launch (1.2s)
        setTimeout(() => {
          // Phase 2: Micro-pause with intense glow (100ms)
          setShowRocketGlow(true);

          setTimeout(() => {
            // Phase 3: Party paper explosion
            setShowRocket(false);
            setShowRocketGlow(false);
            setShowBurst(true);


            // Show success message modal
            setTimeout(() => {
              setShowSuccessMessage(true);

              // Hide after 4 seconds
              setTimeout(() => {
                setShowSuccessMessage(false);
              }, 4000);
            }, 800);
          }, 100);
        }, 1200);

        // Reset form
        setFormData({ name: '', email: '', message: '' });
        setEmailError('');
        setIsEmailValid(false);

      } catch (error: any) {
        console.error('❌ EmailJS Error:', error);
        console.error('Error text:', error?.text);
        console.error('Error status:', error?.status);

        // More specific error messages
        let errorDescription = 'Please try again.';

        if (error?.status === 400) {
          errorDescription = 'Invalid email configuration. Please check your EmailJS settings.';
        } else if (error?.status === 412) {
          errorDescription = 'EmailJS service limit reached. Please check your EmailJS account.';
        } else if (error?.text?.includes('reCAPTCHA')) {
          errorDescription = 'Please verify you are not a robot.';
        }

        toast.error('Failed to send message', {
          description: errorDescription,
        });

        setShowRocket(false);
        setShowRocketGlow(false);
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setShowBurst(false), 3500); // Extended for full confetti fall
      }
    }, 300);
  };

  return (
    <section id="contact" className="section-container relative overflow-hidden translate-z-0" ref={ref}>
      {/* Elegant Rocket Launch Animation */}
      {showRocket && (
        <motion.div
          className="absolute left-1/2 bottom-12 sm:bottom-16 md:bottom-20 -translate-x-1/2 pointer-events-none z-50"
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{
            y: -window.innerHeight * 0.75,
            opacity: 1,
            scale: showRocketGlow ? 1.3 : [1, 1.08, 1.05]
          }}
          transition={{
            duration: 1.2,
            ease: [0.34, 1.56, 0.64, 1], // Smooth acceleration curve
          }}
        >
          {/* Rocket Body */}
          <div className="relative">
            <span
              className="text-3xl sm:text-4xl block transition-all duration-100"
              style={{
                transform: 'rotate(-45deg)',
                filter: showRocketGlow ? 'drop-shadow(0 0 20px #5EEADC) drop-shadow(0 0 40px #FFD700)' : 'drop-shadow(0 0 8px #5EEADC)',
              }}
            >
              🚀
            </span>

            {/* Soft Gradient Flame Trail */}
            <motion.div
              className="absolute top-8 left-1/2 -translate-x-1/2 w-6 h-16"
              initial={{ opacity: 0.7 }}
              animate={{
                opacity: showRocketGlow ? 1 : [0.7, 0.95, 0.7],
                scaleY: showRocketGlow ? 1.5 : [1, 1.25, 1],
                scaleX: showRocketGlow ? 1.3 : 1,
              }}
              transition={{ duration: 0.25, repeat: showRocketGlow ? 0 : Infinity }}
              style={{
                background: 'linear-gradient(to bottom, rgba(94, 234, 220, 0.9), rgba(255, 215, 0, 0.7), rgba(96, 165, 250, 0.4), transparent)',
                filter: 'blur(6px)',
                borderRadius: '50%',
              }}
            />

            {/* Glow bloom during micro-pause */}
            {showRocketGlow && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.8, 1], scale: [0.5, 1.2, 1] }}
                transition={{ duration: 0.1 }}
                style={{
                  background: 'radial-gradient(circle, rgba(94, 234, 220, 0.6), rgba(255, 215, 0, 0.4), transparent)',
                  filter: 'blur(20px)',
                }}
              />
            )}
          </div>
        </motion.div>
      )}

      {/* Premium Party Paper Confetti Celebration */}
      {showBurst && (
        <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
          {/* Initial burst flash */}
          <motion.div
            className="absolute left-1/2 top-20 -translate-x-1/2 w-40 h-40 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0, 2, 0] }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
               background: 'radial-gradient(circle, rgba(94, 234, 220, 0.8), rgba(255, 215, 0, 0.6), rgba(96, 165, 250, 0.3), transparent)',
              filter: 'blur(30px)',
            }}
          />

          {/* Full-width party paper confetti */}
          {[...Array(confettiCount)].map((_, i) => {
            // Premium color palette
            const colors = [
              { bg: '#FFD700', glow: 'rgba(255, 215, 0, 0.6)' }, // Electric Gold
              { bg: '#5EEADC', glow: 'rgba(94, 234, 220, 0.6)' },  // Cyan blue
              { bg: '#2DD4BF', glow: 'rgba(45, 212, 191, 0.6)' },  // Teal
              { bg: '#FCD34D', glow: 'rgba(252, 211, 77, 0.5)' },  // Soft gold
              { bg: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.7)' }, // White shimmer
              { bg: '#60A5FA', glow: 'rgba(96, 165, 250, 0.6)' },  // Sky blue
            ];
            const colorSet = colors[Math.floor(Math.random() * colors.length)];

            // Shape variations
            const shapes = ['ribbon', 'strip', 'streamer', 'flake'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];

            // Full-width distribution
            const startX = Math.random() * 100; // 0-100% width
            const endX = startX + (Math.random() - 0.5) * 30; // Gentle horizontal drift

            // Vertical motion with realistic gravity
            const fallDistance = 100 + Math.random() * 50; // Distance to fall
            const fallDuration = 2.5 + Math.random() * 1; // 2.5-3.5s

            // Rotation for paper effect
            const rotationAmount = (Math.random() - 0.5) * 720; // Multiple rotations
            const rotationDuration = 2 + Math.random() * 1.5;

            // Depth layering (foreground/background)
            const depth = Math.random();
            const zIndex = depth > 0.5 ? 42 : 41;
            const opacity = 0.7 + depth * 0.3; // 0.7-1.0
            const blur = depth < 0.3 ? 1 : 0; // Background blur

            // Shape dimensions
            let width, height, borderRadius;
            if (shape === 'ribbon') {
              width = 3 + Math.random() * 2; // 3-5px
              height = 16 + Math.random() * 12; // 16-28px
              borderRadius = '6px';
            } else if (shape === 'strip') {
              width = 6 + Math.random() * 4; // 6-10px
              height = 12 + Math.random() * 8; // 12-20px
              borderRadius = '2px';
            } else if (shape === 'streamer') {
              width = 2 + Math.random() * 1; // 2-3px
              height = 20 + Math.random() * 15; // 20-35px
              borderRadius = '8px';
            } else { // flake
              width = 8 + Math.random() * 4; // 8-12px
              height = 8 + Math.random() * 4; // 8-12px
              borderRadius = '50%';
            }

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${startX}%`,
                  top: '80px',
                  width: `${width}px`,
                  height: `${height}px`,
                  backgroundColor: colorSet.bg,
                  borderRadius,
                  boxShadow: `0 0 ${8 + depth * 8}px ${colorSet.glow}`,
                  filter: blur > 0 ? `blur(${blur}px)` : 'none',
                  zIndex,
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  rotate: 0,
                  scale: 0.3,
                }}
                animate={{
                  x: `${(endX - startX) * 10}px`, // Gentle drift
                  y: `${fallDistance}vh`,
                  opacity: [0, opacity, opacity, 0],
                  rotate: rotationAmount,
                  scale: [0.3, 1, 1, 0.8],
                }}
                transition={{
                  x: { duration: fallDuration, ease: [0.25, 0.46, 0.45, 0.94] },
                  y: { duration: fallDuration, ease: [0.33, 1, 0.68, 1] }, // Gravity curve
                  opacity: { duration: fallDuration, times: [0, 0.1, 0.8, 1] },
                  rotate: { duration: rotationDuration, ease: 'linear' },
                  scale: { duration: fallDuration, times: [0, 0.2, 0.8, 1] },
                }}
              />
            );
          })}

          {/* Premium shimmer particles (foreground) */}
          {[...Array(Math.floor(confettiCount / 4))].map((_, i) => {
            const startX = Math.random() * 100;
            const endX = startX + (Math.random() - 0.5) * 20;
            const fallDuration = 2 + Math.random() * 1;

            return (
              <motion.div
                key={`shimmer-${i}`}
                className="absolute w-2 h-2 rounded-full bg-white"
                style={{
                  left: `${startX}%`,
                  top: '80px',
                  boxShadow: '0 0 12px rgba(255, 255, 255, 0.9), 0 0 24px rgba(94, 234, 220, 0.5)',
                  zIndex: 43,
                }}
                initial={{ y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: `${(endX - startX) * 10}px`,
                  y: `${80 + Math.random() * 40}vh`,
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.2, 1, 0.5],
                }}
                transition={{
                  duration: fallDuration,
                  ease: [0.33, 1, 0.68, 1],
                  opacity: { times: [0, 0.15, 0.75, 1] },
                }}
              />
            );
          })}
        </div>
      )}

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-cosmic-cyan">
            Contact Me
          </h2>
          <p className="text-muted-foreground text-sm">
            Let's connect and discuss opportunities
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-4 sm:p-6 md:p-8 h-full">
              <h3 className="font-orbitron text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
                Contact Details
              </h3>

              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                <motion.div
                  className="flex items-center gap-3 sm:gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cosmic-purple/20 flex items-center justify-center">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-cosmic-cyan" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground text-sm sm:text-base break-all">dharwinsangamani@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 sm:gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cosmic-purple/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-cosmic-cyan" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground text-sm sm:text-base">TamilNadu, India</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 sm:gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cosmic-purple/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-cosmic-cyan" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                    <p className="text-foreground text-sm sm:text-base">+91 8072126400</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Connect on Social</p>
                <div className="flex gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/40 border border-border/10 flex items-center justify-center text-muted-foreground hover:text-cosmic-cyan hover:border-cosmic-cyan/50 transition-all"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <social.icon size={18} className="sm:w-5 sm:h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-4 sm:p-6 md:p-8">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-orbitron text-muted-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-cosmic-cyan focus:outline-none focus:ring-1 focus:ring-cosmic-cyan/50 text-foreground placeholder:text-muted-foreground transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-orbitron text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="from_email"
                    required
                    value={formData.email}
                    onChange={handleEmailChange}
                    className={`w-full px-4 py-3 rounded-lg bg-background/50 border transition-colors ${emailError
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                      : 'border-border focus:border-cosmic-cyan focus:ring-cosmic-cyan/50'
                      } focus:outline-none focus:ring-1 text-foreground placeholder:text-muted-foreground`}
                    placeholder="your.email@example.com"
                  />
                  {emailError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                      <span>⚠</span> {emailError}
                    </motion.p>
                  )}
                  {isEmailValid && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-cosmic-cyan text-sm mt-2 flex items-center gap-1"
                    >
                      <span>✓</span> Valid email address
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-orbitron text-muted-foreground mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-cosmic-cyan focus:outline-none focus:ring-1 focus:ring-cosmic-cyan/50 text-foreground placeholder:text-muted-foreground transition-colors resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 font-orbitron text-xs sm:text-sm font-semibold tracking-wider uppercase bg-cosmic-cyan text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(103,232,249,0.6)] flex items-center justify-center gap-2 py-2.5 px-5 sm:py-3 sm:px-6 rounded-full transition-all duration-300 whitespace-nowrap"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>

                <motion.a
                  href="https://calendly.com/dharwinsangamani/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 font-orbitron text-xs sm:text-sm font-semibold tracking-wider uppercase text-cosmic-cyan bg-cosmic-cyan/10 border border-cosmic-cyan/30 hover:bg-cosmic-cyan hover:text-slate-950 hover:border-cosmic-cyan hover:shadow-[0_0_25px_rgba(94,234,212,0.5)] flex items-center justify-center gap-2 py-2.5 px-5 sm:py-3 sm:px-6 rounded-full transition-all duration-300 whitespace-nowrap"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar size={18} />
                  Schedule Meeting
                </motion.a>
              </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Message Modal */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[100] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              className="glass-card p-8 md:p-12 text-center relative z-10 max-w-md w-full border border-cosmic-cyan/30 shadow-[0_0_50px_rgba(94,234,220,0.2)]"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className="w-20 h-20 rounded-full bg-cosmic-cyan/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎉</span>
              </div>

              <h3 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-4">
                Message Sent! 🚀
              </h3>

              <p className="text-foreground/90 text-lg">
                Thank you for connecting! ✨
              </p>

              <div className="mt-8">
                <button
                  onClick={() => setShowSuccessMessage(false)}
                  className="cosmic-btn text-sm py-2 px-6"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
