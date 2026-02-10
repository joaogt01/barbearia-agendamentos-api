package br.com.barbearia_agendamentos_api.service;


import br.com.barbearia_agendamentos_api.domain.entity.Reservation;
import br.com.barbearia_agendamentos_api.domain.exception.BusinessException;
import br.com.barbearia_agendamentos_api.domain.exception.ScheduleConflictException;
import br.com.barbearia_agendamentos_api.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserService userService;
    private final BarberService barberService;
    private final ServiceService serviceService;
    private final BusinessHoursService businessHoursService;
    private final ScheduleBlockService scheduleBlockService;

    public Reservation create(Reservation reservation){

        userService.findUserById(reservation.getCliente().getId());
        barberService.findBarberById(reservation.getBarber().getId());
        serviceService.findServiceById(reservation.getService().getId());

        if (!businessHoursService.isOpen(
                reservation.getData().atTime(reservation.getHoraInicio()))){
            throw new BusinessException("Barbearia fechada no horario selecionado");
        }

        if (scheduleBlockService.blockExist(
                reservation.getBarber().getId(),
                reservation.getData(),
                reservation.getHoraInicio(),
                reservation.getHoraFim())) {
            throw new ScheduleConflictException("Horário indisponivel para este barbeiro");
        }

        return reservationRepository.save(reservation);
    }

}
