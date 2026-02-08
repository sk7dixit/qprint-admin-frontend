import React, { useState } from "react";
import {
    Shield,
    Search,
    Filter,
    Activity,
    User,
    Store,
    CreditCard,
    Settings,
    Clock,
    AlertCircle,
    Server,
    Cpu,
    Zap,
    Key
} from "lucide-react";

import { useAuth } from "../auth/AuthContext";

export default function AuditLogs() {
    const { user: currentUser, getToken } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const backendUrl = "http://localhost:5000";

    React.useEffect(() => {
        const fetchLogs = async () => {
            try {
                const token = await getToken();
                const response = await fetch(`${backendUrl}/api/admin/audit-logs`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setLogs(data);
                }
            } catch (error) {
                console.error("Fetch logs error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) fetchLogs();
    }, [currentUser]);

    const filteredLogs = logs.filter(log =>
        (log.actor_id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.action || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.target || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getActionIcon = (action) => {
        if (action.includes('SHOP')) return <Store size={14} />;
        if (action.includes('PAYMENT')) return <CreditCard size={14} />;
        if (action.includes('SETTINGS')) return <Settings size={14} />;
        if (action.includes('LOGIN')) return <Key size={14} />;
        return <Activity size={14} />;
    };

    const getSeverityColor = (severity) => {
        if (severity === 'high') return 'text-system-red bg-system-red/10 border-system-red/20';
        if (severity === 'medium') return 'text-accent-blue bg-accent-blue/10 border-accent-blue/20';
        return 'text-text-muted bg-white/5 border-white/20';
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {/* Module Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent-blue/10 border border-accent-blue/20 rounded-lg">
                            <Shield size={20} className="text-accent-blue" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-text-primary">Audit Chronology</h2>
                    </div>
                    <p className="text-sm font-medium text-text-muted mt-1 max-w-xl">
                        Tamper-proof, append-only record of every structural system event. Trace authority and verify operational integrity.
                    </p>
                </div>

                <div className="w-full sm:w-80 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-accent-blue transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search by Actor, Target, or Action..."
                        className="w-full bg-obsidian-surface border border-obsidian-border rounded-xl py-3.5 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 transition-all outline-none font-mono"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Log Ledger */}
            <div className="obsidian-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-obsidian-bg/50 border-b border-obsidian-border">
                                <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Timestamp</th>
                                <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Actor Node</th>
                                <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Action Vector</th>
                                <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Master Target</th>
                                <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Criticality</th>
                                <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] text-right">Trace ID</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-obsidian-border">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-12 text-center text-text-muted italic">Decrypting audit stream...</td>
                                </tr>
                            ) : filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-6 text-[11px] font-bold text-text-secondary whitespace-nowrap">
                                        {new Date(log.created_at).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-obsidian-bg border border-obsidian-border flex items-center justify-center text-text-muted">
                                                {log.actor_type === 'admin' ? <Shield size={14} /> : log.actor_type === 'system' ? <Cpu size={14} /> : <User size={14} />}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-text-primary uppercase">{log.actor_type}</span>
                                                <span className="text-[9px] font-mono text-text-muted opacity-50">{log.actor_id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 font-mono text-[10px] font-black text-text-primary tracking-widest whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span className="opacity-40">{getActionIcon(log.action)}</span>
                                            {log.action}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 font-mono text-[10px] text-text-secondary italic">
                                        {log.target}
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className={`inline-flex px-2 py-0.5 rounded-full border text-[8px] font-black uppercase tracking-widest ${getSeverityColor(log.severity)}`}>
                                            {log.severity}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right font-mono text-[10px] text-text-muted opacity-40">
                                        {log.id.toString().padStart(4, '0')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Strategic Rule */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 obsidian-card bg-accent-blue/[0.03] border-accent-blue/10 flex items-start gap-5">
                    <div className="p-2 bg-accent-blue/10 rounded-lg text-accent-blue mt-1">
                        <Server size={20} />
                    </div>
                    <div className="space-y-1">
                        <h5 className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em]">Immutability Protocol</h5>
                        <p className="text-xs font-medium text-text-muted leading-relaxed italic">
                            Logs are physically append-only. No deletion or temporal modification is permitted at the software layer. Audit integrity is preserved via blockchain-style sequencing.
                        </p>
                    </div>
                </div>

                <div className="p-8 obsidian-card bg-system-red/[0.03] border-system-red/10 flex items-start gap-5">
                    <div className="p-2 bg-system-red/10 rounded-lg text-system-red mt-1">
                        <Zap size={20} />
                    </div>
                    <div className="space-y-1">
                        <h5 className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em]">Forensic Alert</h5>
                        <p className="text-xs font-medium text-text-muted leading-relaxed italic">
                            Sensitive actions (Shop creation/disable, password resets) are multi-factor verified and instantly broadcasted to the audit pool. Attempting to bypass these logs triggers a system-wide authority lockdown.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
