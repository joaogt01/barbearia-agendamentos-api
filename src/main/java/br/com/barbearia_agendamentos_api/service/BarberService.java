package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.Barber;
import br.com.barbearia_agendamentos_api.domain.entity.User;
import br.com.barbearia_agendamentos_api.domain.exception.ResourceNotFoundException;
import br.com.barbearia_agendamentos_api.domain.mapper.BarberMapper;
import br.com.barbearia_agendamentos_api.dto.barber.BarberRequest;
import br.com.barbearia_agendamentos_api.dto.barber.BarberResponse;
import br.com.barbearia_agendamentos_api.repository.BarberRepository;
import br.com.barbearia_agendamentos_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BarberService {

    private final BarberRepository barberRepository;
    private final UserRepository userRepository;

    public BarberResponse create(BarberRequest request){
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(()-> new ResourceNotFoundException("Usuario não encontrado."));

        Barber barber = Barber.builder()
                .user(user)
                .ativo(true)
                .build();

        barberRepository.save(barber);

        return BarberMapper.toResponse(barber);

    }

}
