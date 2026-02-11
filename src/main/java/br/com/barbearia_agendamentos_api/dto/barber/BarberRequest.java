package br.com.barbearia_agendamentos_api.dto.barber;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BarberRequest {

    @NotNull
    private Long userId;

}
