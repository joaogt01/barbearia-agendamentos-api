package br.com.barbearia_agendamentos_api.dto.appointment;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppointmentRequest {
    private Long barberId;
    private Long clientId;
    private Long serviceId;
    private String time;
}
