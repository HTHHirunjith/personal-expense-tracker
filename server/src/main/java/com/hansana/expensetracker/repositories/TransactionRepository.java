package com.hansana.expensetracker.repositories;

import com.hansana.expensetracker.domain.entities.Transaction;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    List<Transaction> findByUserId(UUID id);
    List<Transaction> findByUserIdAndCategoryId(UUID userId, UUID categoryId);
    List<Transaction> findByUserIdAndCreatedAtBetween(UUID userId, LocalDateTime startDate, LocalDateTime endTime);
    List<Transaction> findByUserIdAndCategoryIdAndCreatedAtBetween(UUID userId, UUID categoryId, LocalDateTime startDate, LocalDateTime endDate);
}
