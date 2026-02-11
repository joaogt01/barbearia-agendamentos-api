package br.com.barbearia_agendamentos_api.domain.mapper;

import br.com.barbearia_agendamentos_api.domain.entity.User;
import br.com.barbearia_agendamentos_api.dto.user.UserResponse;

public class UserMapper {

    private UserMapper() {}

    public static UserResponse toResponse(User user){
        return UserResponse.builder()
                .id(user.getId())
                .nome(user.getNome())
                .email(user.getEmail())
                .role(user.getRole())
                .ativo(user.getAtivo())
                .build();
    }
}
