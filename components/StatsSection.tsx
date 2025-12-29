import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Language } from '../App';

const StatsSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.1);
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.1);
  };

  // Reverse parallax: Elements move dynamically based on scroll position
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y4 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const parallaxOffsets = [y1, y2, y3, y4];

  const stats = [
    { label: { en: 'Board Success Rate', bn: 'বোর্ড পাশের হার' }, value: '98%' },
    { label: { en: 'Expert Instructors', bn: 'দক্ষ প্রশিক্ষক' }, value: '120+' },
    { label: { en: 'Students Enrolled', bn: 'ভর্তি হওয়া শিক্ষার্থী' }, value: '5.2k' },
    { label: { en: 'Digital Resources', bn: 'ডিজিটাল রিসোর্স' }, value: '850+' },
  ];

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="py-32 md:py-64 bg-white dark:bg-[#050505] relative z-30 transition-colors duration-700 overflow-hidden"
    >
      <motion.div style={{ x: springX, y: springY }} className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[70vw] h-[90vw] md:h-[70vw] bg-indigo-500/10 blur-[120px] md:blur-[180px] rounded-full" />
      </motion.div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-32">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              style={{ y: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : parallaxOffsets[idx] }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 md:gap-10 group cursor-default"
            >
              <motion.div 
                whileHover={{ scale: 1.1, x: 10, color: '#6366f1' }}
                className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-black dark:text-white transition-all duration-700 drop-shadow-2xl leading-none"
              >
                {stat.value}
              </motion.div>
              <div className="text-[10px] md:text-[13px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-gray-400 dark:text-gray-500 border-l-[2px] md:border-l-[3px] border-indigo-500/20 pl-4 md:pl-8 h-fit transition-all duration-700 group-hover:pl-10 group-hover:border-indigo-500 group-hover:text-black dark:group-hover:text-white">
                {stat.label[lang]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative seamless line */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-300, 300]) }} 
        className="absolute top-0 right-10 md:right-20 w-[1px] h-[800px] md:h-[1200px] bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent pointer-events-none opacity-40 hidden sm:block" 
      />
    </section>
  );
};

export default StatsSection;