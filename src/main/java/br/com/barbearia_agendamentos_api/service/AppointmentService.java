package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.dto.appointment.AppointmentRequest;
import br.com.barbearia_agendamentos_api.dto.appointment.AppointmentResponse;
import br.com.barbearia_agendamentos_api.dto.appointment.UpdateStatusRequest;

import java.util.List;

public class AppointmentService {

    public AppointmentResponse create(AppointmentRequest request) {
        return null;
    }

    public List<AppointmentResponse> getTodaysAppointments() {
        return List.of();
    }

    public List<AppointmentResponse> getByBarber(Long barberId) {
        return List.of();
    }

    public AppointmentResponse updateStatus(Long id, UpdateStatusRequest request) {
        return null;
    }

    public AppointmentResponse getById(Long id) {
        return null;
    }
}
