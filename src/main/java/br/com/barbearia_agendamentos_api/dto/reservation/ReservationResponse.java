package br.com.barbearia_agendamentos_api.dto.reservation;

import br.com.barbearia_agendamentos_api.domain.enums.ReservationStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Builder
public class ReservationResponse {

    private Long id;
    private Long clienteId;
    private Long barberId;
    private Long serviceId;
    private LocalDate data;
    private LocalTime horaInicio;
    private LocalTime horaFim;
    private ReservationStatus status;
    private LocalDateTime dataCriacao;
}
