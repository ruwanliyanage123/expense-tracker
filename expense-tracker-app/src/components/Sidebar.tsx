import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
    const linkClasses =
        "block px-4 py-2 rounded hover:bg-blue-700 transition-colors";

    const activeClass = "bg-blue-800 font-semibold";

    return (
        <aside className="w-64 bg-blue-600 text-white p-4 flex flex-col min-h-full">
            <nav className="space-y-2 mt-4">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `${linkClasses} ${isActive ? activeClass : ""}`
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        `${linkClasses} ${isActive ? activeClass : ""}`
                    }
                >
                    History
                </NavLink>
                <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                        `${linkClasses} ${isActive ? activeClass : ""}`
                    }
                >
                    Categories
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
