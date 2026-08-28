package com.hansana.expensetracker.controllers;

import com.hansana.expensetracker.dtos.requests.TransactionRequest;
import com.hansana.expensetracker.dtos.responses.TransactionDTO;
import com.hansana.expensetracker.services.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v1/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping
    public ResponseEntity<List<TransactionDTO>> listTransactions(
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) LocalDateTime startDate,
            @RequestParam(required = false) LocalDateTime endDate
            ) {
        List<TransactionDTO> transactions = transactionService.listTransactions(categoryId, startDate, endDate);

        try {
            return ResponseEntity.status(HttpStatus.OK).body(transactions);
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(ex.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<TransactionDTO> createTransaction(@Valid @RequestBody TransactionRequest request) {
        System.out.println(request);
        try {
            return ResponseEntity.status(HttpStatus.OK).body(transactionService.createTransaction(request));
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(ex.getMessage());
        }
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<TransactionDTO> getTransaction(@PathVariable UUID id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(transactionService.getTransaction(id));
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(ex.getMessage());
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<TransactionDTO> updateTransaction(
            @PathVariable UUID id,
            @Valid @RequestBody TransactionRequest request
    ) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(transactionService.updateTransaction(id, request));
        } catch(IllegalArgumentException ex) {
            throw new IllegalArgumentException(ex.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    public String deleteTransaction(@PathVariable UUID id) {
        return transactionService.deleteTransaction(id);
    }
}
