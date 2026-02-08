import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    Store,
    User,
    Phone,
    Mail,
    Lock,
    MapPin,
    ShieldCheck,
    Activity,
    AlertCircle
} from "lucide-react";

import { useAuth } from "../auth/AuthContext";

export default function CreateShop() {
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        shopName: "",
        ownerName: "",
        mobileNumber: "",
        email: "",
        location: "",
        initialPassword: "",
        upiId: ""
    });

    const backendUrl = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setError(null);

        try {
            const token = await getToken();
            const response = await fetch(`${backendUrl}/api/admin/shops`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setTimeout(() => navigate("/shops"), 1500);
            } else {
                throw new Error(data.error || "Provisioning failed");
            }
        } catch (err) {
            console.error("Provisioning error:", err);
            setError(err.message);
            setStatus("idle");
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center gap-6">
                <button
                    onClick={() => navigate("/shops")}
                    className="p-3 obsidian-card bg-obsidian-bg hover:bg-obsidian-surface text-text-muted hover:text-text-primary transition-all"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-accent-blue uppercase tracking-[0.3em]">Network Administration</span>
                    <h2 className="text-3xl font-black text-text-primary tracking-tighter mt-1">Authorize New Node</h2>
                </div>
            </div>

            {/* Creation Note */}
            <div className="bg-accent-blue/5 border border-accent-blue/10 rounded-2xl p-6 flex items-start gap-4">
                <div className="p-2 bg-accent-blue/10 rounded-lg text-accent-blue">
                    <ShieldCheck size={18} />
                </div>
                <div className="space-y-1">
                    <h4 className="text-[10px] font-black text-text-primary uppercase tracking-widest">Authority Protocol</h4>
                    <p className="text-xs font-medium text-text-muted leading-relaxed">
                        This action will generate a new unique **Shop ID** and permanent registry record. Ensure all legal and operational verification is complete before authorization.
                    </p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="obsidian-card p-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Primary Identity */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] border-b border-obsidian-border pb-3">Shop Identity</h3>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <Store size={12} className="text-text-muted/50" /> Shop Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Central Library Printing"
                                    className="w-full bg-obsidian-bg border border-obsidian-border rounded-xl py-3.5 px-4 text-sm text-text-primary focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 outline-none transition-all"
                                    value={formData.shopName}
                                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <MapPin size={12} className="text-text-muted/50" /> Physical Location
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Block C, Ground Floor"
                                    className="w-full bg-obsidian-bg border border-obsidian-border rounded-xl py-3.5 px-4 text-sm text-text-primary focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 outline-none transition-all"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Operator Identity */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] border-b border-obsidian-border pb-3">Operator Details</h3>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <User size={12} className="text-text-muted/50" /> Owner Full Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full bg-obsidian-bg border border-obsidian-border rounded-xl py-3.5 px-4 text-sm text-text-primary focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 outline-none transition-all"
                                    value={formData.ownerName}
                                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <Phone size={12} className="text-text-muted/50" /> Mobile Number
                                </label>
                                <input
                                    required
                                    type="tel"
                                    placeholder="10-digit number"
                                    className="w-full bg-obsidian-bg border border-obsidian-border rounded-xl py-3.5 px-4 text-sm text-text-primary focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 outline-none transition-all"
                                    value={formData.mobileNumber}
                                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security & Payments */}
                <div className="space-y-6 pt-6 border-t border-obsidian-border">
                    <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] border-b border-obsidian-border pb-3">Security & Payments</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <Mail size={12} className="text-text-muted/50" /> Login Identifier (Email)
                                </label>
                                <input
                                    required
                                    type="email"
                                    placeholder="shop-identifier@qprint.com"
                                    className="w-full bg-obsidian-bg border border-obsidian-border rounded-xl py-3.5 px-4 text-sm text-text-primary focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 outline-none transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <Lock size={12} className="text-text-muted/50" /> Initial Secret (Password)
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Set temporary password"
                                    className="w-full bg-obsidian-bg border border-obsidian-border rounded-xl py-3.5 px-4 text-sm text-text-primary focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 outline-none transition-all"
                                    value={formData.initialPassword}
                                    onChange={(e) => setFormData({ ...formData, initialPassword: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <Activity size={12} className="text-text-muted/50" /> Seller UPI ID (Paytm/UPI)
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. 9876543210@paytm"
                                    className="w-full bg-obsidian-bg border border-obsidian-border rounded-xl py-3.5 px-4 text-sm text-text-primary focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/20 outline-none transition-all font-mono"
                                    value={formData.upiId}
                                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                                />
                                <p className="text-[9px] text-text-muted ml-1 opacity-50 uppercase tracking-tight">Payments will be settled directly to this ID.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="p-4 bg-system-red/5 border border-system-red/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle size={14} className="text-system-red" />
                        <span className="text-[10px] font-bold text-system-red uppercase tracking-widest">{error}</span>
                    </div>
                )}

                {/* Logic: Action Footer */}
                <div className="pt-10 flex flex-col items-center gap-6">
                    <button
                        disabled={status === "loading" || status === "success"}
                        type="submit"
                        className="w-full sm:w-auto px-12 py-5 bg-accent-blue hover:bg-blue-600 text-white text-xs font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-accent-blue/30 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {status === "loading" ? "Provisioning Security Claims..." : status === "success" ? "Node Authorized Successfully" : "Authorize Node"}
                    </button>

                    <div className="flex items-center gap-2 opacity-40">
                        <AlertCircle size={12} className="text-text-muted" />
                        <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Action is permanent and logged in Audit Context.</span>
                    </div>
                </div>
            </form>
        </div>
    );
}
