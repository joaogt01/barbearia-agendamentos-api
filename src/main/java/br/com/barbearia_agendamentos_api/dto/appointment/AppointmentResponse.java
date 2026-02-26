package br.com.barbearia_agendamentos_api.dto.appointment;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppointmentResponse {

    private Long id;
    private String clientName;
    private String barberName;
    private String serviceName;
    private BigDecimal preco;
    private String dateTime;
    private String status;

}
