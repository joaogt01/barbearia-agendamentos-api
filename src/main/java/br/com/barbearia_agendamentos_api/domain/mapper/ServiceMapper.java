package br.com.barbearia_agendamentos_api.domain.mapper;

import br.com.barbearia_agendamentos_api.domain.entity.BarberService;
import br.com.barbearia_agendamentos_api.dto.service.ServiceResponse;
import org.springframework.stereotype.Component;

@Component
public class ServiceMapper {

    public static ServiceResponse toResponse(BarberService service) {
        return ServiceResponse.builder()
                .id(service.getId())
                .nome(service.getNome())
                .descricao(service.getDescricao())
                .duracaoMinutos(service.getDuracaoMinutos())
                .preco(service.getPreco())
                .ativo(service.getAtivo())
                .build();
    }

}
