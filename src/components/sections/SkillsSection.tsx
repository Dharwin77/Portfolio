import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Skill {
  name: string;
  level: number;
  color: string;
  orbitRadius: number;
  orbitDuration: number;
  size: number;
}

const skills: Skill[] = [
  { name: 'HTML', level: 95, color: '#e34f26', orbitRadius: 80, orbitDuration: 20, size: 28 },
  { name: 'CSS', level: 90, color: '#1572b6', orbitRadius: 110, orbitDuration: 25, size: 32 },
  { name: 'JavaScript', level: 92, color: '#f7df1e', orbitRadius: 145, orbitDuration: 30, size: 40 },
  { name: 'React', level: 88, color: '#61dafb', orbitRadius: 185, orbitDuration: 35, size: 45 },
  { name: 'Node.js', level: 85, color: '#339933', orbitRadius: 230, orbitDuration: 40, size: 42 },
  { name: 'TypeScript', level: 87, color: '#3178c6', orbitRadius: 275, orbitDuration: 45, size: 38 },
  { name: 'Python', level: 82, color: '#3776ab', orbitRadius: 320, orbitDuration: 50, size: 44 },
  { name: 'AI/ML', level: 78, color: '#ff6f61', orbitRadius: 365, orbitDuration: 55, size: 50 },
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  return (
    <section id="skills" className="section-container overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold gradient-text mb-4">
            SKILL SOLAR SYSTEM
          </h2>
          <p className="text-muted-foreground text-lg">
            Each planet represents a skill orbiting my core expertise
          </p>
        </motion.div>

        {/* Solar System Container */}
        <div className="relative h-[500px] md:h-[700px] flex items-center justify-center">
          {/* The Sun (Core) */}
          <motion.div
            className="absolute z-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div
                className="w-16 h-16 md:w-24 md:h-24 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #ffd700 0%, #ff8c00 50%, #ff4500 100%)',
                  boxShadow: '0 0 60px #ffd700, 0 0 100px #ff8c00, 0 0 140px #ff4500',
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 50%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Orbit Rings */}
          {skills.map((skill, index) => (
            <motion.div
              key={`orbit-${skill.name}`}
              className="absolute border border-muted/20 rounded-full"
              style={{
                width: skill.orbitRadius * 2,
                height: skill.orbitRadius * 2,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            />
          ))}

          {/* Orbiting Planets (Skills) */}
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="absolute"
              style={{
                width: skill.orbitRadius * 2,
                height: skill.orbitRadius * 2,
              }}
              initial={{ opacity: 0 }}
              animate={isInView ? { 
                opacity: 1,
                rotate: 360 
              } : {}}
              transition={{
                opacity: { duration: 0.5, delay: 0.5 + index * 0.1 },
                rotate: {
                  duration: skill.orbitDuration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.5 + index * 0.1,
                },
              }}
            >
              {/* Planet */}
              <motion.div
                className="absolute cursor-pointer"
                style={{
                  width: skill.size,
                  height: skill.size,
                  left: '50%',
                  top: 0,
                  marginLeft: -skill.size / 2,
                  marginTop: -skill.size / 2,
                }}
                whileHover={{ scale: 1.3 }}
                onHoverStart={() => setHoveredSkill(skill)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                <motion.div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${skill.color}, ${skill.color}88)`,
                    boxShadow: `0 0 20px ${skill.color}66`,
                  }}
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: skill.orbitDuration,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <span className="text-[8px] md:text-xs font-orbitron font-bold text-foreground drop-shadow-lg">
                    {skill.name.substring(0, 2)}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}

          {/* Skill Info Tooltip */}
          {hoveredSkill && (
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-card px-6 py-4 z-30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ background: hoveredSkill.color }}
                />
                <div>
                  <h4 className="font-orbitron font-bold text-foreground">
                    {hoveredSkill.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: hoveredSkill.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${hoveredSkill.level}%` }}
                      />
                    </div>
                    <span className="text-sm text-cosmic-cyan font-orbitron">
                      {hoveredSkill.level}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Skills Legend (Mobile) */}
        <motion.div
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          {skills.map((skill) => (
            <div
              key={`legend-${skill.name}`}
              className="glass-card px-3 py-2 flex items-center gap-2"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ background: skill.color }}
              />
              <span className="text-xs font-orbitron text-muted-foreground">
                {skill.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
