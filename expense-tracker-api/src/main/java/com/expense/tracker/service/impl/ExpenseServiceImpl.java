package com.expense.tracker.service.impl;

import com.expense.tracker.dto.ExpenseDto;
import com.expense.tracker.entity.Expense;
import com.expense.tracker.mapper.ExpenseMapper;
import com.expense.tracker.repository.ExpenseRepository;
import com.expense.tracker.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;

    @Override
    public ExpenseDto createExpense(ExpenseDto dto) {
        Expense saved = expenseRepository.save(ExpenseMapper.toEntity(dto));
        return ExpenseMapper.toDto(saved);
    }

    @Override
    public ExpenseDto updateExpense(Long id, ExpenseDto dto) {
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
        existing.setAmount(dto.getAmount());
        existing.setReason(dto.getReason());
        existing.setType(dto.getType());
        existing.setDate(dto.getDate());
        return ExpenseMapper.toDto(expenseRepository.save(existing));
    }

    @Override
    public ExpenseDto getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .map(ExpenseMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
    }

    @Override
    public List<ExpenseDto> getAllExpenses(Long userId) {
        return expenseRepository.findByUserId(userId)
                .stream()
                .map(ExpenseMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
}
