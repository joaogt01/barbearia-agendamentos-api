package br.com.barbearia_agendamentos_api.domain.mapper;

import br.com.barbearia_agendamentos_api.domain.entity.Barber;
import br.com.barbearia_agendamentos_api.dto.barber.BarberResponse;
import org.springframework.stereotype.Component;
import java.util.stream.Collectors;

@Component
public class BarberMapper {

    public BarberResponse toResponse(Barber barber) {
        return BarberResponse.builder()
                .id(barber.getId())
                .userName(barber.getUser().getNome())
                .ativo(barber.getAtivo())
                .services(
                        barber.getServices()
                                .stream()
                                .map(service -> service.getNome())
                                .collect(Collectors.toList())
                )
                .build();
    }

}
