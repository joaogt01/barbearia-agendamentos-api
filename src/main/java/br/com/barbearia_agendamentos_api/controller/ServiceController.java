package br.com.barbearia_agendamentos_api.controller;

import br.com.barbearia_agendamentos_api.dto.service.ServiceRequest;
import br.com.barbearia_agendamentos_api.dto.service.ServiceResponse;
import br.com.barbearia_agendamentos_api.service.ServiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {

    private final ServiceService serviceService;

    @PostMapping
    public ResponseEntity<ServiceResponse> create(@Valid @RequestBody ServiceRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(serviceService.create(request));
    }

    @GetMapping
    public ResponseEntity<List<ServiceResponse>> findAllActive(){
        List<ServiceResponse> services = serviceService.findAllActive();
        return ResponseEntity.ok(services);
    }


    @PutMapping("/{id}")
    public ResponseEntity<ServiceResponse> update(@PathVariable Long id, @Valid @RequestBody ServiceRequest request){
        return ResponseEntity.ok(serviceService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        serviceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
