package br.com.barbearia_agendamentos_api.repository;

import br.com.barbearia_agendamentos_api.domain.entity.Appointment;
import br.com.barbearia_agendamentos_api.domain.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    boolean existsByBarberIdAndDateTimeAndStatusNot(Long barberId, LocalDateTime dateTime, AppointmentStatus status);

    List<Appointment> findByDateTimeBetween(LocalDateTime start, LocalDateTime end);

    List<Appointment> findByBarberIdOrderByDateTimeAsc(Long barberId);

    @Query("SELECT a FROM Appointment a WHERE a.barber.user.email = :email " +
            "AND MONTH(a.dateTime) = MONTH(CURRENT_DATE) " +
            "AND YEAR(a.dateTime) = YEAR(CURRENT_DATE) " +
            "ORDER BY a.dateTime DESC")
    List<Appointment> findMonthlyByBarberEmail(@Param("email") String email);

    @Query("SELECT a FROM Appointment a WHERE a.barber.user.email = :email " +
            "AND CAST(a.dateTime AS date) = CURRENT_DATE " +
            "ORDER BY a.dateTime ASC")
    List<Appointment> findTodayByBarberEmail(@Param("email") String email);
}
