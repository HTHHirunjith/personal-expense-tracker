package com.hansana.expensetracker.services;

import com.hansana.expensetracker.dtos.requests.TransactionRequest;
import com.hansana.expensetracker.dtos.responses.TransactionDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface TransactionService {
    List<TransactionDTO> listTransactions(UUID categoryId, LocalDateTime startDate, LocalDateTime endDate);
    TransactionDTO createTransaction(TransactionRequest transactionRequest);
    TransactionDTO getTransaction(UUID id);
    TransactionDTO updateTransaction(UUID id, TransactionRequest request);
    String deleteTransaction(UUID id);
}
