import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchExpenses, createExpense } from "../service/expenseService";

// --- Load local data on startup ---
const loadLocalExpenses = () => {
    try {
        const data = localStorage.getItem("offlineExpenses");
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

// --- Save local data ---
const saveLocalExpenses = (data: any[]) => {
    localStorage.setItem("offlineExpenses", JSON.stringify(data));
};

// --- Fetch expenses from server ---
export const getExpenses = createAsyncThunk("expenses/get", async (userId: number) => {
    const data = await fetchExpenses(userId);
    return data;
});

// --- Add expense (handles online/offline) ---
export const addExpense = createAsyncThunk(
    "expenses/add",
    async (expense: any, { rejectWithValue }) => {
        try {
            const data = await createExpense(expense);
            return data;
        } catch {
            // offline fallback
            return rejectWithValue(expense);
        }
    }
);

const expenseSlice = createSlice({
    name: "expenses",
    initialState: {
        data: [] as any[],
        loading: false,
        error: null as string | null,
        offline: !navigator.onLine,
        syncing: false,
        offlineQueue: loadLocalExpenses(),
    },
    reducers: {
        setOffline(state, action: PayloadAction<boolean>) {
            state.offline = action.payload;
        },
        setSyncing(state, action: PayloadAction<boolean>) {
            state.syncing = action.payload;
        },
        // Save to local queue
        addOfflineExpense(state, action: PayloadAction<any>) {
            state.offlineQueue.push(action.payload);
            saveLocalExpenses(state.offlineQueue);
        },
        // Merge offline data once synced
        mergeOfflineExpenses(state, action: PayloadAction<any[]>) {
            state.data.push(...action.payload);
            state.offlineQueue = [];
            saveLocalExpenses([]);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getExpenses.pending, (state) => {
                state.loading = true;
            })
            .addCase(getExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
            })
            .addCase(getExpenses.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(addExpense.rejected, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.offlineQueue.push(action.payload);
                    saveLocalExpenses(state.offlineQueue);
                }
            });
    },
});

export const { setOffline, setSyncing, addOfflineExpense, mergeOfflineExpenses } =
    expenseSlice.actions;

export const syncExpenses = () => async (dispatch: any, getState: any) => {
    const { offlineQueue } = getState().expenses;
    if (offlineQueue.length === 0) return;

    dispatch(setSyncing(true));
    try {
        for (const exp of offlineQueue) {
            await createExpense(exp);
        }
        dispatch(mergeOfflineExpenses(offlineQueue));
    } catch (err) {
        console.error("Sync failed", err);
    } finally {
        dispatch(setSyncing(false));
    }
};

export default expenseSlice.reducer;
