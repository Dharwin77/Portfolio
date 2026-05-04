import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Github, ExternalLink, ArrowRight, ArrowUpLeft } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  metrics: { label: string; value: string }[];
  accentColor: string;
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Retail Management',
    category: 'CASE STUDY',
    description: 'Integrated retail management platform for inventory, point-of-sale, and analytics — improving stock availability and driving sales growth.',
    image: '/project-image1.jpg',
    metrics: [
      { label: 'STOCK OUT REDUCTION', value: '30%' },
      { label: 'SALES UPLIFT', value: '20%' }
    ],
    accentColor: '#06B6D4', // Retail-themed cyan
    githubUrl: 'https://github.com/Dharwin77/SuperMarket',
    liveUrl: 'https://super-market-frontend-five.vercel.app',
  },
  {
    id: 2,
    title: 'Doctor Consultation',
    category: 'CASE STUDY',
    description: 'Telehealth platform connecting patients with specialists in under 2 minutes — secure video consultations, instant triage, and integrated patient records.',
    image: '/project-image2.jpg',
    metrics: [
      { label: 'PATIENT ENGAGEMENT', value: '300%' },
      { label: 'WAIT TIME REDUCTION', value: '15m' }
    ],
    accentColor: '#F43F5E', // Brighter rose
    githubUrl: 'https://github.com/Dharwin77/Healix-Doctor_Appointment_System',
    liveUrl: 'https://healix-doctor-appointment-system-t3.vercel.app/',
  },
  // Removed projects 3-7 per request — only primary projects remain
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedProjects = isExpanded ? projects : projects.slice(0, 4);
  const selectedProject = projects[currentIndex];

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setCurrentIndex(0); // Reset to first project if collapsing
    }
  };

  return (
    <section id="projects" className="section-container relative overflow-hidden flex flex-col items-center justify-center py-6 min-h-screen translate-z-0" ref={ref}>
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - UPDATED TO "Projects" */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-cosmic-cyan tracking-normal">
            Projects
          </h2>
          <p className="text-muted-foreground text-sm">
            Explore my technical case studies one by one.
          </p>
        </motion.div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-20 items-center justify-center max-w-6xl mx-auto">
          {/* Left Side: Interactive List */}
          <div className="flex-1 w-full space-y-4 md:space-y-6 lg:max-w-md">
            <div className="space-y-4 md:space-y-6 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide py-2">
              <AnimatePresence>
                {displayedProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    onMouseEnter={() => setCurrentIndex(idx)}
                    onClick={() => setCurrentIndex(idx)}
                    className={`group cursor-pointer flex items-center gap-4 md:gap-8 transition-all duration-300 ${
                      currentIndex === idx ? 'opacity-100 translate-x-2' : 'opacity-30 hover:opacity-60'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <span className={`font-orbitron text-base md:text-lg font-black ${
                      currentIndex === idx ? 'text-cosmic-cyan' : 'text-muted-foreground'
                    }`}>
                      0{idx + 1}
                    </span>
                    <h3 className={`font-orbitron text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight transition-all duration-300 ${
                      currentIndex === idx ? 'text-foreground' : 'text-muted-foreground/60 group-hover:text-foreground/80'
                    }`}>
                      {project.title}
                    </h3>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* "View More Projects" Toggle */}
            <motion.button
              onClick={handleToggleExpand}
              className="pt-8 flex items-center gap-3 text-xs md:text-sm font-orbitron font-bold text-cosmic-cyan hover:text-white transition-all duration-300"
            >
              <div className={`w-8 h-8 rounded-full border border-cosmic-cyan/30 flex items-center justify-center transition-all duration-500 ${
                isExpanded ? 'rotate-90 bg-cosmic-cyan text-slate-100' : 'bg-cosmic-cyan/10'
              }`}>
                {isExpanded ? <ArrowUpLeft size={16} /> : <ArrowRight size={16} />}
              </div>
              <span className="uppercase tracking-widest">
                {isExpanded ? 'SHOW FEWER PROJECTS' : 'CLICK HERE TO VIEW ALL PROJECTS'}
              </span>
            </motion.button>
          </div>

          {/* Right Side: Case Study View */}
          <div className="flex-[1.8] w-full relative h-[450px] md:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full"
              >
                <div className="glass-card rounded-[3.5rem] shadow-xl overflow-hidden flex flex-col p-8 sm:p-10 md:p-12 gap-10 h-full border border-border/10 relative backdrop-blur-md">
                  <div 
                    className="flex flex-col justify-between items-start h-full"
                    style={{ color: selectedProject.accentColor }}
                  >
                    <div className="w-full h-full flex flex-col md:flex-row gap-10">
                      {/* Detailed Content */}
                      <div className="flex-1 flex flex-col justify-between h-full py-2">
                        <div>
                          <span className="text-[10px] font-bold font-orbitron opacity-40 tracking-[0.25em] uppercase mb-4 block">
                            {selectedProject.category}
                          </span>
                          <h4 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-light mb-4 leading-none tracking-tighter text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                            {selectedProject.title}
                          </h4>
                          <p className="text-xs md:text-base font-medium leading-relaxed opacity-80 max-w-full md:max-w-[280px] text-muted-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                            {selectedProject.description}
                          </p>
                        </div>

                        <div className="w-full pt-4">
                          <div className="w-full h-[1.5px] opacity-10 mb-8" style={{ backgroundColor: selectedProject.accentColor }} />
                          <div className="flex gap-10 lg:gap-14">
                            {selectedProject.metrics.map((metric, mIdx) => (
                              <div key={mIdx} className="space-y-1">
                                <p className="text-xl md:text-3xl lg:text-5xl font-light tracking-tight leading-none uppercase text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                                  {metric.value}
                                </p>
                                <p className="text-[9px] font-bold opacity-30 uppercase tracking-widest whitespace-nowrap text-muted-foreground">
                                  {metric.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Image + Action Links Block */}
                      <div className="flex-1 h-full flex flex-col gap-6">
                        <div className="flex-1 w-full rounded-[4rem] overflow-hidden shadow-2xl relative bg-slate-50">
                          <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105 will-change-transform"
                          />
                        </div>
                        
                        <div className="flex gap-4">
                          <a 
                            href={selectedProject.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-3xl font-black text-white hover:scale-105 transition-all duration-300 shadow-md"
                            style={{ backgroundColor: selectedProject.accentColor }}
                          >
                            <Github className="w-5 h-5" />
                            <span className="text-[10px] uppercase tracking-widest font-orbitron">Github</span>
                          </a>
                          <a 
                            href={selectedProject.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-3xl font-black bg-slate-100/80 hover:bg-slate-200/80 text-current hover:scale-105 transition-all duration-300 border border-current/10"
                          >
                            <ExternalLink className="w-5 h-5" />
                            <span className="text-[10px] uppercase tracking-widest font-orbitron">Live</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};