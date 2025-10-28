import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchExpenses,
    updateExpense,
    deleteExpense,
} from "../service/expenseService";

interface Expense {
    id: number;
    title: string;
    userId: number;
    amount: number;
    reason: string;
    type: string;
    date: string;
}

interface UpdatePayload {
    id: number;
    updated: Partial<Expense>;
}

const History = () => {
    const userId = 1;
    const queryClient = useQueryClient();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Expense>>({
        amount: 0,
        title: "",
        reason: "",
        type: "",
        date: "",
    });

    // Fetch expenses
    const { data: expensesData, isLoading, error } = useQuery<Expense[]>({
        queryKey: ["expenses", userId],
        queryFn: () => fetchExpenses(userId),
    });

    // Ensure data is always an array
    const expenses: Expense[] = Array.isArray(expensesData)
        ? expensesData
        : (expensesData as any)?.expenses || [];

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteExpense(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses", userId] });
        },
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, updated }: UpdatePayload) => updateExpense(id, updated),
        onSuccess: () => {
            setEditingId(null);
            queryClient.invalidateQueries({ queryKey: ["expenses", userId] });
        },
    });

    const handleEdit = (expense: Expense) => {
        setEditingId(expense.id);
        setFormData({
            amount: expense.amount,
            title: expense.title,
            reason: expense.reason,
            type: expense.type,
            date: expense.date,
        });
    };

    const handleUpdate = (id: number) => {
        updateMutation.mutate({ id, updated: formData });
    };

    if (isLoading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">Failed to load expenses.</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Expense History</h2>
            <table className="w-full border border-gray-200 rounded-md shadow-sm bg-white">
                <thead className="bg-gray-100">
                <tr>
                    <th className="p-3 border">Date</th>
                    <th className="p-3 border">Title</th>
                    <th className="p-3 border">Type</th>
                    <th className="p-3 border">Amount</th>
                    <th className="p-3 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {expenses.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="p-4 text-center text-gray-500">
                            No expenses found.
                        </td>
                    </tr>
                ) : (
                    expenses.map((expense) => (
                        <tr key={expense.id} className="border-b text-center">
                            {editingId === expense.id ? (
                                <>
                                    <td className="p-2 border">
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) =>
                                                setFormData({ ...formData, date: e.target.value })
                                            }
                                            className="border p-1 rounded"
                                        />
                                    </td>
                                    <td className="p-2 border">
                                        <input
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({ ...formData, reason: e.target.value })
                                            }
                                            className="border p-1 rounded"
                                        />
                                    </td>
                                    <td className="p-2 border">
                                        <input
                                            value={formData.type}
                                            onChange={(e) =>
                                                setFormData({ ...formData, type: e.target.value })
                                            }
                                            className="border p-1 rounded"
                                        />
                                    </td>
                                    <td className="p-2 border">
                                        <input
                                            type="number"
                                            value={formData.amount}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    amount: Number(e.target.value),
                                                })
                                            }
                                            className="border p-1 rounded w-20"
                                        />
                                    </td>
                                    <td className="p-2 border">
                                        <button
                                            onClick={() => handleUpdate(expense.id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="bg-gray-400 text-white px-3 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="p-2 border">{expense.date}</td>
                                    <td className="p-2 border">{expense.title}</td>
                                    <td className="p-2 border">{expense.type}</td>
                                    <td className="p-2 border text-right">{expense.amount}</td>
                                    <td className="p-2 border">
                                        <button
                                            onClick={() => handleEdit(expense)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteMutation.mutate(expense.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default History;
