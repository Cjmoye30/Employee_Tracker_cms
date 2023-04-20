INSERT INTO
    department (department_name)
VALUES
    ('Legal'),
    ('Engineering'),
    ('Finance'),
    ('Supply Chain'),
    ('Slayer'),
    ('Marketing');


INSERT INTO
    role (department_id, title, salary)
VALUES
    (1, 'Lawyer', 20000.00),
    (5, 'Slayer Master', 500000.00),
    (5, 'Slayer Noobie', 30000.00),
    (3, 'Accountant', 30000.00),
    (6, 'Web Developer', 90000.00);


INSERT INTO
    employees (first_Name, last_Name, role_id, manager_id)
VALUES
    ('Ben', 'Affleck', 4, 2),
    ('Cambric', 'Moye', 5, 1),
    ('Steve', 'Malarkey', 2, 1),
    ('Monnette', 'Sewell', 3, 3);

