package br.com.barbearia_agendamentos_api.dto.businesshours;

import lombok.Builder;
import lombok.Getter;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Getter
@Builder
public class BusinessHoursResponse {

    private Long id;
    private DayOfWeek diaSemana;
    private LocalTime horaAbertura;
    private LocalTime horaFechamento;
}
