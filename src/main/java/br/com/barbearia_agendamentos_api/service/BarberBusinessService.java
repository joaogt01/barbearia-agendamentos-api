package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.Barber;
import br.com.barbearia_agendamentos_api.domain.entity.BarberService;
import br.com.barbearia_agendamentos_api.domain.entity.User;
import br.com.barbearia_agendamentos_api.domain.exception.BusinessException;
import br.com.barbearia_agendamentos_api.domain.exception.ResourceNotFoundException;
import br.com.barbearia_agendamentos_api.domain.mapper.BarberMapper;
import br.com.barbearia_agendamentos_api.dto.barber.BarberRequest;
import br.com.barbearia_agendamentos_api.dto.barber.BarberResponse;
import br.com.barbearia_agendamentos_api.repository.BarberRepository;
import br.com.barbearia_agendamentos_api.repository.ServiceRepository;
import br.com.barbearia_agendamentos_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BarberBusinessService {

    private final BarberRepository barberRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;
    private final BarberMapper barberMapper;

    public BarberResponse create(BarberRequest request){
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        if (barberRepository.existsByUser(user)) {
            throw new BusinessException("Usuário já é um barbeiro");
        }

        List<BarberService> services = serviceRepository.findAllById(request.getServiceIds());

        Barber barber = Barber.builder()
                .user(user)
                .ativo(true)
                .services(services)
                .build();

        Barber saved = barberRepository.save(barber);

        return barberMapper.toResponse(saved);
    }

    public List<BarberResponse> findAll() {

        return barberRepository.findAll()
                .stream()
                .filter(Barber::getAtivo)
                .map(barberMapper::toResponse)
                .toList();
    }

    public BarberResponse findById(Long id) {

        Barber barber = barberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Barbeiro não encontrado"));

        return barberMapper.toResponse(barber);
    }

    public BarberResponse update(Long id, BarberRequest request) {

        Barber barber = barberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Barbeiro não encontrado"));

        if (request.getServiceIds() != null) {
            List<BarberService> services = serviceRepository.findAllById(request.getServiceIds());
            barber.setServices(services);
        }

        if (request.getAtivo() != null) {
            barber.setAtivo(request.getAtivo());
        }

        Barber updated = barberRepository.save(barber);

        return barberMapper.toResponse(updated);
    }

    public void deactivate(Long id) {

        Barber barber = barberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Barbeiro não encontrado"));

        barber.setAtivo(false);

        barberRepository.save(barber);
    }

}

