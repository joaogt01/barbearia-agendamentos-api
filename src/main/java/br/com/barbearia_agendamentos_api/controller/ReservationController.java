package br.com.barbearia_agendamentos_api.controller;

import br.com.barbearia_agendamentos_api.dto.reservation.ReservationRequest;
import br.com.barbearia_agendamentos_api.dto.reservation.ReservationResponse;
import br.com.barbearia_agendamentos_api.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<ReservationResponse> create(@Valid @RequestBody ReservationRequest request){
        ReservationResponse response = reservationService.create(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<ReservationResponse>> findByClientId(@PathVariable Long clienteId){
        return ResponseEntity.ok(reservationService.findByClientId(clienteId));
    }

    @GetMapping("/barber/{barberId}")
    public ResponseEntity<List<ReservationResponse>> barberScheduleList(
            @PathVariable Long barberId,
            @RequestParam LocalDate data
            ){
        return ResponseEntity.ok(reservationService.barberScheduleList(barberId,data));
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<Void> cancel(@PathVariable Long id){
        reservationService.cancel(id);
        return ResponseEntity.noContent().build();
    }
}
