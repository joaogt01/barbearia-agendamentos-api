package br.com.barbearia_agendamentos_api.domain.mapper;

import br.com.barbearia_agendamentos_api.domain.entity.ScheduleBlock;
import br.com.barbearia_agendamentos_api.dto.scheduleblock.ScheduleBlockResponse;

public class ScheduleBlockMapper {

    private ScheduleBlockMapper() {}

    public static ScheduleBlockResponse toResponse(ScheduleBlock block) {
        return ScheduleBlockResponse.builder()
                .id(block.getId())
                .barberId(block.getBarber().getId())
                .data(block.getData())
                .horaInicio(block.getHoraInicio())
                .horaFim(block.getHoraFim())
                .motivo(block.getMotivo())
                .build();
    }

}
