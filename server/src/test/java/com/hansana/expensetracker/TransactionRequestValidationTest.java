package com.hansana.expensetracker;

import com.hansana.expensetracker.domain.enums.Type;
import com.hansana.expensetracker.dtos.requests.TransactionRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class TransactionRequestValidationTest {

    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    @BeforeAll
    static void setUp() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @AfterAll
    static void tearDown() {
        validatorFactory.close();
    }

    private TransactionRequest validRequest(BigDecimal amount) {
        return new TransactionRequest(
                "Groceries",
                amount,
                Type.EXPENSE,
                "Weekly shopping",
                UUID.randomUUID()
        );
    }

    private boolean hasViolationOn(TransactionRequest request, String field) {
        Set<ConstraintViolation<TransactionRequest>> violations = validator.validate(request);
        return violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals(field));
    }

    @Test
    void positiveAmountIsValid() {
        Set<ConstraintViolation<TransactionRequest>> violations = validator.validate(validRequest(new BigDecimal("100.00")));
        assertTrue(violations.isEmpty(), "A positive amount should not produce violations");
    }

    @Test
    void zeroAmountIsRejected() {
        assertTrue(hasViolationOn(validRequest(new BigDecimal("0")), "amount"),
                "Zero amount should be rejected");
    }

    @Test
    void negativeAmountIsRejected() {
        assertTrue(hasViolationOn(validRequest(new BigDecimal("-100")), "amount"),
                "Negative amount should be rejected");
    }

    @Test
    void nullAmountIsRejected() {
        assertTrue(hasViolationOn(validRequest(null), "amount"),
                "Null amount should be rejected");
    }

    @Test
    void blankTitleIsRejected() {
        TransactionRequest request = validRequest(new BigDecimal("100.00"));
        request.setTitle("   ");
        assertTrue(hasViolationOn(request, "title"), "Blank title should be rejected");
    }

    @Test
    void nullTypeIsRejected() {
        TransactionRequest request = validRequest(new BigDecimal("100.00"));
        request.setType(null);
        assertTrue(hasViolationOn(request, "type"), "Null type should be rejected");
    }

    @Test
    void nullCategoryIsRejected() {
        TransactionRequest request = validRequest(new BigDecimal("100.00"));
        request.setCategoryId(null);
        assertTrue(hasViolationOn(request, "categoryId"), "Null categoryId should be rejected");
    }

    @Test
    void positiveDecimalAmountIsValid() {
        Set<ConstraintViolation<TransactionRequest>> violations =
                validator.validate(validRequest(new BigDecimal("0.01")));
        assertTrue(violations.isEmpty(), "A small positive amount should be valid");
    }

    @Test
    void descriptionRemainsOptional() {
        TransactionRequest request = validRequest(new BigDecimal("100.00"));
        request.setDescription(null);
        Set<ConstraintViolation<TransactionRequest>> violations = validator.validate(request);
        assertFalse(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("description")),
                "Description should remain optional");
    }
}
