package br.com.barbearia_agendamentos_api.controller;

import br.com.barbearia_agendamentos_api.dto.auth.AuthResponse;
import br.com.barbearia_agendamentos_api.dto.auth.LoginRequest;
import br.com.barbearia_agendamentos_api.dto.auth.RegisterRequest;
import br.com.barbearia_agendamentos_api.service.AuthService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.login(request));
    }
}
