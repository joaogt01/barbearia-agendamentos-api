package br.com.barbearia_agendamentos_api.controller;

import br.com.barbearia_agendamentos_api.dto.service.ServiceRequest;
import br.com.barbearia_agendamentos_api.dto.service.ServiceResponse;
import br.com.barbearia_agendamentos_api.service.ServiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    public ResponseEntity<List<ServiceResponse>> findAllActive(){
        return ResponseEntity.ok(serviceService.findAllActive());
    }
}
