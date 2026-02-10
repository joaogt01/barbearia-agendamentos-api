package br.com.barbearia_agendamentos_api.exception;

public class BusinessException extends  RuntimeException{

    public BusinessException(String message){
        super(message);
    }
}
