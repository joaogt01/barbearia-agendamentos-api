package br.com.barbearia_agendamentos_api.dto.appointment;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppointmentResponse {

    private Long id;
    private String barberName;
    private String clientName;
    private String serviceName;
    private String time;
    private String status;

}
