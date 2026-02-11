package br.com.barbearia_agendamentos_api.dto.barber;

import br.com.barbearia_agendamentos_api.dto.user.UserResponse;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BarberResponse {

    private Long id;
    private UserResponse user;
    private Boolean ativo;
}
