package br.com.barbearia_agendamentos_api.repository;

import br.com.barbearia_agendamentos_api.domain.entity.Barber;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BarberRepository extends JpaRepository<Barber, Long> {

    Optional<Barber> findByUserId(Long userId);

}
