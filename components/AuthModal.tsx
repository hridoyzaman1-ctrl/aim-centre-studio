import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Lock, Globe, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Language } from '../App';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, lang }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const content = {
    en: {
      login: "RESUME JOURNEY",
      signup: "INFINITY GATEWAY",
      welcome: "WELCOME ABOARD",
      tagSub: "Your access is being provisioned...",
      tagMain: "Aim High, Achieve Infinity",
      btnIn: "UNLOCK PORTAL",
      btnUp: "INITIATE ENROLLMENT",
      toggleUp: "CREATE NEW INFINITY ACCOUNT",
      toggleIn: "ALREADY PART OF THE ACADEMY? LOG IN",
      success: "Verification Successful",
      successP: "Redirecting to the Master Learning Console...",
      terms: "I ACCEPT THE TERMS OF INFINITY & PRIVACY PROTOCOLS",
      classes: ['Play', 'Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
      countries: ['Bangladesh', 'USA', 'UK', 'Canada', 'Australia', 'Other'],
      place: { name: "FULL NAME", email: "EMAIL ADDRESS", phone: "PHONE NUMBER", country: "SELECT COUNTRY", class: "SELECT CURRENT CLASS", pass: "SECURE PASSWORD" }
    },
    bn: {
      login: "যাত্রা পুনরায় শুরু করুন",
      signup: "ইনফিনিটি গেটওয়ে",
      welcome: "স্বাগতম",
      tagSub: "আপনার অ্যাক্সেস তৈরি করা হচ্ছে...",
      tagMain: "লক্ষ্য থাকুক উঁচুতে, অর্জন হোক অসীম",
      btnIn: "পোর্টাল আনলক করুন",
      btnUp: "ভর্তি শুরু করুন",
      toggleUp: "নতুন ইনফিনিটি অ্যাকাউন্ট তৈরি করুন",
      toggleIn: "ইতিমধ্যেই একাডেমির অংশ? লগ ইন করুন",
      success: "যাচাইকরণ সফল হয়েছে",
      successP: "মাস্টার লার্নিং কনসোলে রিডাইরেক্ট করা হচ্ছে...",
      terms: "আমি ইনফিনিটির শর্তাবলী এবং গোপনীয়তা নীতি গ্রহণ করছি",
      classes: ['প্লে', 'নার্সারি', 'কেজি', '১ম শ্রেণি', '২য় শ্রেণি', '৩য় শ্রেণি', '৪র্থ শ্রেণি', '৫ম শ্রেণি', '৬ষ্ঠ শ্রেণি', '৭ম শ্রেণি', '৮ম শ্রেণি', '৯ম শ্রেণি', '১০ম শ্রেণি'],
      countries: ['বাংলাদেশ', 'যুক্তরাষ্ট্র', 'যুক্তরাজ্য', 'কানাডা', 'অস্ট্রেলিয়া', 'অন্যান্য'],
      place: { name: "পুরো নাম", email: "ইমেইল ঠিকানা", phone: "ফোন নম্বর", country: "দেশ নির্বাচন করুন", class: "বর্তমান শ্রেণি নির্বাচন করুন", pass: "নিরাপদ পাসওয়ার্ড" }
    }
  };

  const current = content[lang];
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setIsSubmitted(true); setTimeout(() => { setIsSubmitted(false); onClose(); }, 2000); };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, rotateX: 10 }} 
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }} 
            exit={{ opacity: 0, scale: 0.9, y: 20, rotateX: -10 }} 
            transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
            className="relative w-full max-w-2xl bg-white dark:bg-[#0a0a0a] rounded-[3rem] border border-black/5 dark:border-white/10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true"><div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 blur-[100px] rounded-full" /><div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[100px] rounded-full" /></div>
            <button onClick={onClose} aria-label="Close modal" className="absolute top-8 right-8 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors z-20 text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"><X size={24} /></button>
            <div className="p-8 md:p-12 relative z-10">
              <div className="text-center mb-10"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(79,70,229,0.4)]" aria-hidden="true"><div className="w-8 h-8 border-2 border-white rounded-sm rotate-45" /></motion.div><h2 id="modal-title" className="text-4xl font-black tracking-tighter uppercase text-black dark:text-white mb-2">{isSubmitted ? current.welcome : isLogin ? current.login : current.signup}</h2><p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-widest text-[10px]">{isSubmitted ? current.tagSub : current.tagMain}</p></div>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {!isLogin && (<div className="relative group"><User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} aria-hidden="true" /><input required aria-label={current.place.name} type="text" placeholder={current.place.name} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl px-14 py-5 text-xs font-black tracking-widest focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white" /></div>)}
                    <div className="relative group"><Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} aria-hidden="true" /><input required aria-label={current.place.email} type="email" placeholder={current.place.email} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl px-14 py-5 text-xs font-black tracking-widest focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white" /></div>
                  </div>
                  {!isLogin && (<div className="grid md:grid-cols-2 gap-4"><div className="relative group"><Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} aria-hidden="true" /><input required aria-label={current.place.phone} type="tel" placeholder={current.place.phone} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl px-14 py-5 text-xs font-black tracking-widest focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white" /></div><div className="relative group"><Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} aria-hidden="true" /><select required aria-label={current.place.country} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl px-14 py-5 text-xs font-black tracking-widest focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white appearance-none uppercase"><option value="">{current.place.country}</option>{current.countries.map(c => <option key={c} value={c.toLowerCase()}>{c}</option>)}</select></div></div>)}
                  {!isLogin && (<div className="relative group"><GraduationCap className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} aria-hidden="true" /><select required aria-label={current.place.class} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl px-14 py-5 text-xs font-black tracking-widest focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white appearance-none uppercase"><option value="">{current.place.class}</option>{current.classes.map(c => <option key={c} value={c.toLowerCase()}>{c}</option>)}</select></div>)}
                  <div className="relative group"><Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} aria-hidden="true" /><input required aria-label={current.place.pass} type="password" placeholder={current.place.pass} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl px-14 py-5 text-xs font-black tracking-widest focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white" /></div>
                  {!isLogin && (<div className="flex items-center gap-3 px-2"><input required type="checkbox" id="modal-terms" className="w-5 h-5 rounded-lg border-2 border-indigo-500/20 bg-transparent text-indigo-500 focus:ring-indigo-500" /><label htmlFor="modal-terms" className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest leading-relaxed">{current.terms}</label></div>)}
                  <div className="pt-6 space-y-6"><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-6 bg-black dark:bg-white text-white dark:text-black rounded-2xl text-xs font-black uppercase tracking-[0.4em] hover:bg-indigo-600 hover:text-white transition-all shadow-xl focus:ring-2 focus:ring-indigo-500">{isLogin ? current.btnIn : current.btnUp}</motion.button><div className="text-center"><button type="button" onClick={() => setIsLogin(!isLogin)} className="text-[10px] font-black text-gray-400 hover:text-indigo-500 uppercase tracking-widest transition-colors focus:outline-none">{isLogin ? current.toggleUp : current.toggleIn}</button></div></div>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 text-center"><motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}><CheckCircle2 size={80} className="text-indigo-500 mb-8" aria-hidden="true" /></motion.div><h3 className="text-2xl font-black uppercase tracking-tighter text-black dark:text-white mb-4">{current.success}</h3><p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{current.successP}</p></motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;