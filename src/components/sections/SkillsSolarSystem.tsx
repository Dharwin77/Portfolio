import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

// Skill data structure with official icons - REAL SKILLS ONLY
const SKILLS_DATA = [
  // Inner Orbit - Core Programming & Web Skills (4 skills)
  {
    name: 'Java',
    level: 'Expert',
    orbit: 1,
    angle: 0,
    color: '#007396',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
  },
  {
    name: 'Python',
    level: 'Expert',
    orbit: 1,
    angle: 90,
    color: '#3776AB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
  },
  {
    name: 'JavaScript',
    level: 'Expert',
    orbit: 1,
    angle: 180,
    color: '#F7DF1E',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  },
  {
    name: 'React',
    level: 'Expert',
    orbit: 1,
    angle: 270,
    color: '#61DAFB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
  },

  // Middle Orbit - Backend, Database & AI Skills (9 skills)
  {
    name: 'Node.js',
    level: 'Advanced',
    orbit: 2,
    angle: 0,
    color: '#339933',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
  },
  {
    name: 'Express',
    level: 'Advanced',
    orbit: 2,
    angle: 40,
    color: '#000000',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg'
  },
  {
    name: 'MongoDB',
    level: 'Advanced',
    orbit: 2,
    angle: 80,
    color: '#47A248',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
  },
  {
    name: 'FastAPI',
    level: 'Advanced',
    orbit: 2,
    angle: 120,
    color: '#009688',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'
  },
  {
    name: 'Scikit-learn',
    level: 'Advanced',
    orbit: 2,
    angle: 160,
    color: '#F7931E',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg'
  },
  {
    name: 'NumPy',
    level: 'Advanced',
    orbit: 2,
    angle: 200,
    color: '#013243',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg'
  },
  {
    name: 'Pandas',
    level: 'Advanced',
    orbit: 2,
    angle: 240,
    color: '#150458',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg'
  },
  {
    name: 'TensorFlow',
    level: 'Intermediate',
    orbit: 2,
    angle: 280,
    color: '#FF6F00',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg'
  },
  {
    name: 'OpenCV',
    level: 'Intermediate',
    orbit: 2,
    angle: 320,
    color: '#5C3EE8',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg'
  },

  // Outer Orbit - Cloud, Deployment & Tools (6 skills)
  {
    name: 'Azure',
    level: 'Intermediate',
    orbit: 3,
    angle: 0,
    color: '#0078D4',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg'
  },
  {
    name: 'Vercel',
    level: 'Advanced',
    orbit: 3,
    angle: 60,
    color: '#000000',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg'
  },
  {
    name: 'Firebase',
    level: 'Advanced',
    orbit: 3,
    angle: 120,
    color: '#FFCA28',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
  },
  {
    name: 'Supabase',
    level: 'Intermediate',
    orbit: 3,
    angle: 180,
    color: '#3ECF8E',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg'
  },
  {
    name: 'Git',
    level: 'Expert',
    orbit: 3,
    angle: 240,
    color: '#F05032',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
  },
  {
    name: 'VS Code',
    level: 'Expert',
    orbit: 3,
    angle: 300,
    color: '#007ACC',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'
  }
];

const ORBIT_RADII = {
  1: 140, // Inner orbit - Core skills
  2: 240, // Middle orbit - Secondary skills
  3: 340  // Outer orbit - Supporting skills
};

const ORBIT_SPEEDS = {
  1: 60, // seconds for full rotation
  2: 90,
  3: 120
};

