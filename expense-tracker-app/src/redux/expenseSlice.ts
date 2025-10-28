import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchExpenses, createExpense } from "../service/expenseService";

export const getExpenses = createAsyncThunk(
    "expenses/fetchAll",
    async (userId: number) => {
        const data = await fetchExpenses(userId);
        return data;
    }
);

export const addExpense = createAsyncThunk(
    "expenses/add",
    async (expense: any, { dispatch }) => {
        await createExpense(expense);
        dispatch(getExpenses(expense.userId)); // refresh after add
    }
);

interface ExpenseState {
    data: any[];
    loading: boolean;
    error: string | null;
}

const initialState: ExpenseState = {
    data: [],
    loading: false,
    error: null,
};

const expenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getExpenses.pending, (state) => {
                state.loading = true;
            })
            .addCase(getExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getExpenses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch expenses";
            })
            .addCase(addExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(addExpense.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add expense";
            });
    },
});

export default expenseSlice.reducer;
