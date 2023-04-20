const inquirer = require('inquirer');
const { determineDBQuery, addDepartment, addRole, getAllRoles } = require('./queries');

const questions = [

    {
        type: "list",
        message: "test list",
        name: "title",
        choices: getAllRoles()

    },

    {
        type: "list",
        message: "What would you like to do?",
        name: "mainList",
        choices: [
            // Normal Query Functions used
            "View All Departments",
            "View All Roles",
            "View All Employees",

            new inquirer.Separator(),

            // Queries to Add to Tables
            "Add a Department",
            "Add a Role",
            "Add an Employee",

            new inquirer.Separator(),

            // Queries to Modify Tables
            "Update an Employee Role",

            new inquirer.Separator(),

            // End the program
            "Quit"
        ]
    },
    // Conditional - Add Department - DONE
    {
        type: "input",
        message: "Please enter the name of the department you would like to add.",
        name: "addDepartment",
        when: function (answers) {
            return answers.mainList === "Add a Department"
        }
    },

    // Conditional - Add Role - Can add a more dynamic list of Departments to choose from
    {
        type: "input",
        message: "Please enter the ID of the Department this role will be added to:",
        name: "addRole_department_id",
        when: function (answers) {
            return answers.mainList === "Add a Role"
        }
    },
    {
        type: "input",
        message: "Please enter the title of this role:",
        name: "addRole_title",
        when: function (answers) {
            return answers.mainList === "Add a Role"
        }
    },
    {
        type: "input",
        message: "Please enter the salary of this role:",
        name: "addRole_salary",
        when: function (answers) {
            return answers.mainList === "Add a Role"
        }
    },

    // Conditional - Add an Employee - Can add a more dynamic list of roles to choose from
    {
        type: "input",
        message: "Please enter the first name of the new employee.",
        name: "addEmployee_fn",
        when: function (answers) {
            return answers.mainList === "Add an Employee"
        }
    },
    {
        type: "input",
        message: "Please enter the last name of the new employee.",
        name: "addEmployee_ln",
        when: function (answers) {
            return answers.mainList === "Add an Employee"
        }
    },
    {
        type: "input",
        message: "Please enter the role ID of the employee:",
        name: "addEmployee_role_ID",
        when: function (answers) {
            return answers.mainList === "Add an Employee"
        }
    },

    // Conditional - Update Employee Role

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

            // this could still be used as a switch statement based on the answers selected

            // could i have anything new entered just pushed into an existing array? a workaround

            if (answers.addRole_department_id && answers.addRole_title && answers.addRole_salary) {
                console.log("Add this new role to the DB!!!");
                addRole(answers.addRole_department_id, answers.addRole_title, answers.addRole_salary);
            } else if (answers.mainList === "Add a Department") {
                addDepartment(answers.addDepartment);

            } else {
                determineDBQuery(answers.mainList);
            }
            // Ending the program based on input - else run the questions again
            // Adding a timeout function so that the next prompt does not overwrite the previous output in the console.
            setTimeout(function () {
                if (answers.endProgram) {
                    console.log("Byeeeeeee")
                } else {
                    runQuestions()
                }
            }, 250)
        })
}

runQuestions();




