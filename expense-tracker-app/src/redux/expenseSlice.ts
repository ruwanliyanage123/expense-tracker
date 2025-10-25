import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Expense {
    id: string;
    amount: number;
    reason: string;
    type: string;
    date: string;
}

interface ExpenseState {
    list: Expense[];
}

const initialState: ExpenseState = { list: [] };

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.list.push(action.payload);
        },
    },
});

export const { addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
