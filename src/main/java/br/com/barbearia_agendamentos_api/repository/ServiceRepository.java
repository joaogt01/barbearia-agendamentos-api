package br.com.barbearia_agendamentos_api.repository;

import br.com.barbearia_agendamentos_api.domain.entity.BarberService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<BarberService, Long> {

    List<BarberService> findByAtivoTrue();

}
