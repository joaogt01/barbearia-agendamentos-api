package br.com.barbearia_agendamentos_api.dto.auth;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String senha;

}
