'use client';

import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-2xl p-6 mb-8"
        >
            <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                    <CheckCircle2 size={32} className="text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Task Manager Pro
                    </h1>
                    <p className="text-slate-300 text-sm">Organize your life efficiently</p>
                </div>
            </div>
        </motion.header>
    );
}