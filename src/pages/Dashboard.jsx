import React from "react";
import {
    Activity,
    Zap,
    Users,
    Store,
    CreditCard,
    ShieldCheck,
    AlertTriangle,
    PlusCircle,
    ArrowUpRight,
    Clock,
    UserPlus,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, getToken } = useAuth();
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const backendUrl = "http://localhost:5000";

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = await getToken();
                const response = await fetch(`${backendUrl}/api/admin/dashboard-stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                }
            } catch (error) {
                console.error("Dashboard fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchStats();
    }, [user]);

    // Icons Mapping for Metric and Activity
    const iconMap = {
        "Total Users": <Users size={20} />,
        "Total Shops": <Store size={20} />,
        "Payments (TX)": <CreditCard size={20} />,
        "Today's Activity": <Activity size={20} />,
        "Platform": <ShieldCheck size={16} />,
        "Payments": <CheckCircle2 size={16} />,
        "Shop Network": <Activity size={16} />,
        "user_signup": <UserPlus size={16} />,
        "payment_success": <CheckCircle2 size={16} />,
        "admin_login": <ShieldCheck size={16} />,
        "shop_disable": <XCircle size={16} />,
        "shop_create": <PlusCircle size={16} />
    };

    if (loading || !data) {
        return <div className="min-h-[400px] flex items-center justify-center text-white/50 animate-pulse uppercase tracking-widest text-xs font-bold">Synchronizing Command Center...</div>;
    }

    const { metrics, systemStatus, activities } = data;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Zone 1: System Status (Top Priority) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {systemStatus.map((item, i) => (
                    <div
                        key={i}
                        className="relative bg-[#1E1E1E] border border-white/5 rounded-2xl p-5 flex items-center justify-between group hover:border-[#00F5FF]/30 transition-all"
                        style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)" }}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-lg ${item.type === 'healthy' ? 'bg-[#00F5FF]/10 text-[#00F5FF]' : 'bg-[#FF4B4B]/10 text-[#FF4B4B]'}`}>
                                {iconMap[item.label] || <ShieldCheck size={16} />}
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">{item.label}</span>
                                <span className="text-sm font-semibold text-white">{item.status}</span>
                            </div>
                        </div>
                        <div
                            className={`w-2 h-2 rounded-full ${item.type === 'healthy' ? 'bg-[#00F5FF]' : 'bg-[#FF4B4B]'} animate-pulse`}
                            style={{
                                boxShadow: item.type === 'healthy'
                                    ? "0 0 8px #00F5FF, 0 0 16px rgba(0, 245, 255, 0.3)"
                                    : "0 0 8px #FF4B4B, 0 0 16px rgba(255, 75, 75, 0.3)"
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Metrics & Actions */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Zone 2: Key Metrics (Command Center Style) */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#00F5FF]/10 border border-[#00F5FF]/20 rounded-lg">
                                <Activity size={16} className="text-[#00F5FF]" />
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Operational Metrics</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {metrics.map((metric, i) => (
                                <div
                                    key={i}
                                    onClick={() => navigate(metric.path)}
                                    className="metric-card relative bg-[#1E1E1E] border border-white/5 rounded-2xl p-6 cursor-pointer group transition-all overflow-hidden min-h-[180px] flex items-center justify-center"
                                    style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)" }}
                                >
                                    {/* Centered Layout */}
                                    <div className="flex flex-col items-center text-center gap-4">
                                        <div className="text-[#A0A0A0]/40">
                                            {iconMap[metric.label]}
                                        </div>
                                        <div className="text-4xl font-black text-[#00F5FF] tracking-tight">
                                            {metric.val}
                                        </div>
                                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-[0.2em]">
                                            {metric.label}
                                        </span>
                                    </div>

                                    {/* Hover Arrow */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity">
                                        <ArrowUpRight size={32} className="text-[#00F5FF]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Activity Stream with Timeline */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#00F5FF]/10 border border-[#00F5FF]/20 rounded-lg">
                            <Clock size={16} className="text-[#00F5FF]" />
                        </div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white">Activity Stream</h3>
                    </div>

                    <div className="relative bg-[#1E1E1E] border border-white/5 rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)" }}>
                        <div className="divide-y divide-white/5">
                            {activities.map((event, index) => (
                                <div key={event.id} className="p-5 hover:bg-white/5 transition-colors flex items-center gap-4 group relative">
                                    {/* Timeline Connector */}
                                    {index < activities.length - 1 && (
                                        <div className="absolute left-9 top-14 bottom-0 w-px border-l border-dashed border-white/10" />
                                    )}

                                    {/* Status Dot with Glow */}
                                    <div className="relative z-10">
                                        <div
                                            className={`p-2.5 rounded-lg border ${event.status === 'new' ? 'bg-[#00F5FF]/10 border-[#00F5FF]/20' :
                                                event.status === 'alert' ? 'bg-[#FF4B4B]/10 border-[#FF4B4B]/20' :
                                                    'bg-white/5 border-white/10'
                                                } text-${event.status === 'new' ? '[#00F5FF]' : event.status === 'alert' ? '[#FF4B4B]' : '[#A0A0A0]'}`}
                                        >
                                            {iconMap[event.type] || <Activity size={16} />}
                                            {/* Glowing Dot */}
                                            {(event.status === 'new' || event.status === 'alert') && (
                                                <div
                                                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${event.status === 'new' ? 'bg-[#00F5FF]' : 'bg-[#FF4B4B]'}`}
                                                    style={{
                                                        boxShadow: event.status === 'new'
                                                            ? "0 0 8px #00F5FF, 0 0 12px rgba(0, 245, 255, 0.4)"
                                                            : "0 0 8px #FF4B4B, 0 0 12px rgba(255, 75, 75, 0.4)"
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">{event.msg}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-bold text-[#A0A0A0] uppercase tracking-wider">{event.type.replace('_', ' ')}</span>
                                            <span className="text-[9px] text-[#A0A0A0]/40">•</span>
                                            <span className="text-[9px] font-medium text-[#A0A0A0]/60">
                                                {(() => {
                                                    const diff = Math.floor((new Date() - new Date(event.time)) / 60000);
                                                    if (diff < 1) return 'Just now';
                                                    if (diff < 60) return `${diff}m ago`;
                                                    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
                                                    return new Date(event.time).toLocaleDateString();
                                                })()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#A0A0A0] hover:text-[#00F5FF] bg-[#121212]/50 border-t border-white/5 transition-all">
                            View Full Audit Trail
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
