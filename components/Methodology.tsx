import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Language } from '../App';

const Methodology: React.FC<{ lang: Language }> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Reverse parallax scaling and positioning
  const imgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const content = {
    en: {
      tag: "Special Needs Support",
      title: "THE SPECTRUM BLUEPRINT",
      desc: "We provide a robust, sensory-focused educational experience for children with special needs. Our environment is designed to nurture every unique mind with compassion and data-driven methods.",
      steps: [
        { step: '01', title: 'Sensory Assessment', text: 'Tailored evaluation for Autism Spectrum Levels 1, 2, and 3 to understand specific sensory needs.' },
        { step: '02', title: 'The Learning Path', text: 'Custom-built curriculum integrating visual aids and tactile feedback for cognitive development.' },
        { step: '03', title: 'Spectrum Coaching', text: 'Specialized 1-on-1 sessions focusing on behavioral milestones and linguistic progression.' },
        { step: '04', title: 'Continuous Support', text: 'Regular psychological counseling for students and parents to ensure emotional well-being.' },
      ]
    },
    bn: {
      tag: "বিশেষ চাহিদা সম্পন্ন শিশুদের সহায়তা",
      title: "দ্য স্পেকট্রাম ব্লুপ্রিন্ট",
      desc: "আমরা বিশেষ চাহিদা সম্পন্ন শিশুদের জন্য একটি শক্তিশালী, সেন্সরি-ফোকাসড শিক্ষাগত অভিজ্ঞতা প্রদান করি। আমাদের পরিবেশ প্রতিটি অনন্য মনকে মমতা এবং ডেটা-চালিত পদ্ধতির মাধ্যমে লালনপালন করার জন্য ডিজাইন করা হয়েছে।",
      steps: [
        { step: '০১', title: 'সেন্সরি অ্যাসেসমেন্ট', text: 'অটিজম স্পেকট্রাম লেভেল ১, ২ এবং ৩-এর জন্য নির্দিষ্ট সেন্সরি প্রয়োজন বুঝতে বিশেষ মূল্যায়ন।' },
        { step: '০২', title: 'শিক্ষার পথ', text: 'জ্ঞানীয় বিকাশের জন্য ভিজ্যুয়াল এইডস এবং ট্যাকটাইল ফিডব্যাক সংবলিত কাস্টম পাঠ্যক্রম।' },
        { step: '০৩', title: 'স্পেকট্রাম কোচিং', text: 'আচরণগত মাইলফলক এবং ভাষাগত অগ্রগতির ওপর ফোকাস করা বিশেষ ১-অন-১ সেশন।' },
        { step: '০৪', title: 'অবিরাম সহায়তা', text: 'মানসিক সুস্বাস্থ্য নিশ্চিত করতে শিক্ষার্থী এবং অভিভাবকদের জন্য নিয়মিত মনস্তাত্ত্বিক পরামর্শ।' },
      ]
    }
  };

  const current = content[lang];

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-white dark:bg-[#050505] overflow-hidden transition-colors duration-500 relative">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-start gap-16 md:gap-24 lg:gap-40">
        <div className="w-full lg:w-1/2 lg:sticky lg:top-40">
          <motion.div style={{ opacity: typeof window !== 'undefined' && window.innerWidth < 1024 ? 1 : textOpacity }}>
            <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`text-xs md:text-sm font-black text-indigo-500 ${lang === 'bn' ? 'tracking-normal font-bangla' : 'tracking-[0.4em] md:tracking-[0.6em]'} uppercase mb-6 md:mb-8`}>
              {current.tag}
            </motion.h2>
            <motion.h3 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`text-4xl md:text-8xl lg:text-9xl font-black mb-8 md:mb-12 text-black dark:text-white transition-colors duration-500 uppercase ${lang === 'bn' ? 'tracking-normal font-bangla' : 'tracking-tighter'} leading-[0.95]`}>
              {current.title}
            </motion.h3>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className={`text-lg md:text-2xl text-gray-500 dark:text-gray-400 mb-10 md:mb-20 transition-colors duration-500 font-light leading-relaxed max-w-xl ${lang === 'bn' ? 'tracking-normal font-bangla' : ''}`}>
              {current.desc}
            </motion.p>
          </motion.div>
          <div className="relative group overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-3xl bg-black">
            <motion.img
              style={{ y: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : imgY, scale: typeof window !== 'undefined' && window.innerWidth < 1024 ? 1 : imgScale }}
              src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&q=80&w=1200"
              className="h-[400px] md:h-[700px] w-full object-cover grayscale brightness-[1.1] transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100"
              alt="Sensory learning lab"
            />
            <div className="absolute inset-0 bg-indigo-600/10 mix-blend-overlay pointer-events-none group-hover:opacity-0 transition-opacity duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-80" />
          </div>
        </div>
        <div className="w-full lg:w-1/2 space-y-8 md:space-y-12 pt-0 lg:pt-48">
          {current.steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="group flex items-start gap-8 md:gap-12 pb-12 md:pb-20 relative last:pb-0"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-indigo-500/10 group-hover:bg-indigo-500/40 transition-colors duration-700 -ml-4 md:-ml-8" />
              <span className="text-5xl md:text-9xl font-black text-black/[0.04] dark:text-white/[0.05] group-hover:text-indigo-500/20 transition-all duration-700 leading-none select-none shrink-0">{s.step}</span>
              <div className="pt-2 md:pt-8">
                <h4 className={`text-xl md:text-3xl font-black mb-3 md:mb-6 text-black dark:text-white transition-colors duration-500 uppercase ${lang === 'bn' ? 'tracking-normal font-bangla' : 'tracking-tight'} group-hover:text-indigo-500`}>{s.title}</h4>
                <p className={`text-base md:text-xl text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-500 font-light leading-relaxed max-w-lg ${lang === 'bn' ? 'tracking-normal font-bangla' : ''}`}>{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Seamless background blend glow */}
      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-96 bg-gradient-to-t from-white dark:from-[#050505] to-transparent pointer-events-none opacity-40" />
    </section>
  );
};

export default Methodology;