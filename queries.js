const mysql = require('mysql2');
const cTable = require('console.table');


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
)

// Query Standard Views
async function determineDBQuery(val) {

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
            db.query('SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, role.salary AS Role_Salary, employee.manager_id, manager.first_name AS Manager_First_Name, manager.last_name AS Manager_Last_Name FROM employees employee JOIN employees manager ON employee.manager_id = manager.id JOIN role ON employee.role_id = role.id', function (err, results) {
                if(err) {
                    console.log(err)
                } else{
                    console.table((results));
                    return results;
                }
            });
            break;

        // case "View All Employees":
        //     db.query('SELECT * FROM employees', function (err, results) {
        //         console.table((results));
        //         return results;
        //     });
        //     break;
    }
}

// Adding to Department Table
function addDepartment(val) {
    db.query('INSERT INTO department (department_name) VALUES(?)', val, function (err, results) {
        console.log(`${val} added to Departments Table!`);
        console.table((results));
    });
}

// Add to Role Table
function addRole(dept_id, title, salary) {
    db.query('INSERT INTO role (department_id, title, salary) VALUES(?, ?, ?)', [dept_id, title, salary], function (err, results) {
        console.log(`${dept_id} added to Role Table!`);
        console.table((results));
    });
}


// Left to do / ideas:
// Could all of this be written with classes? And then extend and use those classes in the index file?
// Need to throw an error in these functions if an item already exists in the database
// add in validation on some of the prompts - max length etc.
// we can pause dynamically adding items to the array for now and revisit it - it is important to work on the rest of the project and see how much we can get done - can bring this up in office hours

// this is not working :(

// Query all of the roles - get the index from a for loop and push them to an array
// function getAllRoles () {
//     db.query('SELECT id AS value, title AS name FROM role', function (err, results) {
//         console.log(results);
//         return results;
//     })
// }

async function getAllRoles () {
    const role = await db.promise().query('SELECT id, title FROM role')
    const roleChoices = role[0].map(({ id, title}) => ({
        name: `${title}`,
        value: id
    }));
    console.log(roleChoices);
    return roleChoices;
}

module.exports = { determineDBQuery, addDepartment, addRole, getAllRoles };