import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Sparkles, Code, LayoutGrid, Rocket, X } from 'lucide-react';

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
  group: 'ai' | 'web';
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
    accentColor: '#06B6D4',
    githubUrl: 'https://github.com/Dharwin77/SuperMarket',
    liveUrl: 'https://super-market-frontend-five.vercel.app',
    group: 'web'
  },
  {
    id: 2,
    title: 'Healix',
    category: 'CASE STUDY',
    description: 'Telehealth platform connecting patients with specialists in under 2 minutes — secure video consultations, instant triage, and integrated patient records.',
    image: '/project-image2.jpg',
    metrics: [
      { label: 'PATIENT ENGAGEMENT', value: '300%' },
      { label: 'WAIT TIME REDUCTION', value: '15m' }
    ],
    accentColor: '#F43F5E',
    githubUrl: 'https://github.com/Dharwin77/Healix-Doctor_Appointment_System',
    liveUrl: 'https://healix-doctor-appointment-system-t3.vercel.app/',
    group: 'web'
  },
  {
    id: 3,
    title: 'House Design Platform',
    category: 'AI & WEB',
    description: 'Interactive 3D house design and planning platform with real-time drag-and-drop customization and accurate spatial layout rendering.',
    image: '/project-image3.png',
    metrics: [
      { label: 'RENDER SPEED', value: '10x' },
      { label: 'USER RATING', value: '4.9/5' }
    ],
    accentColor: '#6366F1',
    githubUrl: 'https://github.com/Dharwin77/House-Design-Platform',
    liveUrl: 'https://house-design-platform.vercel.app',
    group: 'web'
  },
  {
    id: 4,
    title: 'Object Detection',
    category: 'AI & COMPUTER VISION',
    description: 'Real-time object detection and tracking system using custom YOLO architectures with high accuracy and low inference latency.',
    image: '/project-image4.png',
    metrics: [
      { label: 'DETECTION ACCURACY', value: '98.4%' },
      { label: 'INFERENCE LATENCY', value: '12ms' }
    ],
    accentColor: '#10B981',
    githubUrl: 'https://github.com/Dharwin77/Yolo_Object_Detection',
    liveUrl: 'https://dharwin-yolo.vercel.app',
    group: 'ai'
  },
  {
    id: 5,
    title: 'Resume Analyzer',
    category: 'AI & NLP',
    description: 'AI-powered parsing tool that extracts key skills, experience, and education from resumes, providing ATS scoring and recommendations.',
    image: '/project-image5.png',
    metrics: [
      { label: 'PARSING ACCURACY', value: '95%' },
      { label: 'MATCHING TIME', value: '2s' }
    ],
    accentColor: '#8B5CF6',
    githubUrl: 'https://github.com/Dharwin77/ResumeIQ',
    liveUrl: 'https://dharwin-resumeiq.vercel.app',
    group: 'ai'
  },
  {
    id: 6,
    title: 'News Prediction',
    category: 'MACHINE LEARNING',
    description: 'Machine learning classifier designed to analyze news articles and predict fake news patterns with natural language processing models.',
    image: '/project-image6.png',
    metrics: [
      { label: 'MODEL ACCURACY', value: '94.2%' },
      { label: 'DATASET SIZE', value: '100K+' }
    ],
    accentColor: '#F59E0B',
    githubUrl: 'https://github.com/Dharwin77/Fake_News_Prediction_Using_ML',
    liveUrl: 'https://dharwin-news-detection.vercel.app/',
    group: 'ai'
  },
  {
    id: 7,
    title: 'Voice Analyzer',
    category: 'AI & SPEECH',
    description: 'Deep learning speech analysis platform that detects emotional cues, tone shifts, and voice characteristics from audio recordings.',
    image: '/project-image7.png',
    metrics: [
      { label: 'SPEECH-TO-TEXT', value: '99%' },
      { label: 'LATENCY', value: '80ms' }
    ],
    accentColor: '#EC4899',
    githubUrl: 'https://github.com/Dharwin77/Voice-Analyzer',
    liveUrl: 'https://dharwin-voice-analyzer.vercel.app/',
    group: 'ai'
  },
  {
    id: 8,
    title: 'Movie Recommendation',
    category: 'AI & RECOMMENDATION',
    description: 'Personalized recommendation system using collaborative filtering and content-based approaches to recommend movies in real time.',
    image: '/project-image8.png',
    metrics: [
      { label: 'CTR IMPROVEMENT', value: '25%' },
      { label: 'RECOMMENDATIONS/SEC', value: '5K' }
    ],
    accentColor: '#3B82F6',
    githubUrl: 'https://github.com/Dharwin77/MovieRecSystem',
    group: 'ai'
  },
  {
    id: 9,
    title: 'Earthquake Prediction',
    category: 'AI & DATA SCIENCE',
    description: 'Predictive model that analyzes seismic data to forecast earthquake occurrences, magnitudes, and epicenter locations.',
    image: '/project-image9.png',
    metrics: [
      { label: 'PREDICTION LEAD', value: '48h' },
      { label: 'FALSE ALARMS', value: '<2%' }
    ],
    accentColor: '#EF4444',
    githubUrl: 'https://github.com/Dharwin77/Earthquake_Prediction_Using_ML',
    group: 'ai'
  },
  {
    id: 10,
    title: 'Cricket Shots Prediction',
    category: 'AI & COMPUTER VISION',
    description: 'Computer vision model that analyzes video frames to classify and predict cricket batting shots in real time.',
    image: '/project-image10.png',
    metrics: [
      { label: 'CLASSIFICATION', value: '96.8%' },
      { label: 'FRAME RATE', value: '60fps' }
    ],
    accentColor: '#10B981',
    githubUrl: 'https://github.com/Dharwin77/Cricket_Shots_Prediction_Using_DL',
    group: 'ai'
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState<'all' | 'ai' | 'web'>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter projects list
  const filteredProjects = projects.filter(p => filter === 'all' || p.group === filter);
  const selectedProject = filteredProjects[activeIndex] || filteredProjects[0];

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handleCardClick = (idx: number) => {
    if (idx === activeIndex) {
      setIsModalOpen(true);
    } else {
      setActiveIndex(idx);
    }
  };

  const getCardProps = (idx: number) => {
    let diff = idx - activeIndex;
    const len = filteredProjects.length;

    // Handle circular offsets
    if (diff < -len / 2) diff += len;
    if (diff > len / 2) diff -= len;

    const isActive = diff === 0;
    const isPrev = diff === -1;
    const isNext = diff === 1;
    const isVisible = Math.abs(diff) <= 1 || (len === 2 && Math.abs(diff) === 1);

    return { isActive, isPrev, isNext, isVisible, diff };
  };

  const filterTabs = [
    { id: 'all', label: 'All Projects', icon: LayoutGrid },
    { id: 'ai', label: 'AI & ML', icon: Sparkles },
    { id: 'web', label: 'Web & Case Studies', icon: Code }
  ] as const;

  return (
    <section 
      id="projects" 
      className="section-container relative overflow-hidden flex flex-col items-center justify-center py-16 md:py-28 translate-z-0" 
      ref={ref}
    >
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-cosmic-cyan tracking-normal">
            Projects
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            Explore my technical case studies one by one.
          </p>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <div className="flex justify-center items-center mb-10 md:mb-16">
          <div className="flex p-1 rounded-full social-bar-bg border border-white/5 backdrop-blur-md">
            {filterTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className="relative px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-orbitron font-bold text-[10px] md:text-xs transition-all duration-300 flex items-center gap-2"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterTabProjects"
                      className="absolute inset-0 rounded-full bg-cosmic-cyan text-slate-900 shadow-[0_4px_20px_rgba(94,234,212,0.35)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-1.5 ${
                    isActive ? 'text-slate-900' : 'text-muted-foreground hover:text-foreground'
                  }`}>
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Coverflow Card Slider */}
        <div className="w-full relative flex flex-col items-center justify-center">
          
          {/* Card Carousel Area */}
          <div className="relative h-[250px] sm:h-[320px] md:h-[380px] w-full max-w-4xl flex items-center justify-center overflow-hidden preserve-3d perspective-1000 py-6">
            <AnimatePresence initial={false}>
              {filteredProjects.map((project, idx) => {
                const { isActive, isVisible, diff } = getCardProps(idx);
                if (!isVisible && filteredProjects.length > 2) return null;

                return (
                  <motion.div
                    key={project.id}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{
                      x: diff * (typeof window !== 'undefined' && window.innerWidth < 640 ? 110 : 220),
                      rotateY: -diff * 35,
                      z: isActive ? 50 : -150,
                      scale: isActive ? 1.05 : 0.75,
                      opacity: isActive ? 1 : 0.45,
                      zIndex: 30 - Math.abs(diff) * 10
                    }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                    onClick={() => handleCardClick(idx)}
                    className="absolute w-[200px] sm:w-[280px] md:w-[350px] aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 border border-white/5"
                  >
                    <div className="w-full h-full relative group">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient Backdrop overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-5 flex flex-col justify-end">
                        <span className="text-[8px] font-bold font-orbitron tracking-widest text-cosmic-cyan uppercase mb-1">
                          {project.category}
                        </span>
                        <h4 className="text-white text-sm sm:text-base font-bold font-orbitron line-clamp-1">
                          {project.title}
                        </h4>
                      </div>
                      
                      {/* Active project highlight aura */}
                      {isActive && (
                        <div 
                          className="absolute inset-0 rounded-3xl border-2 pointer-events-none transition-all duration-500"
                          style={{ borderColor: project.accentColor }}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          {filteredProjects.length > 1 && (
            <div className="flex gap-4 items-center justify-center z-20 mt-4">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full social-bar-bg border border-white/5 flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-cosmic-cyan/30 active:scale-95 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Slider Dots */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full social-bar-bg border border-white/5">
                {filteredProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx ? 'w-4' : 'w-1.5'
                    }`}
                    style={{ backgroundColor: activeIndex === idx ? selectedProject?.accentColor || '#38BDF8' : 'rgba(255,255,255,0.15)' }}
                  />
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full social-bar-bg border border-white/5 flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-cosmic-cyan/30 active:scale-95 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Modal Detail Overlay */}
        <AnimatePresence>
          {isModalOpen && selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative w-full max-w-4xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all z-20"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left Side: Image */}
                <div className="flex-1 min-h-[250px] md:min-h-0 relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Right Side: Content */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    {/* Category Pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold font-orbitron tracking-widest uppercase mb-4"
                      style={{
                        backgroundColor: `${selectedProject.accentColor}15`,
                        color: selectedProject.accentColor
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: selectedProject.accentColor }} />
                      <span>{selectedProject.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-extrabold font-orbitron tracking-tight text-slate-900 dark:text-white mb-4 uppercase">
                      {selectedProject.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-6 font-medium">
                      "{selectedProject.description}"
                    </p>

                    {/* Custom Enterprise Innovation Standard Badge */}
                    <div className="flex items-center gap-2.5 py-2 px-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 w-fit mb-6">
                      <div className="w-6 h-6 rounded-full bg-red-500/10 dark:bg-red-500/20 flex items-center justify-center text-red-500 dark:text-red-400">
                        <Rocket className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-orbitron font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">
                        Enterprise Innovation Standard
                      </span>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-slate-100 dark:border-white/5">
                      {selectedProject.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="space-y-0.5">
                          <span className="text-xl md:text-2xl font-bold font-orbitron" style={{ color: selectedProject.accentColor }}>
                            {metric.value}
                          </span>
                          <p className="text-[8px] font-bold opacity-60 uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl font-orbitron font-bold text-[10px] hover:scale-105 transition-all duration-300 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                        style={{
                          backgroundColor: `${selectedProject.accentColor}10`,
                          color: selectedProject.accentColor,
                          borderColor: `${selectedProject.accentColor}25`
                        }}
                      >
                        <Github className="w-4 h-4" />
                        <span>GITHUB</span>
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl font-orbitron font-bold text-[10px] text-white hover:scale-105 transition-all duration-300 shadow-lg"
                        style={{
                          backgroundColor: selectedProject.accentColor,
                          boxShadow: `0 8px 20px -6px ${selectedProject.accentColor}60`
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>LIVE</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};