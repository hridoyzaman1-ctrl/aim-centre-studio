import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AuthPage from './components/AuthPage';
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

    // Smooth scroll for anchor links
    const handleAnchorClick = function (this: HTMLAnchorElement, e: MouseEvent) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        // If we are NOT on the home page (e.g. login page), and the link is just a hash, 
        // we might want to navigate home first. But native <a> tags handles this if href="/" 
        // We are using href="#id".
        // If we are on /login, element with #id won't exist.
        // We need to handle this in Navbar. Global <a> handler might fail.
        // But for now keeping the behavior if elements exist.
        if (href.length > 1) {
          try {
            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          } catch (err) {
            console.warn(`Could not navigate to ${href}: Invalid selector`);
          }
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
      <Routes>
        <Route path="/" element={
          <>
            <Navbar isDark={isDark} toggleTheme={toggleTheme} lang={lang} toggleLang={toggleLang} />
            <main className="relative" role="main">
              <Home isDark={isDark} lang={lang} />
            </main>
            <Footer lang={lang} />
          </>
        } />
        <Route path="/login" element={<AuthPage lang={lang} />} />
      </Routes>
      <BackToTop />
    </div>
  );
};

export default App;