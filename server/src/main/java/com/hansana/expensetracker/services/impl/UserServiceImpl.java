package com.hansana.expensetracker.services.impl;

import com.hansana.expensetracker.domain.entities.User;
import com.hansana.expensetracker.dtos.requests.LoginRequest;
import com.hansana.expensetracker.dtos.requests.UserRequest;
import com.hansana.expensetracker.dtos.responses.UserDTO;
import com.hansana.expensetracker.mappers.UserMapper;
import com.hansana.expensetracker.repositories.UserRepository;
import com.hansana.expensetracker.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(userMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public UserDTO getProfile(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if(user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        return userMapper.toDto(user.get());

    }

    @Override
    public UserDTO updateUser(UUID id, UserRequest request) {
        Optional<User> user = userRepository.findById(id);

        if(user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        User savedUser = user.get();

        savedUser.setFirstName(request.getFirstName());
        savedUser.setLastName(request.getLastName());
        savedUser.setEmail(request.getEmail());

        User newUser = userRepository.save(savedUser);

        return userMapper.toDto(newUser);
    }

    @Override
    public String deleteUser(UUID id) {
        if(id == null) {
            throw new IllegalArgumentException("ID must be provided");
        }

        userRepository.deleteById(id);
        return "User deleted successfully.";
    }
}

