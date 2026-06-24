import React, { useEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { HomeSection } from '@/components/sections/HomeSection';
import { AboutSection } from '@/components/sections/AboutSection';
import ModernSkills from '@/components/sections/ModernSkills';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/Footer';

// Memoize all sections to prevent unnecessary re-renders during scroll
const MemoHome = memo(HomeSection);
const MemoSkills = memo(ModernSkills);
const MemoProjects = memo(ProjectsSection);
const MemoCerts = memo(CertificationsSection);
const MemoExperience = memo(ExperienceSection);
const MemoContact = memo(ContactSection);
const MemoFooter = memo(Footer);

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Dharwin S | Full-Stack Developer & ML Engineer";
    // Preload fonts
    document.fonts.ready.then(() => {
      // Fonts loaded
    });
  }, []);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const sectionId = hash.substring(1);
      const timer = setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <>
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Navbar />
        <main>
          <MemoHome />
          <MemoSkills />
          <MemoProjects />
          <MemoCerts />
          <MemoExperience />
          <MemoContact />
        </main>
        <MemoFooter />
      </motion.div>
    </>
  );
};

export default Index;
