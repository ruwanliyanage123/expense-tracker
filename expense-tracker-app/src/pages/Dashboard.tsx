import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpenseForm from "../components/ExpenseForm";
import { getExpenses, setOffline, syncExpenses } from "../redux/expenseSlice";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export const COLORS = ["#2563EB", "#16A34A", "#FACC15", "#F97316", "#EC4899", "#8B5CF6", "#0EA5E9", "#EF4444"];

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const userId = 1;
    const { data: expenses, loading } = useSelector((state: any) => state.expenses);

    // Fetch on mount
    useEffect(() => {
        // @ts-ignore
        dispatch(getExpenses(userId));

        const updateStatus = () => {
            const online = navigator.onLine;
            dispatch(setOffline(!online));
            if (online) {
                // @ts-ignore
                dispatch(syncExpenses());
            }
        };

        window.addEventListener("online", updateStatus);
        window.addEventListener("offline", updateStatus);

        updateStatus(); // initial
        return () => {
            window.removeEventListener("online", updateStatus);
            window.removeEventListener("offline", updateStatus);
        };
    }, [dispatch]);

    // Group data for Pie chart
    const chartData = useMemo(() => {
        const grouped: Record<string, number> = {};
        expenses.forEach((expense: any) => {
            const type = expense.type || "Unknown";
            grouped[type] = (grouped[type] || 0) + Number(expense.amount || 0);
        });
        return Object.entries(grouped).map(([name, value]) => ({ name, value }));
    }, [expenses]);

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6 w-full">
            {/* LEFT SIDE: Expense Form */}
            <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-6">
                <ExpenseForm />
            </div>

            {/* RIGHT SIDE: Pie Chart */}
            <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    Current Month Expenses
                </h2>

                {loading ? (
                    <p className="text-gray-500">Loading chart...</p>
                ) : chartData.length === 0 ? (
                    <p className="text-gray-400">No data yet. Add expenses to see results.</p>
                ) : (
                    <PieChart width={350} height={350}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
