import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import ProfileCard from '../ProfileCard';

const stats = [
  { label: 'Projects Completed', value: '5+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Certifications', value: '4' },
  { label: 'Languages', value: '3' },
];

// Configuration: Profile card details
const PROFILE_CONFIG = {
  name: 'Dharwin',
  title: 'Software Developer | AI Enthusiast',
  handle: 'dharwin',
  status: 'Available for opportunities',
  contactText: 'Contact Me',
};

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [activePhoto, setActivePhoto] = useState<'profile' | 'social' | 'professional'>('profile');

  const photos = {
    profile: {
      url: '/dharwin-s-profile.jpg',
      label: 'Official',
      alt: 'Dharwin S - Official Portrait'
    },
    social: {
      url: '/dharwin-s-social.jpg',
      label: 'Social',
      alt: 'Dharwin S - Developer Persona'
    },
    professional: {
      url: '/dharwin-s-professional.jpg',
      label: 'Professional',
      alt: 'Dharwin S - Technical Portrait'
    }
  };

  return (
    <section id="about" className="section-container" ref={ref}>
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-cosmic-cyan">
            About Me
          </h2>
          <p className="text-muted-foreground text-sm">
            Where creativity meets intelligent engineering
          </p>
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Side: Profile Photo Card with Toggle */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-[340px]">
              <ProfileCard
                name={PROFILE_CONFIG.name}
                title={PROFILE_CONFIG.title}
                handle={PROFILE_CONFIG.handle}
                status={PROFILE_CONFIG.status}
                contactText={PROFILE_CONFIG.contactText}
                avatarUrl={photos[activePhoto].url}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                socialLinks={{
                  github: 'https://github.com/Dharwin77',
                  linkedin: 'https://www.linkedin.com/in/dharwin-s/',
                  instagram: 'https://www.instagram.com/s.dharwin_24',
                  leetcode: 'https://leetcode.com/u/dharwins/'
                }}
                onContactClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>
            
            {/* Photo Toggles */}
            <div className="flex gap-2 p-1.5 rounded-xl bg-card/40 border border-border/10 backdrop-blur-sm mt-2">
              {(Object.keys(photos) as Array<keyof typeof photos>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActivePhoto(key)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-orbitron transition-all duration-300 ${
                    activePhoto === key
                      ? 'bg-cosmic-cyan text-slate-950 shadow-[0_0_15px_rgba(94,234,212,0.4)] font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {photos[key].label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Text & Stats */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-4 sm:p-6 md:p-8 relative">
              <p className="text-foreground/90 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                I'm Dharwin S, an aspiring AI & Full-Stack Developer with a strong interest in building intelligent, scalable, and user-focused digital solutions. I enjoy working at the intersection of artificial intelligence, modern web development, and cloud technologies.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                Currently pursuing B.Tech in Artificial Intelligence & Data Science, I've gained hands-on experience by developing real-world projects in AI-powered platforms, full-stack applications, and data-driven systems. I focus on writing clean code, designing efficient architectures, and delivering meaningful user experiences.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                I believe in continuous learning, practical problem-solving, and innovation, and I'm always eager to explore new technologies that push the boundaries of modern software development.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-3 sm:p-4 rounded-lg bg-background/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-cosmic-cyan mb-0.5">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
