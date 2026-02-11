package br.com.barbearia_agendamentos_api.domain.mapper;

import br.com.barbearia_agendamentos_api.domain.entity.Reservation;
import br.com.barbearia_agendamentos_api.dto.reservation.ReservationResponse;

public class ReservationMapper {

    private ReservationMapper(){}

    public static ReservationResponse toResponse(Reservation reservation){
        return ReservationResponse.builder()
                .id(reservation.getId())
                .clienteId(reservation.getCliente().getId())
                .barberId(reservation.getBarber().getId())
                .serviceId(reservation.getService().getId())
                .data(reservation.getData())
                .horaInicio(reservation.getHoraInicio())
                .horaFim(reservation.getHoraFim())
                .status(reservation.getStatus())
                .dataCriacao(reservation.getDataCriacao())
                .build();
    }

}
