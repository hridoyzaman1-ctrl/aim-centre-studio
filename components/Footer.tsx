import React from 'react';
import { Language } from '../App';

const Footer: React.FC<{ lang: Language }> = ({ lang }) => {
  const content = {
    en: {
      desc: "Transforming education through specialized academic tracks, linguistic mastery, and sensory-focused support for every spectrum level. We aim to bridge the gap between potential and achievement.",
      col1: "Academic Tracks",
      col1Items: ["English Medium / Version", "Tiny Explorers (Pre-K)", "Special Needs (Autism)", "Spoken & Grammar"],
      col2: "Support Services",
      col2Items: ["Mental Health Counseling", "Sensory Lab Access", "Parental Guidance", "Online Tutoring"],
      col3: "Admissions",
      col3P: "Join our newsletter for academic updates, sensory tips, and exclusive event invites.",
      copy: "© 2024 AIM CENTRE 360 ACADEMY. ALL RIGHTS RESERVED.",
      legal: ["Privacy Policy", "Enrollment Terms"]
    },
    bn: {
      desc: "বিশেষায়িত একাডেমিক ট্র্যাক, ভাষাগত দক্ষতা এবং প্রতিটি স্পেকট্রাম লেভেলের জন্য সেন্সরি-ফোকাসড সাপোর্টের মাধ্যমে শিক্ষায় পরিবর্তন আনা। আমরা সম্ভাবনা এবং অর্জনের মধ্যে দূরত্ব ঘুচাতে কাজ করি।",
      col1: "একাডেমিক ট্র্যাক",
      col1Items: ["ইংরেজি মাধ্যম / ভার্সন", "ক্ষুদে অভিযাত্রী (প্রাক-কে)", "বিশেষ চাহিদা (অটিজম)", "স্পোকেন এবং গ্রামার"],
      col2: "সহায়তা সেবা",
      col2Items: ["মানসিক স্বাস্থ্য কাউন্সেলিং", "সেন্সরি ল্যাব অ্যাক্সেস", "অভিভাবকীয় নির্দেশনা", "অনলাইন টিউটরিং"],
      col3: "ভর্তি",
      col3P: "একাডেমিক আপডেট, সেন্সরি টিপস এবং একচেটিয়া ইভেন্ট আমন্ত্রণের জন্য আমাদের নিউজলেটার সাবস্ক্রাইব করুন।",
      copy: "© ২০২৪ এইম সেন্টার ৩৬০ একাডেমি। সর্বস্বত্ব সংরক্ষিত।",
      legal: ["গোপনীয়তা নীতি", "ভর্তির শর্তাবলী"]
    }
  };

  const current = content[lang];

  return (
    <footer className="bg-white dark:bg-[#050505] pt-24 md:pt-48 pb-10 md:pb-16 transition-colors duration-700">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 md:gap-20 lg:gap-32 mb-20 md:mb-32">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-8 md:space-y-12">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/20">
                <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white rounded-md rotate-45"></div>
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-black dark:text-white">AIM Centre 360</span>
            </div>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-light">
              {current.desc}
            </p>
            <div className="flex gap-4 md:gap-6">
              {['instagram', 'twitter', 'linkedin', 'facebook'].map(s => (
                <a key={s} href="#" className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition-all group">
                  <span className="sr-only">{s}</span>
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-black/40 dark:bg-white/40 rounded-sm group-hover:bg-white transition-colors"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div className="lg:col-span-2 space-y-8 md:space-y-10">
            <h5 className="text-black dark:text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-sm mb-6 md:mb-10">
              {current.col1}
            </h5>
            <ul className="space-y-4 md:space-y-6">
              {current.col1Items.map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-base md:text-lg text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div className="lg:col-span-2 space-y-8 md:space-y-10">
            <h5 className="text-black dark:text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-sm mb-6 md:mb-10">
              {current.col2}
            </h5>
            <ul className="space-y-4 md:space-y-6">
              {current.col2Items.map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-base md:text-lg text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-8 md:space-y-10">
            <h5 className="text-black dark:text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-sm mb-6 md:mb-10">
              {current.col3}
            </h5>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed">
              {current.col3P}
            </p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder={lang === 'en' ? 'Email Address' : 'ইমেইল ঠিকানা'} 
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-6 md:px-8 py-5 md:py-6 text-sm md:text-lg focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white backdrop-blur-sm" 
              />
              <button className="absolute right-2 md:right-3 top-2 md:top-3 bottom-2 md:bottom-3 bg-indigo-600 text-white px-5 md:px-8 rounded-xl hover:bg-indigo-500 transition-all shadow-lg active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-10 pt-10 md:pt-16 border-t border-black/10 dark:border-white/10 text-[9px] md:text-[11px] text-gray-400 dark:text-gray-500 tracking-[0.2em] md:tracking-[0.3em] uppercase font-black transition-colors text-center">
          <div className="leading-loose">{current.copy}</div>
          <div className="flex gap-8 md:gap-12">
            {current.legal.map((l, i) => (
              <a key={i} href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-bold">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;