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
    }
}

// Adding to Database
function addDepartment (val) {

    // we could use another switch statement based on which of the additions we are needing to use
    // when the user selects some of the adds - then we use that answer to select the answer of the value input
    // that input is then passed into this function

    db.query('INSERT INTO department (department_name) VALUES(?)', val, function (err, results) {
        console.log(`${val} added to Departments Table!`);
        return results;
    });
}

module.exports = { determineDBQuery, addDepartment };
