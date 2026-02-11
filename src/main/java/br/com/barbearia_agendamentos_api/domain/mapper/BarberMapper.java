package br.com.barbearia_agendamentos_api.domain.mapper;

import br.com.barbearia_agendamentos_api.domain.entity.Barber;
import br.com.barbearia_agendamentos_api.dto.barber.BarberResponse;

public class BarberMapper {

    private BarberMapper() {}

    public static BarberResponse toResponse(Barber barber) {
        return BarberResponse.builder()
                .id(barber.getId())
                .user(UserMapper.toResponse(barber.getUser()))
                .ativo(barber.getAtivo())
                .build();
    }

}
