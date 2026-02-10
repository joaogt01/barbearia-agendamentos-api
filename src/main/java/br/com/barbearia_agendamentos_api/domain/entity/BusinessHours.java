package br.com.barbearia_agendamentos_api.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Entity
@Table(name = "business_hours")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BusinessHours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DayOfWeek diaSemana;

    @Column(nullable = false)
    private LocalTime horaAbertura;

    @Column(nullable = false)
    private LocalTime horaFechamento;
}
