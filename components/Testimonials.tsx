import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Language } from '../App';

const TestimonialCard: React.FC<{ testimonial: any, idx: number }> = ({ testimonial, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: idx * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative bg-slate-50 dark:bg-[#0a0a0a] rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 border border-black/10 dark:border-white/5 shadow-2xl overflow-hidden group"
    >
      <div className="absolute top-6 md:top-10 right-6 md:right-10 text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors duration-700">
        <Quote className="w-12 h-12 md:w-20 md:h-20" strokeWidth={3} />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden border-2 border-indigo-500/20 bg-white dark:bg-black">
            <img src={testimonial.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={testimonial.author} />
          </div>
          <div>
            <h5 className="text-base md:text-lg font-black uppercase tracking-tight text-black dark:text-white mb-0.5 md:mb-1">{testimonial.author}</h5>
            <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest text-indigo-500 ${testimonial.role && /[^\x00-\x7F]/.test(testimonial.role) ? 'font-bangla tracking-normal' : ''}`}>{testimonial.role}</span>
          </div>
        </div>
        <p className={`text-lg md:text-2xl text-gray-600 dark:text-gray-400 font-light leading-relaxed italic group-hover:text-black dark:group-hover:text-white transition-colors duration-500 ${testimonial.text && /[^\x00-\x7F]/.test(testimonial.text) ? 'font-bangla tracking-normal' : ''}`}>
          "{testimonial.text}"
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 md:h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    </motion.div>
  );
};

const Testimonials: React.FC<{ lang: Language }> = ({ lang }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const content = {
    en: {
      tag: "Voices of Success",
      title: "WHAT OUR COMMUNITY SAYS",
      items: [
        {
          text: "My son found a sanctuary here. The 1:1 mentor ratio changed everything. His sensory needs are finally understood.",
          author: "Mrs. Sarah Khan",
          role: "PARENT (L2 SUPPORT)",
          img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
        },
        {
          text: "The linguistic program is world-class. I achieved my IELTS goals in just 3 months through their immersive methodology.",
          author: "Ahsan Habib",
          role: "UNIVERSITY TRACK STUDENT",
          img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
        },
        {
          text: "The sensory lab is a game changer for children with neurodiversity. The psychological guidance is truly data-driven.",
          author: "Dr. Faisal Ahmed",
          role: "PSYCHOLOGIST & PARENT",
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
        }
      ]
    },
    bn: {
      tag: "সাফল্যের কণ্ঠস্বর",
      title: "আমাদের কমিউনিটি যা বলছে",
      items: [
        {
          text: "আমার ছেলে এখানে একটি নিরাপদ আশ্রয় খুঁজে পেয়েছে। ১:১ মেন্টর অনুপাত সবকিছু বদলে দিয়েছে। তার সেন্সরি প্রয়োজনগুলো অবশেষে বোঝা হচ্ছে।",
          author: "মিসেস সারাহ খান",
          role: "অভিভাবক (L2 সাপোর্ট)",
          img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
        },
        {
          text: "লিঙ্গুইস্টিক প্রোগ্রামটি বিশ্বমানের। আমি তাদের ইমারসিভ মেথডলজির মাধ্যমে মাত্র ৩ মাসে আমার আইইএলটিএস লক্ষ্য অর্জন করেছি।",
          author: "আহসান হাবিব",
          role: "ইউনিভার্সিটি ট্র্যাক শিক্ষার্থী",
          img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
        },
        {
          text: "নিউরোডাইভারসিটি সম্পন্ন শিশুদের জন্য সেন্সরি ল্যাব একটি আমূল পরিবর্তনকারী। মনস্তাত্ত্বিক নির্দেশনাটি সত্যিই ডেটা-চালিত।",
          author: "ডাঃ ফয়সাল আহমেদ",
          role: "মনোবিজ্ঞানী এবং অভিভাবক",
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
        }
      ]
    }
  };

  const current = content[lang];

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-white dark:bg-[#050505] transition-colors duration-700 overflow-hidden relative">
      <motion.div style={{ y: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : yParallax }} className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30">
        <div className="absolute top-1/2 left-0 w-[80vw] md:w-[40vw] h-[80vw] md:h-[40vw] bg-indigo-500/10 blur-[100px] md:blur-[150px] rounded-full" />
        <div className="absolute top-1/4 right-0 w-[70vw] md:w-[30vw] h-[70vw] md:h-[30vw] bg-indigo-600/10 blur-[80px] md:blur-[120px] rounded-full" />
      </motion.div>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="text-center mb-16 md:mb-32">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center justify-center gap-6 md:gap-8 mb-6 md:mb-10">
            <div className="w-8 md:w-16 h-[1px] bg-indigo-500/30" />
            <span className={`text-[10px] md:text-[12px] font-black ${lang === 'bn' ? 'tracking-normal font-bangla' : 'tracking-[0.4em] md:tracking-[0.6em]'} text-indigo-500 uppercase`}>{current.tag}</span>
            <div className="w-8 md:w-16 h-[1px] bg-indigo-500/30" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className={`text-4xl md:text-8xl lg:text-[7vw] font-black ${lang === 'bn' ? 'tracking-normal font-bangla' : 'tracking-tight'} leading-[0.95] md:leading-[0.9] text-black dark:text-white uppercase mb-8 md:mb-12 drop-shadow-2xl`}>
            {current.title}
          </motion.h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
          {current.items.map((testimonial, idx) => (
            <TestimonialCard key={idx} testimonial={testimonial} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;