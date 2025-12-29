import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import Features from './components/Features';
import Methodology from './components/Methodology';
import SpecialNeedsSection from './components/SpecialNeedsSection';
import CounselingSection from './components/CounselingSection';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import AuthSection from './components/AuthSection';
import Footer from './components/Footer';

export type Language = 'en' | 'bn';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 500);
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, backgroundColor: '#6366f1' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top"
          className="fixed bottom-10 right-10 z-[150] w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border border-white/10"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    const handleAnchorClick = function (this: HTMLAnchorElement, e: MouseEvent) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        // Only attempt to query if the href has more than just the # character
        if (href.length > 1) {
          try {
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          } catch (err) {
            console.warn(`Could not navigate to ${href}: Invalid selector`);
          }
        } else {
          // If just '#', scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick as EventListener);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener);
      });
    };
  }, [isDark]);

  const toggleTheme = () => {
    document.body.classList.add('theme-transition');
    setIsDark(!isDark);
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 1000);
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'bn' : 'en');
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 bg-white text-black dark:bg-[#050505] dark:text-white selection:bg-indigo-500 overflow-x-hidden`}>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} lang={lang} toggleLang={toggleLang} />
      <BackToTop />
      
      <main className="relative" role="main">
        <Hero isDark={isDark} lang={lang} />
        
        <div className="relative z-10">
          <StatsSection lang={lang} />
          
          <section id="technology" aria-labelledby="technology-heading">
            <Features lang={lang} />
          </section>

          <section id="methodology" aria-labelledby="methodology-heading">
            <Methodology lang={lang} />
          </section>

          <section id="special-needs" aria-labelledby="special-needs-heading">
            <SpecialNeedsSection lang={lang} />
          </section>

          <section id="testimonials" aria-labelledby="testimonials-heading">
            <Testimonials lang={lang} />
          </section>

          <section id="counseling" aria-labelledby="counseling-heading">
            <CounselingSection lang={lang} />
          </section>

          <section id="pricing" aria-labelledby="pricing-heading">
            <Pricing lang={lang} />
          </section>

          <AuthSection lang={lang} />
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default App;