package com.hansana.expensetracker.services;

import com.hansana.expensetracker.domain.entities.User;
import com.hansana.expensetracker.dtos.requests.LoginRequest;
import com.hansana.expensetracker.dtos.requests.UserRequest;
import com.hansana.expensetracker.dtos.responses.UserDTO;

import java.util.List;
import java.util.UUID;

public interface UserService {

    List<UserDTO> getAllUsers();
    UserDTO getProfile(String email);
    UserDTO updateUser(UUID id, UserRequest request);
    String deleteUser(UUID id);
}