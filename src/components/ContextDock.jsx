import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Filter, Shield, History, Users, Store, CreditCard, MessageSquare } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function ContextDock({ isOpen, onClose }) {
    const location = useLocation();
    const path = location.pathname;

    const getContextConfig = () => {
        if (path.startsWith('/users')) {
            return {
                title: "Directory Filters",
                icon: <Users size={18} className="text-accent-blue" />,
                filterLabel: "Affiliation Scope",
                filters: [
                    { label: "Role", options: ['student', 'staff'] },
                    { label: "Profile Health", options: ['completed', 'pending'] }
                ]
            };
        }
        if (path.startsWith('/shops')) {
            return {
                title: "Network Filters",
                icon: <Store size={18} className="text-accent-blue" />,
                filterLabel: "Node Status",
                filters: [
                    { label: "Registry Status", options: ['Active', 'Restricted'] },
                    { label: "Operator Type", options: ['Internal', 'Third-Party'] }
                ]
            };
        }
        if (path.startsWith('/payments')) {
            return {
                title: "Forensic Scope",
                icon: <CreditCard size={18} className="text-accent-blue" />,
                filterLabel: "Audit Filters",
                filters: [
                    { label: "Audit Status", options: ['Success', 'Failed', 'Pending'], fullWidth: true },
                    { label: "Temporal Span", options: ['Today', 'Last 7D'] }
                ]
            };
        }
        if (path.startsWith('/feedback')) {
            return {
                title: "Signal Filters",
                icon: <MessageSquare size={18} className="text-accent-blue" />,
                filterLabel: "Signal Category",
                filters: [
                    { label: "State", options: ['New', 'Reviewed', 'Resolved'] },
                    { label: "Priority", options: ['High', 'Medium', 'Low'] }
                ]
            };
        }
        return {
            title: "Audit Context",
            icon: <History size={18} className="text-accent-blue" />,
            filterLabel: "Forensic Intelligence",
            filters: [
                { label: "Actor Vector", options: ['Admin', 'User', 'System'] },
                { label: "Temporal Scope", options: ['Today', 'Last 24H'] }
            ]
        };
    };

    const config = getContextConfig();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
                    />

                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] bg-obsidian-surface border-l border-obsidian-border z-50 flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="h-16 px-8 flex items-center justify-between border-b border-obsidian-border shrink-0">
                            <div className="flex items-center gap-3">
                                {config.icon}
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text-primary">{config.title}</h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-obsidian-bg rounded-lg border border-transparent hover:border-obsidian-border transition-all text-text-muted hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-8 space-y-10">
                            {/* Filter Section */}
                            <div className="space-y-4">
                                <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] flex items-center gap-2">
                                    <Filter size={12} /> {config.filterLabel}
                                </div>
                                <div className="space-y-6">
                                    {config.filters.map((f, i) => (
                                        <div key={i} className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-black text-text-muted uppercase tracking-widest ml-1">{f.label}</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {f.options.map(opt => (
                                                    <button key={opt} className={`py-2.5 px-4 obsidian-card bg-obsidian-bg text-[10px] font-bold text-text-muted uppercase tracking-widest hover:text-accent-blue hover:border-accent-blue/30 transition-all ${f.fullWidth && f.options.indexOf(opt) === 0 ? 'col-span-2' : ''}`}>
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 pt-10 border-t border-obsidian-border">
                                <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] flex items-center gap-2">
                                    <Shield size={12} /> System Guard Node
                                </div>
                                <div className="space-y-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="bg-obsidian-bg border border-obsidian-border rounded-xl p-4 flex items-center gap-4 group">
                                            <div className="w-2 h-2 rounded-full bg-accent-blue/30 group-hover:bg-accent-blue transition-colors" />
                                            <div className="flex flex-col gap-1">
                                                <div className="h-2 w-24 bg-obsidian-border rounded animate-pulse" />
                                                <div className="h-1.5 w-16 bg-obsidian-border rounded opacity-50" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border-t border-obsidian-border bg-obsidian-bg/50">
                            <button className="w-full py-4 obsidian-card bg-obsidian-bg text-[10px] font-black uppercase tracking-[0.2em] hover:text-accent-blue hover:border-accent-blue/30 transition-all">
                                Refresh Contextual Stream
                            </button>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
