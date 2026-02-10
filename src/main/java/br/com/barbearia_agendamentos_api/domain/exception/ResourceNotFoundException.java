package br.com.barbearia_agendamentos_api.domain.exception;

public class ResourceNotFoundException extends BusinessException{

    public ResourceNotFoundException(String message){
        super(message);
    }
}
