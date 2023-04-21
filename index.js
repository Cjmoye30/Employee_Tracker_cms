const inquirer = require('inquirer');
const { determineDBQuery, addDepartment, addRole, getAllRoles, getAllDepartments, getAllEmployees, addEmployee, updateEmploee } = require('./queries');

const questions = [

    // Opening Question
    {
        type: "list",
        message: "What would you like to do?",
        name: "mainList",
        choices: [
            // Normal Query Functions used
            "View All Departments",
            "View All Roles",
            "View All Employees",

            // Queries to Add to Tables
            "Add a Department",
            "Add a Role",
            "Add an Employee",

            // Queries to Modify Tables
            "Update an Employee Role",

            // End the program
            "Quit"
        ]
    },
    // Conditional - Add Department
    {
        type: "input",
        message: "Please enter the name of the department you would like to add.",
        name: "addDepartment",
        validate: function (addDepartment) {
            if (addDepartment === null || addDepartment.length === 0) {
                return "Please enter something first, or quit with CTRL+C";
            }
            return true;
        },
        when: function (answers) {
            return answers.mainList === "Add a Department"
        }
    },

    // Conditional - Add Role
    {
        type: "list",
        message: "Please select the department this role will be added to:",
        name: "addRole_department_id",
        choices: getAllDepartments,
        when: function (answers) {
            return answers.mainList === "Add a Role"
        }
    },
    {
        type: "input",
        message: "Please enter the title of this role:",
        name: "addRole_title",
        validate: function (addRole_title) {
            if (addRole_title === null || addRole_title.length === 0) {
                return "Please enter something first, or quit with CTRL+C";
            }
            return true;
        },
        when: function (answers) {
            return answers.mainList === "Add a Role"
        }
    },
    {
        type: "number",
        message: "Please enter the salary of this role:",
        name: "addRole_salary",
        validate: function (addRole_salary) {
            if (typeof addRole_salary !== 'number' || addRole_salary.length === 0){
                return false;
            }
            return true;
        },
        when: function (answers) {
            return answers.mainList === "Add a Role"
        }
    },

    // Conditional - Add an Employee
    {
        type: "input",
        message: "Please enter the first name of the new employee.",
        name: "addEmployee_fn",
        validate: function (addEmployee_fn) {
            if (addEmployee_fn === null || addEmployee_fn.length === 0) {
                return "Please enter something first, or quit with CTRL+C";
            }
            return true;
        },
        when: function (answers) {
            return answers.mainList === "Add an Employee"
        }
    },
    {
        type: "input",
        message: "Please enter the last name of the new employee.",
        name: "addEmployee_ln",
        validate: function (addEmployee_ln) {
            if (addEmployee_ln === null || addEmployee_ln.length === 0) {
                return "Please enter something first, or quit with CTRL+C";
            }
            return true;
        },
        when: function (answers) {
            return answers.mainList === "Add an Employee"
        }
    },
    {
        type: "list",
        message: "Please select the role of the employee:",
        name: "addEmployee_role_title",
        choices: getAllRoles,
        when: function (answers) {
            return answers.mainList === "Add an Employee"
        }
    },
    {
        type: "list",
        message: "Please select this employee's manager",
        name: "addEmployee_manager",
        choices: getAllEmployees,
        when: function (answers) {
            return answers.mainList === "Add an Employee"
        }
    },

    // Conditional - Update Employee Role
    // Select an employee to update
    {
        type: "list",
        message: "Please select the employee you whould like to update:",
        name: "update_employee_name",
        choices: getAllEmployees,
        when: function (answers) {
            return answers.mainList === "Update an Employee Role"
        }
    },
    // Select the role to be udpated
    {
        type: "list",
        message: "Please select the new role for this employee",
        name: "update_employee_role",
        choices: getAllRoles,
        when: function (answers) {
            return answers.mainList === "Update an Employee Role"
        }
    },

    // Conditional - End Program
    {
        type: "confirm",
        message: "End the program?",
        name: "endProgram",
        when: function (answers) {
            return answers.mainList === "Quit"
        }
    }
];

// Run the questions on start
function runQuestions() {
    inquirer
        .prompt(questions)
        .then((answers) => {

            // Adding a Role to the Database - checking if all answers have been selected before executing
            if (answers.addRole_department_id && answers.addRole_title && answers.addRole_salary) {
                addRole(answers.addRole_department_id, answers.addRole_title, answers.addRole_salary);

            // Adding an Employee to the Database - checking if all answers have been selected before executing
            } else if (answers.addEmployee_fn && answers.addEmployee_ln && answers.addEmployee_role_title && answers.addEmployee_manager) {
                addEmployee(answers.addEmployee_fn, answers.addEmployee_ln, answers.addEmployee_role_title, answers.addEmployee_manager);

            // Updating an Employees role in the database 
            } else if (answers.update_employee_name && answers.update_employee_role) {
                updateEmploee(answers.update_employee_role, answers.update_employee_name);
            

            // Adding a new Department to the Database - 
            } else if (answers.mainList === "Add a Department") {
                addDepartment(answers.addDepartment);

            // runs the switch to determine which view to display     
            } else {
                determineDBQuery(answers.mainList);
            }
            // Ending the program based on input - else run the questions again
            // Timeout function prevents previous output to be overwritten by incoming question
            setTimeout(function () {
                if (answers.endProgram) {
                    console.log("Byeeeeeee")
                } else {
                    runQuestions()
                }
            }, 250)
        })
        .catch((error) => {
            console.log(error)
        })
}
runQuestions();