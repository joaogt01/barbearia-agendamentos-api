package br.com.barbearia_agendamentos_api.controller;

import br.com.barbearia_agendamentos_api.dto.scheduleblock.ScheduleBlockResponse;
import br.com.barbearia_agendamentos_api.service.ScheduleBlockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/schedule-blocks")
@RequiredArgsConstructor
public class ScheduleBlockController {

    private final ScheduleBlockService service;

    public ResponseEntity<List<ScheduleBlockResponse>> findBarberAndDate(@RequestParam Long barberId, @RequestParam LocalDate date){
        return ResponseEntity.ok(service.findByBarberAndDate(barberId, date));
    }
}
