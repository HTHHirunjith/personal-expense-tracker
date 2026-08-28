package com.hansana.expensetracker;

import com.hansana.expensetracker.domain.entities.Category;
import com.hansana.expensetracker.domain.entities.User;
import com.hansana.expensetracker.dtos.requests.CategoryRequest;
import com.hansana.expensetracker.dtos.responses.CategoryDTO;
import com.hansana.expensetracker.exception.ResourceAccessException;
import com.hansana.expensetracker.mappers.CategoryMapper;
import com.hansana.expensetracker.repositories.CategoryRepository;
import com.hansana.expensetracker.services.impl.CategoryServiceImpl;
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
class CategoryOwnershipTest {

    @Mock
    private CategoryRepository categoryRepository;
    @Mock
    private CategoryMapper categoryMapper;
    @Mock
    private AuthenticatedUserProvider authenticatedUserProvider;

    private CategoryServiceImpl service;

    private final UUID userAId = UUID.randomUUID();
    private final UUID userBId = UUID.randomUUID();

    private User userA;
    private User userB;
    private Category categoryOfA;

    @BeforeEach
    void setUp() {
        service = new CategoryServiceImpl(categoryRepository, categoryMapper, authenticatedUserProvider);

        userA = User.builder().id(userAId).email("a@test.com").build();
        userB = User.builder().id(userBId).email("b@test.com").build();
        categoryOfA = Category.builder()
                .id(UUID.randomUUID())
                .name("A's custom")
                .color("#fff")
                .isDefault(false)
                .user(userA)
                .build();
    }

    @Test
    void userCanUpdateOwnCategory() {
        when(authenticatedUserProvider.getAuthenticatedUser()).thenReturn(userA);
        when(categoryRepository.findById(categoryOfA.getId())).thenReturn(Optional.of(categoryOfA));
        when(categoryMapper.toDTO(any())).thenReturn(new CategoryDTO());

        CategoryRequest request = new CategoryRequest("Renamed", "#000", false);

        service.updateCategory(categoryOfA.getId(), request);

        verify(categoryRepository).save(categoryOfA);
    }

    @Test
    void userCannotUpdateAnotherUsersCategory() {
        when(authenticatedUserProvider.getAuthenticatedUser()).thenReturn(userB);
        when(categoryRepository.findById(categoryOfA.getId())).thenReturn(Optional.of(categoryOfA));

        CategoryRequest request = new CategoryRequest("Hacked", "#000", false);

        ResourceAccessException ex = assertThrows(ResourceAccessException.class,
                () -> service.updateCategory(categoryOfA.getId(), request));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
        verify(categoryRepository, never()).save(any());
    }

    @Test
    void userCannotDeleteAnotherUsersCategory() {
        when(authenticatedUserProvider.getAuthenticatedUser()).thenReturn(userB);
        when(categoryRepository.findById(categoryOfA.getId())).thenReturn(Optional.of(categoryOfA));

        ResourceAccessException ex = assertThrows(ResourceAccessException.class,
                () -> service.deleteCategory(categoryOfA.getId()));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
        verify(categoryRepository, never()).deleteById(any());
    }

    @Test
    void defaultCategoryIsReadableButNotModifiable() {
        Category defaultCategory = Category.builder()
                .id(UUID.randomUUID())
                .name("Groceries")
                .color("#fff")
                .isDefault(true)
                .user(null)
                .build();

        when(authenticatedUserProvider.getAuthenticatedUser()).thenReturn(userA);
        when(categoryRepository.findById(defaultCategory.getId())).thenReturn(Optional.of(defaultCategory));
        when(categoryMapper.toDTO(defaultCategory)).thenReturn(new CategoryDTO());

        assertEquals(new CategoryDTO(), service.getCategoryById(defaultCategory.getId()));

        ResourceAccessException ex = assertThrows(ResourceAccessException.class,
                () -> service.updateCategory(defaultCategory.getId(),
                        new CategoryRequest("x", "#000", true)));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
    }
}
