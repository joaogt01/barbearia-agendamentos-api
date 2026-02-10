package br.com.barbearia_agendamentos_api.domain.exception;

public class BusinessException extends  RuntimeException{

    public BusinessException(String message){
        super(message);
    }
}
