package com.hansana.expensetracker.mappers;

import com.hansana.expensetracker.domain.entities.Category;
import com.hansana.expensetracker.dtos.responses.CategoryDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryDTO toDTO(Category category);
    Category toEntity(CategoryDTO categoryDTO);
}
