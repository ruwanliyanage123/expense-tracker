import React, { useMemo } from "react";
import ExpenseForm from "../components/ExpenseForm";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchExpenses } from "../service/expenseService";

interface Expense {
    id: number;
    userId: number;
    amount: number;
    reason: string;
    type: string;
    date: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF5C8D", "#A66CFF"];

const Dashboard: React.FC = () => {
    const userId = 1;

    // Fetch all expenses
    const { data: expensesData, isLoading, error } = useQuery<Expense[]>({
        queryKey: ["expenses", userId],
        queryFn: () => fetchExpenses(userId),
    });

    // Ensure data is always an array
    const expenses: Expense[] = Array.isArray(expensesData)
        ? expensesData
        : (expensesData as any)?.expenses || [];

    // Group by type and sum amounts
    const chartData = useMemo(() => {
        const grouped: Record<string, number> = {};
        expenses.forEach((expense: Expense) => {
            const type = expense.type || "Unknown";
            const amount = Number(expense.amount) || 0;
            grouped[type] = (grouped[type] || 0) + amount;
        });
        return Object.entries(grouped).map(([name, value]) => ({ name, value }));
    }, [expenses]);

    if (isLoading) return <div className="p-6 text-gray-600">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">Failed to load data.</div>;

    return (
        <div className="flex flex-row gap-6 p-6">
            {/* Left Side - Form */}
            <div className="w-1/2">
                <ExpenseForm />
            </div>

            {/* Right Side - Chart */}
            <div className="w-1/2 bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    Current Month Expenses
                </h2>

                {chartData.length === 0 ? (
                    <p className="text-gray-500">No expense data available. Add values to see the chart</p>
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
