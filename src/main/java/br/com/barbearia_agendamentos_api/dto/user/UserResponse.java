package br.com.barbearia_agendamentos_api.dto.user;

import br.com.barbearia_agendamentos_api.domain.enums.Role;
import lombok.*;

@Getter
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private Long id;
    private String nome;
    private String email;
    private Role role;
    private Boolean ativo;
}
