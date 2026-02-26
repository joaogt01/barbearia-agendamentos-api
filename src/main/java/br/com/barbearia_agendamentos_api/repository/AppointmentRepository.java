package br.com.barbearia_agendamentos_api.repository;

import br.com.barbearia_agendamentos_api.domain.entity.Appointment;
import br.com.barbearia_agendamentos_api.domain.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    boolean existsByBarberIdAndDateTimeAndStatusNot(Long barberId, LocalDateTime dateTime, AppointmentStatus status);

    List<Appointment> findByDateTimeBetween(LocalDateTime start, LocalDateTime end);

    List<Appointment> findByBarberIdOrderByDateTimeAsc(Long barberId);

}
