import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Sparkles, Code, LayoutGrid, X } from 'lucide-react';

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
    // liveUrl removed - deployment not currently active
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
    // liveUrl removed - deployment not currently active
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
    // liveUrl removed - deployment not currently active
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
    // liveUrl removed - deployment not currently active
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollCooldown = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

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

  // Filter projects list
  const filteredProjects = projects.filter(p => filter === 'all' || p.group === filter);
  const selectedProject = filteredProjects[activeIndex] || filteredProjects[0];

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIndex(0);
    setIsModalOpen(false);
  }, [filter]);

  // Close panel when active card changes
  useEffect(() => {
    setIsModalOpen(false);
  }, [activeIndex]);

  // Horizontal scroll / wheel navigation on the carousel
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const navigate = (direction: 1 | -1) => {
      if (scrollCooldown.current) return;
      scrollCooldown.current = true;
      setActiveIndex((prev) => {
        const len = filteredProjects.length;
        return (prev + direction + len) % len;
      });
      setTimeout(() => { scrollCooldown.current = false; }, 650);
    };

    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // Only intercept when horizontal scroll dominates
      if (absX > absY && absX > 20) {
        e.preventDefault();
        if (e.deltaX > 20) navigate(1);
        else if (e.deltaX < -20) navigate(-1);
      }
      // Vertical scroll falls through → page scrolls normally
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      // Only treat as horizontal swipe if horizontal movement dominates
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        navigate(dx < 0 ? 1 : -1);
      }
      touchStartX.current = null;
      touchStartY.current = null;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProjects.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handleCardClick = (idx: number) => {
    if (idx === activeIndex) {
      setIsModalOpen((prev) => !prev);
    } else {
      setActiveIndex(idx);
    }
  };

  const getCardProps = (idx: number) => {
    let diff = idx - activeIndex;
    const len = filteredProjects.length;

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

  const accentColor = selectedProject
    ? (theme === 'light' ? getLightModeColor(selectedProject.accentColor) : selectedProject.accentColor)
    : '#06B6D4';

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
          <div className="flex p-1 rounded-full social-bar-bg border border-border/30 backdrop-blur-md">
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
          <div
            ref={carouselRef}
            className="relative h-[250px] sm:h-[320px] md:h-[380px] w-full max-w-4xl flex items-center justify-center overflow-hidden preserve-3d perspective-1000 py-6 cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: 'pan-y' }}
          >
            <AnimatePresence initial={false}>
              {filteredProjects.map((project, idx) => {
                const { isActive, isVisible, diff } = getCardProps(idx);
                if (!isVisible && filteredProjects.length > 2) return null;

                return (
                  <motion.div
                    key={project.id}
                    style={{ transformStyle: 'preserve-3d' }}
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
                    className="absolute w-[200px] sm:w-[280px] md:w-[350px] aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 border border-border/30"
                  >
                    <div className="w-full h-full relative group">
                        <img
                          src={project.image}
                          alt={`${project.title} - ${project.category} project by Dharwin S`}
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
                          style={{ borderColor: theme === 'light' ? getLightModeColor(project.accentColor) : project.accentColor }}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows + Dots */}
          {filteredProjects.length > 1 && (
            <div className="flex gap-4 items-center justify-center z-20 mt-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full social-bar-bg border border-border/20 flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-cosmic-cyan/30 active:scale-95 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Slider Dots */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full social-bar-bg border border-border/20">
                {filteredProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx ? 'w-4' : 'w-1.5'
                    }`}
                    style={{
                      backgroundColor: activeIndex === idx
                        ? (theme === 'light' ? getLightModeColor(selectedProject?.accentColor || '#38BDF8') : (selectedProject?.accentColor || '#38BDF8'))
                        : (theme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.15)')
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full social-bar-bg border border-border/20 flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-cosmic-cyan/30 active:scale-95 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* ── Inline Detail Panel ── expands below carousel inside the section ── */}
          <AnimatePresence>
            {isModalOpen && selectedProject && (
              <motion.div
                key={`panel-${selectedProject.id}`}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 28 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                className="w-full max-w-4xl overflow-hidden"
              >
                <div
                  className="relative rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
                  style={{
                    background: theme === 'light' ? '#ffffff' : 'rgba(2,8,23,0.95)',
                    border: `1px solid ${selectedProject.accentColor}35`,
                    boxShadow: `0 0 60px -10px ${selectedProject.accentColor}35`
                  }}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${selectedProject.accentColor}, transparent)`
                    }}
                  />

                  {/* Close Button */}
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center z-20 transition-all duration-200 hover:scale-110"
                    style={{
                      background: `${selectedProject.accentColor}18`,
                      color: accentColor,
                      border: `1px solid ${selectedProject.accentColor}30`
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Left: Image */}
                  <div className="w-full md:w-[44%] min-h-[200px] md:min-h-[300px] relative flex-shrink-0 overflow-hidden">
                    <img
                      src={selectedProject.image}
                      alt={`${selectedProject.title} - ${selectedProject.category} project preview`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/50 hidden md:block" />
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1 p-7 md:p-10 flex flex-col justify-between">
                    <div>
                      {/* Category Pill */}
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold font-orbitron tracking-widest uppercase mb-3"
                        style={{
                          backgroundColor: `${selectedProject.accentColor}15`,
                          color: accentColor
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: selectedProject.accentColor }}
                        />
                        <span>{selectedProject.category}</span>
                      </div>

                      {/* Title */}
                      <h3
                        className="text-2xl md:text-3xl font-extrabold font-orbitron tracking-tight mb-3 uppercase"
                        style={{ color: theme === 'light' ? '#0f172a' : '#ffffff' }}
                      >
                        {selectedProject.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-xs sm:text-sm leading-relaxed mb-5 font-medium"
                        style={{ color: theme === 'light' ? '#475569' : '#94a3b8' }}
                      >
                        "{selectedProject.description}"
                      </p>

                      {/* Metrics */}
                      <div
                        className="grid grid-cols-2 gap-4 mb-5 pt-4"
                        style={{ borderTop: `1px solid ${selectedProject.accentColor}18` }}
                      >
                        {selectedProject.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="space-y-0.5">
                            <span
                              className="text-xl md:text-2xl font-bold font-orbitron"
                              style={{ color: accentColor }}
                            >
                              {metric.value}
                            </span>
                            <p
                              className="text-[8px] font-bold opacity-60 uppercase tracking-widest"
                              style={{ color: theme === 'light' ? '#64748b' : '#94a3b8' }}
                            >
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div
                      className="flex gap-3 pt-4"
                      style={{ borderTop: `1px solid ${selectedProject.accentColor}18` }}
                    >
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl font-orbitron font-bold text-[10px] hover:scale-105 transition-all duration-300"
                          style={{
                            backgroundColor: `${selectedProject.accentColor}12`,
                            color: accentColor,
                            border: `1px solid ${selectedProject.accentColor}28`
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
                          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl font-orbitron font-bold text-[10px] text-white hover:scale-105 transition-all duration-300"
                          style={{
                            backgroundColor: theme === 'light'
                              ? getLightModeColor(selectedProject.accentColor)
                              : selectedProject.accentColor,
                            boxShadow: `0 8px 20px -6px ${selectedProject.accentColor}60`
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>LIVE</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};