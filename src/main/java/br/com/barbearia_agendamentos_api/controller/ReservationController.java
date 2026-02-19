package br.com.barbearia_agendamentos_api.controller;

import br.com.barbearia_agendamentos_api.dto.reservation.ReservationRequest;
import br.com.barbearia_agendamentos_api.dto.reservation.ReservationResponse;
import br.com.barbearia_agendamentos_api.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    public ResponseEntity<ReservationResponse> create(@Valid @RequestBody ReservationRequest request){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(reservationService.create(request));
    }
}
