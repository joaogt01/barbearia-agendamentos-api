package br.com.barbearia_agendamentos_api.repository;

import br.com.barbearia_agendamentos_api.domain.entity.Reservation;
import br.com.barbearia_agendamentos_api.domain.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByBarberIdAndDataAndStatus(
            Long barberId,
            LocalDate data,
            ReservationStatus status
    );

    boolean existsByBarberIdAndDataAndHoraInicioLessThanAndHoraFimGreaterThan(
            Long barberId,
            LocalDate data,
            LocalTime horaFim,
            LocalTime horaInicio
    );

    List<Reservation> findByClientId(Long clientId);
}
