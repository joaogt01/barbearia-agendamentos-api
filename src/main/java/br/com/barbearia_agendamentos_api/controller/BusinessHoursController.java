package br.com.barbearia_agendamentos_api.controller;

import br.com.barbearia_agendamentos_api.dto.businesshours.BusinessHoursResponse;
import br.com.barbearia_agendamentos_api.service.BusinessHoursService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.DayOfWeek;

@RestController
@RequestMapping("/api/business-hours")
@RequiredArgsConstructor
public class BusinessHoursController {

    private final BusinessHoursService service;

    @GetMapping("/{day}")
    public ResponseEntity<BusinessHoursResponse> findByDay(@PathVariable DayOfWeek day){
        return ResponseEntity.ok(service.findByDay(day));
    }
}
