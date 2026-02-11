package br.com.barbearia_agendamentos_api.dto.reservation;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class ReservationRequest {

    @NotNull
    private Long clienteId;

    @NotNull
    private Long barberId;

    @NotNull
    private Long serviceId;

    @NotNull
    private LocalDate data;

    @NotNull
    private LocalTime horaInicio;
}
