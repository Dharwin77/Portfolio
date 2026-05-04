import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring configuration for smooth movement
    const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
    const dotX = useSpring(mouseX, springConfig);
    const dotY = useSpring(mouseY, springConfig);

    const ringX = useSpring(mouseX, { damping: 30, stiffness: 150 });
    const ringY = useSpring(mouseY, { damping: 30, stiffness: 150 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsPressed(true);
        const handleMouseUp = () => setIsPressed(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.tagName === 'A' || 
                               target.tagName === 'BUTTON' || 
                               target.closest('button') || 
                               target.closest('a') ||
                               target.classList.contains('cursor-pointer');
            setIsHovered(!!isClickable);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
            {/* Outer Ring */}
            <motion.div
                className="absolute w-8 h-8 border border-cosmic-cyan rounded-full"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isHovered ? 1.5 : isPressed ? 0.8 : 1,
                    opacity: isHovered ? 0.6 : 0.3,
                }}
            />

            {/* Inner Dot */}
            <motion.div
                className="absolute w-1.5 h-1.5 bg-cosmic-cyan rounded-full shadow-[0_0_10px_rgba(94,234,212,0.8)]"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isHovered ? 0 : isPressed ? 1.5 : 1,
                }}
            />

            {/* Hover Glow */}
            <motion.div
                className="absolute w-12 h-12 bg-cosmic-cyan/10 blur-xl rounded-full"
                animate={{
                    scale: isHovered ? 2 : 0,
                    opacity: isHovered ? 0.5 : 0,
                }}
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </div>
    );
};

export default CustomCursor;
