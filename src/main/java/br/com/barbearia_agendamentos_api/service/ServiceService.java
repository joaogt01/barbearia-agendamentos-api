package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.Service;
import br.com.barbearia_agendamentos_api.domain.exception.ResourceNotFoundException;
import br.com.barbearia_agendamentos_api.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public Service create(Service service){
        service.setAtivo(true);
        return serviceRepository.save(service);
    }

    public List<Service> activeList(){
        return serviceRepository.findByAtivoTrue();
    }

    public Service findServiceById(Long id){
        return serviceRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Serviço não encontrado"));
    }
}
