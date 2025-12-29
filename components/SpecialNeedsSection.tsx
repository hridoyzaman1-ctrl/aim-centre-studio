import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Language } from '../App';

const LevelGraphicL1 = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[180px] md:max-w-[200px]" aria-hidden="true">
      <motion.path d="M120 10L215 65V175L120 230L25 175V65L120 10Z" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 8" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="text-indigo-500/25" />
      <motion.circle cx="120" cy="120" r="105" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 10" animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="text-indigo-500/15" />
      <motion.path d="M120 35L194 77V163L120 205L46 163V77L120 35Z" stroke="currentColor" strokeWidth="1.5" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.5 }} transition={{ duration: 3, ease: "easeInOut" }} className="text-indigo-500" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.line key={i} x1="120" y1="120" x2={120 + Math.cos((angle * Math.PI) / 180) * 74} y2={120 + Math.sin((angle * Math.PI) / 180) * 74} stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: [0, 1, 0], opacity: [0, 0.35, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }} className="text-indigo-400" />
      ))}
      <motion.path d="M120 80L155 100V140L120 160L85 140V100L120 80Z" fill="currentColor" animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="text-indigo-500" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.circle key={`node-${i}`} cx={120 + Math.cos((angle * Math.PI) / 180) * 85} cy={120 + Math.sin((angle * Math.PI) / 180) * 85} r="4.5" fill="#6366f1" animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.9, 0.3], filter: ["blur(0px)", "blur(3px)", "blur(0px)"] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }} />
      ))}
      <motion.rect width="160" height="2" fill="url(#scan_gradient_l1)" animate={{ y: [40, 200, 40], opacity: [0, 0.7, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} x="40" />
      <defs><linearGradient id="scan_gradient_l1" x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#6366f1" stopOpacity="0" /><stop offset="0.5" stopColor="#6366f1" /><stop offset="1" stopColor="#6366f1" stopOpacity="0" /></linearGradient></defs>
    </svg>
    <motion.div className="absolute w-40 h-40 bg-indigo-500/10 blur-[100px] rounded-full" animate={{ scale: [1, 2, 1], opacity: [0.15, 0.5, 0.15] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
  </div>
);

const LevelGraphicL2 = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[180px] md:max-w-[200px]" aria-hidden="true">
      <motion.path d="M120 40L200 180L40 180Z" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1, opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity }} className="text-indigo-500" />
      <motion.path d="M120 200L40 60L200 60Z" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1, opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} className="text-indigo-500" />
      <motion.circle cx="120" cy="120" r="12" stroke="#6366f1" strokeWidth="2.5" animate={{ scale: [1, 1.6, 1], strokeWidth: [2.5, 1.5, 2.5] }} transition={{ duration: 1.8, repeat: Infinity }} />
      {[0, 120, 240].map((angle, i) => (
        <motion.circle key={i} cx="120" cy="120" r="5" fill="#6366f1" animate={{ x: [Math.cos(angle) * 70, Math.cos(angle + Math.PI * 2) * 70], y: [Math.sin(angle) * 70, Math.sin(angle + Math.PI * 2) * 70], opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 1.3 }} />
      ))}
    </svg>
    <motion.div className="absolute inset-0 bg-gradient-to-t from-indigo-500/15 to-transparent pointer-events-none rounded-full blur-3xl" animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
  </div>
);

const LevelGraphicL3 = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[180px] md:max-w-[220px]" aria-hidden="true">
      {[30, 60, 90, 110].map((radius, i) => (
        <motion.circle key={i} cx="120" cy="120" r={radius} stroke="currentColor" strokeWidth="0.75" strokeDasharray="5 5" initial={{ rotate: 0 }} animate={{ rotate: i % 2 === 0 ? 360 : -360 }} transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "linear" }} className="text-indigo-500/40" />
      ))}
      <motion.path d="M120 30L190 120L120 210L50 120Z" stroke="#6366f1" strokeWidth="2.5" animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="120" cy="120" r="18" fill="#6366f1" animate={{ scale: [0.8, 2.5, 0.8], opacity: [0.3, 0, 0.3] }} transition={{ duration: 2.2, repeat: Infinity }} />
    </svg>
    <motion.div className="absolute w-36 h-36 border border-indigo-500/30 rounded-full" animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
  </div>
);

