package com.expense.tracker.mapper;

import com.expense.tracker.dto.ExpenseDto;
import com.expense.tracker.entity.Expense;

public class ExpenseMapper {
    public static ExpenseDto toDto(Expense expense) {
        return ExpenseDto.builder()
                .id(expense.getId())
                .userId(expense.getUserId())
                .amount(expense.getAmount())
                .reason(expense.getReason())
                .type(expense.getType())
                .date(expense.getDate())
                .build();
    }

    public static Expense toEntity(ExpenseDto dto) {
        return Expense.builder()
                .id(dto.getId())
                .amount(dto.getAmount())
                .userId(dto.getUserId())
                .reason(dto.getReason())
                .type(dto.getType())
                .date(dto.getDate())
                .build();
    }
}