export const SkillsSolarSystem = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="section-container relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold gradient-text mb-4">
            SKILLS SOLAR SYSTEM
          </h2>
          <p className="text-muted-foreground text-lg">
            My technical universe revolving around innovation
          </p>
        </motion.div>

        {/* Solar System Container */}
        <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[600px] lg:min-h-[800px] scale-[0.45] md:scale-75 lg:scale-100 origin-center -my-20 md:my-0">
          {/* Sun (Core/Center) */}
          <motion.div
            className="absolute z-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Sun glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cosmic-purple via-cosmic-blue to-cosmic-cyan blur-3xl opacity-60 animate-pulse" />

              {/* Sun core */}
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-cosmic-purple via-cosmic-blue to-cosmic-cyan flex items-center justify-center border-4 border-cosmic-cyan/30 shadow-[0_0_60px_rgba(94,234,212,0.5)]">
                <div className="text-center">
                  <div className="font-orbitron text-[10px] font-bold text-white mb-1">FULL-STACK</div>
                  <div className="font-orbitron text-lg font-black gradient-text">DEVELOPER</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Orbits */}
          {[1, 2, 3].map((orbitNum) => (
            <motion.div
              key={orbitNum}
              className="absolute"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + orbitNum * 0.1 }}
            >
              <svg
                width={ORBIT_RADII[orbitNum as keyof typeof ORBIT_RADII] * 2}
                height={ORBIT_RADII[orbitNum as keyof typeof ORBIT_RADII] * 2}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  animation: `rotateOrbit ${ORBIT_SPEEDS[orbitNum as keyof typeof ORBIT_SPEEDS]}s linear infinite`
                }}
              >
                <defs>
                  <linearGradient id={`orbitGradient${orbitNum}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(94, 234, 212, 0.3)" />
                    <stop offset="50%" stopColor="rgba(255, 215, 0, 0.3)" />
                    <stop offset="100%" stopColor="rgba(94, 234, 212, 0.3)" />
                  </linearGradient>

                  <filter id={`orbitGlow${orbitNum}`}>
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <circle
                  cx={ORBIT_RADII[orbitNum as keyof typeof ORBIT_RADII]}
                  cy={ORBIT_RADII[orbitNum as keyof typeof ORBIT_RADII]}
                  r={ORBIT_RADII[orbitNum as keyof typeof ORBIT_RADII] - (orbitNum === 1 ? 6 : orbitNum === 2 ? 5 : 4)}
                  fill="none"
                  stroke={`url(#orbitGradient${orbitNum})`}
                  strokeWidth={orbitNum === 1 ? 6 : orbitNum === 2 ? 5 : 4}
                  filter={`url(#orbitGlow${orbitNum})`}
                  opacity="0.6"
                />
              </svg>
            </motion.div>
          ))}

          {/* Skills on Orbits */}
          {SKILLS_DATA.map((skill, index) => {
            const radius = ORBIT_RADII[skill.orbit as keyof typeof ORBIT_RADII];
            const angleRad = (skill.angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;

            return (
              <motion.div
                key={skill.name}
                className="absolute z-30 cursor-pointer will-change-transform"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) translateZ(0)`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? {
                  opacity: 1,
                  scale: 1,
                  rotate: [0, 360]
                } : {}}
                transition={{
                  opacity: { duration: 0.5, delay: 0.5 + index * 0.05 },
                  scale: { duration: 0.5, delay: 0.5 + index * 0.05 },
                  rotate: {
                    duration: ORBIT_SPEEDS[skill.orbit as keyof typeof ORBIT_SPEEDS],
                    repeat: Infinity,
                    ease: 'linear'
                  }
                }}
                whileHover={{ scale: 1.3, zIndex: 50 }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                {/* Skill Icon Glow */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-60 transition-opacity duration-300"
                  style={{
                    backgroundColor: skill.color,
                    opacity: hoveredSkill === skill.name ? 0.8 : 0.4,
                    transform: 'scale(1.5)'
                  }}
                />

                {/* Skill Icon Container */}
                <div
                  className="relative w-16 h-16 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center border-2 transition-all duration-300 shadow-lg"
                  style={{
                    borderColor: hoveredSkill === skill.name ? skill.color : 'rgba(94, 234, 212, 0.3)',
                    boxShadow: hoveredSkill === skill.name
                      ? `0 0 20px ${skill.color}`
                      : '0 0 10px rgba(94, 234, 212, 0.2)'
                  }}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-10 h-10 object-contain"
                    style={{
                      filter: (skill.name === 'Express' || skill.name === 'GitHub' || skill.name === 'Vercel') ? 'invert(1)' : 'none'
                    }}
                  />
                </div>

                {/* Tooltip */}
                {hoveredSkill === skill.name && (
                  <motion.div
                    className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <div className="glass-card px-4 py-2 rounded-lg border border-cosmic-cyan/30 whitespace-nowrap">
                      <div className="font-orbitron text-sm font-bold text-cosmic-cyan">
                        {skill.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {skill.level}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-gradient-to-r from-cosmic-cyan to-cosmic-purple opacity-60" style={{ height: '6px' }} />
            <span className="text-sm text-muted-foreground font-orbitron">Inner Orbit - Core Programming & Web</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-gradient-to-r from-cosmic-cyan to-cosmic-purple opacity-60" style={{ height: '5px' }} />
            <span className="text-sm text-muted-foreground font-orbitron">Middle Orbit - Backend, Database & AI</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-gradient-to-r from-cosmic-cyan to-cosmic-purple opacity-60" style={{ height: '4px' }} />
            <span className="text-sm text-muted-foreground font-orbitron">Outer Orbit - Cloud, Deployment & Tools</span>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes rotateOrbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};
