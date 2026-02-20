package br.com.barbearia_agendamentos_api.dto.barber;

import br.com.barbearia_agendamentos_api.dto.user.UserResponse;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class BarberResponse {

    private Long id;
    private Long userId;
    private String userName;
    private Boolean ativo;
    private List<String> services;
}
