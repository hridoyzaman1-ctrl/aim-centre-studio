import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Language } from '../App';

const DeepNeuralNetwork = ({ isDark }: { isDark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 150;
    const perspective = 800;

    class Particle {
      x: number; y: number; z: number; vx: number; vy: number; vz: number; size: number;
      constructor() {
        this.x = (Math.random() - 0.5) * 2000;
        this.y = (Math.random() - 0.5) * 2000;
        this.z = Math.random() * perspective;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = (Math.random() - 0.5) * 0.5;
        this.size = 1.8;
      }
      update(mouse: { x: number; y: number }, width: number, height: number) {
        this.x += this.vx; this.y += this.vy; this.z += this.vz;
        const mX = mouse.x - width / 2; const mY = mouse.y - height / 2;
        const dx = this.x - mX; const dy = this.y - mY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          const force = (300 - dist) / 300;
          this.x += (dx / dist) * force * 5; this.y += (dy / dist) * force * 5;
        }
        if (this.z <= 0) this.z = perspective;
        if (this.z > perspective) this.z = 0;
        if (Math.abs(this.x) > 1000) this.vx *= -1;
        if (Math.abs(this.y) > 1000) this.vy *= -1;
      }
      project(width: number, height: number) {
        const factor = perspective / (perspective + this.z);
        const x2d = this.x * factor + width / 2;
        const y2d = this.y * factor + height / 2;
        const size2d = this.size * factor;
        return { x: x2d, y: y2d, size: size2d, factor };
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width; const h = canvas.height;
      const mouse = mouseRef.current;
      const projected = particles.map(p => { p.update(mouse, w, h); return { ...p.project(w, h), p }; });
      projected.forEach((p1, i) => {
        ctx.fillStyle = isDark ? `rgba(129, 140, 248, ${p1.factor * 0.85})` : `rgba(79, 70, 229, ${p1.factor * 0.95})`;
        ctx.beginPath(); ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2); ctx.fill();
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
          if (dist < 150 * p1.factor) {
            ctx.strokeStyle = isDark ? `rgba(99, 102, 241, ${(1 - dist / (150 * p1.factor)) * 0.3 * p1.factor})` : `rgba(79, 70, 229, ${(1 - dist / (150 * p1.factor)) * 0.7 * p1.factor})`;
            ctx.lineWidth = (isDark ? 0.8 : 1.6) * p1.factor; ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', handleMouseMove); window.addEventListener('resize', init);
    init(); animate();
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('resize', init); };
  }, [isDark]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[5] opacity-100" />;
};

const GeometricVortex = ({ isDark }: { isDark: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 40);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * -40);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-[4]">
      <motion.div style={{ rotateY: springX, rotateX: springY }} className="relative w-[800px] h-[800px] flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute border-2 ${isDark ? 'border-indigo-500/20' : 'border-indigo-500/80'}`}
            style={{ width: `${(i + 1) * 300}px`, height: `${(i + 1) * 300}px`, rotateX: i * 45, rotateY: i * 30 }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
          >
            <div className={`absolute inset-0 border-t-2 ${isDark ? 'border-indigo-400/40' : 'border-indigo-500/95'}`} />
            <div className={`absolute inset-0 border-l-2 ${isDark ? 'border-indigo-400/20' : 'border-indigo-500/65'}`} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const HolographicRings = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-[3]">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute border-[1.5px] rounded-full ${isDark ? 'border-indigo-500/25' : 'border-indigo-500/85'}`}
          style={{ width: `${600 + i * 100}px`, height: `${600 + i * 100}px` }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: isDark ? [0.2, 0.5, 0.2] : [0.5, 0.9, 0.5], rotate: [0, 360] }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear", delay: i * 2 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-500/60 rounded-full blur-[3px]" />
          {i % 2 === 0 && <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-[1.5px] bg-gradient-to-r from-transparent ${isDark ? 'via-indigo-400/40' : 'via-indigo-500/75'} to-transparent`} />}
        </motion.div>
      ))}
    </div>
  );
};

const FloatingEquations = () => {
  const equations = ["E=mc²", "∫f(x)dx", "∇×E", "Φ = (1+√5)/2", "∑n=1", "λ=h/p", "ψ(r,t)"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 z-[6]">
      {equations.map((eq, i) => (
        <motion.div key={i} className="absolute text-indigo-400 font-serif text-sm font-bold italic" style={{ left: `${Math.random() * 80 + 10}%`, top: `${Math.random() * 80 + 10}%` }}
          animate={{ y: [0, -40, 0], opacity: [0, 0.8, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
        >
          {eq}
        </motion.div>
      ))}
    </div>
  );
};

const MagneticButton = ({ children, className, onClick }: { children?: React.ReactNode, className?: string, onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const dx = useSpring(x, springConfig);
  const dy = useSpring(y, springConfig);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e; const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2; const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.35); y.set((clientY - centerY) * 0.35);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };
  return <motion.button ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onClick} style={{ x: dx, y: dy }} className={className}>{children}</motion.button>;
};

const CursorGlow = ({ isDark }: { isDark: boolean }) => {
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener('mousemove', handleMouseMove); return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  return <motion.div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" style={{ background: useTransform([mouseX, mouseY], ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, ${isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.15)'}, transparent 80%)`) }} />;
};

