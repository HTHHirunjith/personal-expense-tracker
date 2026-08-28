package com.hansana.expensetracker;

import com.hansana.expensetracker.domain.entities.User;
import com.hansana.expensetracker.dtos.requests.UserRequest;
import com.hansana.expensetracker.dtos.responses.UserDTO;
import com.hansana.expensetracker.exception.ResourceAccessException;
import com.hansana.expensetracker.mappers.UserMapper;
import com.hansana.expensetracker.repositories.UserRepository;
import com.hansana.expensetracker.services.impl.UserServiceImpl;
import com.hansana.expensetracker.util.AuthenticatedUserProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserOwnershipTest {

    @Mock
    private UserMapper userMapper;
    @Mock
    private UserRepository userRepository;
    @Mock
    private AuthenticatedUserProvider authenticatedUserProvider;

    private UserServiceImpl service;

    private final UUID userAId = UUID.randomUUID();
    private final UUID userBId = UUID.randomUUID();

    private User userA;
    private User userB;

    @BeforeEach
    void setUp() {
        service = new UserServiceImpl(userMapper, userRepository, authenticatedUserProvider);

        userA = User.builder().id(userAId).email("a@test.com").build();
        userB = User.builder().id(userBId).email("b@test.com").build();
    }

    @Test
    void userCanUpdateOwnAccount() {
        when(authenticatedUserProvider.getAuthenticatedUser()).thenReturn(userA);
        when(userRepository.findById(userAId)).thenReturn(Optional.of(userA));
        when(userMapper.toDto(any())).thenReturn(new UserDTO());

        UserRequest request = new UserRequest("A", "User", "a@test.com");

        service.updateUser(userAId, request);

        verify(userRepository).save(userA);
    }

    @Test
    void userCannotUpdateAnotherAccount() {
        when(authenticatedUserProvider.getAuthenticatedUser()).thenReturn(userA);

        UserRequest request = new UserRequest("B", "User", "b@test.com");

        ResourceAccessException ex = assertThrows(ResourceAccessException.class,
                () -> service.updateUser(userBId, request));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
        verify(userRepository, never()).save(any());
    }

    @Test
    void userCannotDeleteAnotherAccount() {
        when(authenticatedUserProvider.getAuthenticatedUser()).thenReturn(userA);

        ResourceAccessException ex = assertThrows(ResourceAccessException.class,
                () -> service.deleteUser(userBId));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
        verify(userRepository, never()).deleteById(any());
    }

    @Test
    void profileIsOnlyReturnedForOwnEmail() {
        when(authenticatedUserProvider.getAuthenticatedUser()).thenReturn(userA);

        ResourceAccessException ex = assertThrows(ResourceAccessException.class,
                () -> service.getProfile("b@test.com"));
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
    }

    @Test
    void getProfileReturnsOwnProfile() {
        when(authenticatedUserProvider.getAuthenticatedUser()).thenReturn(userA);
        when(userRepository.findByEmail("a@test.com")).thenReturn(Optional.of(userA));

        UserDTO dto = new UserDTO();
        dto.setId(userAId);
        dto.setEmail("a@test.com");
        when(userMapper.toDto(userA)).thenReturn(dto);

        UserDTO result = service.getProfile("a@test.com");

        assertEquals(userAId, result.getId());
        assertEquals("a@test.com", result.getEmail());
    }

    @Test
    void getAllUsersIsDenied() {
        ResourceAccessException ex = assertThrows(ResourceAccessException.class,
                () -> service.getAllUsers());

        assertEquals(HttpStatus.FORBIDDEN, ex.getStatus());
    }
}
