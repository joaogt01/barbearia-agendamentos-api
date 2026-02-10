package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.ScheduleBlock;
import br.com.barbearia_agendamentos_api.repository.ScheduleBlockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class ScheduleBlockService {

    private final ScheduleBlockRepository scheduleBlockRepository;

    public ScheduleBlock create(ScheduleBlock block){
        return scheduleBlockRepository.save(block);
    }

    public boolean blockExist(Long barberId, LocalDate data, LocalTime inicio, LocalTime fim){
        return scheduleBlockRepository.findBarberIdAndData(barberId, data)
                .stream()
                .anyMatch(b ->
                        inicio.isBefore(b.getHoraFim()) &&
                        fim.isAfter(b.getHoraInicio())
                );
    }
}
