package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.User;
import br.com.barbearia_agendamentos_api.dto.auth.AuthResponse;
import br.com.barbearia_agendamentos_api.dto.auth.LoginRequest;
import br.com.barbearia_agendamentos_api.dto.auth.RegisterRequest;
import br.com.barbearia_agendamentos_api.repository.UserRepository;
import br.com.barbearia_agendamentos_api.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request){

        if (userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("Email já cadastrado");
        }

        User user = new User();
        user.setNome(request.getNome());
        user.setEmail(request.getEmail());
        user.setSenha(passwordEncoder.encode(request.getSenha()));
        user.setRole(request.getRole());
        user.setAtivo(true);
        user.setDataCriacao(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(savedUser);

        return new AuthResponse(token, savedUser.getRole().name(), savedUser.getId());
    }

    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getSenha()));

        User savedUser = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        String token = jwtService.generateToken(savedUser);
        return new AuthResponse(token, savedUser.getRole().name(), savedUser.getId());
    }
}
