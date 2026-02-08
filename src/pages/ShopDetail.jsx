import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    Store,
    User,
    Phone,
    Mail,
    MapPin,
    ShieldCheck,
    ShieldAlert,
    Activity,
    Key,
    Clock,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Zap
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";

export default function ShopDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setDetailError] = useState(null);
    const [status, setStatus] = useState("Active");
    const [showConfirm, setShowConfirm] = useState(false);
    const [actionType, setActionType] = useState(null);

    const backendUrl = "http://localhost:5000";

    React.useEffect(() => {
        const fetchShopDetail = async () => {
            try {
                const token = await getToken();
                const response = await fetch(`${backendUrl}/api/admin/shops/${id}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (!response.ok) throw new Error("Could not fetch node details");

                const data = await response.json();
                setShop(data);
                setStatus(data.status);
            } catch (err) {
                console.error("Fetch error:", err);
                setDetailError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchShopDetail();
    }, [id, getToken]);

    const handleToggleStatus = () => {
        // This should also be a backend call in the future
        setStatus(status === "Active" ? "Disabled" : "Active");
        setShowConfirm(false);
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Activity className="animate-spin text-accent-blue" size={32} />
        </div>
    );

    if (error || !shop) return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <AlertTriangle className="text-system-red" size={48} />
            <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter">Security Detail Unavailable</h3>
            <p className="text-text-muted text-sm uppercase tracking-widest">{error || "Identity record missing"}</p>
            <button
                onClick={() => navigate("/shops")}
                className="px-8 py-3 bg-obsidian-surface border border-obsidian-border text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-white transition-all rounded-xl mt-4"
            >
                Return to Network Registry
            </button>
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
            {/* Header: Back + Identifier */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate("/shops")}
                        className="p-3 obsidian-card bg-obsidian-bg hover:bg-obsidian-surface text-text-muted hover:text-text-primary transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-accent-blue uppercase tracking-[0.3em]">Network Mastery</span>
                            <div className={`px-2 py-0.5 rounded-full border flex items-center gap-1.5 ${status === 'Active' ? 'bg-system-green/10 border-system-green/20' : 'bg-system-red/10 border-system-red/20'}`}>
                                <div className={`w-1 h-1 rounded-full ${status === 'Active' ? 'bg-system-green' : 'bg-system-red'}`} />
                                <span className={`text-[8px] font-black uppercase tracking-widest ${status === 'Active' ? 'text-system-green' : 'text-system-red'}`}>{status}</span>
                            </div>
                        </div>
                        <h2 className="text-3xl font-black text-text-primary tracking-tighter mt-1">{shop.name}</h2>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => { setActionType(status === 'Active' ? 'disable' : 'enable'); setShowConfirm(true); }}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${status === 'Active' ? 'bg-system-red/10 text-system-red border border-system-red/20 hover:bg-system-red hover:text-white' : 'bg-system-green/10 text-system-green border border-system-green/20 hover:bg-system-green hover:text-white'}`}
                    >
                        {status === 'Active' ? 'Emergency Disable' : 'Re-Authorize Node'}
                    </button>
                    <button className="p-3 obsidian-card bg-obsidian-bg hover:bg-obsidian-surface text-text-muted hover:text-accent-blue transition-all group">
                        <Key size={18} className="group-hover:rotate-45 transition-transform" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Shop Overview */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Core Identity Card */}
                        <div className="obsidian-card p-8 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 bg-accent-blue/10 border border-accent-blue/20 rounded-lg">
                                    <Store size={14} className="text-accent-blue" />
                                </div>
                                <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Registry Overview</h4>
                            </div>

                            <div className="space-y-5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Master Shop ID</span>
                                    <span className="text-sm font-mono font-black text-text-primary italic">{shop.id}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Physical Designation</span>
                                    <span className="text-xs font-bold text-text-primary leading-tight">{shop.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Control Metadata */}
                        <div className="obsidian-card p-8 space-y-8 bg-obsidian-surface/50 border-dashed">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 bg-accent-blue/10 border border-accent-blue/20 rounded-lg">
                                    <Activity size={14} className="text-accent-blue" />
                                </div>
                                <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Live Pulse</h4>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-obsidian-border pb-3">
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-tight">Last System Heartbeat</span>
                                    <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest">{shop.lastLogin}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-obsidian-border pb-3">
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-tight">Last Data Payload</span>
                                    <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest">{shop.lastOrder}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-tight">Total Node Volume</span>
                                    <span className="text-[10px] font-black text-accent-blue">{shop.totalOrders} TX</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operator Information */}
                    <div className="obsidian-card p-8 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-accent-blue/10 border border-accent-blue/20 rounded-lg">
                                <User size={14} className="text-accent-blue" />
                            </div>
                            <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Operator Integrity</h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Master Name</span>
                                <span className="text-sm font-bold text-text-primary tracking-tight">{shop.owner}</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Secured Mobile</span>
                                <span className="text-sm font-bold text-text-primary tracking-tight">{shop.mobile}</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">System Email</span>
                                <span className="text-sm font-bold text-text-primary tracking-tight">{shop.owner_email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Context & Logs */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="obsidian-card p-8 bg-accent-blue/[0.03] space-y-6">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={16} className="text-accent-blue" />
                            <h4 className="text-[10px] font-black text-text-primary uppercase tracking-widest">Security Protocol</h4>
                        </div>
                        <p className="text-xs font-medium text-text-muted leading-relaxed italic border-l-2 border-accent-blue/30 pl-4 py-1">
                            Shop nodes are immutable. Deletion is physically restricted to preserve audit integrity. Only Status and Credential overrides are permitted.
                        </p>
                    </div>

                    <div className="obsidian-card p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <Clock size={16} className="text-text-muted" />
                            <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest">Recent Node Events</h4>
                        </div>
                        <div className="space-y-4">
                            {[
                                { msg: "Node heartbeart verified", time: "12m ago", type: "system" },
                                { msg: "Authorized session established", time: "4h 20m ago", type: "auth" },
                                { msg: "Registry established", time: "2026-01-15", type: "create" }
                            ].map((log, i) => (
                                <div key={i} className="flex flex-col gap-1 pb-4 border-b border-obsidian-border last:border-0 last:pb-0">
                                    <span className="text-[11px] font-medium text-text-primary">{log.msg}</span>
                                    <span className="text-[9px] font-bold text-text-muted/50 uppercase tracking-widest">{log.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal: Logical Overlay */}
            {showConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
                    <div className="relative obsidian-card max-w-sm w-full p-8 space-y-8 animate-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className={`p-4 rounded-full ${actionType === 'disable' ? 'bg-system-red/10 text-system-red' : 'bg-system-green/10 text-system-green'}`}>
                                {actionType === 'disable' ? <Zap size={32} /> : <CheckCircle2 size={32} />}
                            </div>
                            <h4 className="text-lg font-black text-text-primary tracking-tight italic">
                                {actionType === 'disable' ? 'Emergency De-Authorization?' : 'Restore Node Authority?'}
                            </h4>
                            <p className="text-xs font-medium text-text-muted leading-relaxed">
                                {actionType === 'disable'
                                    ? "This will immediately terminate all active sessions and block order processing for this shop node. Records will remain intact for audit."
                                    : "This will restore full system access to the operator and allow live order processing to resume."}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="py-4 text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-white transition-colors" onClick={() => setShowConfirm(false)}>Abort</button>
                            <button
                                className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 ${actionType === 'disable' ? 'bg-system-red text-white shadow-system-red/20' : 'bg-system-green text-white shadow-system-green/20'}`}
                                onClick={handleToggleStatus}
                            >
                                Confirm Override
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
