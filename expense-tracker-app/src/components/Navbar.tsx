import React from "react";
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {
    const { offline, syncing } = useSelector((state: any) => state.expenses);

    return (
        <nav className="bg-blue-700 text-white p-4 flex justify-between items-center shadow">
            <h1 className="text-2xl font-bold">💰 Expense Tracker</h1>

            <div className="flex items-center gap-4">
                {offline ? (
                    <span className="bg-red-600 px-3 py-1 rounded text-sm">
            🔴 Offline Mode
          </span>
                ) : syncing ? (
                    <span className="bg-yellow-500 px-3 py-1 rounded text-sm animate-pulse">
            🔄 Syncing...
          </span>
                ) : (
                    <span className="bg-green-600 px-3 py-1 rounded text-sm">
            🟢 Online
          </span>
                )}

                <button className="hover:underline">Profile</button>
                <button className="hover:underline">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
