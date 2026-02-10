package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.BarberService;
import br.com.barbearia_agendamentos_api.domain.exception.ResourceNotFoundException;
import br.com.barbearia_agendamentos_api.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public BarberService create(BarberService service){
        service.setAtivo(true);
        return serviceRepository.save(service);
    }

    public List<BarberService> activeList(){
        return serviceRepository.findByAtivoTrue();
    }

    public Service findServiceById(Long id){
        return (Service) serviceRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Serviço não encontrado"));
    }
}
