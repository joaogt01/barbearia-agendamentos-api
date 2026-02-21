package br.com.barbearia_agendamentos_api.service;


import br.com.barbearia_agendamentos_api.domain.entity.*;
import br.com.barbearia_agendamentos_api.domain.enums.ReservationStatus;
import br.com.barbearia_agendamentos_api.domain.exception.BusinessException;
import br.com.barbearia_agendamentos_api.domain.exception.ResourceNotFoundException;
import br.com.barbearia_agendamentos_api.domain.exception.ScheduleConflictException;
import br.com.barbearia_agendamentos_api.domain.mapper.ReservationMapper;
import br.com.barbearia_agendamentos_api.dto.reservation.ReservationRequest;
import br.com.barbearia_agendamentos_api.dto.reservation.ReservationResponse;
import br.com.barbearia_agendamentos_api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final BarberRepository barberRepository;
    private final ServiceRepository serviceRepository;
    private final BusinessHoursRepository businessHoursRepository;
    private final ScheduleBlockRepository scheduleBlockRepository;

    public ReservationResponse create(ReservationRequest request){

        User cliente = userRepository.findById(request.getClienteId())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado"));

        Barber barber = barberRepository.findById(request.getBarberId())
                .orElseThrow(() -> new ResourceNotFoundException("Barbeiro não encontrado"));

        BarberService service = serviceRepository.findById(request.getServiceId())
                .filter(BarberService::getAtivo)
                .orElseThrow(()-> new ResourceNotFoundException("Serviço não encontrado"));

        LocalTime horaFim = request.getHoraInicio()
                .plusMinutes(service.getDuracaoMinutos());

        DayOfWeek diaSemana = request.getData().getDayOfWeek();

        BusinessHours businessHours = businessHoursRepository
                .findByDiaSemana(diaSemana)
                .orElseThrow(() -> new RuntimeException("Barbearia fechada nesse dia"));

        if (request.getHoraInicio().isBefore(businessHours.getHoraAbertura()) || horaFim.isAfter(businessHours.getHoraFechamento())){
            throw new RuntimeException("Fora do horário de funcionamento");
        }

        List<ScheduleBlock> blocks = scheduleBlockRepository
                .findByBarberIdAndData(barber.getId(), request.getData());

        boolean bloqueado = blocks.stream().anyMatch(block -> request.getHoraInicio().isBefore(block.getHoraFim()) &&
                horaFim.isAfter(block.getHoraInicio()));

        if (bloqueado){throw new RuntimeException("horario bloqueado para esse barbeiro"); }


        boolean conflito = reservationRepository
                .existsByBarberIdAndDataAndHoraInicioLessThanAndHoraFimGreaterThan(
                        barber.getId(),
                        request.getData(),
                        horaFim,
                        request.getHoraInicio()
                );

        if (conflito){
            throw new ScheduleConflictException("Horario ja reservado");
        }

        Reservation reservation = Reservation.builder()
                .cliente(cliente)
                .barber(barber)
                .service(service)
                .data(request.getData())
                .horaInicio(request.getHoraInicio())
                .horaFim(horaFim)
                .status(ReservationStatus.AGENDADA)
                .dataCriacao(LocalDateTime.now())
                .build();

        reservationRepository.save(reservation);

        return ReservationMapper.toResponse(reservation);
    }

    public List<ReservationResponse> findByClientId(Long clienteId) {
        return reservationRepository.findByClienteId(clienteId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<ReservationResponse> barberScheduleList(Long barberId, LocalDate data) {
        return reservationRepository
                .findByBarberIdAndDataAndStatus(barberId, data, ReservationStatus.AGENDADA)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public void cancel(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reserva não encontrada"));

        if (reservation.getStatus() != ReservationStatus.AGENDADA) {
            throw new BusinessException("Só é possível cancelar reservas agendadas");
        }

        reservation.setStatus(ReservationStatus.CANCELADA);
        reservationRepository.save(reservation);
    }

    private ReservationResponse toResponse(Reservation reservation) {
        return ReservationResponse.builder()
                .id(reservation.getId())
                .clienteId(reservation.getCliente().getId())
                .barberId(reservation.getBarber().getId())
                .serviceId(reservation.getService().getId())
                .data(reservation.getData())
                .horaInicio(reservation.getHoraInicio())
                .horaFim(reservation.getHoraFim())
                .status(reservation.getStatus())
                .dataCriacao(reservation.getDataCriacao())
                .build();
    }


}
