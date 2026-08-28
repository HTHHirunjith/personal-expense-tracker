package com.hansana.expensetracker.mappers;

import com.hansana.expensetracker.domain.entities.Transaction;
import com.hansana.expensetracker.dtos.responses.TransactionDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    TransactionDTO toDTO(Transaction transaction);
    Transaction toEntity(TransactionDTO transactionDTO);
}
