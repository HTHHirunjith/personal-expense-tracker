package com.hansana.expensetracker.services.impl;

import com.hansana.expensetracker.domain.entities.User;
import com.hansana.expensetracker.dtos.requests.UserRequest;
import com.hansana.expensetracker.dtos.responses.UserDTO;
import com.hansana.expensetracker.exception.ResourceAccessException;
import com.hansana.expensetracker.mappers.UserMapper;
import com.hansana.expensetracker.repositories.UserRepository;
import com.hansana.expensetracker.services.UserService;
import com.hansana.expensetracker.util.AuthenticatedUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    private final AuthenticatedUserProvider authenticatedUserProvider;

    @Override
    public List<UserDTO> getAllUsers() {
        throw new ResourceAccessException(HttpStatus.FORBIDDEN, "Access denied");
    }

    @Override
    public UserDTO getProfile(String email) {
        User authenticatedUser = authenticatedUserProvider.getAuthenticatedUser();

        if(email == null || !email.equals(authenticatedUser.getEmail())) {
            throw new ResourceAccessException(HttpStatus.NOT_FOUND, "User not found");
        }

        Optional<User> user = userRepository.findByEmail(email);

        if(user.isEmpty()) {
            throw new ResourceAccessException(HttpStatus.NOT_FOUND, "User not found");
        }

        return userMapper.toDto(user.get());

    }

    @Override
    public UserDTO updateUser(UUID id, UserRequest request) {
        User authenticatedUser = authenticatedUserProvider.getAuthenticatedUser();

        if(id == null || !id.equals(authenticatedUser.getId())) {
            throw new ResourceAccessException(HttpStatus.NOT_FOUND, "User not found");
        }

        Optional<User> user = userRepository.findById(id);

        if(user.isEmpty()) {
            throw new ResourceAccessException(HttpStatus.NOT_FOUND, "User not found");
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
        User authenticatedUser = authenticatedUserProvider.getAuthenticatedUser();

        if(id == null || !id.equals(authenticatedUser.getId())) {
            throw new ResourceAccessException(HttpStatus.NOT_FOUND, "User not found");
        }

        userRepository.deleteById(id);
        return "User deleted successfully.";
    }
}

