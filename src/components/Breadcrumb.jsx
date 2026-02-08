import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb() {
    const location = useLocation();
    const navigate = useNavigate();

    // Get current context name from path
    const getContextName = () => {
        const path = location.pathname.split("/").pop();
        if (!path || path === "dashboard") return "Dashboard";
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <div className="px-6 py-4 border-b border-gray-800 bg-black">
            <div
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 cursor-pointer group w-fit"
            >
                <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    System Control
                </span>
                <ChevronRight size={14} className="text-gray-400" />
                <span className="text-sm font-bold text-blue-400">
                    {getContextName()}
                </span>
            </div>
        </div>
    );
}
