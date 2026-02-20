package br.com.barbearia_agendamentos_api.controller;

import br.com.barbearia_agendamentos_api.dto.barber.BarberRequest;
import br.com.barbearia_agendamentos_api.dto.barber.BarberResponse;
import br.com.barbearia_agendamentos_api.service.BarberBusinessService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/barbers")
@RequiredArgsConstructor
public class BarberController {

    private final BarberBusinessService barberBusinessService;

    @PostMapping
    public ResponseEntity<BarberResponse> create(
            @Valid @RequestBody BarberRequest request
    ){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(barberBusinessService.create(request));
    }

    @GetMapping
    public ResponseEntity<List<BarberResponse>> findAll() {
        return ResponseEntity.ok(barberBusinessService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BarberResponse> findById(@PathVariable Long id){
        return ResponseEntity.ok(barberBusinessService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BarberResponse> update(@PathVariable Long id, @RequestBody BarberRequest request){
        return ResponseEntity.ok(barberBusinessService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deactivate(@PathVariable Long id){
        barberBusinessService.deactivate(id);
        return ResponseEntity.noContent().build();
    }

}
