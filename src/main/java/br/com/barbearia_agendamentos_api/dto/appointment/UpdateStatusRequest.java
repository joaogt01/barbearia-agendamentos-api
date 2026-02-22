package br.com.barbearia_agendamentos_api.dto.appointment;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateStatusRequest {

    private String status;

}
