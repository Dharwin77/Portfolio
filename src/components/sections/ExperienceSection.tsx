import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Briefcase, MapPin, ExternalLink, Rocket, Globe, Building2, ChevronDown, ChevronUp } from 'lucide-react';

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
  eventName: string; // "Event Name" as requested
  duration: string;
  image: string; // Photos as requested
  mainDescription: string;
  projects: ProjectInExperience[];
  skills: string[];
  color: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    role: 'Full-Stack Developer',
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
    skills: ['PyTorch', 'Rust', 'Kubernetes'],
    color: '#38BDF8',
  },
];

const ExperienceCard = ({ exp, index, isInView }: { exp: Experience, index: number, isInView: boolean }) => {
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.15 }}
      className="relative w-full mb-16 md:mb-24 px-4 sm:px-0"
    >
      <div className={`flex flex-col md:flex-row items-stretch gap-8 md:gap-14 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
        {/* Experience Image Box */}
        <div className="flex-1 max-h-[220px] md:max-h-none overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
          <div className="relative group aspect-[16/10] md:aspect-auto h-full border border-white/5 bg-black">
            <img 
              src={exp.image} 
              alt={exp.company}
              className="absolute inset-0 w-full h-full object-contain object-center transition-all duration-700 will-change-transform"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-6 flex flex-col justify-end">
              <div className="flex items-center gap-2 text-cosmic-cyan font-orbitron text-[10px] font-bold tracking-widest mb-2">
                <MapPin size={12} />
                <span>{exp.location}</span>
              </div>
              <h4 className="text-white text-xl font-bold font-orbitron capitalize">{exp.eventName}</h4>
            </div>
          </div>
        </div>

        {/* Experience Details */}
        <div className="flex-1 flex flex-col justify-center">
          <div className={`flex flex-col ${isLeft ? 'items-start' : 'md:items-end'} text-left`}>
            <span className="text-xs font-orbitron font-bold text-cosmic-cyan mb-2">{exp.duration}</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold text-foreground mb-1 leading-tight">{exp.role}</h3>
            <div className="flex items-center gap-2 text-lg font-bold text-muted-foreground mb-6 italic">
              <Building2 size={18} />
              <span>{exp.company}</span>
            </div>
            
            <p className={`text-muted-foreground text-sm md:text-base mb-8 max-w-lg ${isLeft ? '' : 'md:text-right'}`}>
              {exp.mainDescription}
            </p>

            {/* Projects Section - Listing 1, 2, 3 as requested */}
            <div className={`w-full max-w-md ${isLeft ? '' : 'md:ml-auto'}`}>
              <p className={`text-[10px] font-bold font-orbitron text-foreground/30 uppercase tracking-[0.2em] mb-4 ${isLeft ? '' : 'md:text-right'}`}>
                Projects Done There
              </p>
              
              <div className="space-y-3">
                {exp.projects.map((project, pIdx) => (
                  <div key={project.id} className="relative">
                    <button
                      onClick={() => setActiveProjectId(activeProjectId === project.id ? null : project.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 border ${
                        activeProjectId === project.id 
                          ? 'bg-cosmic-cyan/10 border-cosmic-cyan shadow-[0_0_20px_rgba(94,234,212,0.1)]' 
                          : 'social-bar-bg hover:border-cosmic-cyan/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-orbitron text-xs font-bold text-cosmic-cyan">{pIdx + 1}.</span>
                        <span className="font-orbitron text-sm font-bold text-foreground uppercase tracking-wider">{project.name}</span>
                      </div>
                      {activeProjectId === project.id ? <ChevronUp size={16} className="text-cosmic-cyan" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                    </button>

                    <AnimatePresence>
                      {activeProjectId === project.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 social-bar-bg border-x border-b border-light/5 rounded-b-xl -mt-2 relative">
                            <p className="text-xs md:text-sm text-muted-foreground mb-4 leading-relaxed italic" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                              {project.description}
                            </p>
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cosmic-cyan text-slate-900 font-orbitron font-bold text-[10px] hover:scale-105 transition-all shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Globe size={14} />
                              <span>LIVE PROJECT</span>
                            </motion.a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Central Timeline Accent (Desktop only) */}
      <div className="hidden md:block absolute left-1/2 top-0 h-full w-px social-bar-bg -translate-x-1/2" />
      <div className="hidden md:block absolute left-1/2 top-4 -translate-x-1/2 z-10">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md" 
          style={{ 
            backgroundColor: `${exp.color}15`, 
            border: `2px solid ${exp.color}50`,
            boxShadow: `0 0 20px ${exp.color}30` 
          }}
        >
          <Briefcase size={20} style={{ color: exp.color }} />
        </div>
      </div>
    </motion.div>
  );
};

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-container relative overflow-hidden flex flex-col items-center justify-center py-10 md:py-20 translate-z-0" ref={ref}>
      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-cosmic-cyan tracking-normal">
            Experience
          </h2>
          <p className="text-muted-foreground text-sm">
            Proven track record in high-impact technical environments
          </p>
        </motion.div>

        {/* Experience List */}
        <div className="w-full relative">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};
