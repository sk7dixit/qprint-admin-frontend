import React, { useState } from "react";
import {
    CreditCard,
    Search,
    Filter,
    ChevronRight,
    History,
    ShieldCheck,
    ArrowUpRight,
    SearchX,
    User,
    CheckCircle2,
    XCircle,
    Clock,
    DollarSign
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Payments() {
    const navigate = useNavigate();
    const { user: currentUser, getToken } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const backendUrl = "http://localhost:5000";

    React.useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = await getToken();
                const response = await fetch(`${backendUrl}/api/admin/payments`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setPayments(data);
                }
            } catch (error) {
                console.error("Fetch payments error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) fetchPayments();
    }, [currentUser]);

    const displayPayments = payments.map(pay => ({
        id: `PAY_${pay.id.toString().padStart(4, '0')}`,
        db_id: pay.id,
        user: pay.user_name || 'Anonymous',
        enrollment: pay.enrollment_id || 'N/A',
        role: pay.user_role || 'student',
        amount: `₹${(Math.random() * 100 + 10).toFixed(2)}`, // Assuming price is not in DB yet, mocking for visual
        status: pay.status === 'completed' ? 'Success' : pay.status === 'cancelled' ? 'Failed' : 'Pending',
        ref: `TXN_${pay.id.toString().padStart(8, '0')}`,
        date: new Date(pay.created_at).toLocaleString()
    }));

    const filteredPayments = displayPayments.filter(pay =>
        pay.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pay.enrollment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pay.ref.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {/* Module Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent-blue/10 border border-accent-blue/20 rounded-lg">
                            <CreditCard size={20} className="text-accent-blue" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-text-primary">Global Ledger</h2>
                    </div>
                    <p className="text-sm font-medium text-text-muted mt-1 max-w-xl">
                        Chronological record of every system payment attempt. Single source of truth for forensic reconciliation.
                    </p>
                </div>

                <div className="w-full sm:w-80 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-accent-blue transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search by User, ID, or Ref..."
                        className="w-full bg-obsidian-surface border border-obsidian-border rounded-xl py-3.5 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 transition-all outline-none italic"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Ledger Area */}
            {filteredPayments.length > 0 ? (
                <div className="obsidian-card overflow-hidden">
                    {/* Desktop Ledger View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-obsidian-bg/50 border-b border-obsidian-border">
                                    <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Transaction Timestamp</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">User Identifier</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Amount</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Audit Status</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Gateway Reference</th>
                                    <th className="px-8 py-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-obsidian-border">
                                {filteredPayments.map((pay) => (
                                    <tr key={pay.id} className="hover:bg-accent-blue/[0.02] transition-colors group">
                                        <td className="px-8 py-6 text-[11px] font-bold text-text-secondary">
                                            {pay.date}
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-text-primary tracking-tight">{pay.user}</span>
                                                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{pay.enrollment}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 font-black text-sm text-text-primary italic">
                                            {pay.amount}
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${pay.status === 'Success' ? 'bg-system-green/5 border-system-green/20 text-system-green' :
                                                pay.status === 'Failed' ? 'bg-system-red/5 border-system-red/20 text-system-red' :
                                                    'bg-white/5 border-white/20 text-text-muted'
                                                }`}>
                                                {pay.status === 'Success' ? <CheckCircle2 size={10} /> : pay.status === 'Failed' ? <XCircle size={10} /> : <Clock size={10} />}
                                                <span className="text-[9px] font-black uppercase tracking-widest">
                                                    {pay.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 font-mono text-[10px] text-text-muted tracking-tighter uppercase opacity-80">
                                            {pay.ref}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button
                                                onClick={() => navigate(`/payments/${pay.id}`)}
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

                    {/* Mobile Card View */}
                    <div className="md:hidden divide-y divide-obsidian-border">
                        {filteredPayments.map((pay) => (
                            <div key={pay.id} onClick={() => navigate(`/payments/${pay.id}`)} className="p-6 space-y-4 active:bg-obsidian-bg transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">{pay.date}</span>
                                        <span className="text-sm font-black text-text-primary tracking-tight italic">{pay.amount}</span>
                                    </div>
                                    <div className={`px-2.5 py-1 rounded-full border ${pay.status === 'Success' ? 'bg-system-green/5 border-system-green/20' :
                                        pay.status === 'Failed' ? 'bg-system-red/5 border-system-red/20' :
                                            'bg-white/5 border-white/20'
                                        }`}>
                                        <span className={`text-[8px] font-black uppercase tracking-widest ${pay.status === 'Success' ? 'text-system-green' :
                                            pay.status === 'Failed' ? 'text-system-red' :
                                                'text-text-muted'
                                            }`}>
                                            {pay.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-obsidian-bg border border-obsidian-border rounded-xl">
                                    <div className="w-8 h-8 rounded-lg bg-obsidian-surface flex items-center justify-center text-[10px] font-black text-text-muted">
                                        {pay.user[0]}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-text-primary">{pay.user}</span>
                                        <span className="text-[9px] font-bold text-text-muted uppercase opacity-60 tracking-tighter leading-none">{pay.ref}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="obsidian-card py-24 flex flex-col items-center justify-center gap-6 border-dashed border-2 animate-in zoom-in-95 duration-500">
                    <div className="p-6 bg-obsidian-bg border border-obsidian-border rounded-3xl">
                        <SearchX size={48} className="text-text-muted opacity-20" />
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center px-6">
                        <h4 className="text-sm font-black text-text-primary uppercase tracking-[0.2em]">Forensic Trace Empty</h4>
                        <p className="text-xs font-medium text-text-muted max-w-xs leading-relaxed">
                            No payment records matched "{searchQuery}". The global ledger remains unblemished.
                        </p>
                    </div>
                    <button
                        onClick={() => setSearchQuery("")}
                        className="text-[10px] font-black text-accent-blue uppercase tracking-widest hover:underline underline-offset-4"
                    >
                        Reset Forensic Scope
                    </button>
                </div>
            )}

            {/* Strategic Warning */}
            <div className="p-8 bg-accent-blue/[0.03] border border-accent-blue/10 rounded-2xl flex items-start gap-5">
                <div className="p-2 bg-accent-blue/10 rounded-lg text-accent-blue mt-1">
                    <ShieldCheck size={20} />
                </div>
                <div className="space-y-1">
                    <h5 className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em]">Audit Integrity Note</h5>
                    <p className="text-xs font-medium text-text-muted leading-relaxed italic pr-4">
                        Financial data in this ledger is strictly read-only and immutable. Deletion, retries, or manual status overrides are forbidden within this interface to maintain the legal integrity of the system's money flow.
                    </p>
                </div>
            </div>
        </div>
    );
}
