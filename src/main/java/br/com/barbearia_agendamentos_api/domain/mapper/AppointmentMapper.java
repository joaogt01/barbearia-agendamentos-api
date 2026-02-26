package br.com.barbearia_agendamentos_api.domain.mapper;

import br.com.barbearia_agendamentos_api.domain.entity.Appointment;
import br.com.barbearia_agendamentos_api.dto.appointment.AppointmentResponse;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {

    public AppointmentResponse toResponse(Appointment entity) {

        return AppointmentResponse.builder()
                .id(entity.getId())
                .clientName(entity.getClient().getNome())
                .barberName(entity.getBarber().getUser().getNome())
                .serviceName(entity.getService().getNome())
                .preco(entity.getService().getPreco())
                .dateTime(entity.getDateTime().toString())
                .status(entity.getStatus().toString())
                .build();
    }

}
