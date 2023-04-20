DROP DATABASE IF EXISTS cms_db;

CREATE DATABASE cms_db;

USE cms_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    title VARCHAR(30),
    salary DECIMAL(19, 2),
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_id INT,
    manager_id INT REFERENCES employee(id),
    first_Name VARCHAR(30),
    last_Name VARCHAR(30),
    FOREIGN KEY (role_id) REFERENCES role (id)
);


SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    employee.role_id,
    role.title,
    role.salary AS Role_Salary,
    employee.manager_id,
    manager.first_name AS Manager_First_Name,
    manager.last_name AS Manager_Last_Name
FROM
    employees employee
    JOIN employees manager ON employee.manager_id = manager.id
    LEFT JOIN role ON employee.role_id = role.id;