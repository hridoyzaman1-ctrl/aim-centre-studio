import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Language } from '../App';

interface FeatureCardProps {
  item: {
    title: string;
    tag: string;
    desc: string;
    img: string;
  };
  idx: number;
  lang: Language;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ item, idx, lang }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 25, stiffness: 120 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 25, stiffness: 120 });
  const imgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [40, -40]), { damping: 40, stiffness: 90 });
  const imgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [40, -40]), { damping: 40, stiffness: 90 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Logic for card interaction can go here
      console.log(`Interacted with feature: ${item.title}`);
    }
  };

  const exploreText = lang === 'en' ? 'Explore Program' : 'প্রোগ্রামটি দেখুন';

  return (
    <motion.div 
      ref={cardRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: 60, scale: 0.95 }} 
      whileInView={{ opacity: 1, y: 0, scale: 1 }} 
      transition={{ delay: idx * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10, scale: 1.02 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      role="button"
      tabIndex={0}
      aria-label={`Learn more about ${item.title}`}
      className="group relative bg-slate-50 dark:bg-[#080808] p-10 md:p-16 aspect-[4/5] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-700 shadow-2xl hover:shadow-indigo-500/20 border border-black/[0.03] dark:border-white/5 focus:ring-4 focus:ring-indigo-500 outline-none"
    >
      <motion.div style={{ x: imgX, y: imgY, scale: 1.5 }} className="absolute inset-0 opacity-70 group-hover:opacity-100 transition-all duration-1000 pointer-events-none">
        <img src={item.img} className="w-full h-full object-cover grayscale brightness-[1.1] dark:brightness-[0.7] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1500 ease-out" alt="" aria-hidden="true" />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-indigo-900/10 transition-colors duration-700" />
      </motion.div>
      <div style={{ transform: "translateZ(80px)" }} className="relative z-10">
        <span className="text-[10px] md:text-[12px] font-black text-indigo-400 tracking-[0.4em] md:tracking-[0.6em] mb-4 md:mb-6 block drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{item.tag}</span>
        <h3 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-4 md:mb-6 text-white transition-all duration-500 leading-tight uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] group-hover:text-indigo-100">{item.title}</h3>
      </div>
      <div style={{ transform: "translateZ(60px)" }} className="relative z-10">
        <p className="text-gray-100 text-sm md:text-lg leading-relaxed mb-6 md:mb-10 group-hover:text-white transition-all drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] font-medium max-w-[95%]">{item.desc}</p>
        <motion.div 
          whileHover={{ x: 10 }}
          className="flex items-center gap-3 md:gap-4 text-[10px] md:text-[12px] font-black tracking-[0.3em] md:tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 text-indigo-400 drop-shadow-[0_0_20px_rgba(99,102,241,0.8)]"
        >
          {exploreText} <span className="text-xl md:text-2xl transition-transform" aria-hidden="true">→</span>
        </motion.div>
      </div>
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
        style={{ background: useTransform([mouseX, mouseY], ([x, y]) => `radial-gradient(400px md:800px circle at ${((x as number) + 0.5) * 100}% ${((y as number) + 0.5) * 100}%, rgba(99, 102, 241, 0.4), transparent 75%)`) }} 
      />
    </motion.div>
  );
};

const InstructorCard: React.FC<{ instructor: any, idx: number, lang: Language }> = ({ instructor, idx, lang }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: idx * 0.1 }}
      viewport={{ once: true }}
      role="article"
      className="group relative bg-slate-50 dark:bg-[#0a0a0a] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border border-black/5 dark:border-white/5 overflow-hidden shadow-xl"
    >
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 md:mb-8 border-4 border-indigo-500/20 group-hover:border-indigo-500 transition-all duration-500 shadow-2xl bg-white dark:bg-black">
          <img src={instructor.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={instructor.name} />
        </div>
        <h4 className="text-lg md:text-2xl font-black uppercase tracking-tight text-black dark:text-white mb-1 md:mb-2 group-hover:text-indigo-500 transition-colors">{instructor.name}</h4>
        <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-indigo-500 mb-4 md:mb-6 block">{instructor.specialization[lang]}</span>
        <p className="text-gray-700 dark:text-gray-400 text-sm md:text-base leading-relaxed font-light">{instructor.bio[lang]}</p>
      </div>
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
        style={{ background: useTransform([mouseX, mouseY], ([x, y]) => `radial-gradient(300px md:400px circle at ${((x as number) + 0.5) * 100}% ${((y as number) + 0.5) * 100}%, rgba(99, 102, 241, 0.08), transparent 80%)`) }} 
      />
    </motion.div>
  );
};

