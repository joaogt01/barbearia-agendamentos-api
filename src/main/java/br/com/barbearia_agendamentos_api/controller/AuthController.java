package br.com.barbearia_agendamentos_api.controller;

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

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
        String token = authService.login(request.getEmail(), request.getPassword());

        return ResponseEntity.ok(new LoginResponse(token));
    }

    @Getter
    @Setter
    public static class LoginRequest{
        private String email;
        private String password;
    }

    @AllArgsConstructor
    @Getter
    public static class LoginResponse{
        private String token;
    }
}
