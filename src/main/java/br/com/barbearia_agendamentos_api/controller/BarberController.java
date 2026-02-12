package br.com.barbearia_agendamentos_api.controller;

import br.com.barbearia_agendamentos_api.dto.barber.BarberRequest;
import br.com.barbearia_agendamentos_api.dto.barber.BarberResponse;
import br.com.barbearia_agendamentos_api.service.BarberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/barbers")
@RequiredArgsConstructor
public class BarberController {

    private final BarberService barberService;

    public ResponseEntity<BarberResponse> create(
            @Valid @RequestBody BarberRequest request
    ){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(barberService.create(request));
    }

}
