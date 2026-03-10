package br.com.barbearia_agendamentos_api.domain.mapper;

import br.com.barbearia_agendamentos_api.domain.entity.Appointment;
import br.com.barbearia_agendamentos_api.dto.appointment.AppointmentResponse;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {

    public AppointmentResponse toResponse(Appointment entity) {

        return AppointmentResponse.builder()
                .id(entity.getId())
                .clientId(entity.getClient().getId())
                .clientName(entity.getClient().getNome())
                .barberId(entity.getBarber().getId())
                .barberName(entity.getBarber().getUser().getNome())
                .serviceId(entity.getService().getId())
                .serviceName(entity.getService().getNome())
                .preco(entity.getService().getPreco())
                .duracao(entity.getService().getDuracaoMinutos())
                .dateTime(entity.getDateTime())
                .status(entity.getStatus() != null ? entity.getStatus().name() : null)
                .build();
    }

}
