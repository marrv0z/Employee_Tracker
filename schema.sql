DROP DATABASE IF EXISTS employee_trakerDB;

CREATE DATABASE employee_trakerDB;

USE employee_trakerDB;

CREATE TABLE department (
  id int NOT NULL,
  name_ varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role_ (
  id int NOT NULL,
  title varchar(30) NOT NULL,
  salary DECIMAL(8,2),
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id int NOT NULL,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);