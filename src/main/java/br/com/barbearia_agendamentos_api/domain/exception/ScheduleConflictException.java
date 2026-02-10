package br.com.barbearia_agendamentos_api.domain.exception;

public class ScheduleConflictException extends BusinessException{

    public ScheduleConflictException(String message){
        super(message);
    }
}
