import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CertificationDetail {
  id: number;
  name: string;
  image: string;
  description: string;
  date: string;
}

interface Organization {
  id: number;
  name: string;
  logoUrl: string;
  accentColor: string;
  invert?: boolean;
  certs: CertificationDetail[];
}

const orgs: Organization[] = [
  {
    id: 1,
    name: 'Microsoft',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    accentColor: '#0078D4',
    certs: [
      {
        id: 101,
        name: 'Azure AI Engineer Associate',
        image: '/certification/23ADR038 Azure AI Engineer Association_page-0001.jpg',
        description: 'Specialization in designing and implementing Microsoft Azure AI solutions, managing cognitive services, and deploying machine learning models.',
        date: 'April 2025',
      }
    ]
  },
  {
    id: 2,
    name: 'Oracle',
    logoUrl: 'https://www.vectorlogo.zone/logos/oracle/oracle-ar21.svg',
    accentColor: '#F80000',
    certs: [
      {
        id: 201,
        name: 'Java SE 17 Developer',
        image: '/certification/23ADR038 Java SE 17 Developer_page-0001.jpg',
        description: 'Core developer certification validating proficiency in Java SE 17 programming, OOP principles, syntax, APIs, and modern platform features.',
        date: 'February 2026',
      },
      {
        id: 202,
        name: 'OCI Data Science Professional',
        image: '/certification/Oracel Data Science_page-0001.jpg',
        description: 'Professional certification demonstrating capability in building, training, deploying, and managing machine learning models on Oracle Cloud Infrastructure.',
        date: 'October 2025',
      },
      {
        id: 203,
        name: 'OCI AI Foundations Associate',
        image: '/certification/Oracle AI Foundations_page-0001.jpg',
        description: 'Foundational certification covering machine learning, deep learning, NLP, computer vision, and Oracle Cloud Infrastructure AI services.',
        date: 'October 2025',
      },
      {
        id: 204,
        name: 'Oracle AI Vector Search',
        image: '/certification/Oracle AI Vector_page-0001.jpg',
        description: 'Specialized certification covering semantic search, vector indexing, neural network integrations, and advanced SQL vector querying in Oracle 23c.',
        date: 'October 2025',
      },
      {
        id: 205,
        name: 'Oracle APEX Cloud Developer',
        image: '/certification/Oracle APEX_page-0001.jpg',
        description: 'Expertise in building scalable, secure, and low-code enterprise applications using Oracle Application Express (APEX) on Oracle Cloud.',
        date: 'May 2025',
      },
      {
        id: 206,
        name: 'OCI Generative AI Professional',
        image: '/certification/Oracle Gen AI_page-0001.jpg',
        description: 'Professional validation of proficiency in OCI Generative AI services, covering LLM architectures, fine-tuning, prompt engineering, and RAG.',
        date: 'October 2025',
      }
    ]
  },
  {
    id: 3,
    name: 'MongoDB',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    accentColor: '#47A248',
    certs: [
      {
        id: 301,
        name: 'MongoDB Associate Developer',
        image: '/certification/23ADR038 MongoDB Associate Developer_page-0001.jpg',
        description: 'Certification validating skills in designing, building, and deploying scalable document database solutions with MongoDB Atlas.',
        date: 'May 2025',
      }
    ]
  },
  {
    id: 4,
    name: 'NVIDIA',
    logoUrl: 'https://www.vectorlogo.zone/logos/nvidia/nvidia-ar21.svg',
    accentColor: '#76B900',
    certs: [
      {
        id: 401,
        name: 'Generative AI with Diffusion Models',
        image: '/certification/NVIDIA Gen AI_page-0001.jpg',
        description: 'Certification covering core concepts of generative AI, large language models, prompt engineering, and hardware-accelerated transformer architectures.',
        date: 'October 2025',
      },
      {
        id: 402,
        name: 'NVIDIA PyTorch (Getting Started with AI)',
        image: '/certification/NVIDIA Pytorch_page-0001.jpg',
        description: 'Validation of hands-on skills in deep learning modeling, dataset pipelines, GPU acceleration, and inference optimization using PyTorch on NVIDIA hardware.',
        date: 'October 2025',
      }
    ]
  },
];

