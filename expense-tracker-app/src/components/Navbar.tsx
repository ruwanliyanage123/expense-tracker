import React from "react";
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {
    const { offline, syncing } = useSelector((state: any) => state.expenses);

    // Determine current status
    const status = syncing
        ? { color: "bg-yellow-300", text: "Syncing..." }
        : offline
            ? { color: "bg-red-400", text: "Offline" }
            : { color: "bg-green-400", text: "Online" };

    return (
        <nav className="bg-blue-700 text-white p-4 flex justify-between items-center shadow-md">
            {/* Left - App Name */}
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">💰 E-Wallet</h1>

                {/* Online/Offline Indicator */}
                <div className="flex items-center gap-2 text-sm">
                    <span className={`h-2.5 w-2.5 rounded-full ${status.color}`}></span>
                    <span className="text-gray-100">{status.text}</span>
                </div>
            </div>

            {/* Right - Buttons */}
            <div className="space-x-4">
                <button className="hover:underline transition">Profile</button>
                <button className="hover:underline transition">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
