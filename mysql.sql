-- Database Root
CREATE DATABASE IF NOT EXISTS root;

CREATE ROLE IF NOT EXISTS root WITH LOGIN PASSWORD 'root';

-- Table 'cliente'
CREATE TABLE IF NOT EXISTS clients (
	idClient INT NOT NULL,
	cpf CHAR(11) NOT NULL,
	name VARCHAR(150) NOT NULL,
	email VARCHAR(150),
	PRIMARY KEY (idClient),
	UNIQUE (cpf)
	);

-- Table `category`
CREATE TABLE IF NOT EXISTS category (
	idCategory INT NOT NULL,
	name VARCHAR(45) NOT NULL,
	PRIMARY KEY (idCategory)
	);

-- Table `product`
CREATE TABLE IF NOT EXISTS products (
	idProducts INT NOT NULL,
	name VARCHAR(45) NOT NULL,
	fk_idCategoria INT NOT NULL,
	price VARCHAR(45),
	PRIMARY KEY (idProducts),
	FOREIGN KEY (fk_idCategoria) REFERENCES categorys (idCategory)
	);
