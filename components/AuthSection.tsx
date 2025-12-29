import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Lock, Globe, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../App';

const AuthSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const content = {
    en: {
      tag: "Gateway to Excellence",
      title: "START YOUR INFINITY JOURNEY",
      desc: "Unlock personalized academic tracks and specialized support. Join a community where every spectrum is celebrated.",
      support: "Inquiry Support",
      placeholders: { name: "FULL NAME", email: "EMAIL", phone: "PHONE", class: "CLASS", country: "COUNTRY", pass: "PASSWORD", terms: "I accept Mastery Terms & privacy" },
      btn: "Initiate Access",
      success: "Request Processed",
      successP: "Our Academic Coordinator will contact you within 24 hours.",
      classes: ['Play', 'Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
      countries: ['Bangladesh', 'USA', 'UK', 'Canada', 'Australia', 'Other']
    },
    bn: {
      tag: "উৎকর্ষের প্রবেশদ্বার",
      title: "আপনার অসীম যাত্রা শুরু করুন",
      desc: "ব্যক্তিগতকৃত একাডেমিক ট্র্যাক এবং বিশেষায়িত সহায়তা আনলক করুন। এমন একটি কমিউনিটিতে যোগ দিন যেখানে প্রতিটি স্পেকট্রাম উদযাপিত হয়।",
      support: "জিজ্ঞাসাবাদ সহায়তা",
      placeholders: { name: "শিক্ষার্থীর নাম", email: "ইমেইল", phone: "ফোন নম্বর", class: "শ্রেণি", country: "দেশ", pass: "পাসওয়ার্ড", terms: "আমি মাস্টারি শর্তাবলী গ্রহণ করছি" },
      btn: "অ্যাক্সেস শুরু করুন",
      success: "অনুরোধ প্রক্রিয়াধীন",
      successP: "আমাদের সমন্বয়কারী ২৪ ঘণ্টার মধ্যে যোগাযোগ করবেন।",
      classes: ['প্লে', 'নার্সারি', 'কেজি', '১ম', '২য়', '৩য়', '৪র্থ', '৫ম', '৬ষ্ঠ', '৭ম', '৮ম', '৯ম', '১০ম'],
      countries: ['বাংলাদেশ', 'যুক্তরাষ্ট্র', 'যুক্তরাজ্য', 'কানাডা', 'অস্ট্রেলিয়া', 'অন্যান্য']
    }
  };

  const current = content[lang];
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setIsSubmitted(true); setTimeout(() => setIsSubmitted(false), 5000); };

  return (
    <section ref={sectionRef} id="enrollment" className="relative py-24 md:py-40 overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"><div className="absolute top-1/2 left-0 -translate-y-1/2 w-[90vw] md:w-[40vw] h-[90vw] md:h-[40vw] bg-indigo-500/5 blur-[80px] md:blur-[120px] rounded-full" /><div className="absolute inset-0 bg-[radial-gradient(#6366f108_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px]" /></div>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div style={{ opacity: typeof window !== 'undefined' && window.innerWidth < 1024 ? 1 : opacity }}>
            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8"><div className="w-12 md:w-16 h-[1px] bg-indigo-500" aria-hidden="true" /><span className="text-[10px] md:text-[12px] font-black tracking-[0.4em] md:tracking-[0.5em] text-indigo-500 uppercase">{current.tag}</span></div>
            <h2 className="text-4xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95] md:leading-[0.85] text-black dark:text-white uppercase mb-8 md:mb-12">{lang === 'en' ? 'START YOUR' : ''} <span className="text-indigo-500">{lang === 'en' ? 'INFINITY' : current.title}</span> {lang === 'en' ? 'JOURNEY' : ''}</h2>
            <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-400 font-light leading-relaxed mb-10 md:mb-12 max-w-xl">{current.desc}</p>
            <div className="flex items-center gap-6 md:gap-8 group cursor-pointer transition-all" aria-label={`Call Support: +880 1XXX-XXXXXX`}>
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center transition-all group-hover:border-indigo-500/50 group-hover:scale-110 shadow-xl bg-white dark:bg-black">
                <ArrowRight className="text-indigo-500 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
              </div>
              <div>
                <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500 mb-1">{current.support}</div>
                <div className="text-base md:text-lg font-bold text-black dark:text-white">+880 1XXX-XXXXXX</div>
              </div>
            </div>
          </motion.div>
          <motion.div style={{ y: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : yParallax }} className="relative mt-12 lg:mt-0">
            <div className="relative p-1 md:p-2 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-[2.5rem] md:rounded-[4.5rem] backdrop-blur-3xl border border-black/5 dark:border-white/10 shadow-2xl">
              <div className="bg-white dark:bg-[#0a0a0a] rounded-[2.3rem] md:rounded-[4.3rem] p-8 md:p-16 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} onSubmit={handleSubmit} className="space-y-4 md:space-y-6" aria-label="Enrollment Form">
                      <div className="space-y-3 md:space-y-4">
                        <div className="relative group">
                          <User className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} aria-hidden="true" />
                          <input required aria-label={current.placeholders.name} type="text" placeholder={current.placeholders.name} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl md:rounded-3xl px-14 md:px-16 py-5 md:py-7 text-[10px] md:text-[11px] font-black tracking-widest focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                          <div className="relative group">
                            <Mail className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} aria-hidden="true" />
                            <input required aria-label={current.placeholders.email} type="email" placeholder={current.placeholders.email} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl md:rounded-3xl px-14 md:px-16 py-5 md:py-7 text-[10px] md:text-[11px] font-black tracking-widest focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white" />
                          </div>
                          <div className="relative group">
                            <Phone className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} aria-hidden="true" />
                            <input required aria-label={current.placeholders.phone} type="tel" placeholder={current.placeholders.phone} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl md:rounded-3xl px-14 md:px-16 py-5 md:py-7 text-[10px] md:text-[11px] font-black tracking-widest focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white" />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                          <div className="relative group">
                            <GraduationCap className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} aria-hidden="true" />
                            <select required aria-label={current.placeholders.class} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl md:rounded-3xl px-14 md:px-16 py-5 md:py-7 text-[10px] md:text-[11px] font-black tracking-widest focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white appearance-none uppercase">
                              <option value="">{current.placeholders.class}</option>
                              {current.classes.map(c => <option key={c} value={c.toLowerCase()}>{c}</option>)}
                            </select>
                          </div>
                          <div className="relative group">
                            <Globe className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} aria-hidden="true" />
                            <select required aria-label={current.placeholders.country} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl md:rounded-3xl px-14 md:px-16 py-5 md:py-7 text-[10px] md:text-[11px] font-black tracking-widest focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white appearance-none uppercase">
                              <option value="">{current.placeholders.country}</option>
                              {current.countries.map(c => <option key={c} value={c.toLowerCase()}>{c}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className="relative group">
                          <Lock className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} aria-hidden="true" />
                          <input required aria-label={current.placeholders.pass} type="password" placeholder={current.placeholders.pass} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl md:rounded-3xl px-14 md:px-16 py-5 md:py-7 text-[10px] md:text-[11px] font-black tracking-widest focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white" />
                        </div>
                        <div className="flex items-center gap-3 px-1 pt-1">
                          <input required type="checkbox" id="section-terms" className="w-5 h-5 md:w-6 md:h-6 rounded-lg md:rounded-xl border-2 border-indigo-500/30 bg-transparent text-indigo-500 focus:ring-indigo-500 cursor-pointer" />
                          <label htmlFor="section-terms" className="text-[9px] md:text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest leading-relaxed cursor-pointer hover:text-indigo-400 transition-colors">{current.placeholders.terms}</label>
                        </div>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }} 
                        type="submit" 
                        className="w-full py-6 md:py-8 bg-black dark:bg-white text-white dark:text-black rounded-2xl md:rounded-[2.5rem] text-[11px] md:text-[13px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] hover:bg-indigo-600 hover:text-white transition-all shadow-xl focus:ring-4 focus:ring-indigo-500 outline-none"
                      >
                        {current.btn}
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="py-12 md:py-20 flex flex-col items-center justify-center text-center">
                      <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }} className="w-20 h-20 md:w-24 md:h-24 bg-indigo-500 rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-xl" aria-hidden="true">
                        <CheckCircle2 size={40} className="text-white md:hidden" />
                        <CheckCircle2 size={48} className="text-white hidden md:block" />
                      </motion.div>
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black dark:text-white mb-4">{current.success}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg font-light max-w-xs">{current.successP}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute top-6 left-6 flex gap-1.5" aria-hidden="true"><div className="w-1.5 h-1.5 rounded-full bg-red-500/40" /><div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" /><div className="w-1.5 h-1.5 rounded-full bg-green-500/40" /></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AuthSection;