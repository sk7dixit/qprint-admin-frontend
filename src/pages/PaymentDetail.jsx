import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    CreditCard,
    User,
    Calendar,
    Fingerprint,
    ShieldCheck,
    Activity,
    Clock,
    FileText,
    ArrowUpRight,
    CheckCircle2,
    XCircle,
    Copy,
    AlertCircle
} from "lucide-react";

export default function PaymentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock Payment Data for Forensics
    const pay = {
        id: id,
        user: "Shashwat S.",
        enrollment: "21BCE1001",
        email: "shashwat@paruluniversity.ac.in",
        role: "student",
        amount: "₹45.00",
        status: "Success",
        ref: "TXN_77821092",
        date: "2026-02-06",
        time: "14:20:12",
        method: "Razorpay (GPay)",
        printRef: "PRNT-8821092211",
        gatewayMsg: "Transaction approved by bank node",
        uid: "user_sh_9942"
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
            {/* Header: Back + Identifier */}
            <div className="flex items-center gap-6">
                <button
                    onClick={() => navigate("/payments")}
                    className="p-3 obsidian-card bg-obsidian-bg hover:bg-obsidian-surface text-text-muted hover:text-text-primary transition-all"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-accent-blue uppercase tracking-[0.3em]">Forensic Ledger</span>
                        <div className={`px-2 py-0.5 rounded-full border flex items-center gap-1.5 ${pay.status === 'Success' ? 'bg-system-green/10 border-system-green/20' :
                                pay.status === 'Failed' ? 'bg-system-red/10 border-system-red/20' :
                                    'bg-white/10 border-white/20'
                            }`}>
                            <div className={`w-1 h-1 rounded-full ${pay.status === 'Success' ? 'bg-system-green' : pay.status === 'Failed' ? 'bg-system-red' : 'bg-white'}`} />
                            <span className={`text-[8px] font-black uppercase tracking-widest ${pay.status === 'Success' ? 'text-system-green' : pay.status === 'Failed' ? 'text-system-red' : 'text-text-muted'
                                }`}>{pay.status}</span>
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-text-primary tracking-tighter mt-1">{pay.ref}</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Forensic Columns */}
                <div className="lg:col-span-8 space-y-10">

                    {/* Zone 1: Payment Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="obsidian-card p-10 space-y-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <CreditCard size={120} />
                            </div>
                            <div className="space-y-1 relative z-10">
                                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Settlement Amount</span>
                                <h3 className="text-5xl font-black text-text-primary italic tracking-tight">{pay.amount}</h3>
                            </div>
                            <div className="space-y-4 pt-6 border-t border-obsidian-border relative z-10">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Gateway Provider</span>
                                    <span className="text-[10px] font-black text-text-primary uppercase">{pay.method}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Master Status</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${pay.status === 'Success' ? 'text-system-green' : 'text-system-red'}`}>{pay.status}</span>
                                </div>
                            </div>
                        </div>

                        <div className="obsidian-card p-10 space-y-8 bg-obsidian-surface/50 border-dashed">
                            <div className="flex items-center gap-3">
                                <Clock size={16} className="text-text-muted" />
                                <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Transaction Timeline</h4>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-0.5 h-full bg-obsidian-border absolute left-2 top-4 ml-[0.8px]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-blue relative z-10 mt-1" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-text-primary">{pay.date} • {pay.time}</span>
                                        <span className="text-[9px] font-black text-text-muted uppercase tracking-widest mt-0.5">Attempt Recorded</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className={`w-1.5 h-1.5 rounded-full ${pay.status === 'Success' ? 'bg-system-green' : 'bg-system-red'} relative z-10 mt-1`} />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-text-primary">{pay.gatewayMsg}</span>
                                        <span className="text-[9px] font-black text-text-muted uppercase tracking-widest mt-0.5">Gateway Response</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Zone 2: System Metadata */}
                    <div className="obsidian-card p-10 space-y-10">
                        <div className="flex items-center justify-between border-b border-obsidian-border pb-6">
                            <div className="flex items-center gap-3">
                                <Activity size={16} className="text-accent-blue" />
                                <h4 className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em]">Forensic Metadata</h4>
                            </div>
                            <div className="flex items-center gap-2 text-[9px] font-black text-text-muted uppercase tracking-widest">
                                Source: Global Database Node
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-10">
                            {[
                                { label: "System Payment ID", val: pay.id, mono: true },
                                { label: "Print Job Reference", val: pay.printRef, mono: true },
                                { label: "Enrollment ID", val: pay.enrollment, mono: true },
                                { label: "Internal UID Link", val: pay.uid, mono: true },
                            ].map((item, i) => (
                                <div key={i} className="space-y-1.5 group">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{item.label}</span>
                                        <button className="opacity-0 group-hover:opacity-40 transition-opacity"><Copy size={12} /></button>
                                    </div>
                                    <div className={`text-xs font-bold text-text-primary ${item.mono ? 'font-mono' : ''} bg-obsidian-bg p-3 rounded-lg border border-obsidian-border`}>
                                        {item.val}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: User Context */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="flex items-center gap-3">
                        <User size={16} className="text-accent-blue" />
                        <h4 className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em]">Initiator Identity</h4>
                    </div>

                    <div className="obsidian-card p-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-obsidian-bg border border-obsidian-border flex items-center justify-center text-xl font-black text-text-muted group-hover:border-accent-blue transition-all">
                                    {pay.user[0]}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-black text-text-primary tracking-tight italic">{pay.user}</span>
                                    <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em]">{pay.role}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate(`/users/${pay.uid}`)}
                                className="p-3 obsidian-card bg-obsidian-bg hover:bg-obsidian-surface text-text-muted hover:text-accent-blue transition-all"
                            >
                                <ArrowUpRight size={18} />
                            </button>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-obsidian-border">
                            <div className="flex items-center gap-3 text-text-muted">
                                <FileText size={14} />
                                <span className="text-xs font-medium text-text-secondary">{pay.enrollment}</span>
                            </div>
                            <div className="flex items-center gap-3 text-text-muted">
                                <Mail size={14} />
                                <span className="text-xs font-medium text-text-secondary">{pay.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Operational Guard */}
                    <div className="p-8 obsidian-card bg-system-red/[0.03] border-system-red/10 space-y-6">
                        <div className="flex items-center gap-3">
                            <AlertCircle size={16} className="text-system-red" />
                            <h4 className="text-[10px] font-black text-system-red uppercase tracking-widest">Settlement Lock</h4>
                        </div>
                        <p className="text-xs font-medium text-text-muted leading-relaxed italic border-l-2 border-system-red/30 pl-4 py-1">
                            This transaction is permanently locked. The Administrative Panel cannot trigger refunds, retries, or settlement overrides. Conduct financial adjustments through the primary gateway vault.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
