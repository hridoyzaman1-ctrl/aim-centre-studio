import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';
import { Language } from '../App';
import PaymentModal from './PaymentModal';

interface CourseProps {
    course: any;
    lang: Language;
    onEnroll: (course: any) => void;
    onWishlist: (courseName: string) => void;
    isWishlisted: boolean;
}

const CourseCard: React.FC<CourseProps> = ({ course, lang, onEnroll, onWishlist, isWishlisted }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={`min-w-[300px] md:min-w-[350px] lg:min-w-[400px] p-8 md:p-10 rounded-[2.5rem] bg-indigo-50/50 dark:bg-[#111] border-2 border-indigo-100 dark:border-white/10 flex flex-col justify-between group h-full relative overflow-hidden transition-all duration-300 hover:border-indigo-500 hover:shadow-2xl hover:bg-white dark:hover:bg-[#151515]`}
        >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Wishlist Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onWishlist(course.name); }}
                className="absolute top-8 right-8 z-20 p-3 rounded-full bg-white dark:bg-black/50 backdrop-blur-md border border-black/5 dark:border-white/10 hover:scale-110 transition-transform shadow-sm group/heart"
            >
                <Heart
                    size={18}
                    className={`transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/heart:text-red-500'}`}
                />
            </button>

            <div className="relative z-10 w-full">
                <div className="flex items-center justify-between mb-6 pr-12">
                    <span className="px-3 py-1 rounded-full bg-indigo-200 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[9px] font-black uppercase tracking-widest truncate max-w-[120px]">{course.tag}</span>
                    {course.price && <span className="text-sm font-bold text-black dark:text-white shrink-0">{course.price}</span>}
                </div>

                <h3 className={`text-xl md:text-2xl font-black uppercase ${lang === 'bn' ? 'tracking-normal font-bangla' : 'tracking-tight'} text-black dark:text-white mb-4 leading-none`}>
                    {course.name}
                </h3>

                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 line-clamp-3">
                    {course.description}
                </p>

                <ul className="space-y-3 mb-8">
                    {course.features.slice(0, 3).map((f: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                            <div className="mt-0.5 w-4 h-4 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                                <Check size={10} strokeWidth={4} />
                            </div>
                            <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">{f}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-3 relative z-10">
                <button
                    onClick={() => onEnroll(course)}
                    className="w-full py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2 group/btn shadow-lg"
                >
                    <span>{lang === 'en' ? 'Enroll Now' : 'ভর্তি হন'}</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <button
                    className="w-full py-4 rounded-xl bg-transparent border-2 border-black/5 dark:border-white/10 text-black dark:text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                    onClick={() => console.log('View Details coming soon')}
                >
                    <span>{lang === 'en' ? 'View Details' : 'বিস্তারিত দেখুন'}</span>
                </button>
            </div>
        </motion.div>
    );
};

const ConsultCard: React.FC<{ lang: Language }> = ({ lang }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="min-w-[300px] md:min-w-[350px] lg:min-w-[400px] p-8 md:p-10 rounded-[2.5rem] bg-indigo-600 text-white flex flex-col justify-center items-center text-center h-full relative overflow-hidden transition-all hover:shadow-2xl"
    >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
        <Sparkles size={40} className="mb-6 opacity-80" />
        <h3 className="text-2xl font-black uppercase tracking-tight mb-4">
            {lang === 'en' ? 'Unsure?' : 'অনিশ্চিত?'}
        </h3>
        <p className="text-sm font-medium opacity-80 mb-8 leading-relaxed max-w-xs">
            {lang === 'en'
                ? 'Consult our professionals to find the perfect path for you or your child.'
                : 'আপনার বা আপনার সন্তানের জন্য সঠিক পথ খুঁজে পেতে আমাদের পেশাদারদের সাথে পরামর্শ করুন।'}
        </p>
        <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
            {lang === 'en' ? 'Book Consultation' : 'পরামর্শ বুক করুন'}
        </button>
    </motion.div>
);

const Courses: React.FC<{ lang: Language }> = ({ lang }) => {
    const [activeCategory, setActiveCategory] = useState<string>('English Version');
    const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [wishlist, setWishlist] = useState<Set<string>>(new Set());
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const categories = [
        { id: 'English Medium', label: lang === 'en' ? 'English Medium' : 'ইংরেজি মাধ্যম' },
        { id: 'English Version', label: lang === 'en' ? 'English Version' : 'ইংরেজি ভার্সন' },
        { id: 'Bangla Medium', label: lang === 'en' ? 'Bangla Medium' : 'বাংলা মিডিয়াম' },
        { id: 'Tiny Explorers', label: lang === 'en' ? 'Tiny Explorers' : 'খুদে অভিযাত্রী' },
        { id: 'Special Needs', label: lang === 'en' ? 'Special Needs' : 'বিশেষ চাহিদা' },
        { id: 'IELTS', label: 'IELTS' },
        { id: 'Spoken English', label: lang === 'en' ? 'Spoken English' : 'স্পোকেন ইংলিশ' },
    ];

    // Helper to generate Class 1-10 subcategories
    const academicSubCategories = Array.from({ length: 10 }, (_, i) => ({
        id: `Class ${i + 1}`,
        label: lang === 'en' ? `Class ${i + 1}` : `শ্রেণি ${'১ ২৩৪৫৬৭৮৯০'[i + 1]}`,
    }));

    const subCategories: Record<string, { id: string, label: string }[]> = {
        'English Medium': academicSubCategories,
        'English Version': academicSubCategories,
        'Bangla Medium': academicSubCategories,
        'Special Needs': [
            { id: 'Autism Level 1', label: 'Autism Level 1' },
            { id: 'Autism Level 2', label: 'Autism Level 2' },
            { id: 'Autism Level 3', label: 'Autism Level 3' },
        ]
    };

    // Helper to generate dummy course data for academic classes
    const getAcademicCourses = (category: string) => {
        const featuresMap = {
            'English Medium': ['Cambridge Curriculum', 'Intl. Exams', 'Lab Access', 'Debate Club', 'Robotics'],
            'English Version': ['NCTB English', 'Creative Method', 'Digital Aid', 'Science Fair', 'Math Olympiad'],
            'Bangla Medium': ['Creative Method', 'Cultural Activities', 'ICT Education', 'Language Club', 'Scouts']
        };

        const baseFeatures = featuresMap[category as keyof typeof featuresMap] || [];

        // Generate more variety
        if (activeSubCategory && activeSubCategory.startsWith('Class')) {
            return [
                { name: `${category} Core`, price: '৳4,500/mo', description: `Complete ${activeSubCategory} curriculum covering all major subjects.`, features: [...baseFeatures.slice(0, 3), 'All Subjects'], tag: activeSubCategory },
                { name: `${category} Science`, price: '৳5,000/mo', description: `Advanced science focus for ${activeSubCategory} students.`, features: ['Physics Lab', 'Chem Lab', 'Bio Lab'], tag: activeSubCategory },
                { name: `${category} Math Club`, price: '৳3,000/mo', description: `Intensive math problem solving for ${activeSubCategory}.`, features: ['Geometry', 'Algebra', 'Calculus Prep'], tag: activeSubCategory },
                { name: `${category} Arts`, price: '৳2,500/mo', description: `Creative arts and literature program for ${activeSubCategory}.`, features: ['Painting', 'Literature', 'Drama'], tag: activeSubCategory },
                { name: `${category} ICT`, price: '৳3,500/mo', description: `Coding and computer skills for ${activeSubCategory}.`, features: ['Programming', 'Office', 'Graphics'], tag: activeSubCategory },
                { name: `${category} Sports`, price: '৳2,000/mo', description: `Physical education and team sports.`, features: ['Football', 'Cricket', 'Athletics'], tag: activeSubCategory },
            ];
        }

        // Default huge list for main category view
        const bigList = [];
        for (let i = 1; i <= 10; i++) {
            bigList.push({ name: `${category} Class ${i}`, price: `৳${3000 + i * 200}/mo`, description: `Full syllabus coverage for Class ${i}.`, features: baseFeatures, tag: `Class ${i}` });
            if (i > 5) bigList.push({ name: `${category} Sci Class ${i}`, price: `৳${3500 + i * 200}/mo`, description: `Science specialization for Class ${i}.`, features: ['Lab', 'Theory', 'Practical'], tag: `Class ${i}` });
        }
        return bigList;
    };

    const coursesData = {
        'Tiny Explorers': [
            { name: 'Toddler Play', price: '৳5,000/mo', description: 'Sensory-rich environment for early development.', features: ['Sensory Play', 'Social Skills', 'Music & Art'], tag: 'Age 2-3' },
            { name: 'Kindergarten Prep', price: '৳5,500/mo', description: 'School readiness program focusing on literacy and numeracy.', features: ['Phonics', 'Basic Math', 'Storytelling'], tag: 'Age 4-5' },
            { name: 'Early Art', price: '৳4,000/mo', description: 'Creative expression for young minds.', features: ['Painting', 'Crafts', 'Colors'], tag: 'Age 3-5' },
            { name: 'Little Musicians', price: '৳4,500/mo', description: 'Introduction to rhythm and melody.', features: ['Instruments', 'Singing', 'Rhythm'], tag: 'Age 3-6' },
            { name: 'Story Time', price: '৳3,000/mo', description: 'Interactive storytelling sessions.', features: ['Reading', 'Puppets', 'Imagination'], tag: 'Age 2-5' },
        ],
        'Special Needs': {
            'Autism Level 1': [
                { name: 'Social Integration', description: 'Support for mild social and communication challenges.', features: ['Group Therapy', 'Skill Building', 'Academic Aid'], tag: 'Level 1' },
                { name: 'Academic Focus', description: 'Tailored learning strategies for academic success.', features: ['IEP Plans', 'Visual Aids', 'Quiet Zones'], tag: 'Level 1' },
                { name: 'Art Therapy', description: 'Expressive therapy for emotional regulation.', features: ['Painting', 'Drawing', 'Expression'], tag: 'Level 1' },
            ],
            'Autism Level 2': [
                { name: 'Behavioral Support', description: 'Substantial support for social and behavioral needs.', features: ['ABA Therapy', 'Speech Therapy', 'Sensory Breaks'], tag: 'Level 2' },
                { name: 'Life Skills', description: 'Focus on daily living and independence.', features: ['Self-Care', 'Routine Building', 'Safety Skills'], tag: 'Level 2' },
                { name: 'Sensory Integration', description: 'Managing sensory processing differences.', features: ['Sensory Gym', 'Tactile Play', 'Calming'], tag: 'Level 2' },
            ],
            'Autism Level 3': [
                { name: 'Intensive Care', description: 'Very substantial support for daily life and learning.', features: ['1-on-1 Aide', 'Communication Devices', 'Sensory Integration'], tag: 'Level 3' },
                { name: 'Therapeutic Play', description: 'Engagement through specialized play therapy.', features: ['Music Therapy', 'Tactile Activities', 'Calming Techniques'], tag: 'Level 3' },
                { name: 'Daily Living', description: 'Hands-on support for basic needs.', features: ['Feeding', 'Hygiene', 'Mobility'], tag: 'Level 3' },
            ]
        },
        'IELTS': [
            { name: 'Express Prep', price: '৳10,000', description: 'Intensive 1-month crash course for quick improvement.', features: ['Mock Tests', 'Speaking Drills', 'Writing Feedback'], tag: '1 Month' },
            { name: 'Comprehensive', price: '৳18,000', description: '3-month in-depth preparation for band 7+.', features: ['Unlimited Mocks', 'Private Session', 'Study Pattern'], tag: '3 Months' },
            { name: 'Weekend Batch', price: '৳12,000', description: 'Classes on weekends for working professionals.', features: ['Flexible Timing', 'Recorded Classes', 'Support'], tag: '2 Months' },
            { name: 'Speaking Focus', price: '৳8,000', description: 'Dedicated module for speaking band score boost.', features: ['1-on-1 Speaking', 'Accent Training', 'Fluency'], tag: '1 Month' },
            { name: 'Writing Masterclass', price: '৳8,000', description: 'Advanced writing techniques for Task 1 & 2.', features: ['Essay Correction', 'Vocab Building', 'Structure'], tag: '1 Month' },
        ],
        'Spoken English': [
            { name: 'Beginner Fluency', price: '৳3,000/mo', description: 'Build confidence in daily conversation.', features: ['Vocabulary', 'Basic Grammar', 'Role Play'], tag: 'Level 1' },
            { name: 'Business Pro', price: '৳5,000/mo', description: 'Professional communication skills for corporate environments.', features: ['Presentations', 'Email Writing', 'Negotiation'], tag: 'Professional' },
            { name: 'Kids Spoken', price: '৳3,500/mo', description: 'Fun interactive english for children.', features: ['Games', 'Songs', 'Stories'], tag: 'Kids' },
            { name: 'Accent Training', price: '৳4,000/mo', description: 'Neutralize accent and improve pronunciation.', features: ['Phonetics', 'Intonation', 'Drills'], tag: 'Advanced' },
            { name: 'Public Speaking', price: '৳6,000/mo', description: 'Master the art of speaking in front of crowds.', features: ['Confidence', 'Body Language', 'Speech Writing'], tag: 'Advanced' },
        ]
    };

    const getActiveCourses = () => {
        // Academic Categories check
        if (['English Medium', 'English Version', 'Bangla Medium'].includes(activeCategory)) {
            return getAcademicCourses(activeCategory);
        }

        if (activeCategory === 'Special Needs') {
            if (activeSubCategory && coursesData['Special Needs'][activeSubCategory as keyof typeof coursesData['Special Needs']]) {
                return coursesData['Special Needs'][activeSubCategory as keyof typeof coursesData['Special Needs']];
            }
            const allSpecial = [
                ...coursesData['Special Needs']['Autism Level 1'],
                ...coursesData['Special Needs']['Autism Level 2'],
                ...coursesData['Special Needs']['Autism Level 3'],
            ];
            return activeSubCategory ? coursesData['Special Needs'][activeSubCategory as keyof typeof coursesData['Special Needs']] : allSpecial;
        }
        return (coursesData[activeCategory as keyof typeof coursesData] as any) || [];
    };

    const activeCourses = getActiveCourses();

    // Prepare contents for infinite loop
    // Duplicate the list 3 times to ensure smooth scrolling space
    // Only duplicate if there are items
    const shouldDuplicate = Array.isArray(activeCourses) && activeCourses.length > 0;
    // If special needs (with consult card), we need to handle that carefully.
    // We'll just append activeCourses 3 times.
    const displayCourses = shouldDuplicate ? [...activeCourses, ...activeCourses, ...activeCourses] : [];

    // Seamless Infinite Auto Scroll Logic
    useEffect(() => {
        let animationFrameId: number;
        const scrollSpeed = 0.8; // Adjust speed as needed

        const animate = () => {
            if (!isPaused && carouselRef.current) {
                carouselRef.current.scrollLeft += scrollSpeed;

                // If we've scrolled past the first set of items (approx 1/3 of total width), reset to 0
                // We use 1/3 because we triplicated the content.
                // Actually, best to measure.
                const totalWidth = carouselRef.current.scrollWidth;
                const oneSetWidth = totalWidth / 3;

                if (carouselRef.current.scrollLeft >= oneSetWidth) {
                    carouselRef.current.scrollLeft -= oneSetWidth;
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, activeCategory, activeSubCategory, displayCourses.length]);

    const toggleWishlist = (courseName: string) => {
        setWishlist(prev => {
            const newSet = new Set(prev);
            if (newSet.has(courseName)) newSet.delete(courseName);
            else newSet.add(courseName);
            return newSet;
        });
    };

    const handleEnroll = (course: any) => {
        setSelectedCourse(course);
        setIsPaymentOpen(true);
        setIsPaused(true); // Pause scrolling when modal opens
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -350, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
    };

    return (
        <>
            <section id="courses" className="py-24 md:py-32 bg-white dark:bg-[#050505] transition-colors duration-700 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="mb-16 md:mb-24">
                        <span className="text-[10px] md:text-[12px] font-black tracking-[0.4em] text-indigo-500 uppercase block mb-4">Educational Pathways</span>
                        <h2 className="text-4xl md:text-7xl font-black uppercase text-black dark:text-white tracking-tighter mb-8">
                            {lang === 'en' ? 'Choose Your' : 'আপনার'} <span className="text-indigo-500">{lang === 'en' ? 'Track' : 'কোর্স'}</span>
                        </h2>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 md:gap-4 mb-8">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => { setActiveCategory(cat.id); setActiveSubCategory(null); }}
                                    className={`px-6 py-3 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all ${activeCategory === cat.id
                                        ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105'
                                        : 'bg-black/5 dark:bg-white/5 text-gray-500 hover:bg-black/10 dark:hover:bg-white/10'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Sub Categories (Special Needs & Academic) */}
                        <AnimatePresence>
                            {(subCategories[activeCategory] || activeCategory === 'Special Needs') && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex flex-wrap gap-2 md:gap-3 overflow-hidden"
                                >
                                    {/*  Need to access dynamic subcategories */}
                                    {(subCategories[activeCategory] || []).map((sub) => (
                                        <button
                                            key={sub.id}
                                            onClick={() => setActiveSubCategory(sub.id)}
                                            className={`px-5 py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest border transition-all ${activeSubCategory === sub.id
                                                ? 'bg-indigo-500 border-indigo-500 text-white'
                                                : 'border-indigo-500/30 text-indigo-500 hover:bg-indigo-500/10'
                                                }`}
                                        >
                                            {sub.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Carousel Container */}
                    <div
                        className="relative group/carousel"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                    >
                        {/* Manual Navigation Controls (Desktop) */}
                        <div className="hidden md:flex justify-end gap-2 mb-4 absolute -top-20 right-0">
                            <button onClick={scrollLeft} className="p-3 rounded-full border border-black/10 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={scrollRight} className="p-3 rounded-full border border-black/10 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Scroll Area */}
                        <div
                            ref={carouselRef}
                            className="flex gap-6 md:gap-8 overflow-x-auto pb-12 pt-4 hide-scrollbar"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <AnimatePresence mode='popLayout'>
                                {/* Course Cards (Duplicated for Infinite Scroll) */}
                                {displayCourses.map((course: any, idx: number) => (
                                    <motion.div
                                        key={`${activeCategory}-${activeSubCategory || 'all'}-${idx}`}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: 0.1 }}
                                        className="flex-shrink-0"
                                    >
                                        <CourseCard
                                            course={course}
                                            lang={lang}
                                            onEnroll={handleEnroll}
                                            onWishlist={toggleWishlist}
                                            isWishlisted={wishlist.has(course.name)}
                                        />
                                    </motion.div>
                                ))}

                                {/* Consult Card - ONLY for Special Needs - Not duplicating for now to avoid complexity in infinite loop logic if it varies */}
                                {/* To keep it simple, if loop logic is strictly 3 sets of courses, consult card at end breaks math. 
                            Let's append consult card to EACH set if category is active.
                        */}
                                {activeCategory === 'Special Needs' && !shouldDuplicate && (
                                    <div className='flex-shrink-0'>
                                        <ConsultCard lang={lang} />
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Drag/Swipe Indicator */}
                        <div className="md:hidden flex justify-center mt-4">
                            <div className="w-12 h-1 bg-gray-300 dark:bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-indigo-500 rounded-full w-1/3"
                                    animate={{ x: [0, 20, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => { setIsPaymentOpen(false); setIsPaused(false); }}
                courseName={selectedCourse?.name || ''}
                price={selectedCourse?.price || ''}
            />
        </>
    );
};

export default Courses;
