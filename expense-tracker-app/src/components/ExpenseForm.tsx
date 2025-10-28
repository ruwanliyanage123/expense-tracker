import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addExpense } from "../redux/expenseSlice";

const ExpenseForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: any) => state.expenses);

    const [expense, setExpense] = useState({
        title: "",
        amount: 0,
        note: "",
        type: "",
        date: "",
        userId: 1,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!expense.title || !expense.amount || !expense.type || !expense.date) {
            alert("Please fill all required fields!");
            return;
        }
        dispatch(addExpense(expense));
        setExpense({
            title: "",
            amount: 0,
            note: "",
            type: "",
            date: "",
            userId: 1,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Expense</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={expense.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                    placeholder="Expense Amount"
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
                <input
                    type="text"
                    name="note"
                    value={expense.note}
                    onChange={handleChange}
                    placeholder="Note (Optional)"
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white py-2 rounded transition ${
                        loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {loading ? "Saving..." : "Add Expense"}
                </button>
            </div>
        </form>
    );
};

export default ExpenseForm; // ✅ make sure this exists
