package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.BarberService;
import br.com.barbearia_agendamentos_api.domain.mapper.ServiceMapper;
import br.com.barbearia_agendamentos_api.dto.service.ServiceRequest;
import br.com.barbearia_agendamentos_api.dto.service.ServiceResponse;
import br.com.barbearia_agendamentos_api.repository.ServiceRepository;
import br.com.barbearia_agendamentos_api.domain.mapper.ServiceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository serviceRepository;
    private final ServiceMapper serviceMapper;

    public ServiceResponse create(ServiceRequest request){
        BarberService service = BarberService.builder()
                .nome(request.getNome())
                .descricao(request.getDescricao())
                .duracaoMinutos(request.getDuracaoMinutos())
                .preco(request.getPreco())
                .ativo(true)
                .build();

        BarberService saved = serviceRepository.save(service);

        return ServiceMapper.toResponse(saved);
    }

    public List<ServiceResponse> findAllActive() {
        return serviceRepository.findByAtivoTrue()
                .stream()
                .map(ServiceMapper::toResponse)
                .collect(Collectors.toList());
    }

    public ServiceResponse update(Long id, ServiceRequest request){
        BarberService service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        service.setNome(request.getNome());
        service.setPreco(request.getPreco());
        service.setDuracaoMinutos(request.getDuracaoMinutos());

        return ServiceMapper.toResponse(serviceRepository.save(service));

    }

    public void delete(Long id) {
        BarberService service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        service.setAtivo(false);
        serviceRepository.save(service);
    }

}
