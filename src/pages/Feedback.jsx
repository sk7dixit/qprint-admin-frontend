import React, { useState } from "react";
import {
    MessageSquare,
    Search,
    Clock,
    CheckCircle2,
    XCircle,
    ArrowUpRight,
    User,
    Mail,
    Filter,
    SearchX,
    Inbox
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";

export default function Feedback() {
    const navigate = useNavigate();
    const { user: currentUser, getToken } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [feedbackItems, setFeedbackItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const backendUrl = "http://localhost:5000";

    React.useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const token = await getToken();
                const response = await fetch(`${backendUrl}/api/admin/feedback`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setFeedbackItems(data);
                }
            } catch (error) {
                console.error("Fetch feedback error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) fetchFeedback();
    }, [currentUser]);

    const filteredFeedback = feedbackItems.filter(item =>
        (item.user_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.message || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.enrollment_id || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {/* Module Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent-blue/10 border border-accent-blue/20 rounded-lg">
                            <MessageSquare size={20} className="text-accent-blue" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-text-primary">Signal Collector</h2>
                    </div>
                    <p className="text-sm font-medium text-text-muted mt-1 max-w-xl">
                        A non-interactive repository for user signals and system feedback. Observe patterns and resolve structural friction.
                    </p>
                </div>

                <div className="w-full sm:w-80 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-accent-blue transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search by User, ID, or Message..."
                        className="w-full bg-obsidian-surface border border-obsidian-border rounded-xl py-3.5 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 transition-all outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Signal Ledger */}
            {filteredFeedback.length > 0 ? (
                <div className="obsidian-card overflow-hidden">
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-obsidian-bg/50 border-b border-obsidian-border">
                                    <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Initiator</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Affiliation</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Signal Preview</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Processing</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Captured</th>
                                    <th className="px-8 py-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-obsidian-border">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-12 text-center text-text-muted italic">Scanning signal matrix...</td>
                                    </tr>
                                ) : filteredFeedback.map((item) => (
                                    <tr key={item.id} className="hover:bg-accent-blue/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-text-primary tracking-tight">{item.user_name || 'Anonymous Signal'}</span>
                                                <span className="text-[10px] font-mono text-text-muted opacity-60 tracking-tighter">{item.enrollment_id || 'UID_UNKNOWN'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{item.user_role}</span>
                                        </td>
                                        <td className="px-6 py-6 max-w-xs">
                                            <p className="text-xs font-medium text-text-secondary truncate italic">"{item.message}"</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${item.status === 'New' ? 'bg-accent-blue/5 border-accent-blue/20 text-accent-blue' :
                                                item.status === 'Resolved' ? 'bg-system-green/5 border-system-green/20 text-system-green' :
                                                    'bg-white/5 border-white/20 text-text-muted'
                                                }`}>
                                                <div className={`w-1 h-1 rounded-full ${item.status === 'New' ? 'bg-accent-blue' :
                                                    item.status === 'Resolved' ? 'bg-system-green' :
                                                        'bg-white'
                                                    }`} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">
                                                    {item.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-xs text-text-muted opacity-60">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button
                                                className="p-2.5 bg-obsidian-bg border border-obsidian-border rounded-lg text-text-muted hover:text-accent-blue hover:border-accent-blue/30 transition-all"
                                            >
                                                <ArrowUpRight size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Feed */}
                    <div className="md:hidden divide-y divide-obsidian-border">
                        {filteredFeedback.map((item) => (
                            <div key={item.id} onClick={() => navigate(`/feedback/${item.id}`)} className="p-6 space-y-4 active:bg-obsidian-bg transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-text-primary">{item.user}</span>
                                        <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">{item.role}</span>
                                    </div>
                                    <div className={`px-2.5 py-1 rounded-full border ${item.status === 'New' ? 'bg-accent-blue/5 border-accent-blue/20' :
                                        item.status === 'Resolved' ? 'bg-system-green/5 border-system-green/20' :
                                            'bg-white/5 border-white/20'
                                        }`}>
                                        <span className={`text-[8px] font-black uppercase tracking-widest ${item.status === 'New' ? 'text-accent-blue' :
                                            item.status === 'Resolved' ? 'text-system-green' :
                                                'text-text-muted'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-xs font-medium text-text-muted border-l-2 border-obsidian-border pl-4 italic leading-relaxed truncate">"{item.message}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="obsidian-card py-32 flex flex-col items-center justify-center gap-8 border-dashed border-2 animate-in zoom-in-95 duration-500">
                    <div className="p-8 bg-obsidian-bg border border-obsidian-border rounded-full opacity-20">
                        <Inbox size={48} className="text-text-muted" />
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center px-6">
                        <h4 className="text-sm font-black text-text-primary uppercase tracking-[0.2em]">Signal Quiescence</h4>
                        <p className="text-xs font-medium text-text-muted max-w-xs leading-relaxed">
                            No active signals matched "{searchQuery}". The system state remains stable.
                        </p>
                    </div>
                </div>
            )}

            {/* Strategic Rule */}
            <div className="p-8 bg-accent-blue/[0.03] border border-accent-blue/10 rounded-2xl flex items-start gap-5">
                <div className="p-2 bg-accent-blue/10 rounded-lg text-accent-blue mt-1">
                    <Clock size={20} />
                </div>
                <div className="space-y-1">
                    <h5 className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em]">Operational Guard</h5>
                    <p className="text-xs font-medium text-text-muted leading-relaxed italic pr-4">
                        This collector is append-only and strictly non-interactive. Deletion and direct two-way messaging are restricted to prevent administrative overhead and preserve investigative objectivity.
                    </p>
                </div>
            </div>
        </div>
    );
}
