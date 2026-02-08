import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    MessageSquare,
    User,
    Mail,
    Clock,
    CheckCircle2,
    ShieldCheck,
    ArrowUpRight,
    Calendar,
    AlertCircle,
    Flag,
    CheckSquare
} from "lucide-react";

export default function FeedbackDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("New");

    // Mock Feedback Detail
    const feedback = {
        id: id,
        user: "Shashwat S.",
        role: "student",
        enrollment: "21BCE1001",
        email: "shashwat@paruluniversity.ac.in",
        mobile: "+91 8542929942",
        message: "The login page takes too long to load on mobile data. Can we optimize the image assets? I also noticed the dashboard layout shifts slightly on foldables.",
        date: "2026-02-06",
        time: "15:45:21",
        uid: "user_sh_9942"
    };

    const handleUpdateStatus = (newStatus) => {
        setStatus(newStatus);
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
            {/* Header: Back + Identifier */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate("/feedback")}
                        className="p-3 obsidian-card bg-obsidian-bg hover:bg-obsidian-surface text-text-muted hover:text-text-primary transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-accent-blue uppercase tracking-[0.3em]">Signal Inspection</span>
                            <div className={`px-2 py-0.5 rounded-full border flex items-center gap-1.5 ${status === 'New' ? 'bg-accent-blue/10 border-accent-blue/20' :
                                    status === 'Resolved' ? 'bg-system-green/10 border-system-green/20' :
                                        'bg-white/10 border-white/20'
                                }`}>
                                <div className={`w-1 h-1 rounded-full ${status === 'New' ? 'bg-accent-blue' : status === 'Resolved' ? 'bg-system-green' : 'bg-white'}`} />
                                <span className={`text-[8px] font-black uppercase tracking-widest ${status === 'New' ? 'text-accent-blue' : status === 'Resolved' ? 'text-system-green' : 'text-text-muted'
                                    }`}>{status}</span>
                            </div>
                        </div>
                        <h2 className="text-3xl font-black text-text-primary tracking-tighter mt-1">{feedback.id}</h2>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleUpdateStatus('Reviewed')}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${status === 'Reviewed' ? 'bg-obsidian-border text-white' : 'bg-obsidian-bg text-text-muted hover:text-white border border-obsidian-border'}`}
                    >
                        Mark Reviewed
                    </button>
                    <button
                        onClick={() => handleUpdateStatus('Resolved')}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${status === 'Resolved' ? 'bg-system-green text-white shadow-xl shadow-system-green/20' : 'bg-system-green/10 text-system-green border border-system-green/20 hover:bg-system-green hover:text-white'}`}
                    >
                        Mark Resolved
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Message Content */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="obsidian-card p-10 space-y-10">
                        <div className="flex items-center gap-3">
                            <Flag size={16} className="text-accent-blue" />
                            <h4 className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em]">User Submission</h4>
                        </div>

                        <div className="p-10 bg-obsidian-bg/50 border border-obsidian-border rounded-2xl italic leading-relaxed text-lg font-medium text-text-secondary">
                            "{feedback.message}"
                        </div>

                        <div className="flex items-center gap-8 pt-6 border-t border-obsidian-border">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Captured Date</span>
                                <span className="text-[11px] font-bold text-text-primary">{feedback.date}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Captured Time</span>
                                <span className="text-[11px] font-bold text-text-primary">{feedback.time} UTC</span>
                            </div>
                        </div>
                    </div>

                    {/* Meta Traces */}
                    <div className="p-8 obsidian-card bg-accent-blue/[0.03] border-accent-blue/10 flex items-start gap-5">
                        <div className="p-2 bg-accent-blue/10 rounded-lg text-accent-blue">
                            <AlertCircle size={20} />
                        </div>
                        <div className="space-y-1">
                            <h5 className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em]">Forensic Traceability</h5>
                            <p className="text-xs font-medium text-text-muted leading-relaxed">
                                Feedback signals are immutable. Status overrides (Resolved/Reviewed) are automatically recorded in the system audit logs with your administrative identity. Direct user replies are disabled by policy.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Initiator Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="flex items-center gap-3">
                        <User size={16} className="text-accent-blue" />
                        <h4 className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em]">Initiator Profile</h4>
                    </div>

                    <div className="obsidian-card p-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-obsidian-bg border border-obsidian-border flex items-center justify-center text-xl font-black text-text-muted">
                                    {feedback.user[0]}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-black text-text-primary tracking-tight italic">{feedback.user}</span>
                                    <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em]">{feedback.role}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate(`/users/${feedback.uid}`)}
                                className="p-3 obsidian-card bg-obsidian-bg hover:bg-obsidian-surface text-text-muted hover:text-accent-blue transition-all"
                            >
                                <ArrowUpRight size={18} />
                            </button>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-obsidian-border">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest opacity-60">Credentials</span>
                                <span className="text-xs font-bold font-mono text-text-primary">{feedback.enrollment}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest opacity-60">Master Email</span>
                                <span className="text-xs font-bold text-text-primary">{feedback.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Status Logs Sidebar */}
                    <div className="obsidian-card p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <Clock size={16} className="text-text-muted" />
                            <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest">Audit Event Trace</h4>
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1 pb-4 border-b border-obsidian-border">
                                <span className="text-[11px] font-medium text-text-primary">Status overridden to {status}</span>
                                <span className="text-[9px] font-bold text-text-muted/50 uppercase tracking-widest">Just Now</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-medium text-text-primary">Feedback captured via user portal</span>
                                <span className="text-[9px] font-bold text-text-muted/50 uppercase tracking-widest">{feedback.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
