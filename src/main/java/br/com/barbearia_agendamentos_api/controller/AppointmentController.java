package br.com.barbearia_agendamentos_api.controller;

import br.com.barbearia_agendamentos_api.domain.entity.User;
import br.com.barbearia_agendamentos_api.dto.appointment.AppointmentRequest;
import br.com.barbearia_agendamentos_api.dto.appointment.AppointmentResponse;
import br.com.barbearia_agendamentos_api.dto.appointment.UpdateStatusRequest;
import br.com.barbearia_agendamentos_api.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping("/my-month")
    public ResponseEntity<List<AppointmentResponse>> getMyMonth(
            @AuthenticationPrincipal UserDetails userDetails) {

        // Buscamos o email do barbeiro logado através do Token JWT
        String email = userDetails.getUsername();
        List<AppointmentResponse> appointments = appointmentService.findMonthlyAppointmentsByBarber(email);

        return ResponseEntity.ok(appointments);
    }

    @PostMapping
    public ResponseEntity<AppointmentResponse> create(@RequestBody AppointmentRequest request, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(appointmentService.create(request, user));
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
