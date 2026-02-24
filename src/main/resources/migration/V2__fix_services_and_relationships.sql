DROP TABLE IF EXISTS barber_services CASCADE;

CREATE TABLE services (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    duracao_minutos INTEGER NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE rel_barber_services (
    barber_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL,
    PRIMARY KEY (barber_id, service_id),
    CONSTRAINT fk_barber FOREIGN KEY (barber_id) REFERENCES barbers(id) ON DELETE CASCADE,
    CONSTRAINT fk_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE