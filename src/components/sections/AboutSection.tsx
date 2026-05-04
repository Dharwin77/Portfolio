import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ProfileCard from '../ProfileCard';

const stats = [
  { label: 'Projects Completed', value: '5+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Certifications', value: '4' },
  { label: 'Languages', value: '3' },
];

// Configuration: Add your profile photo
const PROFILE_PHOTO_URL = '/profile.jpg';

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

  return (
    <section id="about" className="section-container" ref={ref}>
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
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
        <div className="flex justify-end">
          <motion.div
            className="w-full lg:w-3/5 xl:w-1/2"
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
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
