
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Star } from 'lucide-react';
import { Language } from '../App';

// Define interface for PricingCard props to fix TypeScript assignment error
interface PricingCardProps {
  plan: any;
  i: number;
  current: any;
  lang: Language;
}

// Using React.FC ensures that React-specific props like 'key' are handled correctly by the compiler
const PricingCard: React.FC<PricingCardProps> = ({ plan, i, current, lang }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D Tilt Effect
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group flex flex-col p-8 md:p-12 lg:p-14 rounded-[2.5rem] md:rounded-[4rem] border transition-all duration-500 cursor-pointer ${plan.popular
        ? 'border-indigo-500/50 bg-indigo-500/[0.03] shadow-[0_20px_50px_rgba(99,102,241,0.15)]'
        : 'border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#080808] hover:border-indigo-500/30'
        }`}
    >
      {/* Dynamic Background Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(circle at ${((x as number) + 0.5) * 100}% ${((y as number) + 0.5) * 100}%, ${plan.popular ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)'}, transparent 70%)`
          )
        }}
      />

      {plan.popular && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-indigo-500 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-lg z-20 flex items-center gap-2"
        >
          <Star size={12} fill="currentColor" />
          {current.popularTag}
        </motion.div>
      )}

      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="mb-8 md:mb-12">
          <h3 className={`text-[10px] md:text-[11px] font-black uppercase ${lang === 'bn' ? 'tracking-normal font-bangla' : 'tracking-[0.4em]'} text-gray-400 dark:text-gray-500 mb-4 group-hover:text-indigo-500 transition-colors`}>
            {plan.name}
          </h3>
          <div className="flex flex-col items-baseline gap-1">
            <motion.span
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-black dark:text-white"
            >
              {plan.price}
            </motion.span>
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
              {plan.period}
            </span>
          </div>
        </div>

        <div className="flex-grow space-y-5 md:space-y-6 mb-12">
          {plan.features.map((f: string, idx: number) => (
            <motion.div
              key={idx}
              className="flex items-start gap-4 group/item"
              whileHover={{ x: 5 }}
            >
              <div className="mt-1 w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover/item:bg-indigo-500 group-hover/item:text-white transition-all duration-300">
                <Check size={12} strokeWidth={4} />
              </div>
              <span className={`text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 group-hover/item:text-black dark:group-hover/item:text-white transition-colors ${lang === 'bn' ? 'tracking-normal font-bangla' : ''}`}>
                {f}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: plan.popular ? '#4f46e5' : '#6366f1', color: '#fff' }}
          whileTap={{ scale: 0.95 }}
          className={`group/btn w-full py-5 md:py-6 rounded-[1.5rem] md:rounded-[2rem] text-[11px] md:text-[12px] font-black uppercase ${lang === 'bn' ? 'tracking-normal font-bangla' : 'tracking-[0.4em]'} transition-all flex items-center justify-center gap-3 shadow-xl overflow-hidden relative ${plan.popular
            ? 'bg-indigo-500 text-white'
            : 'bg-black text-white dark:bg-white dark:text-black'
            }`}
        >
          <span className="relative z-10">{current.btn}</span>
          <ArrowRight size={18} className="relative z-10 transition-transform group-hover/btn:translate-x-2" />

          {/* Button Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] translate-x-[-150%]"
            animate={{ translateX: ['-150%', '150%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

const Pricing: React.FC<{ lang: Language }> = ({ lang }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current || window.innerWidth < 1024) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const content = {
    en: {
      tag: "Enrollment & Counseling",
      title: "INVEST IN GROWTH",
      desc: "Choose a plan that fits your academic goals or special needs. We offer flexible enrollment for all spectrum levels.",
      popularTag: "Most Preferred",
      btn: "Secure Admission",
      plans: [
        { name: 'Academic Path', price: '৳4,500', period: 'Monthly / Initial Fee ৳2k', features: ['EM/EV/BM Standard Track', 'English Spoken & Grammar', 'Bi-Weekly Progress Report', 'Parent-Teacher Portal', 'Digital Study Material'] },
        { name: 'Spectrum Suite', price: '৳12,000', period: 'Monthly / Sensory Initial', features: ['Autism Spectrum L1-3 Support', 'Sensory-Focused Curriculum', 'Mental Health Counseling', 'Private Learning Assistant', 'Parent Support Groups'], popular: true },
        { name: 'Mind-Body Elite', price: '৳18,000', period: 'Premium Quarterly', features: ['Holistic Academic Support', 'Unlimited Mental Health Sessions', 'Home Sensory Lab Access', 'Linguistic Proficiency Exams', 'Priority Counseling Access'] }
      ]
    },
    bn: {
      tag: "ভর্তি এবং কাউন্সেলিং",
      title: "উন্নতিতে বিনিয়োগ করুন",
      desc: "আপনার একাডেমিক লক্ষ্য বা বিশেষ প্রয়োজনের সাথে মানানসই একটি পরিকল্পনা বেছে নিন। আমরা সকল স্পেকট্রাম লেভেলের জন্য ফ্লেক্সিবল ভর্তি অফার করি।",
      popularTag: "সবচেয়ে পছন্দের",
      btn: "ভর্তি নিশ্চিত করুন",
      plans: [
        { name: 'একাডেমিক পথ', price: '৳৪,৫০০', period: 'মাসিক / প্রাথমিক ফি ২ হাজার', features: ['EM/EV/BM স্ট্যান্ডার্ড ট্র্যাক', 'ইংরেজি স্পোকেন এবং গ্রামার', 'পাক্ষিক অগ্রগতি প্রতিবেদন', 'অভিভাবক-শিক্ষক পোর্টাল', 'ডিজিটাল স্টাডি ম্যাটেরিয়াল'] },
        { name: 'স্পেকট্রাম সুইট', price: '৳১২,০০০', period: 'মাসিক / সেন্সরি প্রাথমিক', features: ['অটিজম স্পেকট্রাম L1-3 সাপোর্ট', 'সেন্সরি-ফোকাসড পাঠ্যক্রম', 'মানসিক স্বাস্থ্য কাউন্সেলিং', 'প্রাইভেট লার্নিং অ্যাসিস্ট্যান্ট', 'অভিভাবক সাপোর্ট গ্রুপ'], popular: true },
        { name: 'মাইন্ড-বডি এলিট', price: '৳১৮,০০০', period: 'প্রিমিয়াম ত্রৈমাসিক', features: ['হোলিস্টিক একাডেমিক সাপোর্ট', 'আনলিমিটেড মানসিক স্বাস্থ্য সেশন', 'হোম সেন্সরি ল্যাব অ্যাক্সেস', 'ভাষাগত দক্ষতা পরীক্ষা', 'অগ্রাধিকার কাউন্সেলিং অ্যাক্সেস'] }
      ]
    }
  };

  const current = content[lang];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="py-24 md:py-40 lg:py-64 bg-white dark:bg-[#050505] transition-colors duration-700 relative overflow-hidden"
    >
      {/* Global Section Background Glow */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-30"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.1), transparent 80%)`
          )
        }}
      />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <span className={`text-[10px] md:text-[12px] font-black ${lang === 'bn' ? 'tracking-normal font-bangla' : 'tracking-[0.5em]'} text-indigo-500 uppercase`}>
              {current.tag}
            </span>
            <h2 className={`text-4xl md:text-8xl lg:text-9xl font-black ${lang === 'bn' ? 'tracking-normal font-bangla' : 'tracking-tight'} text-black dark:text-white uppercase leading-none`}>
              {current.title}
            </h2>
            <p className={`text-lg md:text-2xl text-gray-500 dark:text-gray-400 max-w-2xl font-light leading-relaxed ${lang === 'bn' ? 'tracking-normal font-bangla' : ''}`}>
              {current.desc}
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {current.plans.map((plan, i) => (
            <PricingCard
              key={i}
              plan={plan}
              i={i}
              current={current}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
