import React from 'react';
import { Sparkles, LayoutList, Target } from 'lucide-react';
import TaskCard from './TaskCard';
import { toggleTaskStatus } from '../services/api';

const TaskPanel = ({ tasks = [], onRefetch }) => {
    const handleToggle = async (id) => {
        try {
            await toggleTaskStatus(id);
            if (onRefetch) onRefetch();
        } catch (error) {
            console.error("Failed to toggle task", error);
        }
    };

    return (
        <div className="flex flex-col h-full glass-card p-8 overflow-hidden transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shadow-sm">
                        <LayoutList size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black tracking-tight text-text-main">Strategy</h2>
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest -mt-1">Pipeline</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/20 rounded-2xl">
                    <Sparkles size={14} className="text-primary animate-pulse" />
                    <span className="text-[10px] items-center gap-1 uppercase tracking-[0.2em] font-black text-primary flex">
                        Active
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scroll-smooth">
                {tasks.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-30 border-2 border-dashed border-border-subtle rounded-3xl group hover:opacity-50 transition-all">
                        <Target size={56} className="mb-6 stroke-[1.5px] scale-110 group-hover:rotate-12 transition-transform" />
                        <h3 className="text-sm font-black text-text-main uppercase tracking-widest mb-2">No active strategy</h3>
                        <p className="text-[11px] leading-relaxed italic">Ask Nova to analyze your documents or plan your next workflow steps logic.</p>
                    </div>
                ) : (
                    tasks.map((task, idx) => (
                        <TaskCard key={task._id || idx} {...task} onToggle={handleToggle} />
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskPanel;
