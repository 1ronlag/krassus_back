CREATE DATABASE krassus;
\c krassus;
CREATE TABLE users ( id SERIAL, nombre VARCHAR(50) NOT NULL , email VARCHAR(50) NOT NULL, 
password VARCHAR(60) NOT NULL, telefono VARCHAR (15) NOT NULL, direccion VARCHAR(50) NOT NULL);

SELECT * FROM users;

INSERT INTO users values
(DEFAULT, 'Nicolas Saavedra', 'nico@mail.com','Hola', '95412455', 'los matriceros');


CREATE TABLE inventory (id SERIAL, nombre VARCHAR(50), familia VARCHAR(50), tipo VARCHAR(50), 
reproduccion VARCHAR(50), distribucion VARCHAR(50), precio INT, imagen VARCHAR(1000));

INSERT INTO inventory values
(DEFAULT, 'Suculenta 1', 'Crassulaceae', 'Comun', 'Hoja', 'America del Sur', 10000, 'https://www.okchicas.com/wp-content/uploads/2020/05/diferentes-tipos-suculentas-existen-11.jpg'),
(DEFAULT, 'Suculenta 2','Portulacaceae','Rara', 'Hoja', 'América Central y del Norte', 11000 , 'https://www.okchicas.com/wp-content/uploads/2020/05/diferentes-tipos-suculentas-existen-9.jpg'),
(DEFAULT, 'Suculenta 3', 'Aizoaceae', 'Exotica', 'Tallo y Hoja' , 'África, Madagasca', 12000, 'https://www.okchicas.com/wp-content/uploads/2020/05/diferentes-tipos-suculentas-existen-11.jpg'),
(DEFAULT, 'Suculenta 4', 'Didiereaceae', 'Comun', 'Hoja','Todo el mundo', 13000, 'https://www.okchicas.com/wp-content/uploads/2020/05/diferentes-tipos-suculentas-existen-14.jpg' ),
(DEFAULT, 'Suculenta 5', 'Cactaceae', 'Exotica', 'Tallo' , 'Madagascar', 14000, 'https://www.okchicas.com/wp-content/uploads/2020/05/diferentes-tipos-suculentas-existen-8.jpg' );

SELECT * FROM inventory;

