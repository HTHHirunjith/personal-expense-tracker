package com.hansana.expensetracker.services.impl;

import com.hansana.expensetracker.domain.entities.Category;
import com.hansana.expensetracker.domain.entities.User;
import com.hansana.expensetracker.dtos.requests.CategoryRequest;
import com.hansana.expensetracker.dtos.responses.CategoryDTO;
import com.hansana.expensetracker.mappers.CategoryMapper;
import com.hansana.expensetracker.repositories.CategoryRepository;
import com.hansana.expensetracker.services.CategoryService;
import com.hansana.expensetracker.util.AuthenticatedUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final AuthenticatedUserProvider authenticatedUserProvider;

    @Override
    public List<CategoryDTO> listCategories() {
        // get user from JWT token
        User user = authenticatedUserProvider.getAuthenticatedUser();

        // get all user custom categories
        List<Category> userCategories = categoryRepository.findByUserId(user.getId());

        // get default categories (user.getId() == null)
        List<Category> defaultCategories = categoryRepository.findByIsDefaultTrue();

        // merge all categories in a single list
        List<Category> categories = new ArrayList<>();
        categories.addAll(userCategories);
        categories.addAll(defaultCategories);

        // return all categories: default ones and custom ones
        return categories.stream().map(categoryMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public CategoryDTO createCategory(CategoryRequest request) {
        User user = authenticatedUserProvider.getAuthenticatedUser();

        Category categoryCreated = Category.builder()
                .name(request.getName())
                .color(request.getColor())
                .isDefault(request.getIsDefault())
                .user(user)
                .build();

        Category category = categoryRepository.save(categoryCreated);
        return categoryMapper.toDTO(category);

    }

    @Override
    public CategoryDTO getCategoryById(UUID id) {
        if(id == null) {
            throw new IllegalArgumentException("ID must be provided");
        }

        Optional<Category> categorySaved = categoryRepository.findById(id);

        if(categorySaved.isEmpty()) {
            throw new IllegalArgumentException("Category not found");
        }

        return categoryMapper.toDTO(categorySaved.get());
    }

    @Override
    public CategoryDTO updateCategory(UUID id, CategoryRequest request) {
        User user = authenticatedUserProvider.getAuthenticatedUser();

        if(id == null) {
            throw new IllegalArgumentException("ID must be provided");
        }

        Optional<Category> categorySaved = categoryRepository.findById(id);

        if(categorySaved.isEmpty()) {
            throw new IllegalArgumentException("Category not found");
        }

        Category updatedCategory = categorySaved.get();

        if(!updatedCategory.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to update this category");
        }

        updatedCategory.setName(request.getName());
        updatedCategory.setColor(request.getColor());
        updatedCategory.setIsDefault(request.getIsDefault());
        updatedCategory.setUser(user);

        categoryRepository.save(updatedCategory);

        return categoryMapper.toDTO(updatedCategory);
    }

    @Override
    public String deleteCategory(UUID id) {
        if(id == null) {
            throw new IllegalArgumentException("ID must be provided");
        }

        categoryRepository.deleteById(id);

        return "Category deleted successfully";
    }
}
