import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchExpenses, createExpense } from "../service/expenseService";

const LOCAL_KEY = "expense_cache";
const QUEUE_KEY = "expense_sync_queue";

//Load cached expenses
const loadFromLocal = () => {
    try {
        const saved = localStorage.getItem(LOCAL_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

//Save expenses to local storage
const saveToLocal = (data: any[]) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
};

//Save unsynced items to local storage
const saveQueue = (queue: any[]) => {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
};

//Load unsynced queue
const loadQueue = () => {
    try {
        const q = localStorage.getItem(QUEUE_KEY);
        return q ? JSON.parse(q) : [];
    } catch {
        return [];
    }
};

export const getExpenses = createAsyncThunk(
    "expenses/fetchAll",
    async (userId: number) => {
        const data = await fetchExpenses(userId);
        saveToLocal(data);
        return data;
    }
);

export const addExpense = createAsyncThunk(
    "expenses/add",
    async (expense: any, { getState, dispatch }) => {
        if (!navigator.onLine) {
            // 📦 Offline: Save locally & add to queue
            const current = (getState() as any).expenses.data;
            const newData = [...current, expense];
            saveToLocal(newData);

            const queue = loadQueue();
            queue.push(expense);
            saveQueue(queue);
            return expense;
        }

        // 🌐 Online: Save to server normally
        const res = await createExpense(expense);
        dispatch(getExpenses(expense.userId));
        return res;
    }
);

//Background sync job
export const syncExpenses = createAsyncThunk(
    "expenses/sync",
    async (_, { dispatch }) => {
        if (navigator.onLine) {
            const queue = loadQueue();
            if (queue.length === 0) return;
            for (const exp of queue) {
                try {
                    await createExpense(exp);
                } catch {
                    console.warn("Failed to sync item:", exp);
                }
            }
            saveQueue([]); // Clear queue
            dispatch(getExpenses(1)); // reload from server
        }
    }
);

interface ExpenseState {
    data: any[];
    loading: boolean;
    syncing: boolean;
    offline: boolean;
    error: string | null;
}

const initialState: ExpenseState = {
    data: loadFromLocal(),
    loading: false,
    syncing: false,
    offline: !navigator.onLine,
    error: null,
};

const expenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        setOffline: (state, action) => {
            state.offline = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getExpenses.pending, (state) => {
                state.loading = true;
            })
            .addCase(getExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                saveToLocal(state.data);
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                if (action.payload) {
                    state.data.push(action.payload);
                    saveToLocal(state.data);
                }
            })
            .addCase(syncExpenses.pending, (state) => {
                state.syncing = true;
            })
            .addCase(syncExpenses.fulfilled, (state) => {
                state.syncing = false;
            })
            .addCase(syncExpenses.rejected, (state) => {
                state.syncing = false;
            });
    },
});

export const { setOffline } = expenseSlice.actions;
export default expenseSlice.reducer;
