package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.Appointment;
import br.com.barbearia_agendamentos_api.domain.entity.User;
import br.com.barbearia_agendamentos_api.domain.enums.AppointmentStatus;
import br.com.barbearia_agendamentos_api.domain.mapper.AppointmentMapper;
import br.com.barbearia_agendamentos_api.dto.appointment.AppointmentRequest;
import br.com.barbearia_agendamentos_api.dto.appointment.AppointmentResponse;
import br.com.barbearia_agendamentos_api.dto.appointment.UpdateStatusRequest;
import br.com.barbearia_agendamentos_api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository repository;
    private final BarberRepository barberRepository;
    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;
    private final BusinessHoursRepository businessHoursRepository;
    private final ScheduleBlockRepository scheduleBlockRepository;
    private final AppointmentMapper mapper;

    @Transactional
    public AppointmentResponse create(AppointmentRequest request, User user) {
        var barber = barberRepository.findById(request.getBarberId())
                .orElseThrow(() -> new RuntimeException("Barbeiro não encontrado."));

        var service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new RuntimeException("Serviço não identificado."));

        var client = getAuthenticatedUser();

        LocalDateTime start = request.getTime();
        LocalDateTime end = start.plusMinutes(service.getDuracaoMinutos());

        var businessHours = businessHoursRepository.findByDiaSemana(start.getDayOfWeek())
                .orElseThrow(() -> new RuntimeException("Barbearia fechada neste dia."));

        if (start.toLocalTime().isBefore(businessHours.getHoraAbertura()) ||
                end.toLocalTime().isAfter(businessHours.getHoraFechamento())) {
            throw new RuntimeException("Fora do horário de funcionamento da barbearia.");
        }

        boolean isBlocked = scheduleBlockRepository.findByBarberIdAndData(barber.getId(), start.toLocalDate())
                .stream()
                .anyMatch(block -> start.toLocalTime().isBefore(block.getHoraFim()) &&
                        end.toLocalTime().isAfter(block.getHoraInicio()));

        if (isBlocked) {
            throw new RuntimeException("O barbeiro possui um bloqueio de agenda neste horário.");
        }


        boolean hasConflict = repository.existsConflict(barber.getId(), start, end);
        if (hasConflict) {
            throw new RuntimeException("Conflito de agenda: Este barbeiro já possui um compromisso neste intervalo.");
        }

        Appointment appointment = Appointment.builder()
                .client(client)
                .barber(barber)
                .service(service)
                .dateTime(start)
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

    @Transactional(readOnly = true)
    public List<AppointmentResponse> findMonthlyAppointmentsByBarber(String email) {
        return repository.findMonthlyByBarberEmail(email)
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AppointmentResponse> findTodayAppointmentsByBarber(String email) {
        return repository.findTodayByBarberEmail(email)
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    public AppointmentResponse findById(Long id) {
        Appointment entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));
        return mapper.toResponse(entity);
    }
}