export const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentOrgIndex, setCurrentOrgIndex] = useState(0);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);

  const activeOrg = orgs[currentOrgIndex];
  const activeCert = activeOrg.certs[currentCertIndex] || activeOrg.certs[0];

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

  // Reset certificate index when switching organization
  useEffect(() => {
    setCurrentCertIndex(0);
  }, [currentOrgIndex]);

  const handleNext = () => {
    setCurrentCertIndex((prev) => (prev + 1) % activeOrg.certs.length);
  };

  const handlePrev = () => {
    setCurrentCertIndex((prev) => (prev - 1 + activeOrg.certs.length) % activeOrg.certs.length);
  };

  return (
    <section id="certifications" className="section-container relative overflow-hidden flex flex-col items-center justify-center min-h-screen py-10 md:py-6 translate-z-0" ref={ref}>
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-orbitron text-xl md:text-2xl font-bold mb-1 text-cosmic-cyan">
            Certifications
          </h2>
          <p className="text-muted-foreground text-[10px] md:text-sm">
            Enterprise-grade professional credentials
          </p>
        </motion.div>

        {/* Top Logo Bar */}
        <div className="flex justify-center items-center flex-wrap gap-6 md:gap-14 mb-8 md:mb-14 px-4 w-full">
          {orgs.map((org, idx) => (
            <motion.div
              key={org.id}
              onClick={() => setCurrentOrgIndex(idx)}
              onMouseEnter={() => setCurrentOrgIndex(idx)}
              className="cursor-pointer group relative flex flex-col items-center justify-center h-10 md:h-12 w-24 md:w-32 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: idx * 0.1 }}
            >
              {org.name === 'NVIDIA' ? (
                <div className={`h-full w-full flex items-center justify-center transition-all duration-500 ${
                  currentOrgIndex === idx ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-80 scale-100'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60" className="h-full w-full object-contain text-foreground">
                    <path d="M52.412 38.843v16.863h4.76V38.843zm-37.44-.03v16.877h4.802V42.587l3.744.014c1.23 0 2.086.3 2.672.93.757.8 1.057 2.1 1.057 4.46v7.703h4.66v-9.317c0-6.66-4.244-7.56-8.388-7.56zm45.115.03v16.863h7.717c4.116 0 5.46-.686 6.902-2.215 1.03-1.072 1.686-3.444 1.686-6.03 0-2.372-.557-4.487-1.543-5.802-1.743-2.358-4.287-2.815-8.088-2.815zm4.716 3.658h2.044c2.972 0 4.887 1.33 4.887 4.787s-1.915 4.802-4.887 4.802h-2.044zm-19.25-3.658l-3.973 13.36-3.8-13.36h-5.145l5.43 16.863h6.86l5.487-16.863zM78.62 55.706h4.76V38.843h-4.76zm13.347-16.863l-6.645 16.848H90l1.057-2.987h7.86l1 2.972h5.102l-6.702-16.834zm3.087 3.072l2.887 7.888h-5.86" fill="currentColor"/>
                    <path d="M53.922 13.005v-2.85l.844-.035c7.81-.246 12.93 6.72 12.93 6.72s-5.524 7.67-11.453 7.67c-.792 0-1.566-.123-2.305-.37v-8.656c3.044.37 3.66 1.707 5.47 4.75l4.064-3.413s-2.973-3.888-7.97-3.888c-.528-.018-1.056.018-1.583.07m0-9.43v4.258l.844-.053C65.62 7.4 72.71 16.682 72.71 16.682s-8.128 9.887-16.6 9.887c-.74 0-1.46-.07-2.182-.194v2.64c.598.07 1.214.123 1.812.123 7.882 0 13.582-4.03 19.106-8.78.915.74 4.662 2.516 5.436 3.3-5.243 4.398-17.47 7.934-24.402 7.934a17.36 17.36 0 0 1-1.935-.106V35.2H83.9V3.575zm0 20.566v2.252c-7.284-1.302-9.307-8.884-9.307-8.884s3.5-3.87 9.307-4.504v2.463h-.018c-3.044-.37-5.436 2.48-5.436 2.48s1.355 4.803 5.454 6.193m-12.93-6.95s4.3-6.37 12.948-7.037V7.833C44.37 8.607 36.1 16.7 36.1 16.7s4.68 13.547 17.822 14.778v-2.463c-9.64-1.196-12.93-11.823-12.93-11.823" fill="#76b900"/>
                  </svg>
                </div>
              ) : (
                <img
                  src={org.logoUrl}
                  alt={org.name}
                  className={`h-full w-full object-contain transition-all duration-500 ${
                    currentOrgIndex === idx ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-80 scale-100'
                  }`}
                />
              )}
              <div className="absolute -bottom-4 md:bottom-[-20px] left-0 right-0 flex justify-center">
                <AnimatePresence>
                  {currentOrgIndex === idx && (
                    <motion.div
                      layoutId="certIndicatorRefinedSync"
                      className="w-8 md:w-12 h-1 rounded-full shadow-[0_0_10px_currentColor]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      style={{ 
                        backgroundColor: theme === 'light' ? getLightModeColor(activeOrg.accentColor) : activeOrg.accentColor, 
                        color: theme === 'light' ? getLightModeColor(activeOrg.accentColor) : activeOrg.accentColor 
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Certification View */}
        <div className="w-full relative min-h-fit max-w-5xl mx-auto group/main-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentOrgIndex}-${currentCertIndex}`}
              initial={{ opacity: 0, scale: 0.99, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full"
            >
              <div 
                className="flex flex-col md:flex-row gap-6 md:gap-10 p-5 sm:p-6 md:p-10 h-full relative" 
              >
                {/* Image Box */}
                <div className="flex-1 w-full h-[250px] sm:h-[300px] md:h-[380px] lg:h-[420px] relative group">
                  <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl bg-black/5 dark:bg-black/40 border border-border/30 backdrop-blur-sm">
                    <img
                      src={activeCert.image} 
                      alt={`${activeCert.name} Certificate by ${activeOrg.name} - Dharwin S`}
                      className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-1000 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex-1 flex flex-col justify-between h-full py-1">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      {/* Counter - X / Y as requested */}
                      <span className="text-[10px] font-bold font-orbitron tracking-[0.2em] uppercase px-2.5 py-1 social-bar-bg rounded-lg" style={{ color: theme === 'light' ? getLightModeColor(activeOrg.accentColor) : activeOrg.accentColor }}>
                        {currentCertIndex + 1} / {activeOrg.certs.length}
                      </span>
                      
                      {/* Shift Buttons */}
                      {activeOrg.certs.length > 1 && (
                        <div className="flex gap-2">
                          <button 
                            className="w-8 h-8 rounded-full social-bar-bg flex items-center justify-center text-foreground/50 hover:text-foreground transition-all active:scale-95 border border-border/10"
                            onClick={handlePrev} 
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button 
                            className="w-8 h-8 rounded-full social-bar-bg flex items-center justify-center text-foreground/50 hover:text-foreground transition-all active:scale-95 border border-border/10"
                            onClick={handleNext} 
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-3xl font-light mb-4 leading-none tracking-tighter text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                      {activeCert.name}
                    </h3>
                    
                    <div className="flex items-center gap-3 mb-6 opacity-80">
                      <div className="w-6 h-6 flex items-center justify-center social-bar-bg rounded-lg p-1 border border-border/10">
                        {activeOrg.name === 'NVIDIA' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60" className="w-full h-full object-contain text-foreground">
                            <path d="M52.412 38.843v16.863h4.76V38.843zm-37.44-.03v16.877h4.802V42.587l3.744.014c1.23 0 2.086.3 2.672.93.757.8 1.057 2.1 1.057 4.46v7.703h4.66v-9.317c0-6.66-4.244-7.56-8.388-7.56zm45.115.03v16.863h7.717c4.116 0 5.46-.686 6.902-2.215 1.03-1.072 1.686-3.444 1.686-6.03 0-2.372-.557-4.487-1.543-5.802-1.743-2.358-4.287-2.815-8.088-2.815zm4.716 3.658h2.044c2.972 0 4.887 1.33 4.887 4.787s-1.915 4.802-4.887 4.802h-2.044zm-19.25-3.658l-3.973 13.36-3.8-13.36h-5.145l5.43 16.863h6.86l5.487-16.863zM78.62 55.706h4.76V38.843h-4.76zm13.347-16.863l-6.645 16.848H90l1.057-2.987h7.86l1 2.972h5.102l-6.702-16.834zm3.087 3.072l2.887 7.888h-5.86" fill="currentColor"/>
                            <path d="M53.922 13.005v-2.85l.844-.035c7.81-.246 12.93 6.72 12.93 6.72s-5.524 7.67-11.453 7.67c-.792 0-1.566-.123-2.305-.37v-8.656c3.044.37 3.66 1.707 5.47 4.75l4.064-3.413s-2.973-3.888-7.97-3.888c-.528-.018-1.056.018-1.583.07m0-9.43v4.258l.844-.053C65.62 7.4 72.71 16.682 72.71 16.682s-8.128 9.887-16.6 9.887c-.74 0-1.46-.07-2.182-.194v2.64c.598.07 1.214.123 1.812.123 7.882 0 13.582-4.03 19.106-8.78.915.74 4.662 2.516 5.436 3.3-5.243 4.398-17.47 7.934-24.402 7.934a17.36 17.36 0 0 1-1.935-.106V35.2H83.9V3.575zm0 20.566v2.252c-7.284-1.302-9.307-8.884-9.307-8.884s3.5-3.87 9.307-4.504v2.463h-.018c-3.044-.37-5.436 2.48-5.436 2.48s1.355 4.803 5.454 6.193m-12.93-6.95s4.3-6.37 12.948-7.037V7.833C44.37 8.607 36.1 16.7 36.1 16.7s4.68 13.547 17.822 14.778v-2.463c-9.64-1.196-12.93-11.823-12.93-11.823" fill="#76b900"/>
                          </svg>
                        ) : (
                          <img src={activeOrg.logoUrl} alt="" className="w-full h-full object-contain" />
                        )}
                      </div>
                      <span className="text-sm font-bold text-muted-foreground capitalize">{activeOrg.name} Certificate</span>
                    </div>

                    <p className="text-xs md:text-sm leading-relaxed text-muted-foreground font-serif italic max-w-full md:max-w-[320px] mb-6" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                      {activeCert.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-8">
                    <div>
                      <p className="text-muted-foreground/60 text-[8px] font-bold uppercase tracking-[0.2em] mb-0.5">ISSUE DATE</p>
                      <p className="text-lg font-bold font-orbitron" style={{ color: theme === 'light' ? getLightModeColor(activeOrg.accentColor) : activeOrg.accentColor }}>{activeCert.date}</p>
                    </div>
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
