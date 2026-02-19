package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.User;
import br.com.barbearia_agendamentos_api.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public String login(String email, String password) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        User user = (User) authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password)).getPrincipal();

        return jwtService.generateToken(user);
    }
}
