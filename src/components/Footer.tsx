import React from "react";

const Footer = () => {
    return (
        <footer className="bg-blue-700 text-center py-3 text-white">
            © {new Date().getFullYear()} E-Wallet | Built by <span className="font-semibold text-white">Ruwan Liyanage</span>
        </footer>
    );
};

export default Footer;
