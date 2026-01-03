import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, ArrowRight, ChevronLeft, ShieldCheck, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Language } from '../App';

interface AuthPageProps {
    lang: Language;
}

const AuthPage: React.FC<AuthPageProps> = ({ lang }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [userType, setUserType] = useState<'student' | 'parent'>('student');

    const content = {
        en: {
            back: "Back to Home",
            loginTitle: "Welcome Back",
            signupTitle: "Join Infinity",
            student: "Student",
            parent: "Parent",
            email: "Email Address",
            password: "Password",
            childUid: "Child's UID (Required)",
            childUidPlaceholder: "Enter your child's unique ID",
            btnIn: "Log In",
            btnUp: "Sign Up",
            toggleUp: "Don't have an account? Sign Up",
            toggleIn: "Already have an account? Log In",
            brandingTitle: "AIM CENTRE 360",
            brandingSubtitle: "Unlock Your Potential",
            brandingDesc: "Experience the future of education with our advanced learning platform.",
        },
        bn: {
            back: "হোমে ফিরে যান",
            loginTitle: "স্বাগতম",
            signupTitle: "ইনফিনিটিতে যোগ দিন",
            student: "শিক্ষার্থী",
            parent: "অভিভাবক",
            email: "ইমেইল ঠিকানা",
            password: "পাসওয়ার্ড",
            childUid: "সন্তানের ইউআইডি (আবশ্যক)",
            childUidPlaceholder: "আপনার সন্তানের ইউনিক আইডি লিখুন",
            btnIn: "লগ ইন করুন",
            btnUp: "সাইন আপ করুন",
            toggleUp: "অ্যাকাউন্ট নেই? সাইন আপ করুন",
            toggleIn: "অ্যাকাউন্ট আছে? লগ ইন করুন",
            brandingTitle: "AIM CENTRE 360",
            brandingSubtitle: "আপনার সম্ভাবনা আনলক করুন",
            brandingDesc: "আমাদের উন্নত লার্নিং প্ল্যাটফর্মের সাথে শিক্ষার ভবিষ্যতের অভিজ্ঞতা নিন।",
        }
    };

    const t = content[lang];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic for login/signup would go here
        console.log("Submitting form...", { isLogin, userType });
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-[#050505]">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex w-1/2 bg-black dark:bg-[#0a0a0a] relative overflow-hidden items-center justify-center p-12 text-white border-r border-white/10">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-indigo-600/20 blur-[150px] rounded-full" />
                    <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-blue-600/20 blur-[150px] rounded-full" />
                </div>

                <div className="relative z-10 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(79,70,229,0.5)]"
                    >
                        <div className="w-8 h-8 border-2 border-white rounded-sm rotate-45" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-6xl font-black uppercase tracking-tighter mb-4"
                    >
                        {t.brandingTitle}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-gray-400 font-medium tracking-wide mb-8"
                    >
                        {t.brandingSubtitle}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-500 leading-relaxed max-w-md"
                    >
                        {t.brandingDesc}
                    </motion.p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative">
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-colors"
                >
                    <ChevronLeft size={16} />
                    {t.back}
                </button>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-md w-full mx-auto"
                >
                    <div className="mb-10">
                        <h2 className="text-4xl font-black uppercase tracking-tight text-black dark:text-white mb-2">
                            {isLogin ? t.loginTitle : t.signupTitle}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            Join the future of education today.
                        </p>
                    </div>

                    {/* User Type Toggle */}
                    <div className="bg-gray-100 dark:bg-white/5 p-1 rounded-xl flex mb-8">
                        <button
                            onClick={() => setUserType('student')}
                            className={`flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${userType === 'student'
                                ? 'bg-white dark:bg-black text-indigo-600 shadow-lg'
                                : 'text-gray-500 hover:text-black dark:hover:text-white'
                                }`}
                        >
                            {t.student}
                        </button>
                        <button
                            onClick={() => setUserType('parent')}
                            className={`flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${userType === 'parent'
                                ? 'bg-white dark:bg-black text-indigo-600 shadow-lg'
                                : 'text-gray-500 hover:text-black dark:hover:text-white'
                                }`}
                        >
                            {t.parent}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">{t.email}</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-12 py-4 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white placeholder:text-gray-400"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">{t.password}</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-12 py-4 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white placeholder:text-gray-400"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Parent ONLY Field */}
                        <AnimatePresence>
                            {userType === 'parent' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2 overflow-hidden"
                                >
                                    <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{t.childUid}</label>
                                    <div className="relative group">
                                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl px-12 py-4 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white placeholder:text-indigo-300"
                                            placeholder={t.childUidPlaceholder}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-black uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all shadow-xl flex items-center justify-center gap-2 group"
                        >
                            {isLogin ? t.btnIn : t.btnUp}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-xs font-bold text-gray-500 hover:text-indigo-500 uppercase tracking-widest transition-colors"
                        >
                            {isLogin ? t.toggleUp : t.toggleIn}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AuthPage;
