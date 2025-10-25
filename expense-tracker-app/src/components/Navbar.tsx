import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">💰 E-Wallet</h1>
            <div className="space-x-4">
                <button className="hover:underline">Profile</button>
                <button className="hover:underline">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
