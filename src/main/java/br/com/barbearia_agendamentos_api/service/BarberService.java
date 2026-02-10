package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.Barber;
import br.com.barbearia_agendamentos_api.domain.exception.ResourceNotFoundException;
import br.com.barbearia_agendamentos_api.repository.BarberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BarberService {

    private final BarberRepository barberRepository;
    private final UserService userService;

    public Barber create(Barber barber){
        userService.findUserById(barber.getUser().getId());
        barber.setAtivo(true);
        return barberRepository.save(barber);
    }

    public Barber findBarberById(Long id){
        return barberRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Barbeiro não encontrado"));
    }
}
