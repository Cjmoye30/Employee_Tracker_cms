const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'root',
        database: 'cms_db'
    },
    console.log(`Connected to the cms_db database.`)
);

// Query Standard Views
function determineDBQuery(val) {

    switch (val) {

        case "View All Departments":
            db.query('SELECT * FROM department', function (err, results) {
                console.table((results));
            });
            break;

        case "View All Roles":
            db.query('SELECT * FROM role', function (err, results) {
                console.table((results));
                return results;
            });
            break;

        case "View All Employees":
            db.query('SELECT * FROM employee', function (err, results) {
                console.table((results));
                return results;
            });
            break;

        case "View All Employees - Full Details":
            db.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id', function (err, results) {
                console.table((results));
                return results;
            });
            break;
    }
}

// Adding to Database
function addDepartment(val) {
    db.query('INSERT INTO department (department_name) VALUES(?)', val, function (err, results) {
        console.log(`${val} added to Departments Table!`);
        console.table((results));
    });
}

function addRole(dept_id, title, salary) {
    db.query('INSERT INTO role (department_id, title, salary) VALUES(?, ?, ?)', [dept_id, title, salary], function (err, results) {
        console.log(`${val} added to Departments Table!`);
        console.table((results));
    });
}

module.exports = { determineDBQuery, addDepartment, addRole };
