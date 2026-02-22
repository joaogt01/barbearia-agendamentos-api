package br.com.barbearia_agendamentos_api.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AuthResponse {

    private String token;
    private String role;
    private Long userId;

}
