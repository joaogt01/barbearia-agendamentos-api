package br.com.barbearia_agendamentos_api.dto.barber;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BarberRequest {

    @NotNull
    private Long userId;

    private List<Long> serviceIds;

    private Boolean ativo;
}
