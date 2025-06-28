CREATE DATABASE IF NOT EXISTS tinder_practicas;
USE tinder_practicas;

CREATE TABLE alumnos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  anyo_nacimiento INT NOT NULL,
  ciclo VARCHAR(100) NOT NULL,
  curso ENUM('1º', '2º') NOT NULL,
  anyo_escolar VARCHAR(10) NOT NULL,
  intereses TEXT,
  habilidades TEXT,
  buscando_practicas BOOLEAN DEFAULT TRUE,
  cv_url VARCHAR(255) -- URL o path del CV en PDF
);

CREATE TABLE empresas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  sector VARCHAR(100),
  ubicacion VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100)
);

CREATE TABLE ofertas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100),
  descripcion TEXT,
  tecnologias TEXT,
  empresa_id INT,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

-- Datos de prueba
INSERT INTO alumnos (
  nombre,
  anyo_nacimiento,
  ciclo,
  curso,
  anyo_escolar,
  intereses,
  habilidades,
  buscando_practicas,
  cv_url
) VALUES (
  'Lucía Pérez',
  2004,
  'Desarrollo de Aplicaciones Web',
  '2º',
  '24-25',
  'Frontend, UI/UX, Diseño web',
  'React, HTML, CSS, Figma',
  TRUE,
  '/cvs/lucia_perez.pdf'
),
(
  'Carlos Martínez',
  2003,
  'Administración de Sistemas Informáticos en Red',
  '2º',
  '24-25',
  'Ciberseguridad, Redes',
  'Linux, Cisco, Virtualización',
  TRUE,
  '/cvs/carlos_martinez.pdf'
);

INSERT INTO empresas (nombre, sector, ubicacion, email, password) VALUES
("TechNova", "Tecnología", "Madrid", "tecnova@empresa.com", "1234"),
("WebFactory", "Desarrollo Web", "Barcelona", "webfactory@empresa.com", "1234");

INSERT INTO ofertas (titulo, descripcion, tecnologias, empresa_id) VALUES
("Prácticas Frontend", "Trabaja con nuestro equipo en UI/UX", "React, Figma", 1),
("API Developer Junior", "Desarrolla APIs RESTful", "Node.js, Express", 2);