const LevelCard: React.FC<{ level: string, title: string, description: string, idx: number }> = ({ level, title, description, idx }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 25, stiffness: 120 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 25, stiffness: 120 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      console.log(`Level Card selected: ${level} - ${title}`);
    }
  };

  const renderGraphic = () => {
    if (level === 'L1') return <LevelGraphicL1 />;
    if (level === 'L2') return <LevelGraphicL2 />;
    if (level === 'L3') return <LevelGraphicL3 />;
    return null;
  };

  return (
    <motion.div 
      ref={cardRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }} 
      onKeyDown={handleKeyDown}
      style={{ rotateX: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : rotateX, rotateY: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : rotateY, transformStyle: "preserve-3d" }} 
      initial={{ opacity: 0, y: 60, scale: 0.95 }} 
      whileInView={{ opacity: 1, y: 0, scale: 1 }} 
      transition={{ delay: idx * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10, scale: 1.01 }}
      role="button"
      tabIndex={0}
      aria-label={`${level}: ${title}. ${description}`}
      className="group relative min-h-[500px] md:min-h-[660px] bg-slate-50 dark:bg-[#080808] border border-black/[0.03] dark:border-white/10 rounded-[2.5rem] md:rounded-[4rem] lg:rounded-[5rem] p-10 md:p-14 overflow-hidden flex flex-col justify-between shadow-3xl transition-all duration-700 hover:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500 outline-none"
    >
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 transition-opacity duration-1000 bg-indigo-500 blur-[120px] md:blur-[150px]" />
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow mb-8 transition-transform duration-700 group-hover:scale-105 md:group-hover:scale-110" style={{ transform: "translateZ(60px)" }}>
        {renderGraphic()}
      </div>
      <div style={{ transform: "translateZ(40px)" }} className="relative z-10 space-y-4 md:space-y-6">
        <div className="flex items-end gap-3 md:gap-5 mb-2">
          <span className="text-6xl md:text-9xl font-black text-indigo-500/10 leading-none group-hover:text-indigo-500/25 transition-all duration-700 select-none tracking-tighter" aria-hidden="true">{level}</span>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} transition={{ duration: 1, delay: 0.5 }} className="h-[2px] bg-indigo-500 mb-3 md:mb-5 group-hover:w-24 md:group-hover:w-32 transition-all duration-700" />
        </div>
        <h4 className="text-xl md:text-3xl font-black text-black dark:text-white uppercase tracking-tight transition-colors duration-700 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{title}</h4>
        <p className="text-gray-700 dark:text-gray-400 text-sm md:text-base leading-relaxed transition-all duration-700 opacity-90 group-hover:opacity-100 group-hover:text-gray-900 dark:group-hover:text-gray-200 font-light">{description}</p>
      </div>
    </motion.div>
  );
};

const SpecialNeedsSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const xParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const content = {
    en: {
      tag: "Inclusive Pedagogy",
      title: "THE POWER OF NEURODIVERSITY",
      desc: "Every mind is a unique signature. Our sensory-focused approach treats diversity not as a challenge, but as a catalyst for tailored academic breakthroughs.",
      mentor: "Mentor Ratio",
      footerTitle: "Specialized Learning Paths",
      footerDesc: "From Occupational Therapy integration to speech-language pathology, our support systems are woven directly into the daily curriculum.",
      tags: ['IEP Design', 'ABA Principles', 'Sensory Labs', 'Parent Training'],
      levels: [
        { level: 'L1', title: 'Structural Socializing', description: 'Foundational support for children requiring minimal assistance, prioritizing social-pragmatic intervention and self-regulation mastery.' },
        { level: 'L2', title: 'Targeted Intervention', description: 'Substantial, focused support through immersive language therapy and adaptive learning environments for complex sensory landscapes.' },
        { level: 'L3', title: 'Comprehensive Sanctuary', description: 'Highly individualized, 1-on-1 sensory integration and cognitive development programs for children requiring intensive developmental support.' }
      ]
    },
    bn: {
      tag: "ইনক্লুসিভ পেডাগোজি",
      title: "নিউরোডাইভারসিটির শক্তি",
      desc: "প্রতিটি মন এক একটি অনন্য স্বাক্ষর। আমাদের সেন্সরি-ফোকাসড পদ্ধতি বৈচিত্র্যকে চ্যালেঞ্জ হিসেবে নয়, বরং মানানসই একাডেমিক সাফল্যের অনুঘটক হিসেবে দেখে।",
      mentor: "মেন্টর অনুপাত",
      footerTitle: "বিশেষায়িত শিক্ষার পথ",
      footerDesc: "অকুপেশনাল থেরাপি থেকে শুরু করে স্পিচ-ল্যাংগুয়েজ প্যাথলজি পর্যন্ত, আমাদের সহায়তা ব্যবস্থা প্রতিদিনের পাঠ্যক্রমের সাথে ওতপ্রোতভাবে জড়িত।",
      tags: ['IEP ডিজাইন', 'ABA প্রিন্সিপাল', 'সেন্সরি ল্যাব', 'অভিভাবক প্রশিক্ষণ'],
      levels: [
        { level: 'L1', title: 'স্ট্রাকচারাল সোশ্যালাইজিং', description: 'ন্যূনতম সহায়তা প্রয়োজন এমন শিশুদের জন্য সামাজিক-প্রাগম্যাটিক ইন্টারভেনশন এবং আত্ম-নিয়ন্ত্রণ মাস্টারি।' },
        { level: 'L2', title: 'টার্গেটেড ইন্টারভেনশন', description: 'জটিল সেন্সরি ল্যান্ডস্কেপের জন্য ভাষা থেরাপি এবং অ্যাডাপটিভ লার্নিং এনভায়রনমেন্টের মাধ্যমে ফোকাসড সাপোর্ট।' },
        { level: 'L3', title: 'কম্প্রিহেনসিভ স্যাঙ্কচুয়ারি', description: 'নিবিড় উন্নয়নমূলক সহায়তা প্রয়োজন এমন শিশুদের জন্য ১-অন-১ সেন্সরি ইন্টিগ্রেশন এবং জ্ঞানীয় বিকাশ প্রোগ্রাম।' }
      ]
    }
  };

  const current = content[lang];

  return (
    <section ref={containerRef} className="py-24 md:py-64 bg-white dark:bg-[#050505] transition-colors duration-700 overflow-hidden relative">
      <motion.div style={{ x: xParallax, y: yParallax }} className="absolute top-0 right-0 w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] bg-indigo-500/[0.08] rounded-full blur-[100px] md:blur-[180px] pointer-events-none" />
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-32 items-center mb-24 md:mb-48">
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 md:gap-8 mb-6 md:mb-10">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} transition={{ duration: 1.2 }} className="h-[2px] bg-indigo-500" />
              <span id="special-needs-heading" className="text-[12px] md:text-[14px] font-black tracking-[0.4em] md:tracking-[0.6em] text-indigo-500 uppercase">{current.tag}</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
              viewport={{ once: true }} 
              className="text-4xl md:text-7xl lg:text-6xl xl:text-[5.5vw] font-black tracking-tight leading-[0.95] md:leading-[0.88] text-black dark:text-white transition-colors duration-700 uppercase mb-8 md:mb-12 drop-shadow-2xl"
            >
              {lang === 'en' ? 'THE POWER OF' : ''} <br className="hidden lg:block" />
              <span className="text-indigo-600 dark:text-indigo-400 block lg:inline-block whitespace-normal">{lang === 'en' ? 'NEURODIVERSITY' : current.title}</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4 }} viewport={{ once: true }} className="text-lg md:text-2xl text-gray-700 dark:text-gray-400 font-light leading-relaxed max-w-3xl mb-4">{current.desc}</motion.p>
          </div>
          <div className="lg:col-span-4 relative mt-10 lg:mt-0">
            <motion.div style={{ y: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : useTransform(scrollYProgress, [0, 1], [0, -200]) }} className="aspect-square rounded-[2.5rem] md:rounded-[4rem] lg:rounded-[5rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-3xl bg-slate-50 dark:bg-black group relative">
              <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale brightness-[1.05] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1500 ease-out" alt="Children engaging in sensory learning activities" />
              <div className="absolute inset-0 bg-indigo-600/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </motion.div>
            <div className="absolute -bottom-6 md:-bottom-10 left-4 bg-indigo-600 text-white p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] shadow-3xl z-20 backdrop-blur-lg border border-white/10">
              <div className="text-3xl md:text-6xl font-black mb-1 md:mb-2 tracking-tighter">1:1</div>
              <div className="text-[9px] md:text-[12px] font-bold uppercase tracking-[0.2em] opacity-90">{current.mentor}</div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
          {current.levels.map((item, idx) => (<LevelCard key={idx} {...item} idx={idx} />))}
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} 
          className="mt-24 md:mt-48 p-10 md:p-24 rounded-[3rem] md:rounded-[5rem] lg:rounded-[6.5rem] relative overflow-hidden bg-slate-50 dark:bg-[#080808] border border-black/[0.03] dark:border-white/10 shadow-3xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 transition-all duration-700 hover:border-indigo-500/40"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] to-transparent pointer-events-none" aria-hidden="true" />
          <div className="max-w-xl relative z-10 text-center lg:text-left">
            <h5 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 md:mb-8 text-black dark:text-white transition-colors">{current.footerTitle}</h5>
            <p className="text-gray-700 dark:text-gray-400 text-base md:text-xl leading-relaxed font-light">{current.footerDesc}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:gap-6 justify-center relative z-10">
            {current.tags.map((tag, i) => (<motion.span key={i} whileHover={{ scale: 1.1, y: -5 }} className="px-6 md:px-12 py-3 md:py-6 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl md:rounded-3xl text-[9px] md:text-[12px] font-black uppercase tracking-widest text-indigo-500 transition-all cursor-default backdrop-blur-xl shadow-lg">{tag}</motion.span>))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialNeedsSection;