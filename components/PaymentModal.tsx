import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, CheckCircle2 } from 'lucide-react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseName?: string;
    price?: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, courseName, price }) => {
    const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
    const [method, setMethod] = useState<'card' | 'bkash' | 'nagad'>('card');

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('processing');
        setTimeout(() => {
            setStep('success');
        }, 2000);
    };

    const reset = () => {
        setStep('details');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={reset}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white dark:bg-[#0a0a0a] rounded-[2rem] border border-black/5 dark:border-white/10 overflow-hidden shadow-2xl"
                    >
                        <button onClick={reset} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-20">
                            <X size={20} className="text-gray-500" />
                        </button>

                        <div className="p-8">
                            <AnimatePresence mode="wait">
                                {step === 'details' && (
                                    <motion.div
                                        key="details"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <div className="mb-6">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2 block">Secure Checkout</span>
                                            <h3 className="text-2xl font-black text-black dark:text-white mb-1">{courseName}</h3>
                                            <p className="text-sm font-medium text-gray-500">{price}</p>
                                        </div>

                                        <div className="flex gap-2 mb-6">
                                            {['card', 'bkash', 'nagad'].map((m) => (
                                                <button
                                                    key={m}
                                                    onClick={() => setMethod(m as any)}
                                                    className={`flex-1 py-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${method === m
                                                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600'
                                                            : 'border-gray-100 dark:border-white/5 text-gray-400 hover:border-gray-200'
                                                        }`}
                                                >
                                                    {m}
                                                </button>
                                            ))}
                                        </div>

                                        <form onSubmit={handlePay} className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Card Number</label>
                                                <div className="relative">
                                                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                    <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-12 py-3 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white placeholder:text-gray-300" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Expiry</label>
                                                    <input required type="text" placeholder="MM/YY" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-5 py-3 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white placeholder:text-gray-300" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">CVC</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                                        <input required type="text" placeholder="123" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-10 py-3 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all text-black dark:text-white placeholder:text-gray-300" />
                                                    </div>
                                                </div>
                                            </div>

                                            <button type="submit" className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-xl font-black uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-white transition-all shadow-xl mt-4">
                                                Confirm Payment
                                            </button>
                                        </form>
                                    </motion.div>
                                )}

                                {step === 'processing' && (
                                    <motion.div
                                        key="processing"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center py-10"
                                    >
                                        <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin mb-6" />
                                        <h3 className="text-lg font-bold">Processing...</h3>
                                    </motion.div>
                                )}

                                {step === 'success' && (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-10 text-center"
                                    >
                                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl text-white">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Success!</h3>
                                        <p className="text-gray-500 text-sm mb-8">You have successfully enrolled in {courseName}.</p>
                                        <button onClick={reset} className="px-8 py-3 bg-gray-100 dark:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                                            Close
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;