export default function Hero({ isDark, lang }: { isDark: boolean, lang: Language }) {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityFade = useTransform(scrollY, [0, 800], [1, 0]);
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);

  const titleWords = ["AIM", "CENTRE", "360"];
  
  const content = {
    en: {
      desc: "Mastering English Medium, Version & Spoken Linguistic Arts. Empowering Tiny Explorers and Children with Special Needs through Sensory-Focused Pedagogy.",
      enroll: "Enroll Now",
      counsel: "Counseling Session",
      scroll: "Scroll to Learn"
    },
    bn: {
      desc: "ইংলিশ মিডিয়াম, ভার্সন এবং স্পোকেন লিঙ্গুইস্টিক আর্টস-এ দক্ষতা অর্জন। সেন্সরি-ফোকাসড পেডাগোজির মাধ্যমে ক্ষুদে অভিযাত্রী এবং বিশেষ চাহিদা সম্পন্ন শিশুদের ক্ষমতায়ন।",
      enroll: "এখনই ভর্তি হোন",
      counsel: "কাউন্সেলিং সেশন",
      scroll: "শিখতে স্ক্রল করুন"
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-700 pb-16 md:pb-20 pt-24 md:pt-32">
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-black/80 via-transparent to-[#050505]' : 'bg-gradient-to-b from-white/95 via-transparent to-white'} z-10 transition-colors duration-700`} />
        <motion.div style={{ y: yParallax }} className="absolute inset-0">
          <motion.img initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: isDark ? 0.15 : 0.08 }} transition={{ duration: 6, ease: [0.16, 1, 0.3, 1] }} src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072" alt="Educational Background" className="w-full h-full object-cover grayscale brightness-[1.1] dark:brightness-[0.4]" />
        </motion.div>
        <GeometricVortex isDark={isDark} />
        <HolographicRings isDark={isDark} />
        <DeepNeuralNetwork isDark={isDark} />
        <FloatingEquations />
        <div className={`absolute inset-0 ${isDark ? 'bg-[linear-gradient(to_right,#6366f115_1px,transparent_1px),linear-gradient(to_bottom,#6366f115_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#6366f020_1px,transparent_1px),linear-gradient(to_bottom,#6366f020_1px,transparent_1px)]'} bg-[size:120px_120px] ${isDark ? 'opacity-60' : 'opacity-90'} [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] transition-colors duration-700`} />
      </div>

      <motion.div style={{ opacity: opacityFade }} className="relative z-20 w-full max-w-[100vw] mx-auto px-5 md:px-6 text-center select-none">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5 }} className="mb-6 md:mb-14 flex items-center justify-center gap-4 md:gap-10">
          <motion.div animate={{ width: [0, 40, 40], opacity: [0, 1, 1] }} className={`h-[1px] hidden sm:block ${isDark ? 'bg-indigo-500/70' : 'bg-indigo-500/50'}`} />
          <span className={`text-[10px] md:text-[13px] font-black uppercase tracking-[0.4em] md:tracking-[1em] ${isDark ? 'text-indigo-400 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]' : 'text-indigo-600'}`}>
            Aim High, Achieve Infinity
          </span>
          <motion.div animate={{ width: [0, 40, 40], opacity: [0, 1, 1] }} className={`h-[1px] hidden sm:block ${isDark ? 'bg-indigo-500/70' : 'bg-indigo-500/50'}`} />
        </motion.div>

        <div className="mb-8 md:mb-12 py-2 md:py-4 px-2 md:px-4 relative overflow-visible">
          <div className="absolute inset-0 bg-white/5 dark:bg-black/5 backdrop-blur-[2px] pointer-events-none rounded-[2rem] md:rounded-[3rem] -z-10" />
          <motion.h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8vw] xl:text-[7.5vw] font-black tracking-tight leading-[1] font-display flex flex-wrap justify-center items-center gap-x-3 md:gap-x-10 text-black dark:text-white transition-colors duration-700 drop-shadow-[0_10px_15px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
            {titleWords.map((word, i) => (
              <div key={i} className="overflow-visible inline-block">
                <motion.span 
                  initial={{ y: 250, opacity: 0 }} 
                  animate={{ 
                    y: 0, 
                    opacity: hoveredWord !== null && hoveredWord !== i ? 0.3 : 1, 
                    scale: hoveredWord === i ? 1.05 : 1 
                  }}
                  transition={{ 
                    y: { duration: 2, delay: 0.8 + (i * 0.18), ease: [0.16, 1, 0.3, 1] }, 
                    opacity: { duration: 0.4 }, 
                    scale: { duration: 0.4 } 
                  }}
                  onMouseEnter={() => setHoveredWord(i)} 
                  onMouseLeave={() => setHoveredWord(null)}
                  className={`inline-block cursor-default transition-all duration-300 relative px-1 sm:px-3 ${hoveredWord === i ? 'text-indigo-500 dark:text-indigo-400' : ''}`}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </motion.h1>
        </div>

        <motion.p initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.8, delay: 2 }} className={`text-sm sm:text-base md:text-xl lg:text-2xl ${isDark ? 'text-gray-200/90 drop-shadow-2xl' : 'text-gray-800'} max-w-4xl mx-auto mb-10 md:mb-20 leading-relaxed font-light tracking-tight transition-colors duration-700 px-2`}>
          {content[lang].desc}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.8, delay: 2.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 px-4">
          <MagneticButton className="group relative w-full sm:w-auto px-10 md:px-16 py-5 md:py-8 bg-black text-white dark:bg-white dark:text-black text-[10px] md:text-[13px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] rounded-full overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-2xl">
            <span className="relative z-10">{content[lang].enroll}</span>
            <div className="absolute inset-0 bg-indigo-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
            <motion.span whileHover={{ x: 5 }} className="absolute right-6 md:right-10 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-10 group-hover:translate-x-0 hidden sm:block">
              <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </motion.span>
          </MagneticButton>
          <MagneticButton className={`w-full sm:w-auto px-10 md:px-16 py-5 md:py-8 ${isDark ? 'glass text-white' : 'light-glass text-black'} text-[10px] md:text-[13px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] rounded-full hover:bg-black/5 dark:hover:bg-white/20 hover:scale-110 transition-all group active:scale-95 border border-transparent hover:border-indigo-400/60 transition-colors duration-700 drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]`}>
            <span className="group-hover:text-indigo-400 transition-colors">{content[lang].counsel}</span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <CursorGlow isDark={isDark} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }} className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-4 z-30 pointer-events-none">
        <div className={`relative w-[1px] h-10 md:h-20 ${isDark ? 'bg-gradient-to-b from-indigo-500/90 via-indigo-500/10 to-transparent' : 'bg-gradient-to-b from-indigo-500/70 via-indigo-500/10 to-transparent'}`}>
          <motion.div animate={{ top: ["0%", "88%", "0%"] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className={`absolute left-[-2px] w-[5px] h-3 md:h-6 bg-indigo-400 rounded-full ${isDark ? 'shadow-[0_0_30px_rgba(129,140,241,1)]' : 'shadow-[0_0_20px_rgba(99,102,241,0.6)]'}`} />
        </div>
        <span className={`text-[7px] md:text-[10px] font-black uppercase tracking-[0.8em] md:tracking-[1em] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{content[lang].scroll}</span>
      </motion.div>
      <div className={`absolute bottom-0 left-0 right-0 h-48 md:h-96 ${isDark ? 'bg-gradient-to-t from-[#050505] to-transparent' : 'bg-gradient-to-t from-white to-transparent'} z-20 pointer-events-none transition-colors duration-700`} />
    </section>
  );
}