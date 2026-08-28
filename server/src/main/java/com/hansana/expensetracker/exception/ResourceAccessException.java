package com.hansana.expensetracker.exception;

import org.springframework.http.HttpStatus;

public class ResourceAccessException extends RuntimeException {

    private final HttpStatus status;

    public ResourceAccessException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
