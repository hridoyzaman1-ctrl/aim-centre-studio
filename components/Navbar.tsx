import React, { useState, useEffect } from 'react';
/* Added AnimatePresence to the framer-motion imports */
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Languages, ChevronRight } from 'lucide-react';
import AuthModal from './AuthModal';
import { Language } from '../App';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  lang: Language;
  toggleLang: () => void;
}

export default function Navbar({ isDark, toggleTheme, lang, toggleLang }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-black/90 backdrop-blur-xl py-3 md:py-4 border-b border-black/5 dark:border-white/5 shadow-sm' 
            : 'bg-transparent py-5 md:py-8'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-5 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer shrink-0" aria-label="AIM Centre 360 Home">
            <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-black dark:border-white flex items-center justify-center transition-transform group-hover:rotate-45">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
            </div>
            <span className="text-sm md:text-lg font-black tracking-widest uppercase text-black dark:text-white truncate">AIM Centre 360</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {['Curriculum', 'Special Needs', 'Counseling', 'Membership'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-sm"
              >
                {item}
              </a>
            ))}
            
            {/* Lang Toggle */}
            <button 
              onClick={toggleLang}
              aria-label={`Switch language to ${lang === 'en' ? 'Bangla' : 'English'}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 hover:border-indigo-500/50 transition-all group focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Languages size={14} className="text-indigo-500 group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">
                {lang === 'en' ? 'BN' : 'EN'}
              </span>
            </button>

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            >
              {isDark ? <Sun size={18} className="text-white" /> : <Moon size={18} className="text-black" />}
            </button>

            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-1">
            <button onClick={toggleLang} aria-label="Toggle Language" className="p-3 text-indigo-500 font-black text-xs min-w-[44px]">
              {lang === 'en' ? 'BN' : 'EN'}
            </button>
            <button onClick={toggleTheme} aria-label="Toggle Theme" className="p-3 rounded-full min-w-[44px]">
              {isDark ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-black" />}
            </button>
            <button 
              className="text-black dark:text-white p-3 min-w-[44px]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed inset-0 top-0 h-screen bg-white dark:bg-black px-6 pt-24 pb-12 flex flex-col gap-8 z-[90]"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <div className="flex flex-col gap-6 mt-10">
                {['Curriculum', 'Special Needs', 'Counseling', 'Membership'].map((item, idx) => (
                  <motion.a 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-3xl font-black uppercase tracking-widest text-black dark:text-white focus:text-indigo-600 outline-none flex items-center justify-between"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                    <ChevronRight size={20} className="text-indigo-500 opacity-50" />
                  </motion.a>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-4 mb-10">
                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="bg-indigo-600 text-white w-full py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20"
                >
                  Apply Now
                </motion.button>
                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 border border-black/10 dark:border-white/10 flex items-center justify-center gap-3"
                >
                  <X size={18} />
                  {lang === 'en' ? 'Close Menu' : 'মেনু বন্ধ করুন'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} lang={lang} />
    </>
  );
}