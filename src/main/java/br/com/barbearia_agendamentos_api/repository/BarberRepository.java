package br.com.barbearia_agendamentos_api.repository;

import br.com.barbearia_agendamentos_api.domain.entity.Barber;
import br.com.barbearia_agendamentos_api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BarberRepository extends JpaRepository<Barber, Long> {

    boolean existsByUser(User user);

    Optional<Barber> findByUserId(Long userId);


}
