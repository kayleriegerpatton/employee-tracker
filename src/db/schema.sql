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

FOREIGN KEY (department_id) REFERENCES departments(id) 
ON UPDATE CASCADE 
ON DELETE SET NULL
);

-- Employees table
