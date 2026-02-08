import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    User,
    Mail,
    Phone,
    Fingerprint,
    CheckCircle2,
    Clock,
    History,
    CreditCard,
    ArrowUpRight,
    Shield
} from "lucide-react";

export default function UserDetail() {
    const { uid } = useParams();
    const navigate = useNavigate();

    // Mock User Data for Investigation
    const user = {
        uid: uid,
        name: "Shashwat S.",
        email: "shashwat@paruluniversity.ac.in",
        mobile: "+91 8542929942",
        role: "student",
        id: "21BCE1001",
        status: "completed",
        created: "2026-02-01 10:24 AM",
        lastActivity: "4 mins ago",
        signupMethod: "Google Workspace",
        paymentHistory: [
            { id: "tx_1024", amount: "₹45.00", date: "2026-02-05", status: "success", ref: "PRNT-8821" },
            { id: "tx_0942", amount: "₹12.50", date: "2026-02-03", status: "success", ref: "PRNT-0091" },
            { id: "tx_0811", amount: "₹120.00", date: "2026-02-01", status: "failed", ref: "PRNT-5561" },
        ]
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
            {/* Header: Back + Identifier */}
            <div className="flex items-center gap-6">
                <button
                    onClick={() => navigate("/users")}
                    className="p-3 obsidian-card bg-obsidian-bg hover:bg-obsidian-surface text-text-muted hover:text-text-primary transition-all"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-accent-blue uppercase tracking-[0.3em]">Identity Hub</span>
                        <div className="px-2 py-0.5 bg-system-green/10 border border-system-green/20 rounded-full flex items-center gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-system-green" />
                            <span className="text-[8px] font-black text-system-green uppercase tracking-widest">Active Probe</span>
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-text-primary tracking-tighter mt-1">{user.name}</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Profile Summary & Metadata (Investigative Depth) */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Zone 1: Summary */}
                    <div className="obsidian-card p-8 space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-obsidian-bg border border-obsidian-border flex items-center justify-center text-2xl font-black text-text-muted">
                                {user.name[0]}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">
                                    {user.role === 'student' ? 'Enrollment Number' : 'Staff Identity'}
                                </span>
                                <span className="text-xl font-black text-text-primary tracking-tight">{user.id}</span>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-center gap-4 p-4 bg-obsidian-bg border border-obsidian-border rounded-xl">
                                <Mail size={16} className="text-text-muted" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Primary Contact Identity</span>
                                    <span className="text-xs font-bold text-text-primary">{user.email}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-obsidian-bg border border-obsidian-border rounded-xl">
                                <Phone size={16} className="text-text-muted" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Mobile Number</span>
                                    <span className="text-xs font-bold text-text-primary">{user.mobile}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-obsidian-bg border border-obsidian-border rounded-xl">
                                <Clock size={16} className="text-text-muted" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Last Activity</span>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-system-green shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                        <span className="text-xs font-bold text-text-primary">Active — {user.lastActivity}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Zone 2: Account Metadata */}
                    <div className="obsidian-card p-8 bg-obsidian-surface/50 space-y-6 border-dashed">
                        <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">System Entropy</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-obsidian-border pb-3">
                                <span className="text-[10px] font-bold text-text-muted uppercase">Registry UID</span>
                                <span className="text-[10px] font-mono text-text-secondary">{uid.substring(0, 12)}...</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-obsidian-border pb-3">
                                <span className="text-[10px] font-bold text-text-muted uppercase">Onboarding</span>
                                <span className="text-[10px] font-bold text-text-primary">{user.signupMethod}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-text-muted uppercase">Enrollment Date</span>
                                <span className="text-[10px] font-bold text-text-primary">{user.created.split(' ')[0]}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Ledger & Audit (Payment History) */}
                <div className="lg:col-span-8 space-y-8 max-w-4xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-accent-blue/10 border border-accent-blue/20 rounded-lg">
                                <History size={16} className="text-accent-blue" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text-primary">Ledger History</h3>
                        </div>
                    </div>

                    {/* Ledger Summary Zones */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="obsidian-card p-4 bg-obsidian-surface/30 space-y-1">
                            <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Total Transactions</span>
                            <div className="text-xl font-black text-text-primary tracking-tighter">{user.paymentHistory.length}</div>
                        </div>
                        <div className="obsidian-card p-4 bg-obsidian-surface/30 space-y-1">
                            <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Success Count</span>
                            <div className="text-xl font-black text-system-green tracking-tighter">
                                {user.paymentHistory.filter(tx => tx.status === 'success').length}
                            </div>
                        </div>
                        <div className="obsidian-card p-4 bg-obsidian-surface/30 space-y-1 border-dashed">
                            <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Failed / Pending</span>
                            <div className="text-xl font-black text-system-red tracking-tighter">
                                {user.paymentHistory.filter(tx => tx.status !== 'success').length}
                            </div>
                        </div>
                    </div>

                    <div className="obsidian-card overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-obsidian-bg/50 border-b border-obsidian-border">
                                    <th className="px-6 py-4 text-[9px] font-black text-text-muted uppercase tracking-widest">Date</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-text-muted uppercase tracking-widest">Node</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-text-muted uppercase tracking-widest">Amount</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-text-muted uppercase tracking-widest text-right">Settlement</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-obsidian-border">
                                {user.paymentHistory.map((tx) => (
                                    <tr
                                        key={tx.id}
                                        className="hover:bg-white/5 group border-l-2 border-l-transparent hover:border-l-accent-blue transition-all"
                                    >
                                        <td className="px-6 py-5 text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors">{tx.date}</td>
                                        <td className="px-6 py-5 font-mono text-[10px] text-text-muted tracking-tighter uppercase group-hover:text-text-secondary transition-colors">{tx.ref}</td>
                                        <td className="px-6 py-5 text-xs font-black text-text-primary group-hover:scale-[1.02] origin-left transition-transform">{tx.amount}</td>
                                        <td className="px-6 py-5 text-right">
                                            <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${tx.status === 'success' ? 'text-system-green' : 'text-system-red'}`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="p-10 border-t border-obsidian-border flex flex-col items-center justify-center gap-4 bg-obsidian-bg/20">
                            <div className="p-3 border border-obsidian-border rounded-full opacity-20">
                                <CreditCard size={24} className="text-text-muted" />
                            </div>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40">No Older Transactions Found</p>
                        </div>
                    </div>

                    {/* Safety Footnote */}
                    <div className="flex items-center gap-3 p-4 bg-slate-500/5 border border-slate-500/10 rounded-xl">
                        <Shield size={14} className="text-text-muted" />
                        <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest opacity-60">
                            Modification locked. To update identity records, contact the central university registrar node.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
