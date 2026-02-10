package br.com.barbearia_agendamentos_api.repository;

import br.com.barbearia_agendamentos_api.domain.entity.BusinessHours;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.DayOfWeek;
import java.util.Optional;

public interface BusinessHoursRepository extends JpaRepository<BusinessHours, Long> {

    Optional<BusinessHours> findByDiaSemana(DayOfWeek diaSemana);

}
