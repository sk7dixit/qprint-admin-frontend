import React, { useState } from "react";
import {
    AlertTriangle,
    ShieldAlert,
    CreditCard,
    Upload,
    Zap,
    ShieldCheck,
    RefreshCcw,
    X,
    Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Settings() {
    const [config, setConfig] = useState({
        maintenanceMode: false,
        paymentsEnabled: true,
        uploadsEnabled: true
    });

    const [pendingAction, setPendingAction] = useState(null);

    const toggleSwitch = (key) => {
        const labels = {
            maintenanceMode: "Global Maintenance Mode",
            paymentsEnabled: "Payment Gateway Node",
            uploadsEnabled: "File Upload Buffer"
        };
        const descriptions = {
            maintenanceMode: "Activating this will block all user interactions across the platform gracefully. The admin panel remains unaffected.",
            paymentsEnabled: "Disabling this will pause all incoming financial transactions immediately. Use only for gateway failures.",
            uploadsEnabled: "Disabling this will halt user file uploads. Use during storage overflows or suspected abuse."
        };

        setPendingAction({
            key,
            label: labels[key],
            desc: descriptions[key],
            targetState: !config[key]
        });
    };

    const confirmAction = () => {
        if (!pendingAction) return;
        setConfig(prev => ({ ...prev, [pendingAction.key]: pendingAction.targetState }));
        setPendingAction(null);
        // In a real app, this would trigger an audit log and an API call
    };

    const SafetyCard = ({ icon: Icon, title, desc, isActive, onToggle, color = "accent-blue" }) => (
        <div className={`obsidian-card p-8 flex items-center justify-between group h-full border-l-4 ${isActive ? `border-l-${color}` : 'border-l-obsidian-border'}`}>
            <div className="flex items-start gap-6">
                <div className={`p-4 rounded-2xl bg-obsidian-bg border border-obsidian-border transition-all ${isActive ? `text-${color} border-${color}/40 shadow-xl shadow-${color}/10` : 'text-text-muted opacity-40'}`}>
                    <Icon size={24} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-black text-text-primary tracking-tight">{title}</h3>
                    <p className="text-xs font-medium text-text-muted leading-relaxed max-w-xs">{desc}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-system-green animate-pulse' : 'bg-system-red shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-system-green' : 'text-system-red'}`}>
                            {isActive ? 'Live Status: Active' : 'Status: Restricted'}
                        </span>
                    </div>
                </div>
            </div>

            <button
                onClick={onToggle}
                className={`w-16 h-8 rounded-full relative transition-all duration-500 ease-in-out border ${isActive ? 'bg-system-green/20 border-system-green/40' : 'bg-obsidian-surface border-obsidian-border'}`}
            >
                <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full transition-all duration-500 ease-in-out shadow-lg flex items-center justify-center ${isActive ? 'right-1 bg-system-green' : 'left-1 bg-text-muted'}`}>
                    {isActive ? <Check size={12} className="text-white" /> : <X size={12} className="text-obsidian-bg" />}
                </div>
            </button>
        </div>
    );

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-system-red/10 border border-system-red/20 rounded-lg">
                        <AlertTriangle size={20} className="text-system-red" />
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter text-text-primary uppercase italic">System Control</h2>
                </div>
                <p className="text-sm font-medium text-text-muted mt-1 max-w-xl italic opacity-70">
                    Emergency kill-switches and operational safety overrides. Use with extreme caution. All actions are logged.
                </p>
            </div>

            {/* Safety Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <SafetyCard
                    icon={ShieldAlert}
                    title="Maintenance Mode"
                    desc="Temporarily pause all user-facing interactions during critical system updates or backend failure."
                    isActive={config.maintenanceMode}
                    onToggle={() => toggleSwitch('maintenanceMode')}
                    color="system-red"
                />
                <SafetyCard
                    icon={CreditCard}
                    title="Payment Gateway"
                    desc="Emergency halt for all incoming money flow. Use if external payment reconciliation fails."
                    isActive={config.paymentsEnabled}
                    onToggle={() => toggleSwitch('paymentsEnabled')}
                    color="system-green"
                />
                <SafetyCard
                    icon={Upload}
                    title="Upload Stream"
                    desc="Control user file ingestion. Disable during storage overflow or suspected malicious activity."
                    isActive={config.uploadsEnabled}
                    onToggle={() => toggleSwitch('uploadsEnabled')}
                    color="accent-blue"
                />
            </div>

            {/* Strategic Rule */}
            <div className="p-10 obsidian-card bg-obsidian-surface border-dashed border-2 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex items-start gap-6">
                    <div className="p-4 bg-obsidian-bg rounded-full text-text-muted border border-obsidian-border opacity-50">
                        <RefreshCcw size={32} />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-[10px] font-black text-text-primary uppercase tracking-[0.3em]">Protocol Alpha: Forced Recovery</h4>
                        <p className="text-xs font-medium text-text-muted leading-relaxed max-w-md italic">
                            In case of total control failure, these switches override backend feature flags directly. This interface is the ultimate point of authority for the QPrint University network.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-system-green/5 border border-system-green/20 rounded-xl flex items-center gap-3">
                        <ShieldCheck size={16} className="text-system-green" />
                        <span className="text-[9px] font-black text-system-green uppercase tracking-widest">System Integrity Verified</span>
                    </div>
                </div>
            </div>

            {/* Safety Modal */}
            <AnimatePresence>
                {pendingAction && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                            onClick={() => setPendingAction(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-md obsidian-card p-10 space-y-8 relative z-10 border-system-red/30 shadow-[0_0_128px_rgba(239,68,68,0.15)]"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-system-red/10 border border-system-red/20 flex items-center justify-center text-system-red mx-auto">
                                <AlertTriangle size={32} />
                            </div>

                            <div className="text-center space-y-4">
                                <span className="text-[10px] font-black text-system-red uppercase tracking-[0.3em]">Critical Safety Override</span>
                                <h3 className="text-2xl font-black text-text-primary tracking-tight">Modify {pendingAction.label}?</h3>
                                <p className="text-sm font-medium text-text-muted leading-relaxed italic">
                                    {pendingAction.desc}
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 pt-4">
                                <button
                                    onClick={confirmAction}
                                    className="w-full py-4 bg-system-red text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-red-600 transition-all shadow-xl shadow-system-red/20"
                                >
                                    Confirm Strategic Switch
                                </button>
                                <button
                                    onClick={() => setPendingAction(null)}
                                    className="w-full py-4 bg-obsidian-bg text-text-muted text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-white border border-obsidian-border transition-all"
                                >
                                    Abort Action
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
