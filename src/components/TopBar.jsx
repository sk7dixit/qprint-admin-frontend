import React from "react";
import { Power } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/images/qprint_logo.png";

export default function TopBar() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="h-14 px-6 border-b border-white/5 bg-[#121212] flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-[#121212]/95">
            {/* Left: Logo */}
            <div
                onClick={() => navigate("/dashboard")}
                className="cursor-pointer hover:opacity-80 transition-opacity"
            >
                <img src={logo} alt="QPrint Admin" className="h-7" />
            </div>

            {/* Right: User Profile Only */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#00F5FF]/10 border border-[#00F5FF]/20 flex items-center justify-center text-[#00F5FF] font-bold text-sm">
                        {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || "A"}
                    </div>
                    <div className="hidden lg:block">
                        <span className="text-sm font-semibold text-white uppercase tracking-tight">
                            {user?.name || "Master Admin"}
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => signOut(auth)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
                    title="Sign Out"
                >
                    <Power size={18} />
                </button>
            </div>
        </header>
    );
}
