DROP DATABASE IF EXISTS cms_db;

CREATE DATABASE cms_db;

USE cms_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    title VARCHAR(30) UNIQUE,
    salary DECIMAL(19, 2),
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_id INT,
    manager_id INT REFERENCES employee(id),
    first_Name VARCHAR(30),
    last_Name VARCHAR(30),
    CONSTRAINT unique_person UNIQUE (first_Name, last_Name),
    FOREIGN KEY (role_id) REFERENCES role (id)
);

SELECT
    *
FROM
    role
    JOIN department ON role.department_id = department.id;