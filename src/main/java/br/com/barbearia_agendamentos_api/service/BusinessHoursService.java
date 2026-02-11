package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.BusinessHours;
import br.com.barbearia_agendamentos_api.domain.exception.BusinessException;
import br.com.barbearia_agendamentos_api.domain.mapper.BusinessHoursMapper;
import br.com.barbearia_agendamentos_api.dto.businesshours.BusinessHoursResponse;
import br.com.barbearia_agendamentos_api.repository.BusinessHoursRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BusinessHoursService {

    private final BusinessHoursRepository businessHoursRepository;

    public BusinessHoursResponse findByDay(DayOfWeek day) {
        BusinessHours bh = businessHoursRepository.findByDiaSemana(day)
                .orElseThrow(() -> new BusinessException("Horario nao configurado"));

        return BusinessHoursMapper.toResponse(bh);
    }
}
