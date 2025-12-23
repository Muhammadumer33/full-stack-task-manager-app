'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import TaskForm from '@/components/TaskForm';
import TaskCard from '@/components/TaskCard';
import { getTasks, createTask, updateTask, deleteTask } from '@/lib/api';
import { Task, TaskCreate } from '@/types/task';
import { Loader2 } from 'lucide-react';

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (task: TaskCreate) => {
        try {
            const newTask = await createTask(task);
            setTasks([newTask, ...tasks]);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleToggleTask = async (id: number) => {
        try {
            const task = tasks.find((t) => t.id === id);
            if (!task) return;

            const updated = await updateTask(id, { completed: !task.completed });
            setTasks(tasks.map((t) => (t.id === id ? updated : t)));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter((t) => t.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const stats = {
        total: tasks.length,
        active: tasks.filter((t) => !t.completed).length,
        completed: tasks.filter((t) => t.completed).length,
    };

    return (
        <main className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <Header />

                <div className="glass-effect rounded-2xl p-6 mb-8">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400">{stats.total}</div>
                            <div className="text-sm text-slate-300">Total Tasks</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400">{stats.active}</div>
                            <div className="text-sm text-slate-300">Active</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400">{stats.completed}</div>
                            <div className="text-sm text-slate-300">Completed</div>
                        </div>
                    </div>
                </div>

                <TaskForm onSubmit={handleCreateTask} />

                <div className="mb-6 flex gap-2">
                    {(['all', 'active', 'completed'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === f
                                    ? 'bg-purple-500 text-white'
                                    : 'glass-effect text-slate-300 hover:bg-white/10'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-purple-400" size={48} />
                    </div>
                ) : filteredTasks.length === 0 ? (
                    <div className="glass-effect rounded-2xl p-12 text-center">
                        <p className="text-slate-400 text-lg">No tasks found. Create one to get started!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {filteredTasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onToggle={handleToggleTask}
                                    onDelete={handleDeleteTask}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </main>
    );
}