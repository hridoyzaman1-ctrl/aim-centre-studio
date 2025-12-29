import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Calendar, MessageSquare, Video, ShieldCheck, Clock, Users } from 'lucide-react';
import { Language } from '../App';

const CounselingSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'student' | 'parent'>('student');
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardMouseX = useMotionValue(0); const cardMouseY = useMotionValue(0);
  const springX = useSpring(cardMouseX, { damping: 30, stiffness: 100 });
  const springY = useSpring(cardMouseY, { damping: 30, stiffness: 100 });
  const imgX = useTransform(springX, [-0.5, 0.5], [35, -35]);
  const imgY = useTransform(springY, [-0.5, 0.5], [35, -35]);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const content = {
    en: {
      tag: "Mental Wellness",
      title: "EMOTIONAL INTELLIGENCE",
      desc: "Academic success is impossible without emotional stability. We bridge the gap between rigorous learning and psychological resilience through expert-led counseling.",
      btn1: "Schedule Session",
      btn2: "Meet the Experts",
      tabStudent: "Students",
      tabParent: "Parents",
      wellness: "Wellness Hub",
      guidance: "Guidance Suite",
      studentP: "Specialized counseling focusing on academic stress and peer dynamics for neurodiverse students.",
      parentP: "Empowering parents with strategies for home environment optimization and behavioral coaching.",
      availability: "Next Availability",
      time: "Tomorrow, 10:00 AM",
      footer: [
        { title: "Neurodiversity Experts", sub: "PhD Level Counselors" },
        { title: "Online Sessions", sub: "Encrypted Video Consults" },
        { title: "Crisis Support", sub: "24/7 Response System" }
      ],
      studentBen: [
        { icon: <ShieldCheck size={20} />, text: "Safe & Confidential" },
        { icon: <Clock size={20} />, text: "Flexible Scheduling" },
        { icon: <MessageSquare size={20} />, text: "1-on-1 Personalized Support" },
      ],
      parentBen: [
        { icon: <Users size={20} />, text: "Evidence-Based Guidance" },
        { icon: <Video size={20} />, text: "Live Video Consults" },
        { icon: <Calendar size={20} />, text: "Progress Reports" },
      ]
    },
    bn: {
      tag: "মানসিক সুস্থতা",
      title: "আবেগীয় বুদ্ধিমত্তা",
      desc: "আবেগীয় স্থিতিশীলতা ছাড়া একাডেমিক সাফল্য অসম্ভব। আমরা বিশেষজ্ঞ-চালিত কাউন্সেলিংয়ের মাধ্যমে কঠোর শিক্ষা এবং মনস্তাত্ত্বিক স্থিতিস্থাপকতার মধ্যে সেতুবন্ধন তৈরি করি।",
      btn1: "সেশন শিডিউল",
      btn2: "বিশেষজ্ঞদের দেখুন",
      tabStudent: "শিক্ষার্থী",
      tabParent: "অভিভাবক",
      wellness: "ওয়েলনেস হাব",
      guidance: "গাইডেন্স সুইট",
      studentP: "একাডেমিক চাপ এবং সহপাঠীদের সাথে সম্পর্কের ওপর ফোকাস করা বিশেষায়িত কাউন্সেলিং।",
      parentP: "বাড়ির পরিবেশ অপ্টিমাইজেশন এবং আচরণগত কোচিংয়ের কৌশলগুলির মাধ্যমে অভিভাবকদের ক্ষমতায়ন।",
      availability: "পরবর্তী সুযোগ",
      time: "আগামীকাল, সকাল ১০:০০",
      footer: [
        { title: "নিউরোলজিক্যাল বিশেষজ্ঞ", sub: "পিএইচডি লেভেল কাউন্সিলর" },
        { title: "অনলাইন সেশন", sub: "এনক্রিপ্টেড ভিডিও কনসাল্ট" },
        { title: "ক্রাইসিস সাপোর্ট", sub: "২৪/৭ রেসপন্স সিস্টেম" }
      ],
      studentBen: [
        { icon: <ShieldCheck size={20} />, text: "নিরাপদ এবং গোপনীয়" },
        { icon: <Clock size={20} />, text: "ফ্লেক্সিবল শিডিউলিং" },
        { icon: <MessageSquare size={20} />, text: "১-অন-১ ব্যক্তিগত সহায়তা" },
      ],
      parentBen: [
        { icon: <Users size={20} />, text: "প্রমাণ-ভিত্তিক নির্দেশিকা" },
        { icon: <Video size={20} />, text: "লাইভ ভিডিও কনসাল্ট" },
        { icon: <Calendar size={20} />, text: "প্রগতি রিপোর্ট" },
      ]
    }
  };

  const current = content[lang];

  return (
    <section ref={containerRef} className="relative py-24 md:py-40 overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      <motion.div style={{ y: backgroundY }} className="absolute top-0 right-0 w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.05] rounded-full blur-[100px] md:blur-[150px] pointer-events-none" aria-hidden="true" />
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 md:mb-32">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8"><div className="w-12 md:w-16 h-[1px] bg-indigo-500" /><span id="counseling-heading" className="text-[10px] md:text-[12px] font-black tracking-[0.4em] md:tracking-[0.5em] text-indigo-500 uppercase">{current.tag}</span></div>
            <h2 className="text-4xl md:text-8xl font-black tracking-tight leading-[0.95] md:leading-[0.9] text-black dark:text-white uppercase mb-8 md:mb-12">{current.title}</h2>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400 font-light leading-relaxed mb-10 md:mb-12 max-w-2xl">{current.desc}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label={current.btn1} className="px-10 py-5 bg-black text-white dark:bg-white dark:text-black rounded-full font-black uppercase tracking-widest text-[10px] md:text-[11px] shadow-2xl hover:bg-indigo-600 hover:text-white transition-all text-center focus:outline-none focus:ring-2 focus:ring-indigo-500">{current.btn1}</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label={current.btn2} className="px-10 py-5 glass border border-black/5 dark:border-white/10 text-black dark:text-white rounded-full font-black uppercase tracking-widest text-[10px] md:text-[11px] hover:bg-indigo-500/10 transition-all text-center focus:outline-none focus:ring-2 focus:ring-indigo-500">{current.btn2}</motion.button>
            </div>
          </motion.div>
          <div className="relative group mt-10 lg:mt-0">
            <motion.div 
              ref={cardRef} 
              onMouseMove={(e) => { 
                if (!cardRef.current || window.innerWidth < 1024) return; 
                const rect = cardRef.current.getBoundingClientRect(); 
                cardMouseX.set((e.clientX - rect.left) / rect.width - 0.5); 
                cardMouseY.set((e.clientY - rect.top) / rect.height - 0.5); 
              }} 
              onMouseLeave={() => { cardMouseX.set(0); cardMouseY.set(0); }} 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              className="relative aspect-auto min-h-[620px] md:aspect-[4/5] bg-gray-50 dark:bg-[#0a0a0a] rounded-[3rem] md:rounded-[4.5rem] border border-black/5 dark:border-white/10 overflow-hidden p-6 md:p-8 flex flex-col shadow-2xl transition-all duration-500"
            >
              <motion.div style={{ x: imgX, y: imgY, scale: 1.25 }} className="absolute inset-0 pointer-events-none opacity-[0.1] dark:opacity-[0.15] group-hover:opacity-25 transition-opacity duration-1000" aria-hidden="true">
                <img src="https://images.unsplash.com/photo-1527137342181-19aab11a8ee1?auto=format&fit=crop&q=80&w=1200" alt="" className="w-full h-full object-cover grayscale" />
              </motion.div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex gap-2 md:gap-4 mb-8 md:mb-12 p-1.5 md:p-2 bg-black/5 dark:bg-white/5 rounded-[2rem] md:rounded-[2.5rem] w-full max-w-[320px] mx-auto backdrop-blur-md border border-black/5 dark:border-white/5" role="tablist" aria-label="Counseling Categories">
                  <button 
                    role="tab"
                    aria-selected={activeTab === 'student'}
                    aria-controls="panel-student"
                    onClick={() => setActiveTab('student')} 
                    className={`flex-1 py-3 md:py-4 rounded-[1.5rem] md:rounded-[2rem] text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${activeTab === 'student' ? 'bg-indigo-600 text-white shadow-xl' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
                  >
                    {current.tabStudent}
                  </button>
                  <button 
                    role="tab"
                    aria-selected={activeTab === 'parent'}
                    aria-controls="panel-parent"
                    onClick={() => setActiveTab('parent')} 
                    className={`flex-1 py-3 md:py-4 rounded-[1.5rem] md:rounded-[2rem] text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${activeTab === 'parent' ? 'bg-indigo-600 text-white shadow-xl' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
                  >
                    {current.tabParent}
                  </button>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeTab} 
                    id={`panel-${activeTab}`}
                    role="tabpanel"
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -15 }} 
                    transition={{ duration: 0.4 }} 
                    className="flex-grow flex flex-col justify-center text-center px-2 pb-8"
                  >
                    <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black dark:text-white mb-4 md:mb-6">{activeTab === 'student' ? current.wellness : current.guidance}</h4>
                    <p className="text-gray-700 dark:text-gray-400 mb-8 md:mb-12 max-w-[280px] md:max-w-sm mx-auto leading-relaxed text-base md:text-lg font-light">{activeTab === 'student' ? current.studentP : current.parentP}</p>
                    <div className="space-y-4 md:space-y-6 text-left max-w-[260px] md:max-w-xs mx-auto">
                      {(activeTab === 'student' ? current.studentBen : current.parentBen).map((benefit, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 md:gap-5 group/item cursor-default">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-500/10 rounded-xl md:rounded-2xl flex items-center justify-center text-indigo-500 group-hover/item:bg-indigo-500 group-hover/item:text-white transition-all" aria-hidden="true">{benefit.icon}</div>
                          <span className="text-[9px] md:text-[11px] font-bold text-gray-800 dark:text-gray-300 uppercase tracking-widest transition-colors group-hover/item:text-indigo-500">{benefit.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <motion.div whileHover={{ scale: 1.02 }} className="mt-auto p-6 md:p-8 bg-indigo-500 text-white rounded-[2.5rem] md:rounded-[3.5rem] text-center shadow-xl cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-300" tabIndex={0} aria-label={`${current.availability}: ${current.time}`}>
                  <div className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-80 mb-1 md:mb-2">{current.availability}</div>
                  <div className="text-lg md:text-xl font-bold">{current.time}</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {current.footer.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }} 
              className="p-8 md:p-10 border border-black/5 dark:border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] bg-gray-50/50 dark:bg-white/[0.02] flex flex-col items-center text-center transition-all duration-500 hover:bg-white dark:hover:bg-white/5 shadow-sm hover:shadow-xl"
            >
              <h5 className="text-lg md:text-xl font-black uppercase tracking-tighter text-black dark:text-white mb-1 md:mb-2">{item.title}</h5>
              <p className="text-[9px] md:text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounselingSection;