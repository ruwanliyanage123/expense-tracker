package com.expense.tracker.controller;

import com.expense.tracker.dto.ExpenseDto;
import com.expense.tracker.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpenseDto> create(@RequestBody ExpenseDto dto) {
        return ResponseEntity.ok(expenseService.createExpense(dto));
    }

    @GetMapping
    public ResponseEntity<List<ExpenseDto>> getAll(@RequestParam(value = "userId", required = false) Long userId) {
        return ResponseEntity.ok(expenseService.getAllExpenses(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(expenseService.getExpenseById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseDto> update(@PathVariable Long id, @RequestBody ExpenseDto dto) {
        return ResponseEntity.ok(expenseService.updateExpense(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
