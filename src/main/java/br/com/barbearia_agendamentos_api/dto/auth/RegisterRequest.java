package br.com.barbearia_agendamentos_api.dto.auth;

import br.com.barbearia_agendamentos_api.domain.enums.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String nome;
    private String email;
    private String senha;
    private Role role;

}
