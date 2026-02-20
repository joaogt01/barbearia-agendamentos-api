package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.ScheduleBlock;
import br.com.barbearia_agendamentos_api.domain.mapper.ScheduleBlockMapper;
import br.com.barbearia_agendamentos_api.dto.scheduleblock.ScheduleBlockResponse;
import br.com.barbearia_agendamentos_api.repository.ScheduleBlockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScheduleBlockService {

    private final ScheduleBlockRepository scheduleBlockRepository;

    public List<ScheduleBlockResponse> findByBarberAndDate(Long barberId, LocalDate date) {

        return scheduleBlockRepository.findByBarberIdAndData(barberId, date)
                .stream()
                .map(ScheduleBlockMapper::toResponse)
                .collect(Collectors.toList());
    }

}
