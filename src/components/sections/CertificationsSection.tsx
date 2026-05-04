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
        name: 'Azure AI Associate',
        image: '/project-image3.jpg',
        description: 'Specialization in designing and implementing Microsoft Azure AI solutions through cognitive services and machine learning.',
        date: 'Dec 2023',
      }
    ]
  },
  {
    id: 2,
    name: 'Oracle',
    logoUrl: 'https://www.vectorlogo.zone/logos/oracle/oracle-ar21.svg',
    accentColor: '#F80000',
    invert: true,
    certs: [
      {
        id: 201,
        name: 'Database Professional I',
        image: '/project-image5.jpg',
        description: 'Core expertise in Oracle database management and SQL optimization for enterprise environments.',
        date: 'Oct 2023',
      },
      {
        id: 202,
        name: 'Java SE 17 Developer',
        image: '/project-image4.jpg',
        description: 'Certified professional for core Java development, focusing on performance and modern language features.',
        date: 'Nov 2023',
      },
      {
        id: 203,
        name: 'Cloud Infrastructure',
        image: '/project-image2.jpg',
        description: 'Architecting secure and scalable cloud solutions using Oracle Cloud Infrastructure (OCI) services.',
        date: 'Jan 2024',
      },
      {
        id: 204,
        name: 'SQL Tuning Expert',
        image: '/project-image1.jpg',
        description: 'Deep-dive mastery of query execution plans and database performance optimization techniques.',
        date: 'Feb 2024',
      },
      {
        id: 205,
        name: 'Oracle Certified Master',
        image: '/project-image3.jpg',
        description: 'The highest tier of database accreditation, demonstrating mastery over complex system configurations and recovery.',
        date: 'Mar 2024',
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
        name: 'Developer Associate',
        image: '/project-image2.jpg',
        description: 'Building resilient, high-performance applications using MongoDB Atlas and advanced NoSQL modeling.',
        date: 'Aug 2023',
      }
    ]
  },
  {
    id: 4,
    name: 'NVIDIA',
    logoUrl: 'https://www.vectorlogo.zone/logos/nvidia/nvidia-ar21.svg',
    accentColor: '#76B900',
    invert: true,
    certs: [
      {
        id: 401,
        name: 'Deep Learning Fund.',
        image: '/project-image1.jpg',
        description: 'Hands-on training in GPU-accelerated neural network design and NVIDIA hardware optimization.',
        date: 'Jan 2024',
      },
      {
        id: 402,
        name: 'Accelerated Computing',
        image: '/project-image5.jpg',
        description: 'Mastery of CUDA programming and high-performance computing (HPC) for modern AI research.',
        date: 'Mar 2024',
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
  const activeCert = activeOrg.certs[currentCertIndex];

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
              <img
                src={org.logoUrl}
                alt={org.name}
                className={`h-full w-full object-contain transition-all duration-500 filter ${
                  currentOrgIndex === idx ? 'grayscale-0 scale-110' : 'grayscale opacity-20 hover:grayscale-0 hover:opacity-100'
                } ${org.invert ? 'invert-on-dark' : ''}`}
              />
              <div className="absolute -bottom-4 md:bottom-[-20px] left-0 right-0 flex justify-center">
                <AnimatePresence>
                  {currentOrgIndex === idx && (
                    <motion.div
                      layoutId="certIndicatorRefinedSync"
                      className="w-8 md:w-12 h-1 rounded-full shadow-[0_0_10px_currentColor]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      style={{ backgroundColor: activeOrg.accentColor, color: activeOrg.accentColor }}
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
                className="glass-card flex flex-col md:flex-row gap-6 md:gap-10 p-5 sm:p-6 md:p-10 h-full border-l-4 shadow-xl relative backdrop-blur-md" 
                style={{ borderLeftColor: activeOrg.accentColor }}
              >
                {/* Image Box */}
                <div className="flex-1 w-full min-h-[140px] md:h-full md:min-h-0 relative group">
                  <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-xl bg-black/40 border border-white/5">
                    <img
                      src={activeCert.image} 
                      alt={activeCert.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                      <p className="text-foreground/40 text-[8px] font-orbitron font-bold uppercase tracking-[0.2em] mb-0.5">
                        Professional ID
                      </p>
                      <p className="text-foreground text-[10px] font-mono font-bold tracking-widest uppercase">
                        {activeOrg.name.substring(0, 3)}-CERT-{(activeCert.id + currentCertIndex) * 102}Z
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex-1 flex flex-col justify-between h-full py-1">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      {/* Counter - X / Y as requested */}
                      <span className="text-[10px] font-bold font-orbitron tracking-[0.2em] uppercase px-2.5 py-1 social-bar-bg rounded-lg" style={{ color: activeOrg.accentColor }}>
                        {currentCertIndex + 1} / {activeOrg.certs.length}
                      </span>
                      
                      {/* Shift Buttons */}
                      {activeOrg.certs.length > 1 && (
                        <div className="flex gap-2">
                          <button 
                            className="w-8 h-8 rounded-full social-bar-bg flex items-center justify-center text-foreground/50 hover:text-foreground transition-all active:scale-95"
                            onClick={handlePrev} 
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button 
                            className="w-8 h-8 rounded-full social-bar-bg flex items-center justify-center text-foreground/50 hover:text-foreground transition-all active:scale-95"
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
                      <div className="w-6 h-6 flex items-center justify-center social-bar-bg rounded-lg p-1">
                        <img src={activeOrg.logoUrl} alt="" className={`w-full h-full object-contain ${activeOrg.invert ? 'invert-on-dark' : ''}`} />
                      </div>
                      <span className="text-sm font-bold text-muted-foreground capitalize">{activeOrg.name} Certificate</span>
                    </div>

                    <p className="text-xs md:text-sm leading-relaxed text-muted-foreground font-serif italic max-w-full md:max-w-[320px] mb-6" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                      {activeCert.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-8">
                    <div>
                      <p className="text-foreground/20 text-[8px] font-bold uppercase tracking-[0.2em] mb-0.5">ISSUE DATE</p>
                      <p className="text-lg font-bold font-orbitron" style={{ color: activeOrg.accentColor }}>{activeCert.date}</p>
                    </div>
                    {/* VERIFY CREDENTIAL - Updated to constant brand color */}
                    <motion.a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 rounded-full font-orbitron font-bold text-[10px] md:text-xs text-white transition-all duration-300 shadow-lg flex items-center gap-2 group"
                      style={{ 
                        backgroundColor: activeOrg.accentColor,
                        boxShadow: `0 10px 30px -10px ${activeOrg.accentColor}80` 
                      }}
                      whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>VERIFY CREDENTIAL</span>
                    </motion.a>
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
