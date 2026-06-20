import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Briefcase, MapPin, Globe, Building2, ChevronDown, ChevronUp } from 'lucide-react';

interface ProjectInExperience {
  id: number;
  name: string;
  description: string;
  liveUrl: string;
}

interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  eventName: string;
  duration: string;
  image: string;
  mainDescription: string;
  projects: ProjectInExperience[];
  skills: string[];
  color: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    role: 'Full-Stack Developer Intern',
    company: 'CopterCode',
    location: 'IITM Research Park',
    eventName: 'Chennai,Tamilnadu',
    duration: '2026 (Jan - Present)',
    image: '/621189970_17907521418336941_8373540961914571304_n.jpg',
    mainDescription: 'Led design and implementation of scalable backend services, AI-driven automation, and cloud-native integrations to streamline enterprise workflows and improve operational efficiency.',
    projects: [
      {
        id: 11,
        name: 'IT Websites',
        description: 'Built responsive, SEO-friendly IT websites with CMS integrations, performance optimizations, and accessibility best practices to improve conversion and uptime.',
        liveUrl: 'https://veldursen.com/',
      }
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'SEO tools', 'CMS (Sanity)'],
    color: '#38BDF8',
  },
];

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  
  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const activeExp = experiences[currentIndex];

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
      setTheme(currentTheme);
    };
    window.addEventListener('theme-changed', handleThemeChange);
    return () => window.removeEventListener('theme-changed', handleThemeChange);
  }, []);

  const getLightModeColor = (color: string) => {
    if (color.startsWith('#')) {
      let r = parseInt(color.substring(1, 3), 16);
      let g = parseInt(color.substring(3, 5), 16);
      let b = parseInt(color.substring(5, 7), 16);
      r = Math.floor(r * 0.55);
      g = Math.floor(g * 0.55);
      b = Math.floor(b * 0.55);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return color;
  };

  // Auto-expand first project if active experience changes
  useEffect(() => {
    if (activeExp && activeExp.projects.length > 0) {
      setActiveProjectId(activeExp.projects[0].id);
    } else {
      setActiveProjectId(null);
    }
  }, [currentIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: y * -10 }); // Subtle tilt
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section 
      id="experience" 
      className="section-container relative overflow-hidden flex flex-col items-center justify-center py-10 md:py-16 translate-z-0" 
      ref={ref}
    >
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-cosmic-cyan tracking-normal">
            Experience
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            Proven track record in high-impact technical environments
          </p>
        </motion.div>

        {/* Experience Selector Tabs (Renders only if multiple items) */}
        {experiences.length > 1 && (
          <div className="flex justify-center items-center flex-wrap gap-4 mb-8 w-full max-w-lg">
            {experiences.map((exp, idx) => (
              <button
                key={exp.id}
                onClick={() => setCurrentIndex(idx)}
                className="relative px-6 py-2.5 rounded-full font-orbitron font-bold text-xs transition-all duration-300"
              >
                {currentIndex === idx && (
                  <motion.div
                    layoutId="activeExperienceTab"
                    className="absolute inset-0 rounded-full bg-cosmic-cyan/10 border border-cosmic-cyan/30 shadow-[0_0_15px_rgba(94,234,212,0.15)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${currentIndex === idx ? 'text-cosmic-cyan' : 'text-muted-foreground hover:text-foreground'}`}>
                  {exp.company}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Active Experience Showcase */}
        <div className="w-full relative min-h-fit">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.99, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: -15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full"
            >
              {/* Left Column: Immersive 3D Workstation Preview */}
              <div className="lg:col-span-5 w-full flex justify-center">
                <div 
                  className="w-full max-w-[280px] sm:max-w-sm lg:max-w-[320px] aspect-[3/4] relative group perspective-1000 preserve-3d"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                    transition: 'transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)'
                  }}
                >
                  {/* Glowing Backdrop Sync with Brand Color */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-30 blur-2xl transition-all duration-500 group-hover:scale-105"
                    style={{ 
                      backgroundColor: activeExp.color,
                      filter: 'blur(32px)'
                    }} 
                  />

                  {/* Glass Frame Wrapper */}
                  <div 
                    className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500"
                  >
                    <img 
                      src={activeExp.image} 
                      alt={activeExp.company}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                    />

                    {/* Meta Glass Label */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 flex flex-col justify-end">
                      <div className="flex items-center gap-1.5 text-cosmic-cyan font-orbitron text-[9px] font-bold tracking-widest mb-1">
                        <MapPin size={10} style={{ color: theme === 'light' ? getLightModeColor(activeExp.color) : activeExp.color }} />
                        <span style={{ color: theme === 'light' ? getLightModeColor(activeExp.color) : activeExp.color }}>{activeExp.location}</span>
                      </div>
                      <h4 className="text-white/90 text-sm font-semibold font-orbitron capitalize tracking-wide">
                        {activeExp.eventName}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Experience Details */}
              <div className="lg:col-span-7 flex flex-col h-full justify-center">
                {/* Duration Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className="px-3 py-1 rounded-full text-[10px] font-bold font-orbitron tracking-widest uppercase"
                    style={{ 
                      borderColor: theme === 'light' ? getLightModeColor(activeExp.color) : `${activeExp.color}30`, 
                      color: theme === 'light' ? getLightModeColor(activeExp.color) : activeExp.color, 
                      backgroundColor: theme === 'light' ? `${activeExp.color}15` : `${activeExp.color}08`,
                      borderWidth: '1px'
                    }}
                  >
                    {activeExp.duration}
                  </span>
                </div>

                {/* Role and Company */}
                <h3 
                  className="text-2xl sm:text-3xl md:text-4xl font-light mb-2 leading-none tracking-tighter text-foreground"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  {activeExp.role}
                </h3>
                
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground/80 mb-4 italic">
                  <Building2 size={14} />
                  <span>{activeExp.company}</span>
                </div>

                {/* Core Description */}
                <p 
                  className="text-xs md:text-sm leading-relaxed text-muted-foreground font-serif italic max-w-2xl mb-5"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  "{activeExp.mainDescription}"
                </p>

                {/* Collapsible Projects Block */}
                <div className="w-full mb-5">
                  <p className="text-[9px] font-bold font-orbitron text-foreground/30 uppercase tracking-[0.2em] mb-2.5">
                    Projects Done
                  </p>
                  
                  <div className="space-y-3">
                    {activeExp.projects.map((project, pIdx) => {
                      const isOpen = activeProjectId === project.id;
                      return (
                        <div 
                          key={project.id} 
                          className="relative rounded-2xl overflow-hidden border transition-all duration-300"
                          style={{ 
                            borderColor: isOpen ? (theme === 'light' ? `${getLightModeColor(activeExp.color)}40` : `${activeExp.color}40`) : 'rgba(255, 255, 255, 0.05)',
                            backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
                          }}
                        >
                          <button
                            onClick={() => setActiveProjectId(isOpen ? null : project.id)}
                            className="w-full flex items-center justify-between p-3.5 transition-all duration-300"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-orbitron text-[10px] font-bold opacity-40">
                                {(pIdx + 1).toString().padStart(2, '0')}
                              </span>
                              <span className="font-orbitron text-xs md:text-sm font-bold text-foreground/90 uppercase tracking-wider">
                                {project.name}
                              </span>
                            </div>
                            {isOpen ? (
                              <ChevronUp size={14} style={{ color: theme === 'light' ? getLightModeColor(activeExp.color) : activeExp.color }} />
                            ) : (
                              <ChevronDown size={14} className="text-muted-foreground" />
                            )}
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                              >
                                <div className="px-4 pb-4 pt-1 border-t border-border/30">
                                  <p 
                                    className="text-xs md:text-sm text-muted-foreground/90 mb-3 leading-relaxed font-serif italic"
                                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                                  >
                                    {project.description}
                                  </p>
                                  
                                  <motion.a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-orbitron font-bold text-[10px] tracking-widest text-white hover:scale-105 transition-all shadow-lg"
                                    style={{ 
                                      backgroundColor: theme === 'light' ? getLightModeColor(activeExp.color) : activeExp.color,
                                      boxShadow: `0 8px 20px -6px ${activeExp.color}80`
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Globe size={12} />
                                    <span>LIVE PROJECT</span>
                                  </motion.a>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Skills Cloud */}
                <div>
                  <p className="text-[9px] font-bold font-orbitron text-foreground/30 uppercase tracking-[0.2em] mb-2">
                    Technologies Mastered
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wide border transition-all duration-300 hover:scale-105"
                        style={{ 
                          borderColor: theme === 'light' ? `${getLightModeColor(activeExp.color)}40` : `${activeExp.color}20`, 
                          color: theme === 'light' ? getLightModeColor(activeExp.color) : activeExp.color, 
                          backgroundColor: theme === 'light' ? `${activeExp.color}15` : `${activeExp.color}08`,
                          boxShadow: theme === 'light' ? `0 0 10px ${activeExp.color}10` : `0 0 10px ${activeExp.color}05`
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
