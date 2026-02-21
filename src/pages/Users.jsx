import React, { useState } from "react";
import {
    Users as UsersIcon,
    Search,
    Filter,
    ChevronRight,
    UserCheck,
    UserX,
    Calendar,
    ArrowUpRight,
    SearchX
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Users() {
    const navigate = useNavigate();
    const { user: currentUser, getToken } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const backendUrl = "http://localhost:5000";

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await getToken();
                const response = await fetch(`${backendUrl}/api/admin/users`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                }
            } catch (error) {
                console.error("Fetch users error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) fetchUsers();
    }, [currentUser]);

    // Role Detection Logic
    const detectRole = (user) => {
        return (user.role || 'UNKNOWN').toUpperCase();
    };

    const displayUsers = users.map(u => ({
        ...u,
        role: detectRole(u),
        status: u.is_profile_complete ? 'completed' : 'pending',
        enroll_id: u.enrollment_id || 'NOT_SET',
        created: new Date(u.created_at).toLocaleDateString()
    }));

    const filteredUsers = displayUsers.filter(user =>
        (user.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.enroll_id?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.mobile?.includes(searchQuery))
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {/* Module Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent-blue/10 border border-accent-blue/20 rounded-lg">
                            <UsersIcon size={18} className="text-accent-blue" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter text-text-primary">User Directory</h2>
                    </div>
                    <p className="text-sm font-medium text-text-muted mt-1 max-w-xl">
                        Authoritative ledger of Students and Staff. Observe profile integrity and verify system enrollment.
                    </p>
                </div>

                {/* Inline Quick Search (V1) */}
                <div className="w-full sm:w-80 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-accent-blue transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search by Name, ID, or Mobile..."
                        className="w-full bg-obsidian-surface border border-obsidian-border rounded-xl py-2.5 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 transition-all outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Users List Area */}
            {filteredUsers.length > 0 ? (
                <div className="obsidian-card overflow-hidden">
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-obsidian-bg/50 border-b border-obsidian-border">
                                    <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">S_NAME</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">ENROLL_ID / STAFF_ID</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">CONTACT</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">STATUS</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">REGISTERED DATE</th>
                                    <th className="px-8 py-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-obsidian-border">
                                {filteredUsers.map((user) => (
                                    <tr key={user.uid} className="hover:bg-accent-blue/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-obsidian-bg border border-obsidian-border flex items-center justify-center text-text-muted font-bold tracking-tighter group-hover:border-accent-blue/30 group-hover:text-accent-blue transition-all">
                                                    {(user.name || 'U').split(' ').filter(Boolean).map(n => n[0]).join('')}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-text-primary">{user.name || 'Unknown User'}</span>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${user.role === 'STUDENT' ? 'text-[#00F5FF]' : user.role === 'STAFF' ? 'text-purple-400' : 'text-text-muted'}`}>
                                                        {user.role}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 font-mono text-xs text-text-secondary tracking-tight">
                                            {user.enroll_id}
                                        </td>
                                        <td className="px-6 py-6 text-xs text-text-muted font-medium">
                                            {user.mobile || 'No Contact'}
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${user.status === 'completed' ? 'bg-system-green/5 border-system-green/20' : 'bg-system-red/5 border-system-red/20'}`}>
                                                <div className={`w-1 h-1 rounded-full ${user.status === 'completed' ? 'bg-system-green' : 'bg-system-red'}`} />
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${user.status === 'completed' ? 'text-system-green' : 'text-system-red'}`}>
                                                    {user.status === 'completed' ? 'COMPLETED' : 'PENDING'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-xs text-text-muted opacity-60">
                                            {user.created}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button
                                                onClick={() => navigate(`/users/${user.uid}`)}
                                                className="p-2.5 bg-obsidian-bg border border-obsidian-border rounded-lg text-text-muted hover:text-accent-blue hover:border-accent-blue/30 transition-all group"
                                            >
                                                <ArrowUpRight size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card List */}
                    <div className="md:hidden divide-y divide-obsidian-border">
                        {filteredUsers.map((user) => (
                            <div key={user.uid} onClick={() => navigate(`/users/${user.uid}`)} className="p-6 space-y-4 active:bg-obsidian-bg transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-obsidian-bg border border-obsidian-border flex items-center justify-center font-bold text-text-muted">
                                            {(user.name || 'U')[0]}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-text-primary">{user.name || 'Unknown User'}</span>
                                            <span className={`text-[9px] font-black uppercase tracking-widest ${user.role === 'STUDENT' ? 'text-[#00F5FF]' : user.role === 'STAFF' ? 'text-purple-400' : 'text-text-muted'}`}>
                                                {user.role}
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-text-muted" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">ID</span>
                                        <span className="text-xs font-mono text-text-secondary">{user.enroll_id}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 items-end">
                                        <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Status</span>
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${user.status === 'completed' ? 'text-system-green' : 'text-system-red'}`}>
                                            {user.status === 'completed' ? 'COMPLETED' : 'PENDING'}
                                        </span>
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
                        <h4 className="text-sm font-black text-text-primary uppercase tracking-[0.2em]">No Directory Match</h4>
                        <p className="text-xs font-medium text-text-muted max-w-xs leading-relaxed">
                            No users found matching "{searchQuery}". Check the identifier and try again.
                        </p>
                    </div>
                    <button
                        onClick={() => setSearchQuery("")}
                        className="text-[10px] font-black text-accent-blue uppercase tracking-widest hover:underline underline-offset-4"
                    >
                        Clear Search Query
                    </button>
                </div>
            )}

            {/* System Intelligence Note */}
            <div className="flex items-start gap-4 p-6 bg-accent-blue/[0.03] border border-accent-blue/10 rounded-2xl">
                <div className="p-2 bg-accent-blue/10 rounded-lg text-accent-blue">
                    <Calendar size={16} />
                </div>
                <div className="space-y-1">
                    <h5 className="text-[10px] font-black text-text-primary uppercase tracking-widest">Audit Policy</h5>
                    <p className="text-xs font-medium text-text-muted leading-relaxed italic">
                        All directory access is logged with the operator identity. User data is strictly read-only within this ecosystem to prevent administrative tampering with academic/identity records.
                    </p>
                </div>
            </div>
        </div>
    );
}
