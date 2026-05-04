import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

// Real skills data structure - Icons only
interface Skill {
  name: string;
  icon: string;
  color: string;
  invert?: boolean;
}

const SKILLS_DATA: Record<string, Skill[]> = {
  programming: [
    {
      name: 'Java',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      color: '#007396'
    },
    {
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      color: '#3776AB'
    }
  ],
  frontend: [
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: '#61DAFB'
    },
    {
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      color: '#F7DF1E'
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      color: '#3178C6'
    },
    {
      name: 'Tailwind CSS',
      icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
      color: '#06B6D4'
    },
    {
      name: 'HTML5',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      color: '#E34F26'
    },
    {
      name: 'CSS3',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      color: '#1572B6'
    },
    {
      name: 'Figma',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      color: '#F24E1E'
    }
  ],
  backend: [
    {
      name: 'Node.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      color: '#339933'
    },
    {
      name: 'Express',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      color: '#000000',
      invert: true
    },
    {
      name: 'FastAPI',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
      color: '#009688'
    }
  ],
  databases: [
    {
      name: 'MongoDB',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      color: '#47A248'
    },
    {
      name: 'Firebase',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      color: '#FFCA28'
    },
    {
      name: 'Supabase',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
      color: '#3ECF8E'
    },
    {
      name: 'Azure',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
      color: '#0078D4'
    }
  ],
  ai: [
    {
      name: 'TensorFlow',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
      color: '#FF6F00'
    },
    {
      name: 'Scikit-learn',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
      color: '#F7931E'
    },
    {
      name: 'NumPy',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
      color: '#013243'
    },
    {
      name: 'Pandas',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
      color: '#150458'
    },
    {
      name: 'OpenCV',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg',
      color: '#5C3EE8'
    }
  ],
  tools: [
    {
      name: 'Git',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      color: '#F05032'
    },
    {
      name: 'Vercel',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
      color: '#000000',
      invert: true
    },
    {
      name: 'Render',
      icon: 'https://cdn.simpleicons.org/render/46E3B7',
      color: '#46E3B7'
    }
  ]
};

// Flatten all skills for horizontal flow
const ALL_SKILLS = Object.values(SKILLS_DATA).flat();

const ModernSkills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const categoryConfig = {
    programming: { title: 'Programming Languages', icon: '👨‍💻' },
    frontend: { title: 'Frontend Development', icon: '🎨' },
    backend: { title: 'Backend Development', icon: '⚙️' },
    databases: { title: 'Databases & Cloud', icon: '☁️' },
    ai: { title: 'AI & Data Science', icon: '🤖' },
    tools: { title: 'Development Tools', icon: '🛠️' }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-container relative overflow-hidden flex items-center justify-center py-10 min-h-fit md:min-h-screen"
    >
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-orbitron font-bold mb-2 text-cosmic-cyan">
            Technical Skills
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Horizontal Scrolling Skill Flow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 overflow-hidden relative translate-z-0"
        >
          <div className="flex gap-4 animate-scroll-horizontal py-2 hover:pause-animation will-change-transform">
            {/* Duplicate for seamless loop */}
            {[...ALL_SKILLS, ...ALL_SKILLS].map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-sm border border-border/50 hover:border-cosmic-cyan/50 transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow: `0 0 15px ${skill.color}15`
                }}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className={`w-5 h-5 object-contain ${skill.invert ? 'invert-on-dark' : ''}`}
                />
                <span className="font-orbitron text-xs font-medium whitespace-nowrap">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Grouped Skill Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
          {Object.entries(SKILLS_DATA).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.1 }}
              className="group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{categoryConfig[category as keyof typeof categoryConfig].icon}</span>
                <h3 className="text-lg font-orbitron font-semibold gradient-text">
                  {categoryConfig[category as keyof typeof categoryConfig].title}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2">
                {skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="relative group/card"
                  >
                    {/* Keyboard Key Size Card */}
                    <div
                      className="relative p-2 rounded-md bg-card/80 border border-border/30 transition-all duration-300 hover:scale-105 cursor-pointer flex flex-col items-center justify-center aspect-square will-change-transform"
                      style={{
                        borderColor: hoveredSkill === skill.name ? skill.color : 'rgba(148, 163, 184, 0.2)',
                        boxShadow: hoveredSkill === skill.name
                          ? `0 2px 12px ${skill.color}30`
                          : 'none'
                      }}
                    >
                      {/* Skill Icon - Smaller */}
                      <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mb-1">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className={`w-full h-full object-contain transition-transform duration-300 group-hover/card:scale-110 ${skill.invert ? 'invert-on-dark' : ''}`}
                        />
                      </div>

                      {/* Skill Name - Tiny text */}
                      <span className="text-[8px] sm:text-[9px] font-orbitron text-center text-muted-foreground group-hover/card:text-foreground transition-colors line-clamp-1">
                        {skill.name}
                      </span>

                      {/* Hover Glow Effect */}
                      <div
                        className="absolute inset-0 rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at center, ${skill.color}08, transparent 70%)`
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-horizontal {
          animation: scroll-horizontal 15s linear infinite;
        }

        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ModernSkills;
