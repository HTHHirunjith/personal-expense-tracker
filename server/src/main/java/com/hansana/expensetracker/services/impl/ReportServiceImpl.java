package com.hansana.expensetracker.services.impl;

import com.hansana.expensetracker.domain.entities.Transaction;
import com.hansana.expensetracker.domain.entities.User;
import com.hansana.expensetracker.dtos.responses.MonthlyReportResponse;
import com.hansana.expensetracker.repositories.TransactionRepository;
import com.hansana.expensetracker.services.ReportService;
import com.hansana.expensetracker.util.AuthenticatedUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.List;

import static com.hansana.expensetracker.domain.enums.Type.EXPENSE;
import static com.hansana.expensetracker.domain.enums.Type.INCOME;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final TransactionRepository transactionRepository;

    @Override
    public MonthlyReportResponse getMonthlyReport(YearMonth month) {
        User user = authenticatedUserProvider.getAuthenticatedUser();

        LocalDateTime startDate = month.atDay(1).atStartOfDay();
        LocalDateTime endDate = month.atEndOfMonth().atTime(LocalTime.MAX);

        List<Transaction> transactions = transactionRepository
                .findByUserIdAndCreatedAtBetween(user.getId(), startDate, endDate);

        BigDecimal income = transactions.stream()
                .filter(transaction -> transaction.getType() == INCOME)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal expense = transactions.stream()
                .filter(transaction -> transaction.getType() == EXPENSE)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new MonthlyReportResponse(month, income, expense, income.subtract(expense));
    }
}
