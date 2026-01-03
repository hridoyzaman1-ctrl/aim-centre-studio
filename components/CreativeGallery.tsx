import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Palette, Image as ImageIcon, Scissors, Camera } from 'lucide-react';
import { Language } from '../App';

interface GalleryItem {
    id: string;
    category: 'Arts & Crafts' | 'Drawings' | 'Paper Works' | 'Photography';
    src: string;
    studentName: string;
    class: string;
    age: string;
    title: string;
}

const dummyGallery: GalleryItem[] = [
    { id: '1', category: 'Drawings', src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop', studentName: 'Aarav Ahmed', class: 'Class 3', age: '9', title: 'Sunset Village' },
    { id: '2', category: 'Arts & Crafts', src: 'https://images.unsplash.com/photo-1515463138280-67d1dcbf317f?q=80&w=600&auto=format&fit=crop', studentName: 'Sara Khan', class: 'Class 5', age: '11', title: 'Paper Crane' },
    { id: '3', category: 'Photography', src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600&auto=format&fit=crop', studentName: 'Rahim Uddin', class: 'Class 8', age: '14', title: 'Nature Focus' },
    { id: '4', category: 'Paper Works', src: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=600&auto=format&fit=crop', studentName: 'Nadia Islam', class: 'Class 4', age: '10', title: 'Origami Zoo' },
    { id: '5', category: 'Drawings', src: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?q=80&w=600&auto=format&fit=crop', studentName: 'Tanvir Hasan', class: 'Class 6', age: '12', title: 'Future City' },
    { id: '6', category: 'Arts & Crafts', src: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=600&auto=format&fit=crop', studentName: 'Mina Akter', class: 'Class 2', age: '8', title: 'Clay Pot' },
    { id: '7', category: 'Photography', src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=600&auto=format&fit=crop', studentName: 'Karim Roberts', class: 'Class 9', age: '15', title: 'Urban Life' }, // Updated URL
    { id: '8', category: 'Paper Works', src: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop', studentName: 'Lina Das', class: 'Class 7', age: '13', title: 'Paper Flowers' },
    { id: '9', category: 'Drawings', src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=600&auto=format&fit=crop', studentName: 'Ishraq Ali', class: 'Class 5', age: '11', title: 'Dreamscape' },
    { id: '10', category: 'Arts & Crafts', src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop', studentName: 'Zara Rahman', class: 'Class 6', age: '12', title: 'Handmade Lamp' },
    { id: '11', category: 'Photography', src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop', studentName: 'Bilal Hossain', class: 'Class 10', age: '16', title: 'Macro World' },
    { id: '12', category: 'Paper Works', src: 'https://images.unsplash.com/photo-1595133642358-15c2ce912d7e?q=80&w=600&auto=format&fit=crop', studentName: 'Riya Chowdhury', class: 'Class 3', age: '9', title: 'Paper Boats' },
];

const CreativeGallery: React.FC<{ lang: Language }> = ({ lang }) => {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    const [visibleCount, setVisibleCount] = useState<number>(12);

    const categories = [
        { id: 'All', label: lang === 'en' ? 'All' : 'সব', icon: <Palette size={14} /> },
        { id: 'Drawings', label: lang === 'en' ? 'Drawings' : 'অঙ্কন', icon: <ImageIcon size={14} /> },
        { id: 'Arts & Crafts', label: lang === 'en' ? 'Arts & Crafts' : 'শিল্প ও কারুকা', icon: <Scissors size={14} /> },
        { id: 'Paper Works', label: lang === 'en' ? 'Paper Works' : 'কাগজের কাজ', icon: <Scissors size={14} className="rotate-45" /> }, // Reusing scissors for paper for now or file-text
        { id: 'Photography', label: lang === 'en' ? 'Photography' : 'ফটোগ্রাফি', icon: <Camera size={14} /> },
    ];

    const allFilteredItems = activeCategory === 'All'
        ? dummyGallery
        : dummyGallery.filter(item => item.category === activeCategory);

    const visibleItems = allFilteredItems.slice(0, visibleCount);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedItem) return;
        const currentIndex = allFilteredItems.findIndex(item => item.id === selectedItem.id);
        const nextIndex = (currentIndex + 1) % allFilteredItems.length;
        setSelectedItem(allFilteredItems[nextIndex]);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedItem) return;
        const currentIndex = allFilteredItems.findIndex(item => item.id === selectedItem.id);
        const prevIndex = (currentIndex - 1 + allFilteredItems.length) % allFilteredItems.length;
        setSelectedItem(allFilteredItems[prevIndex]);
    };

    // Handle Escape key
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedItem(null);
        };
        if (selectedItem) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItem]);

    return (
        <section className="py-24 md:py-32 bg-slate-50 dark:bg-black/90 relative overflow-hidden">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="mb-16 md:mb-24 text-center">
                    <span className="text-[10px] md:text-[12px] font-black tracking-[0.4em] text-indigo-500 uppercase block mb-4">
                        {lang === 'en' ? 'Student Showcase' : 'শিক্ষার্থীদের কাজ'}
                    </span>
                    <h2 className="text-4xl md:text-7xl font-black uppercase text-black dark:text-white tracking-tighter mb-8">
                        Creative <span className="text-indigo-500">Exploration</span>
                    </h2>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeCategory === cat.id
                                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105'
                                    : 'bg-white dark:bg-white/5 text-gray-500 hover:bg-black/5 dark:hover:bg-white/10'
                                    }`}
                            >
                                {cat.icon}
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gallery Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <AnimatePresence>
                        {visibleItems.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                key={item.id}
                                onClick={() => setSelectedItem(item)}
                                className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all"
                            >
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop'; }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <span className="text-indigo-400 text-[9px] font-bold uppercase tracking-widest mb-1">{item.category}</span>
                                    <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                                    <div className="flex items-center gap-2 text-white/80 text-xs">
                                        <span>{item.studentName}</span>
                                        <span>•</span>
                                        <span>{item.class}</span>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full text-white">
                                        <ZoomIn size={16} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View More Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => console.log('Redirect to full gallery')}
                        className="px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-white transition-all shadow-lg"
                    >
                        {lang === 'en' ? 'View More' : 'আরও দেখুন'}
                    </button>
                </div>
            </div>

            {/* Full View Modal - Portaled to body to avoid z-index clamping */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedItem && (
                        <div
                            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
                            onClick={() => setSelectedItem(null)} // Close on backdrop click
                        >
                            {/* Close Button - High Contrast & Prominent */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedItem(null); }}
                                className="absolute top-6 right-6 md:top-10 md:right-10 p-4 rounded-full bg-white text-black z-[210] hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                                aria-label="Close"
                            >
                                <X size={28} strokeWidth={3} />
                            </button>

                            {/* Navigation Buttons */}
                            <button
                                onClick={(e) => { e.stopPropagation(); handlePrev(e); }}
                                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white z-[205] hidden md:flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
                            >
                                <ChevronLeft size={32} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleNext(e); }}
                                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white z-[205] hidden md:flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
                            >
                                <ChevronRight size={32} />
                            </button>

                            <div
                                className="w-full max-w-7xl h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
                            >
                                {/* Image Container */}
                                <motion.div
                                    key={selectedItem.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="relative w-full md:flex-1 h-[50vh] md:h-[80vh] rounded-[2rem] overflow-hidden shadow-2xl bg-black/20"
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = Math.abs(offset.x) * velocity.x;
                                        if (swipe < -100) {
                                            handleNext(e as any);
                                        } else if (swipe > 100) {
                                            handlePrev(e as any);
                                        }
                                    }}
                                >
                                    <img
                                        src={selectedItem.src}
                                        alt={selectedItem.title}
                                        className="w-full h-full object-contain"
                                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop'; }}
                                    />
                                </motion.div>

                                {/* Details Panel */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="w-full md:w-[350px] lg:w-[400px] shrink-0 bg-zinc-900/80 border border-white/10 rounded-3xl p-8 text-white backdrop-blur-xl shadow-2xl overflow-y-auto max-h-[30vh] md:max-h-none"
                                >
                                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg shadow-indigo-500/20">
                                        {selectedItem.category}
                                    </span>

                                    <h2 className="text-3xl font-black uppercase tracking-tight mb-2 leading-none">{selectedItem.title}</h2>
                                    <p className="text-white/70 text-sm mb-8 leading-relaxed font-medium">
                                        A beautiful piece showcasing the creativity and skill of our student.
                                        Exploring themes of nature, imagination, and vibrant expression.
                                    </p>

                                    <div className="space-y-5 border-t border-white/10 pt-6">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 block mb-1">Student Name</span>
                                            <p className="text-xl font-bold">{selectedItem.studentName}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 block mb-1">Class</span>
                                                <p className="text-lg font-bold">{selectedItem.class}</p>
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 block mb-1">Age</span>
                                                <p className="text-lg font-bold">{selectedItem.age}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
};

export default CreativeGallery;
