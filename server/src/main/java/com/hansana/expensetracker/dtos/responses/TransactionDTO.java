package com.hansana.expensetracker.dtos.responses;

import com.hansana.expensetracker.domain.enums.Type;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {
    private UUID id;
    private String title;
    private BigDecimal amount;
    private String description;
    private CategoryDTO category;
    private Type type;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
