package com.hansana.expensetracker.controllers;

import com.hansana.expensetracker.dtos.requests.UserRequest;
import com.hansana.expensetracker.dtos.responses.UserDTO;
import com.hansana.expensetracker.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(path = "/{email}/me")
    public UserDTO getProfile(@PathVariable String email) {
        return userService.getProfile(email);
    }

    @PutMapping(path = "/{id}/update")
    public ResponseEntity<UserDTO> updateUser(@PathVariable UUID id, @RequestBody UserRequest request) {
        try {
            UserDTO user = userService.updateUser(id, request);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(ex.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}/delete")
    public String deleteUser(@PathVariable UUID id) {
        return userService.deleteUser(id);
    }
}
