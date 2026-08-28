package com.hansana.expensetracker.services;

import com.hansana.expensetracker.dtos.requests.LoginRequest;
import com.hansana.expensetracker.dtos.requests.RegisterRequest;
import com.hansana.expensetracker.dtos.responses.AuthResponse;

public interface AuthService {
    AuthResponse login(LoginRequest request);
    AuthResponse register(RegisterRequest request);
}
