import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="w-64 bg-blue-600 text-white flex flex-col p-6 space-y-4">
            <Link to="/" className="hover:bg-blue-700 p-2 rounded">
                Dashboard
            </Link>
            <Link to="/categories" className="hover:bg-blue-700 p-2 rounded">
                Categories
            </Link>
            <Link to="/history" className="hover:bg-blue-700 p-2 rounded">
                History
            </Link>
        </aside>
    );
};

export default Sidebar;
