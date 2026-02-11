package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.BarberService;
import br.com.barbearia_agendamentos_api.domain.exception.ResourceNotFoundException;
import br.com.barbearia_agendamentos_api.domain.mapper.ServiceMapper;
import br.com.barbearia_agendamentos_api.dto.service.ServiceRequest;
import br.com.barbearia_agendamentos_api.dto.service.ServiceResponse;
import br.com.barbearia_agendamentos_api.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceResponse create(ServiceRequest request){
        BarberService service = BarberService.builder()
                .nome(request.getNome())
                .descricao(request.getDescricao())
                .duracaoMinutos(request.getDuracaoMinutos())
                .preco(request.getPreco())
                .ativo(true)
                .build();

        serviceRepository.save(service);

        return ServiceMapper.toResponse(service);
    }

    public List<ServiceResponse> findAllActive() {
        return serviceRepository.findByAtivoTrue()
                .stream()
                .map(ServiceMapper::toResponse)
                .collect(Collectors.toList());
    }

}
