'use client';

import { Task } from '@/types/task';
import { motion } from 'framer-motion';
import { Check, Trash2, Clock } from 'lucide-react';

interface TaskCardProps {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
    const priorityColors = {
        low: 'from-blue-500 to-cyan-500',
        medium: 'from-yellow-500 to-orange-500',
        high: 'from-red-500 to-pink-500',
    };

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`glass-effect rounded-xl p-5 glass-effect-hover ${task.completed ? 'opacity-60' : ''
                }`}
        >
            <div className="flex items-start gap-4">
                <button
                    onClick={() => onToggle(task.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-white/30 hover:border-purple-400'
                        }`}
                >
                    {task.completed && <Check size={16} />}
                </button>

                <div className="flex-1">
                    <h3
                        className={`text-lg font-semibold mb-1 ${task.completed ? 'line-through text-slate-400' : 'text-white'
                            }`}
                    >
                        {task.title}
                    </h3>

                    {task.description && (
                        <p className="text-slate-300 text-sm mb-3">{task.description}</p>
                    )}

                    <div className="flex items-center gap-3 text-xs">
                        <span
                            className={`px-3 py-1 rounded-full bg-gradient-to-r ${priorityColors[task.priority]
                                } text-white font-medium`}
                        >
                            {task.priority}
                        </span>

                        <span className="flex items-center gap-1 text-slate-400">
                            <Clock size={14} />
                            {new Date(task.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => onDelete(task.id)}
                    className="flex-shrink-0 text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg transition-all"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </motion.div>
    );
}