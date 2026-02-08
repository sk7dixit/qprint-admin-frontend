import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import FloatingSidebar from "./FloatingSidebar";
import CommandPalette from "./CommandPalette";
import ContextDock from "./ContextDock";

export default function Layout() {
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
    const [isContextDockOpen, setIsContextDockOpen] = useState(false);

    // Global Hotkey for Command Palette (CMD+K or CTRL+K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsCommandPaletteOpen(prev => !prev);
            }
            if (e.key === "Escape") {
                setIsCommandPaletteOpen(false);
                setIsContextDockOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#121212] relative overflow-hidden">
            {/* Floating Sidebar */}
            <FloatingSidebar />

            {/* Simplified Top Bar */}
            <TopBar />

            {/* Main Content Workspace */}
            <main className="flex-grow w-full pl-40 pr-[5%]">
                <div className="max-w-[1400px] mx-auto p-8 md:p-12">
                    <Outlet />
                </div>
            </main>

            {/* Floating Navigation Core */}
            {isCommandPaletteOpen && (
                <CommandPalette onClose={() => setIsCommandPaletteOpen(false)} />
            )}

            {/* Side Logic Context Dock */}
            <ContextDock isOpen={isContextDockOpen} onClose={() => setIsContextDockOpen(false)} />
        </div>
    );
}
