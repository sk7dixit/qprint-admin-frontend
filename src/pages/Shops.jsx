import React, { useState } from "react";
import {
    Store,
    Plus,
    Search,
    ChevronRight,
    Activity,
    ShieldAlert,
    Clock,
    ArrowUpRight,
    SearchX,
    MapPin,
    Phone
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";

export default function Shops() {
    const navigate = useNavigate();
    const { user: currentUser, getToken } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);

    const backendUrl = "http://localhost:5000";

    React.useEffect(() => {
        const fetchShops = async () => {
            try {
                const token = await getToken();
                const response = await fetch(`${backendUrl}/api/admin/shops`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setShops(data);
                }
            } catch (error) {
                console.error("Fetch shops error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) fetchShops();
    }, [currentUser]);

    const displayShops = shops.map(s => ({
        id: `SHP_${s.id.toString().padStart(4, '0')}`,
        db_id: s.id,
        name: s.name,
        owner: s.owner || 'UNASSIGNED',
        mobile: s.mobile || 'N/A',
        status: s.is_active ? 'Active' : 'Disabled',
        created: new Date(s.created_at).toLocaleDateString(),
        location: s.location || 'N/A'
    }));

    const filteredShops = displayShops.filter(shop =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.owner.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {/* Module Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent-blue/10 border border-accent-blue/20 rounded-lg">
                            <Store size={20} className="text-accent-blue" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-text-primary">Shop Network</h2>
                    </div>
                    <p className="text-sm font-medium text-text-muted mt-1 max-w-xl">
                        Central registry of authorized printing nodes. Only admin-generated accounts are permitted in this network.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/shops/create")}
                        className="flex items-center gap-2 bg-accent-blue hover:bg-blue-600 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-accent-blue/20"
                    >
                        <Plus size={16} /> Create Node
                    </button>
                </div>
            </div>

            {/* Utility Bar */}
            <div className="w-full max-w-md relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-accent-blue transition-colors" size={16} />
                <input
                    type="text"
                    placeholder="Search by Shop Name, ID, or Owner..."
                    className="w-full bg-obsidian-surface border border-obsidian-border rounded-xl py-3.5 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 transition-all outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Shops List Area */}
            {filteredShops.length > 0 ? (
                <div className="obsidian-card overflow-hidden">
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-obsidian-bg/50 border-b border-obsidian-border">
                                    <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Authorized Shop</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Registry ID</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Operator</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Control Status</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Established</th>
                                    <th className="px-8 py-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-obsidian-border">
                                {filteredShops.map((shop) => (
                                    <tr key={shop.id} className="hover:bg-accent-blue/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-text-primary">{shop.name}</span>
                                                <div className="flex items-center gap-1.5 text-[9px] font-black text-text-muted uppercase tracking-widest mt-0.5">
                                                    <MapPin size={10} className="text-text-muted/60" /> {shop.location}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 font-mono text-xs text-text-secondary tracking-tight">
                                            {shop.id}
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-text-primary">{shop.owner}</span>
                                                <span className="text-[10px] font-medium text-text-muted">{shop.mobile}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${shop.status === 'Active' ? 'bg-system-green/5 border-system-green/20' : 'bg-system-red/5 border-system-red/20'}`}>
                                                <div className={`w-1 h-1 rounded-full ${shop.status === 'Active' ? 'bg-system-green' : 'bg-system-red'}`} />
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${shop.status === 'Active' ? 'text-system-green' : 'text-system-red'}`}>
                                                    {shop.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-xs text-text-muted opacity-60">
                                            {shop.created}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button
                                                onClick={() => navigate(`/shops/${shop.id}`)}
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

                    {/* Mobile Card List View */}
                    <div className="md:hidden divide-y divide-obsidian-border">
                        {filteredShops.map((shop) => (
                            <div key={shop.id} onClick={() => navigate(`/shops/${shop.id}`)} className="p-6 space-y-4 active:bg-obsidian-bg transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-text-primary">{shop.name}</span>
                                        <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">{shop.id}</span>
                                    </div>
                                    <div className={`px-2.5 py-1 rounded-full border ${shop.status === 'Active' ? 'bg-system-green/5 border-system-green/20' : 'bg-system-red/5 border-system-red/20'}`}>
                                        <span className={`text-[8px] font-black uppercase tracking-widest ${shop.status === 'Active' ? 'text-system-green' : 'text-system-red'}`}>
                                            {shop.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Operator</span>
                                        <span className="text-xs font-bold text-text-secondary">{shop.owner}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 items-end">
                                        <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Established</span>
                                        <span className="text-xs font-medium text-text-muted opacity-60">{shop.created}</span>
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
                        <h4 className="text-sm font-black text-text-primary uppercase tracking-[0.2em]">No Shop Nodes Found</h4>
                        <p className="text-xs font-medium text-text-muted max-w-xs leading-relaxed">
                            No registered shops match "{searchQuery}". Authorize a new node to see it here.
                        </p>
                    </div>
                    <button
                        onClick={() => setSearchQuery("")}
                        className="text-[10px] font-black text-accent-blue uppercase tracking-widest hover:underline underline-offset-4"
                    >
                        Clear Active Search
                    </button>
                </div>
            )}

            {/* Strategic Warning */}
            <div className="p-8 bg-system-red/[0.03] border border-system-red/10 rounded-2xl flex items-start gap-4">
                <div className="p-2 bg-system-red/10 rounded-lg text-system-red">
                    <ShieldAlert size={18} />
                </div>
                <div className="space-y-1">
                    <h5 className="text-[10px] font-black text-text-primary uppercase tracking-widest">System Integrity Guard</h5>
                    <p className="text-xs font-medium text-text-muted leading-relaxed italic">
                        Access to the Shopkeeper ecosystem is strictly controlled. Unauthorized signups are physically impossible. Every printing node in this list was manually authorized via a verified Administrative Session.
                    </p>
                </div>
            </div>
        </div>
    );
}
