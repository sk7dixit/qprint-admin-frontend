import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, User, AlertCircle, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);
        try {
            const user = await login(identifier, password);
            if (user.role === "admin") {
                navigate("/dashboard");
            } else {
                setError("Strategic Access Denied: Admin Clearance Required");
            }
        } catch (err) {
            setError(err.message || "Identity Verification Failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Advanced Obsidian Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#0a0a0a] to-[#050505]" />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
                <div className="absolute inset-0 shadow-[inner_0_0_150px_rgba(0,0,0,1)]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full max-w-[440px] z-10"
            >
                <div className="obsidian-card bg-[#0d0d0d]/80 backdrop-blur-xl border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden">
                    {/* Header: Focused & Minimal */}
                    <div className="px-8 pt-8 pb-6 flex flex-col items-center text-center">
                        <div className="relative mb-6 group">
                            <div className="absolute inset-0 bg-accent-blue/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative w-14 h-14 rounded-2xl bg-obsidian-bg border border-white/10 flex items-center justify-center text-accent-blue shadow-inner group-hover:border-accent-blue/30 transition-all duration-300">
                                <Shield size={28} className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <h1 className="text-xs font-black text-text-primary uppercase tracking-[0.4em] opacity-90">
                                QPrint Admin Control
                            </h1>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] opacity-40">
                                Restricted System Access
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-system-red/10 border border-system-red/20 rounded-xl p-3 flex items-center gap-3"
                                >
                                    <AlertCircle size={14} className="text-system-red shrink-0" />
                                    <span className="text-[10px] font-bold text-system-red uppercase tracking-wider leading-tight">{error}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">Identity Identifier</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-blue transition-colors" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Email or Mobile Node"
                                        className="w-full bg-[#080808] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-muted/30 focus:border-accent-blue/40 focus:ring-1 focus:ring-accent-blue/10 transition-all outline-none font-medium"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">Access Protocol key</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-blue transition-colors" size={16} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter Security Hash"
                                        className="w-full bg-[#080808] border border-white/5 rounded-xl py-3.5 pl-12 pr-12 text-sm text-text-primary placeholder:text-text-muted/30 focus:border-accent-blue/40 focus:ring-1 focus:ring-accent-blue/10 transition-all outline-none font-medium"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-accent-blue hover:bg-blue-600 disabled:bg-accent-blue/50 text-white py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_16px_32px_-8px_rgba(59,130,246,0.3)]"
                            >
                                {isSubmitting ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <>
                                        Authorize Session
                                        <ArrowRight size={14} />
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-2 pt-2 opacity-50">
                            <div className="w-1.5 h-1.5 rounded-full bg-system-green animate-pulse" />
                            <span className="text-[9px] font-black text-system-green uppercase tracking-[0.2em]">Audit Logs Active</span>
                        </div>
                    </form>
                </div>

                <div className="text-center mt-8">
                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-20">
                        System Authority: Parul University Print Network
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
