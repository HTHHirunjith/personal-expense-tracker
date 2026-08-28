package com.hansana.expensetracker.mappers;

import com.hansana.expensetracker.domain.entities.User;
import com.hansana.expensetracker.dtos.responses.UserDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toDto(User user);
    User toEntity(UserDTO userDto);
}
