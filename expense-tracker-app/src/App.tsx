import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import History from "./pages/History";

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/categories" element={<Categories />} />
                            <Route path="/history" element={<History />} />
                        </Routes>
                    </main>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
