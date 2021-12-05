DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;
USE company_db;

-- Departments table
CREATE TABLE departments (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

-- Roles table
CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(10,2) CHECK (salary > 0),
department_id INT,
-- roles.department_id foreign key relates to departments.id primary key
FOREIGN KEY (department_id) REFERENCES departments(id) 
ON UPDATE CASCADE 
ON DELETE SET NULL
);

-- Employees table
CREATE TABLE employees (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,

FOREIGN KEY (role_id) REFERENCES role(id)
ON UPDATE CASCADE 
ON DELETE SET NULL


);