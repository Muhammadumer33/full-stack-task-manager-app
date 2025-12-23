'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { TaskCreate } from '@/types/task';

interface TaskFormProps {
    onSubmit: (task: TaskCreate) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSubmit({ title, description, priority });
        setTitle('');
        setDescription('');
        setPriority('medium');
    };

    return (
        <motion.form
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="glass-effect rounded-2xl p-6 mb-8"
        >
            <h2 className="text-xl font-semibold mb-4 text-purple-300">Create New Task</h2>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-400"
                />

                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-400 resize-none h-24"
                />

                <div className="flex gap-2">
                    {(['low', 'medium', 'high'] as const).map((p) => (
                        <button
                            key={p}
                            type="button"
                            onClick={() => setPriority(p)}
                            className={`flex-1 py-2 rounded-lg font-medium transition-all ${priority === p
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                                }`}
                        >
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                    <Plus size={20} />
                    Add Task
                </button>
            </div>
        </motion.form>
    );
}