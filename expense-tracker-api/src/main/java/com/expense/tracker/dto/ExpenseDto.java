package com.expense.tracker.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExpenseDto {
    private Long id;
    private Long userId;
    private BigDecimal amount;
    private String title;
    private String note;
    private String type;
    private LocalDate date;
}
