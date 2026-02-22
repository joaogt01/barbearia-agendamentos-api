package br.com.barbearia_agendamentos_api.controller;

import br.com.barbearia_agendamentos_api.domain.enums.Role;
import br.com.barbearia_agendamentos_api.dto.user.UserRequest;
import br.com.barbearia_agendamentos_api.dto.user.UserResponse;
import br.com.barbearia_agendamentos_api.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponse> create(
            @Valid @RequestBody UserRequest request
    ){
        UserResponse response = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> findById(@PathVariable Long id){
        return ResponseEntity.ok(userService.findUserById(id));
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> findAll(){
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/available-users")
    public ResponseEntity<List<UserResponse>> getAvailableBarbers() {
        return ResponseEntity.ok(userService.findAllByRole(Role.CLIENTE));}

    @PatchMapping("/{id}/role")
    public ResponseEntity<Void> updateRole(@PathVariable Long id, @RequestBody String role) {
        userService.updateRole(id, Role.valueOf(role));
        return ResponseEntity.ok().build();}

    @GetMapping("/role/{role}")
    public ResponseEntity<List<UserResponse>> findByRole(@PathVariable Role role) {
        return ResponseEntity.ok(userService.findAllByRole(role));
    }

}
