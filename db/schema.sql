DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_name VARCHAR(30),
  manager_id INT,
  job_id INT NOT NULL,
  Foreign Key (job_id) REFERENCES jobs(id),
  Foreign Key (manager_id) REFERENCES employees(id)
  ON DELETE SET NULL
);

CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  Foreign Key (department_id) REFERENCES departments(id)
  ON DELETE SET NULL
);