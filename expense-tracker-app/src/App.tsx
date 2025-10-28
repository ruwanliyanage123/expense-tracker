import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffline, syncExpenses } from "./redux/expenseSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import History from "./pages/History";

const App = () => {
    const dispatch = useDispatch();
    const { offline, syncing } = useSelector((state: any) => state.expenses);

    useEffect(() => {
        const handleOnline = () => {
            dispatch(setOffline(false));
            // @ts-ignore
            dispatch(syncExpenses());
        };
        const handleOffline = () => dispatch(setOffline(true));

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [dispatch]);

    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-gray-100">
                {/* 🔔 Offline/Sync Status Banner */}
                {offline ? (
                    <div className="bg-red-500 text-white text-center py-2 text-sm">
                        You are offline — your changes will sync when back online.
                    </div>
                ) : syncing ? (
                    <div className="bg-yellow-400 text-black text-center py-2 text-sm">
                        Syncing your offline data...
                    </div>
                ) : null}

                <Navbar />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 p-6 overflow-auto">
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
