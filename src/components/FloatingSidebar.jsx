import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Store,
    CreditCard,
    FileText,
    Users,
    MessageSquare,
    Settings,
    ScrollText
} from "lucide-react";

const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/users", icon: Users, label: "Users" },
    { path: "/shops", icon: Store, label: "Shops" },
    { path: "/payments", icon: CreditCard, label: "Payments" },
    { path: "/feedback", icon: MessageSquare, label: "Feedback" },
    { path: "/audit-logs", icon: ScrollText, label: "Audit Logs" },
    { path: "/settings", icon: Settings, label: "Settings" },
];

export default function FloatingSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const isActive = (path) => {
        if (path === "/dashboard") {
            return location.pathname === "/dashboard" || location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
            {/* Floating Pill Container */}
            <div
                className="bg-[#181818] rounded-full p-2.5 border border-white/5"
                style={{ boxShadow: "0 0 20px rgba(0, 245, 255, 0.15), 0 4px 20px rgba(0, 0, 0, 0.5)" }}
            >
                <div className="flex flex-col gap-2">
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        const isHovered = hoveredIndex === index;

                        return (
                            <div
                                key={item.path}
                                className="relative group"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Active State Glow Bar */}
                                {active && (
                                    <div
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#00F5FF] rounded-r-full"
                                        style={{
                                            boxShadow: "0 0 12px #00F5FF, 0 0 24px rgba(0, 245, 255, 0.4)"
                                        }}
                                    />
                                )}

                                {/* Icon Button */}
                                <button
                                    onClick={() => navigate(item.path)}
                                    className={`
                                        relative w-12 h-12 rounded-xl flex items-center justify-center
                                        transition-all duration-200
                                        ${active
                                            ? "bg-[#00F5FF]/10 text-[#00F5FF]"
                                            : "text-gray-400 hover:text-[#00F5FF] hover:bg-white/5"
                                        }
                                    `}
                                >
                                    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                                </button>

                                {/* Hover Label */}
                                {isHovered && (
                                    <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap">
                                        <div className="bg-[#1E1E1E] px-3 py-2 rounded-lg border border-white/10 shadow-xl">
                                            <span className="text-sm font-medium text-white">
                                                {item.label}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
