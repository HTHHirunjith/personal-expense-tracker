package com.hansana.expensetracker.services.impl;

import com.hansana.expensetracker.domain.entities.Category;
import com.hansana.expensetracker.domain.entities.Transaction;
import com.hansana.expensetracker.domain.entities.User;
import com.hansana.expensetracker.dtos.requests.TransactionRequest;
import com.hansana.expensetracker.dtos.responses.TransactionDTO;
import com.hansana.expensetracker.exception.ResourceAccessException;
import com.hansana.expensetracker.mappers.TransactionMapper;
import com.hansana.expensetracker.repositories.CategoryRepository;
import com.hansana.expensetracker.repositories.TransactionRepository;
import com.hansana.expensetracker.services.TransactionService;
import com.hansana.expensetracker.util.AuthenticatedUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;
    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final CategoryRepository categoryRepository;

    @Override
    public List<TransactionDTO> listTransactions(UUID categoryId, LocalDateTime startDate, LocalDateTime endDate) {

        User user = authenticatedUserProvider.getAuthenticatedUser();

        List<Transaction> transactions;

        // validations to get transactions according to de data from the browser
        if(categoryId != null && startDate != null && endDate != null) {
            transactions = transactionRepository
                    .findByUserIdAndCategoryIdAndCreatedAtBetween(
                            user.getId(),
                            categoryId,
                            startDate,
                            endDate
                    );
        } else if(categoryId != null) {
            transactions = transactionRepository.findByUserIdAndCategoryId(user.getId(), categoryId);
        } else if(startDate != null && endDate != null) {
            transactions = transactionRepository.findByUserIdAndCreatedAtBetween(user.getId(), startDate, endDate);
        } else {
            transactions = transactionRepository.findByUserId(user.getId());
        }

        return transactions.stream().map(transactionMapper::toDTO).collect(Collectors.toList());

    }

    @Override
    public TransactionDTO createTransaction(TransactionRequest transactionRequest) {
        User user = authenticatedUserProvider.getAuthenticatedUser();
        Category category = categoryRepository.findById(transactionRequest.getCategoryId())
                .orElseThrow(() -> new ResourceAccessException(HttpStatus.NOT_FOUND, "Category not found"));

        boolean isDefault = Boolean.TRUE.equals(category.getIsDefault());
        boolean ownedByUser = category.getUser() != null && category.getUser().getId().equals(user.getId());
        if (!isDefault && !ownedByUser) {
            throw new ResourceAccessException(HttpStatus.NOT_FOUND, "Category not found");
        }

        Transaction transaction = Transaction.builder()
                .title(transactionRequest.getTitle())
                .amount(transactionRequest.getAmount())
                .type(transactionRequest.getType())
                .description(transactionRequest.getDescription())
                .category(category)
                .user(user)
                .build();

        Transaction transactionSaved = transactionRepository.save(transaction);

        return transactionMapper.toDTO(transactionSaved);
    }

    @Override
    public TransactionDTO getTransaction(UUID id) {
        if(id == null) {
            throw new ResourceAccessException(HttpStatus.NOT_FOUND, "Transaction not found");
        }

        User user = authenticatedUserProvider.getAuthenticatedUser();

        Optional<Transaction> transaction = transactionRepository.findById(id);

        if(transaction.isEmpty()) {
            throw new ResourceAccessException(HttpStatus.NOT_FOUND, "Transaction not found");
        }

        if(!transaction.get().getUser().getId().equals(user.getId())) {
            throw new ResourceAccessException(HttpStatus.NOT_FOUND, "Transaction not found");
        }

        return transactionMapper.toDTO(transaction.get());
    }

    @Override
    public TransactionDTO updateTransaction(UUID id, TransactionRequest request) {
        User user = authenticatedUserProvider.getAuthenticatedUser();

        if(id == null) {
            throw new ResourceAccessException(HttpStatus.NOT_FOUND, "Transaction not found");
        }

        Optional<Transaction> transactionSaved = transactionRepository.findById(id);

        if(transactionSaved.isEmpty() || !transactionSaved.get().getUser().getId().equals(user.getId())) {
            throw new ResourceAccessException(HttpStatus.NOT_FOUND, "Transaction not found");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceAccessException(HttpStatus.NOT_FOUND, "Category not found"));

        boolean isDefault = Boolean.TRUE.equals(category.getIsDefault());
        boolean ownedByUser = category.getUser() != null && category.getUser().getId().equals(user.getId());
        if (!isDefault && !ownedByUser) {
            throw new ResourceAccessException(HttpStatus.NOT_FOUND, "Category not found");
        }

        Transaction transaction = transactionSaved.get();

        transaction.setTitle(request.getTitle());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setDescription(request.getDescription());
        transaction.setCategory(category);

        transactionRepository.save(transaction);
        return transactionMapper.toDTO(transaction);
    }

    @Override
    public String deleteTransaction(UUID id) {
        User user = authenticatedUserProvider.getAuthenticatedUser();

        Optional<Transaction> transaction = transactionRepository.findById(id);

        if(transaction.isEmpty() || !transaction.get().getUser().getId().equals(user.getId())) {
            throw new ResourceAccessException(HttpStatus.NOT_FOUND, "Transaction not found");
        }

        transactionRepository.deleteById(id);
        return "Transaction deleted successfully";
    }
}
