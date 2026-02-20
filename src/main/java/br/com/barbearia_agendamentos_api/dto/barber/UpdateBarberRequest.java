package br.com.barbearia_agendamentos_api.dto.barber;

import lombok.Data;

import java.util.List;

@Data
public class UpdateBarberRequest {
    private List<Long> serviceIds;
    private Boolean ativo;
}
