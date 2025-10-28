import { apiClient } from "./apiClient";

export const fetchExpenses = async (userId: number) => {
    const { data } = await apiClient.get(`/expenses?userId=${userId}`);
    return data;
};

export const createExpense = async (expense: any) => {
    const { data } = await apiClient.post("/expenses", expense);
    return data;
};

export const updateExpense = async (id:number, expense:any) => {
    const { data } = await apiClient.put(`/expenses/${id}`, expense);
    return data;
};

export const deleteExpense = async (id:number) => {
    await apiClient.delete(`/expenses/${id}`);
};
