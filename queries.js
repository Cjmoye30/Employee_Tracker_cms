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

function determineDBQuery (val) {

    switch(val) {

        case "View All Departments":
            db.query('SELECT * FROM department', function (err, results) {
                console.table((results));
                return results;
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

module.exports = { determineDBQuery };
