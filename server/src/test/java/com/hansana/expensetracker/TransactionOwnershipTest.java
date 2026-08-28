package com.hansana.expensetracker;

import com.hansana.expensetracker.domain.entities.Category;
import com.hansana.expensetracker.domain.entities.Transaction;
import com.hansana.expensetracker.domain.entities.User;
import com.hansana.expensetracker.domain.enums.Type;
import com.hansana.expensetracker.dtos.requests.TransactionRequest;
import com.hansana.expensetracker.dtos.responses.TransactionDTO;
import com.hansana.expensetracker.exception.ResourceAccessException;
import com.hansana.expensetracker.mappers.TransactionMapper;
import com.hansana.expensetracker.repositories.CategoryRepository;
import com.hansana.expensetracker.repositories.TransactionRepository;
import com.hansana.expensetracker.services.impl.TransactionServiceImpl;
import com.hansana.expensetracker.util.AuthenticatedUserProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TransactionOwnershipTest {

    @Mock
    private TransactionRepository transactionRepository;
    @Mock
    private TransactionMapper transactionMapper;
    @Mock
    private AuthenticatedUserProvider authenticatedUserProvider;
    @Mock
    private CategoryRepository categoryRepository;

    private TransactionServiceImpl service;

    private final UUID userAId = UUID.randomUUID();
    private final UUID userBId = UUID.randomUUID();

    private User userA;
    private User userB;
    private Transaction transactionOfB;

    @BeforeEach
    void setUp() {
        service = new TransactionServiceImpl(
                transactionRepository,
                transactionMapper,
                authenticatedUserProvider,
                categoryRepository
        );

        userA = User.builder().id(userAId).email("a@test.com").build();
        userB = User.builder().id(userBId).email("b@test.com").build();
        transactionOfB = Transaction.builder()
                .id(UUID.randomUUID())
                .title("B's tx")
                .amount(new BigDecimal("100"))
                .type(Type.EXPENSE)
                .user(userB)
                .build();
    }

    @Test
    void getOwnTransactionReturnsIt() {
        when(authenticatedUserProvider.getAuthenticatedUser()).thenReturn(userA);
        Transaction own = Transaction.builder()
                .id(UUID.randomUUID())
                .title("A's tx")
                .amount(new BigDecimal("50"))
                .user(userA)
                .build();
        when(transactionRepository.findById(own.getId())).thenReturn(Optional.of(own));
        when(transactionMapper.toDTO(own)).thenReturn(new TransactionDTO());

        TransactionDTO result = service.getTransaction(own.getId());

        assertEquals(new TransactionDTO(), result);
    }

    @Test
    void getOtherUsersTransactionIsRejected() {
        when(authenticatedUserProvider.getAuthenticatedUser()).thenReturn(userA);
        when(transactionRepository.findById(transactionOfB.getId())).thenReturn(Optional.of(transactionOfB));

        ResourceAccessException ex = assertThrows(ResourceAccessException.class,
                () -> service.getTransaction(transactionOfB.getId()));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
    }

    @Test
    void updateOwnTransactionSucceeds() {
        when(authenticatedUserProvider.getAuthenticatedUser()).thenReturn(userA);
        Transaction own = Transaction.builder()
                .id(UUID.randomUUID())
                .title("A's tx")
                .amount(new BigDecimal("50"))
                .user(userA)
                .build();
        Category ownCategory = Category.builder()
                .id(UUID.randomUUID())
                .name("Groceries")
                .color("#fff")
                .isDefault(false)
                .user(userA)
                .build();
        TransactionRequest request = new TransactionRequest(
                "Updated", new BigDecimal("80"), Type.EXPENSE, "desc", ownCategory.getId());

        when(transactionRepository.findById(own.getId())).thenReturn(Optional.of(own));
        when(categoryRepository.findById(ownCategory.getId())).thenReturn(Optional.of(ownCategory));
        when(transactionMapper.toDTO(any())).thenReturn(new TransactionDTO());

        service.updateTransaction(own.getId(), request);

        verify(transactionRepository).save(own);
    }

    @Test
    void updateOtherUsersTransactionIsRejected() {
        when(authenticatedUserProvider.getAuthenticatedUser()).thenReturn(userA);
        when(transactionRepository.findById(transactionOfB.getId())).thenReturn(Optional.of(transactionOfB));

        TransactionRequest request = new TransactionRequest(
                "Hacked", new BigDecimal("1"), Type.EXPENSE, "x", UUID.randomUUID());

        ResourceAccessException ex = assertThrows(ResourceAccessException.class,
                () -> service.updateTransaction(transactionOfB.getId(), request));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
        verify(transactionRepository, never()).save(any());
    }

    @Test
    void deleteOwnTransactionSucceeds() {
        when(authenticatedUserProvider.getAuthenticatedUser()).thenReturn(userA);
        Transaction own = Transaction.builder()
                .id(UUID.randomUUID())
                .title("A's tx")
                .amount(new BigDecimal("50"))
                .user(userA)
                .build();
        when(transactionRepository.findById(own.getId())).thenReturn(Optional.of(own));

        service.deleteTransaction(own.getId());

        verify(transactionRepository).deleteById(own.getId());
    }

    @Test
    void deleteOtherUsersTransactionIsRejected() {
        when(authenticatedUserProvider.getAuthenticatedUser()).thenReturn(userA);
        when(transactionRepository.findById(transactionOfB.getId())).thenReturn(Optional.of(transactionOfB));

        ResourceAccessException ex = assertThrows(ResourceAccessException.class,
                () -> service.deleteTransaction(transactionOfB.getId()));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
        verify(transactionRepository, never()).deleteById(any());
    }
}
