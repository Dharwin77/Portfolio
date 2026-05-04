import React, { useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { HomeSection } from '@/components/sections/HomeSection';
import { AboutSection } from '@/components/sections/AboutSection';
import ModernSkills from '@/components/sections/ModernSkills';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ContactSection } from '@/components/sections/ContactSection';

// Memoize all sections to prevent unnecessary re-renders during scroll
const MemoHome = memo(HomeSection);
const MemoSkills = memo(ModernSkills);
const MemoProjects = memo(ProjectsSection);
const MemoCerts = memo(CertificationsSection);
const MemoExperience = memo(ExperienceSection);
const MemoContact = memo(ContactSection);

const Index = () => {
  useEffect(() => {
    // Preload fonts
    document.fonts.ready.then(() => {
      // Fonts loaded
    });
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <title>John Doe | Software Developer & AI Engineer</title>
      <meta name="description" content="Explore the portfolio of John Doe - a passionate software developer and AI engineer crafting innovative digital experiences. View projects, skills, and certifications in an immersive galaxy-themed interface." />
      
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
      </motion.div>
    </>
  );
};

export default Index;
