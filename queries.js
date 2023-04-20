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
            });
            break;

        case "View All Employees":
            db.query('SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS Employee_Full_Name, employee.role_id, role.title, role.salary AS Role_Salary, employee.manager_id, CONCAT(manager.first_name, " ", manager.last_name) AS Manager_Full_Name FROM employees employee JOIN employees manager ON employee.manager_id = manager.id JOIN role ON employee.role_id = role.id', function (err, results) {
                if(err) {
                    console.log(err)
                } else{
                    console.table((results));
                    return results;
                }
            });
            break;
    }
}

// Adding to Department Table - DONE
function addDepartment(val) {
    db.query('INSERT INTO department (department_name) VALUES(?)', val, function (err, results) {
        console.log(`${val} added to Departments Table!`);
        console.table((results));
    });
}

// Add to Role Table - DONE
async function addRole(dept_id, title, salary) {
    db.query('INSERT INTO role (department_id, title, salary) VALUES(?, ?, ?)', [dept_id, title, salary], function (err, results) {
        console.log(`New Role Added!`);
        console.table((results));
    });
}

// Add to Employee Table - 
async function addEmployee (fn, ln, role_id, manager_id) {
    db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)', [fn, ln, role_id, manager_id], function (err, results) {
        console.log(`New Employee Added!`);
        console.table((results));
    });
}

// Update and Employee Role - 
async function updateEmploee (role_ID, employee_id) {
    db.query('UPDATE employees SET role_id = ? WHERE id = ?', [role_ID, employee_id], function (err, results) {
        console.log("Employee updated!");
        console.table(results)
    })
}

// UPDATE employees SET role_id = 1 WHERE id = 2; 


// Left to do / ideas:
// Could all of this be written with classes? And then extend and use those classes in the index file?
// Need to throw an error in these functions if an item already exists in the database
// add in validation on some of the prompts - max length etc.
// we can pause dynamically adding items to the array for now and revisit it - it is important to work on the rest of the project and see how much we can get done - can bring this up in office hours

// Functions which dynamically query Departments, Roles, and Employees after new ones have been added so that they are available in the list as selections
// this could all be put in another file so that it is not too confusing?
async function getAllRoles () {
    const role = await db.promise().query('SELECT id, title FROM role')
    const roleChoices = role[0].map(({ id, title}) => ({
        name: `${title}`,
        value: id
    }));
    // console.log(roleChoices);
    return roleChoices;
}

// Do the same thing for departments
async function getAllDepartments () {
    const dept = await db.promise().query('SELECT id, department_name FROM department')
    const deptChoices = dept[0].map(({ id, department_name}) => ({
        name: `${department_name}`,
        value: id
    }));
    // console.log(deptChoices);
    return deptChoices;
}

// Do the same thing for Employees
async function getAllEmployees () {
    const allEmployes = await db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) AS Employee_Name FROM employees')
    const employeeChoices = allEmployes[0].map(({ id, Employee_Name}) => ({
        name: `${Employee_Name}`,
        value: id
    }));
    // console.log(employeeChoices);
    return employeeChoices;
}

module.exports = { determineDBQuery, addDepartment, addRole, addEmployee, getAllRoles, getAllDepartments, getAllEmployees, updateEmploee };