package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.BusinessHours;
import br.com.barbearia_agendamentos_api.repository.BusinessHoursRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BusinessHoursService {

    private final BusinessHoursRepository businessHoursRepository;

    public BusinessHours save(BusinessHours hours){
        return businessHoursRepository.save(hours);
    }

    public boolean isOpen(LocalDateTime dateTime){
        return businessHoursRepository.findByDiaSemana(dateTime.getDayOfWeek())
                .map(h ->
                        !dateTime.toLocalTime().isBefore(h.getHoraAbertura()) &&
                        !dateTime.toLocalTime().isAfter(h.getHoraFechamento())
                )
                .orElse(false);
    }
}
