package br.com.barbearia_agendamentos_api.domain.mapper;

import br.com.barbearia_agendamentos_api.domain.entity.BusinessHours;
import br.com.barbearia_agendamentos_api.dto.businesshours.BusinessHoursResponse;

public class BusinessHoursMapper {

    private BusinessHoursMapper() {}

    public static BusinessHoursResponse toResponse(BusinessHours businessHours){
        return BusinessHoursResponse.builder()
                .id(businessHours.getId())
                .diaSemana(businessHours.getDiaSemana())
                .horaAbertura(businessHours.getHoraAbertura())
                .horaFechamento(businessHours.getHoraFechamento())
                .build();
    }
}
