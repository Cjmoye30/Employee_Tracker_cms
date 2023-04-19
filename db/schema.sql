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
    salary DECIMAL(19,2),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    manager_id INT REFERENCES employee(id),
    first_Name VARCHAR(30),
    last_Name VARCHAR(30),

    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id)
);
