package com.expense.tracker.service;

import com.expense.tracker.dto.ExpenseDto;
import java.util.List;

public interface ExpenseService {
    ExpenseDto createExpense(ExpenseDto dto);
    ExpenseDto updateExpense(Long id, ExpenseDto dto);
    ExpenseDto getExpenseById(Long id);
    List<ExpenseDto> getAllExpenses();
    void deleteExpense(Long id);
}