const Features: React.FC<{ lang: Language }> = ({ lang }) => {
  const content = {
    en: {
      tagLine: "Educational Excellence",
      title: "THE ART OF MASTERFUL LEARNING",
      desc: "A multidisciplinary approach to education, combining core academics with specialized special needs support and holistic mental health care.",
      items: [
        { title: 'ACADEMIC EXCELLENCE', tag: '01 / CURRICULA', desc: 'Top-tier instruction for English Medium, English Version, and Bangla Medium students with integrated O/A-Level tracks.', img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200' },
        { title: 'TINY EXPLORERS', tag: '02 / FOUNDATION', desc: 'Immersive pre-school and kindergarten programs designed to spark curiosity and cognitive growth in young minds.', img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1200' },
        { title: 'LINGUISTIC MASTERY', tag: '03 / SKILLS', desc: 'Advanced English Spoken and Grammar courses tailored for global communication and professional academic success.', img: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1200' },
        { title: 'MENTAL HEALTH COUNSELING', tag: '04 / WELL-BEING', desc: 'Professional online and offline sessions. Specialized psychological support for students and expert guidance for parents.', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200' }
      ],
      instructorTag: "Master Faculty",
      instructorTitle: "MEET OUR ARCHITECTS OF KNOWLEDGE",
      instructors: [
        { name: "Dr. Sarah Ahmed", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", specialization: { en: "Neurodiversity Specialist", bn: "নিউরোডাইভারসিটি বিশেষজ্ঞ" }, bio: { en: "PhD in Child Psychology with 15+ years of specialized experience in ASD and behavioral interventions.", bn: "এএসডি এবং আচরণগত হস্তক্ষেপে ১৫ বছরেরও বেশি অভিজ্ঞতার সাথে শিশু মনোবিজ্ঞানে পিএইচডি।" } },
        { name: "James Wilson", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400", specialization: { en: "Linguistic Arts Director", bn: "লিঙ্গুইস্টিক আর্টস ডিরেক্টর" }, bio: { en: "Native English educator focusing on advanced linguistic proficiency and spoken communication for global tracks.", bn: "গ্লোবাল ট্র্যাকের জন্য উন্নত ভাষাগত দক্ষতা এবং কথ্য যোগাযোগের ওপর ফোকাস করা নেটিভ ইংরেজি শিক্ষাবিদ।" } },
        { name: "Maria Rahman", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400", specialization: { en: "Special Pedagogy Expert", bn: "বিশেষ শিক্ষা বিশেষজ্ঞ" }, bio: { en: "Certified ABA practitioner dedicated to structural socializing milestones and adaptive curriculum design.", bn: "স্ট্রাকচারাল সোশ্যালাইজিং মাইলস্টোন এবং অ্যাডাপটিভ পাঠ্যক্রম ডিজাইনের জন্য নিবেদিত সার্টিফাইড এবিএ অনুশীলনকারী।" } }
      ]
    },
    bn: {
      tagLine: "শিক্ষাগত উৎকর্ষ",
      title: "নিপুণ শিক্ষার শিল্প",
      desc: "শিক্ষার একটি বহুমুখী পদ্ধতি, যা মূল একাডেমিক শিক্ষার সাথে বিশেষ চাহিদাসম্পন্ন শিশুদের সহায়তা এবং সামগ্রিক মানসিক স্বাস্থ্যের সমন্বয় ঘটায়।",
      items: [
        { title: 'একাডেমিক উৎকর্ষ', tag: '০১ / পাঠ্যক্রম', desc: 'ইংরেজি মাধ্যম, ইংরেজি সংস্করণ এবং বাংলা মাধ্যম শিক্ষার্থীদের জন্য ও/এ-লেভেল সহ শীর্ষস্থানীয় নির্দেশনা।', img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200' },
        { title: 'ক্ষুদে অভিযাত্রী', tag: '০২ / ভিত্তি', desc: 'ক্ষুদে শিশুদের কৌতূহল এবং জ্ঞানীয় বিকাশের জন্য তৈরি করা প্রাক-স্কুল এবং কিন্ডারগার্টেন প্রোগ্রাম।', img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1200' },
        { title: 'ভাষাগত দক্ষতা', tag: '০৩ / দক্ষতা', desc: 'বৈশ্বিক যোগাযোগ এবং পেশাদার সাফল্যের জন্য তৈরি উন্নত ইংরেজি স্পোকেন এবং গ্রামার কোর্স।', img: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1200' },
        { title: 'মানসিক স্বাস্থ্য কাউন্সিলিং', tag: '০৪ / সুস্বাস্থ্য', desc: 'শিক্ষার্থীদের জন্য বিশেষায়িত মনস্তাত্ত্বিক সহায়তা এবং অভিভাবকদের জন্য বিশেষজ্ঞ নির্দেশিকা।', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200' }
      ],
      instructorTag: "মাস্টার ফ্যাকাল্টি",
      instructorTitle: "আমাদের জ্ঞানের স্থপতিদের সাথে দেখা করুন",
      instructors: [
        { name: "ডাঃ সারাহ আহমেদ", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", specialization: { en: "Neurodiversity Specialist", bn: "নিউরোডাইভারসিটি বিশেষজ্ঞ" }, bio: { en: "PhD in Child Psychology with 15+ years of specialized experience in ASD and behavioral interventions.", bn: "এএসডি এবং আচরণগত হস্তক্ষেপে ১৫ বছরেরও বেশি অভিজ্ঞতার সাথে শিশু মনোবিজ্ঞানে পিএইচডি।" } },
        { name: "জেমস উইলসন", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400", specialization: { en: "Linguistic Arts Director", bn: "লিঙ্গুইস্টিক আর্টস ডিরেক্টর" }, bio: { en: "Native English educator focusing on advanced linguistic proficiency and spoken communication for global tracks.", bn: "গ্লোবাল ট্র্যাকের জন্য উন্নত ভাষাগত দক্ষতা এবং কথ্য যোগাযোগের ওপর ফোকাস করা নেটিভ ইংরেজি শিক্ষাবিদ।" } },
        { name: "মারিয়া রহমান", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400", specialization: { en: "Special Pedagogy Expert", bn: "বিশেষ শিক্ষা বিশেষজ্ঞ" }, bio: { en: "Certified ABA practitioner dedicated to structural socializing milestones and adaptive curriculum design.", bn: "স্ট্রাকচারাল সোশ্যালাইজিং মাইলস্টোন এবং অ্যাডাপটিভ পাঠ্যক্রম ডিজাইনের জন্য নিবেদিত সার্টিফাইড এবিএ অনুশীলনকারী।" } }
      ]
    }
  };

  const current = content[lang];

  return (
    <section className="py-24 md:py-64 bg-white dark:bg-[#050505] transition-colors duration-700 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 md:mb-32 gap-10 md:gap-16">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 md:gap-8 mb-6 md:mb-10">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} transition={{ duration: 1.2 }} className="h-[2px] bg-indigo-500" />
              <span id="technology-heading" className="text-[12px] md:text-[14px] font-black tracking-[0.4em] md:tracking-[0.5em] text-indigo-500 uppercase">{current.tagLine}</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2 }} viewport={{ once: true }} className="text-4xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] text-black dark:text-white transition-colors duration-700 uppercase">
              {current.title}
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4 }} viewport={{ once: true }} className="text-gray-700 dark:text-gray-400 text-lg md:text-2xl max-w-lg transition-colors duration-700 leading-relaxed font-light">
            {current.desc}
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 xl:grid-cols-4 rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl bg-slate-50 dark:bg-white/5 transition-colors duration-700 mb-32 md:mb-64 border border-black/[0.03] dark:border-white/5">
          {current.items.map((item, idx) => (
            <FeatureCard key={idx} item={item} idx={idx} lang={lang} />
          ))}
        </div>

        {/* Expert Instructors Subsection */}
        <div className="mt-32 md:mt-64">
          <div className="text-center mb-16 md:mb-32">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center justify-center gap-4 mb-6 md:mb-8">
              <div className="w-8 md:w-12 h-[1px] bg-indigo-500/30" />
              <span className="text-[10px] md:text-[12px] font-black tracking-[0.4em] md:tracking-[0.6em] text-indigo-500 uppercase">{current.instructorTag}</span>
              <div className="w-8 md:w-12 h-[1px] bg-indigo-500/30" />
            </motion.div>
            <motion.h3 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="text-3xl md:text-6xl font-black tracking-tighter text-black dark:text-white uppercase">
              {current.instructorTitle}
            </motion.h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
            {current.instructors.map((instructor, idx) => (
              <InstructorCard key={idx} instructor={instructor} idx={idx} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;