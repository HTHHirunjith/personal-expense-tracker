package com.hansana.expensetracker.config;

import com.hansana.expensetracker.domain.entities.Category;
import com.hansana.expensetracker.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DefaultCategoryLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.countByIsDefaultTrue() == 0) {
            List<Category> defaultCategories = List.of(
                    new Category(null, "Groceries", "#FFDFBA", true, null, null, null, null),
                    new Category(null, "Utilities", "#FFFFBA", true, null, null, null, null),
                    new Category(null, "Transportation", "#BAE1FF", true, null, null, null, null),
                    new Category(null, "Entertainment", "#D5AAFF", true, null, null, null, null),
                    new Category(null, "Healthcare", "#FFDAC1", true, null, null, null, null),
                    new Category(null, "Clothing", "#C7CEEA", true, null, null, null, null),
                    new Category(null, "Education", "#FFCBC1", true, null, null, null, null),
                    new Category(null, "Gifts", "#D0F4DE", true, null, null, null, null),
                    new Category(null, "Interest", "#D3F8E2", true, null, null, null, null),
                    new Category(null, "Salary", "#A0E7E5", true, null, null, null, null),
                    new Category(null, "Other", "#C2F0FC", true, null, null, null, null)
                    );

            categoryRepository.saveAll(defaultCategories);
        }
    }
}
