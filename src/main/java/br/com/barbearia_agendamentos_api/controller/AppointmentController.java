package br.com.barbearia_agendamentos_api.controller;

import br.com.barbearia_agendamentos_api.dto.appointment.AppointmentRequest;
import br.com.barbearia_agendamentos_api.dto.appointment.AppointmentResponse;
import br.com.barbearia_agendamentos_api.dto.appointment.UpdateStatusRequest;
import br.com.barbearia_agendamentos_api.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<AppointmentResponse> create(@RequestBody AppointmentRequest request) {
        return ResponseEntity.ok(appointmentService.create(request));
    }

    @GetMapping("/today")
    public ResponseEntity<List<AppointmentResponse>> getTodaysAppointments() {
        return ResponseEntity.ok(appointmentService.getTodaysAppointments());
    }

    @GetMapping("/barber/{barberId}")
    public ResponseEntity<List<AppointmentResponse>> getByBarber(@PathVariable Long barberId) {
        return ResponseEntity.ok(appointmentService.getByBarber(barberId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<AppointmentResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusRequest request
    ) {
        return ResponseEntity.ok(appointmentService.updateStatus(id, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getById(id));
    }
}
