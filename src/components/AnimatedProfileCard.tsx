import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ProfileCard from '@/components/ProfileCard';

// Configuration
const PROFILE_PHOTO_HOME = '/profile-1.jpg'; // Image for Home section
const PROFILE_PHOTO_ABOUT = '/profile-2.jpg'; // Image for About section
const PROFILE_CONFIG = {
  name: 'Dharwin',
  title: 'Full-Stack Developer | UI/UX Designer',
  handle: 'dharwin',
  status: 'Available for opportunities',
  contactText: 'Contact Me',
  socialLinks: {
    github: 'https://github.com/Dharwin77',
    linkedin: 'https://www.linkedin.com/in/dharwin-s/',
    instagram: 'https://www.instagram.com/s.dharwin_24?igsh=cXJyeDlveGwzZDd3',
    leetcode: 'https://leetcode.com/u/dharwins/',
  }
};

export const AnimatedProfileCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [homeTop, setHomeTop] = useState(0);
  const [aboutTop, setAboutTop] = useState(0);
  const [currentImage, setCurrentImage] = useState(PROFILE_PHOTO_HOME);

  // Get scroll positions of Home and About sections
  useEffect(() => {
    const updatePositions = () => {
      const homeSection = document.getElementById('home');
      const aboutSection = document.getElementById('about');

      if (homeSection && aboutSection) {
        setHomeTop(homeSection.offsetTop);
        setAboutTop(aboutSection.offsetTop);
      }
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  // Switch image at midpoint of animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const midPoint = (homeTop + aboutTop) / 2;

      if (scrollPos < midPoint) {
        setCurrentImage(PROFILE_PHOTO_HOME);
      } else {
        setCurrentImage(PROFILE_PHOTO_ABOUT);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [homeTop, aboutTop]);

  // Track scroll progress
  const { scrollY } = useScroll();

  // Calculate transition progress between home and about sections
  const scrollProgress = useTransform(
    scrollY,
    [homeTop, aboutTop],
    [0, 1]
  );

  // Smooth the scroll progress
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  // Animate horizontal position (right to left)
  const x = useTransform(smoothProgress, [0, 1], ['24vw', '-24vw']);

  // Animate rotation (flip effect)
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [0, 180, 360]);

  // Animate scale (slightly smaller during flip)
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.85, 1]);

  // Animate opacity during flip
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [1, 1, 1, 1]);

  // Animate vertical offset - up 2cm in Home only
  const verticalOffset = useTransform(smoothProgress, [0, 1], [-2, 0]); // -2cm in Home, 0cm in About

  // Calculate vertical position - follow scroll to place in About section
  const y = useTransform(
    scrollY,
    [0, aboutTop],
    [0, aboutTop]
  );

  const smoothY = useSpring(y, {
    stiffness: 50,
    damping: 20,
  });

  return (
    <motion.div
      ref={containerRef}
      className="hidden lg:block absolute top-0 left-1/2 z-50 pointer-events-none"
      style={{
        x: '-50%',
      }}
    >
      <motion.div
        style={{
          x,
          y: smoothY,
          rotateY,
          scale,
          opacity,
        }}
        className="pointer-events-auto"
      >
        <motion.div style={{ marginTop: useTransform(verticalOffset, (v) => `calc(20vh + 3cm + ${v}cm)`) }}>
          <ProfileCard
            name={PROFILE_CONFIG.name}
            title={PROFILE_CONFIG.title}
            handle={PROFILE_CONFIG.handle}
            status={PROFILE_CONFIG.status}
            contactText={PROFILE_CONFIG.contactText}
            socialLinks={PROFILE_CONFIG.socialLinks}
            avatarUrl={currentImage}
            showUserInfo={false}
            enableTilt={true}
            enableMobileTilt={false}
            hideBottomBlur={currentImage === PROFILE_PHOTO_ABOUT}
            onContactClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
