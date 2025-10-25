import React, { useState } from "react";

interface Expense {
    amount: number;
    reason: string;
    type: string;
    date: string;
}

const ExpenseForm  = () => {
    const [expense, setExpense] = useState<Expense>({
        amount: 0,
        reason: "",
        type: "",
        date: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(expense);
        alert("Expense added!");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Expense</h2>
            <div className="space-y-4">
                <input
                    type="number"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                    placeholder="Expense Amount"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="reason"
                    value={expense.reason}
                    onChange={handleChange}
                    placeholder="Reason"
                    className="w-full p-2 border rounded"
                    required
                />
                <select
                    name="type"
                    value={expense.type}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Select Type</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Bills">Bills</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="date"
                    name="date"
                    value={expense.date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Add Expense
                </button>
            </div>
        </form>
    );
};

export default ExpenseForm;
