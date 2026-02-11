package br.com.barbearia_agendamentos_api.service;

import br.com.barbearia_agendamentos_api.domain.entity.User;
import br.com.barbearia_agendamentos_api.domain.exception.ResourceNotFoundException;
import br.com.barbearia_agendamentos_api.domain.mapper.UserMapper;
import br.com.barbearia_agendamentos_api.dto.user.UserRequest;
import br.com.barbearia_agendamentos_api.dto.user.UserResponse;
import br.com.barbearia_agendamentos_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse create(UserRequest request){
        if (userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new IllegalArgumentException("Email já cadastrado.");
        }

        User user = User.builder()
                .nome(request.getNome())
                .email(request.getEmail())
                .senha(request.getSenha())
                .role(request.getRole())
                .ativo(true)
                .build();

        userRepository.save(user);

        return UserMapper.toResponse(user);
    }

    public UserResponse findUserById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Usuário não encontrado"));

        return UserMapper.toResponse(user);
    }

    public UserResponse findUserByEmail(String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new ResourceNotFoundException("Usuário não encontrado"));

        return UserMapper.toResponse(user);
    }

    public List<UserResponse> findAll() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::toResponse)
                .collect(Collectors.toList());
    }
}
