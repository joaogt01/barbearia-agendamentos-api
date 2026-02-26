package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.Appointment;
import br.com.barbearia_agendamentos_api.domain.entity.User;
import br.com.barbearia_agendamentos_api.domain.enums.AppointmentStatus;
import br.com.barbearia_agendamentos_api.domain.mapper.AppointmentMapper;
import br.com.barbearia_agendamentos_api.dto.appointment.AppointmentRequest;
import br.com.barbearia_agendamentos_api.dto.appointment.AppointmentResponse;
import br.com.barbearia_agendamentos_api.dto.appointment.UpdateStatusRequest;
import br.com.barbearia_agendamentos_api.repository.AppointmentRepository;
import br.com.barbearia_agendamentos_api.repository.BarberRepository;
import br.com.barbearia_agendamentos_api.repository.ServiceRepository;
import br.com.barbearia_agendamentos_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository repository;
    private final BarberRepository barberRepository;
    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;
    private final AppointmentMapper mapper;

    @Transactional
    public AppointmentResponse create(AppointmentRequest request) {
        // 1. Buscar Entidades
        var barber = barberRepository.findById(request.getBarberId())
                .orElseThrow(() -> new RuntimeException("Operativo (Barbeiro) não encontrado no sistema."));

        var service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new RuntimeException("Módulo de Serviço não identificado."));

        var client = getAuthenticatedUser();

        LocalDateTime appointmentTime = request.getTime();

        if (appointmentTime.isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Protocolo inválido: Não é possível agendar no passado.");
        }

        boolean isOccupied = repository.existsByBarberIdAndDateTimeAndStatusNot(
                barber.getId(),
                appointmentTime,
                AppointmentStatus.CANCELADO
        );

        if (isOccupied) {
            throw new RuntimeException("Conflito de agenda: Este barbeiro já possui um compromisso neste horário.");
        }

        Appointment appointment = Appointment.builder()
                .client(client)
                .barber(barber)
                .service(service)
                .dateTime(appointmentTime)
                .status(AppointmentStatus.PENDENTE)
                .build();

        return mapper.toResponse(repository.save(appointment));
    }

    public List<AppointmentResponse> getTodaysAppointments() {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);

        return repository.findByDateTimeBetween(startOfDay, endOfDay)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    public List<AppointmentResponse> getByBarber(Long barberId) {
        return repository.findByBarberIdOrderByDateTimeAsc(barberId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public AppointmentResponse updateStatus(Long id, UpdateStatusRequest request) {
        Appointment appointment = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado."));

        appointment.setStatus(AppointmentStatus.valueOf(request.getStatus()));
        return mapper.toResponse(repository.save(appointment));
    }

    public AppointmentResponse getById(Long id) {
        return repository.findById(id)
                .map(mapper::toResponse)
                .orElseThrow(() -> new RuntimeException("Agendamento inexistente."));
    }

    private User getAuthenticatedUser() {
        String email = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado."));
    }
}

