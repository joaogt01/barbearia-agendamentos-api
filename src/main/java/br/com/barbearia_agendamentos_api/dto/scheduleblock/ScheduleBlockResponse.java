package br.com.barbearia_agendamentos_api.dto.scheduleblock;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
public class ScheduleBlockResponse {

    private Long id;
    private Long barberId;
    private LocalDate data;
    private LocalTime horaInicio;
    private LocalTime horaFim;
    private String motivo;

}
