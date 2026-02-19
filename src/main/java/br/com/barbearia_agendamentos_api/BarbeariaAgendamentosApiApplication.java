package br.com.barbearia_agendamentos_api;

import br.com.barbearia_agendamentos_api.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(JwtProperties.class)
@SpringBootApplication
public class BarbeariaAgendamentosApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BarbeariaAgendamentosApiApplication.class, args);
	}

}
