import { apiClient } from "./apiClient";
import {
    fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
} from "./expenseService";

// Mock the apiClient module
jest.mock("./apiClient", () => ({
    apiClient: {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
    },
}));

describe("expenseService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("fetchExpenses", () => {
        it("should fetch expenses for given userId", async () => {
            const mockData = [{ id: 1, amount: 100, type: "Food" }];
            (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await fetchExpenses(1);

            expect(apiClient.get).toHaveBeenCalledWith("/expenses?userId=1");
            expect(result).toEqual(mockData);
        });
    });

    describe("createExpense", () => {
        it("should post new expense", async () => {
            const expense = { amount: 200, type: "Bills" };
            const mockResponse = { id: 10, ...expense };
            (apiClient.post as jest.Mock).mockResolvedValue({ data: mockResponse });

            const result = await createExpense(expense);

            expect(apiClient.post).toHaveBeenCalledWith("/expenses", expense);
            expect(result).toEqual(mockResponse);
        });
    });

    describe("updateExpense", () => {
        it("should update expense by id", async () => {
            const updatedExpense = { amount: 300 };
            const mockResponse = { id: 5, ...updatedExpense };
            (apiClient.put as jest.Mock).mockResolvedValue({ data: mockResponse });

            const result = await updateExpense(5, updatedExpense);

            expect(apiClient.put).toHaveBeenCalledWith("/expenses/5", updatedExpense);
            expect(result).toEqual(mockResponse);
        });
    });

    describe("deleteExpense", () => {
        it("should delete expense by id", async () => {
            (apiClient.delete as jest.Mock).mockResolvedValue({});

            await deleteExpense(3);

            expect(apiClient.delete).toHaveBeenCalledWith("/expenses/3");
        });
    });
});
