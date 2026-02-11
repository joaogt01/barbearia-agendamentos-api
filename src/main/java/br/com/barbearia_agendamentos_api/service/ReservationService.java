package br.com.barbearia_agendamentos_api.service;


import br.com.barbearia_agendamentos_api.domain.entity.Barber;
import br.com.barbearia_agendamentos_api.domain.entity.BarberService;
import br.com.barbearia_agendamentos_api.domain.entity.Reservation;
import br.com.barbearia_agendamentos_api.domain.entity.User;
import br.com.barbearia_agendamentos_api.domain.exception.ResourceNotFoundException;
import br.com.barbearia_agendamentos_api.domain.exception.ScheduleConflictException;
import br.com.barbearia_agendamentos_api.domain.mapper.ReservationMapper;
import br.com.barbearia_agendamentos_api.dto.reservation.ReservationRequest;
import br.com.barbearia_agendamentos_api.dto.reservation.ReservationResponse;
import br.com.barbearia_agendamentos_api.repository.BarberRepository;
import br.com.barbearia_agendamentos_api.repository.ReservationRepository;
import br.com.barbearia_agendamentos_api.repository.ServiceRepository;
import br.com.barbearia_agendamentos_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final BarberRepository barberRepository;
    private final ServiceRepository serviceRepository;

    public ReservationResponse create(ReservationRequest request){

        User cliente = userRepository.findById(request.getClienteId())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado"));

        Barber barber = barberRepository.findById(request.getBarberId())
                .orElseThrow(() -> new ResourceNotFoundException("Barbeiro não encontrado"));

        BarberService service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(()-> new ResourceNotFoundException("Serviço não encontrado"));

        LocalTime horaFim = request.getHoraInicio()
                .plusMinutes(service.getDuracaoMinutos());

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
                .build();

        reservationRepository.save(reservation);

        return ReservationMapper.toResponse(reservation);
    }

}
