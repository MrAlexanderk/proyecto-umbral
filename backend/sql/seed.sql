INSERT INTO types (id, label) VALUES
  (1,'Dolls'),(2,'Mirrors'),(3,'Books'),(4,'Tech'),
  (5,'Relics'),(6,'Lockets'),(7,'Garments'),(8,'Others')
ON CONFLICT (id) DO NOTHING;

INSERT INTO statuses (id, name) VALUES
  (1,'available'),(2,'reserved'),(3,'sold')
ON CONFLICT (id) DO NOTHING;

-- Usuario demo (clave: demo1234)
INSERT INTO users (email, password_hash, username, role)
VALUES ('shadowhunter@umbral.com',
        '$2a$10$wFJP1hX4mXW2jE2xLzvSkeM1yB0m2B5qQj2q3m0oKzO3JjvI0u9j6', -- bcryptjs('demo1234')
        'shadowhunter','user')
ON CONFLICT (email) DO NOTHING;
