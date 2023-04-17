INSERT INTO
    department (department_name)
VALUES
    ('Legal'),
    ('Engineering'),
    ('Finance'),
    ('Supply Chain'),
    ('Farming'),
    ('Fletching'),
    ('Slayer'),
    ('Runecrafting'),
    ('Marketing');

INSERT INTO
    role (department_id, title, salary)
VALUES
    (1, 'Lawyer', 20000.00),
    (7, 'Slayer Master', 500000.00),
    (7, 'Slayer Noobie', 30000.00),
    (3, 'Accountant', 30000.00),
    (9, 'Web Developer', 90000.00);


INSERT INTO
    employee (first_Name, last_Name, role_id)
VALUES
    ('Ben', 'Affleck', 4),
    ('Cambric', 'Moye', 5),
    ('Steve', '', 2),
    ('Monnette', 'Sewell', 3);