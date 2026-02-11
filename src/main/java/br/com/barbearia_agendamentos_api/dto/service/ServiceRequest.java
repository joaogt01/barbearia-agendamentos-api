package br.com.barbearia_agendamentos_api.dto.service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ServiceRequest {

    @NotBlank
    private String nome;

    private String descricao;

    @NotNull
    private Integer duracaoMinutos;

    @NotNull
    private BigDecimal preco;
}
