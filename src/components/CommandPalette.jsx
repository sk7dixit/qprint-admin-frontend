import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Users,
    Store,
    CreditCard,
    MessageSquare,
    Search,
    ChevronRight,
    ArrowRight,
    Settings,
    Shield
} from "lucide-react";

const NAV_ITEMS = [
    { id: "dashboard", label: "Terminal: Core Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} />, desc: "System performance & metrics" },
    { id: "users", label: "Directory: Students & Staff", path: "/users", icon: <Users size={18} />, desc: "Manage system identity nodes" },
    { id: "shops", label: "Network: Authorized Shops", path: "/shops", icon: <Store size={18} />, desc: "Print shop lifecycle control" },
    { id: "payments", label: "Ledger: Global Payments", path: "/payments", icon: <CreditCard size={18} />, desc: "Transaction logs & reconciliation" },
    { id: "feedback", label: "Signals: User Feedback", path: "/feedback", icon: <MessageSquare size={18} />, desc: "Non-interactive signal collection" },
    { id: "audit-logs", label: "Trace: System Audit Logs", path: "/audit-logs", icon: <Shield size={18} />, desc: "Tamper-proof operational trace" },
    { id: "settings", label: "Control: System Settings", path: "/settings", icon: <Settings size={18} />, desc: "Emergency kill-switches & safety" },
];

export default function CommandPalette({ onClose }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef(null);

    const filteredItems = NAV_ITEMS.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSelect = (path) => {
        navigate(path);
        onClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setActiveIndex(prev => (prev + 1) % filteredItems.length);
        } else if (e.key === "ArrowUp") {
            setActiveIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
        } else if (e.key === "Enter") {
            handleSelect(filteredItems[activeIndex].path);
        }
    };

    return (
        <div className="command-panel-overlay" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-2xl obsidian-card shadow-[0_32px_128px_rgba(0,0,0,0.8)] overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="flex items-center px-6 py-5 border-b border-obsidian-border gap-4 bg-obsidian-bg">
                    <Search className="text-text-muted" size={20} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type a module name or command..."
                        className="flex-grow bg-transparent border-none outline-none text-text-primary text-base font-medium placeholder:text-text-muted"
                        value={query}
                        onChange={e => {
                            setQuery(e.target.value);
                            setActiveIndex(0);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-obsidian-surface border border-obsidian-border rounded text-[10px] font-black tracking-widest text-text-muted">
                        ESC
                    </div>
                </div>

                {/* Results List */}
                <div className="max-h-[400px] overflow-y-auto p-3">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={`
                                    w-full px-4 py-4 rounded-xl flex items-center justify-between cursor-pointer transition-all group
                                    ${activeIndex === index ? "bg-accent-blue/10 border border-accent-blue/30" : "hover:bg-obsidian-surface border border-transparent"}
                                `}
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={() => handleSelect(item.path)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`
                                        p-2.5 rounded-lg flex items-center justify-center transition-colors
                                        ${activeIndex === index ? "bg-accent-blue text-white" : "bg-obsidian-bg text-text-muted group-hover:text-text-secondary"}
                                    `}>
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-bold tracking-tight ${activeIndex === index ? "text-white" : "text-text-primary text-opacity-80 group-hover:text-opacity-100"}`}>
                                            {item.label}
                                        </span>
                                        <span className="text-[11px] font-medium text-text-muted group-hover:text-text-muted opacity-80">
                                            {item.desc}
                                        </span>
                                    </div>
                                </div>

                                {activeIndex === index && (
                                    <motion.div layoutId="arrow" className="text-accent-blue flex items-center gap-2">
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em]">Open</span>
                                        <ArrowRight size={14} />
                                    </motion.div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="py-12 text-center space-y-3">
                            <div className="text-text-muted font-bold text-sm tracking-tight opacity-50">No command matches your query</div>
                            <div className="text-[10px] uppercase font-black tracking-[0.3em] text-accent-blue/40 italic">System Registry Not Found</div>
                        </div>
                    )}
                </div>

                {/* Footer Utilities */}
                <div className="bg-obsidian-surface px-6 py-4 flex items-center justify-between border-t border-obsidian-border">
                    <div className="flex items-center gap-4 opacity-40">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-muted uppercase tracking-tighter">
                            <span className="px-1.5 py-0.5 bg-obsidian-bg rounded border border-obsidian-border font-black">↑↓</span> Move
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-muted uppercase tracking-tighter">
                            <span className="px-1.5 py-0.5 bg-obsidian-bg rounded border border-obsidian-border font-black">Enter</span> Select
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
