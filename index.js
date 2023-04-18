// install inquirer and MYSQL pacakges/libraries
const inquirer = require('inquirer');
const express = require('express');
const {viewAllDepartments, viewAllRoles, determineDBQuery} = require('./queries');
const cTable = require('console.table');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const questions = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "mainList",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role",
            "Quit"
        ]
    },

    // Conditional - Add Department
    {
        type: "input",
        message: "Please enter the name of the department you would like to add.",
        name: "addDepartment",
        when: function (answers) {
            return answers.mainList === "Add a Department"
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

            determineDBQuery(answers.mainList);

            // Ending the program based on input - else run the questions again
            if (answers.endProgram) {
                console.log("Byeeeeeee")
            } else {
                runQuestions()
            }
        })
}

runQuestions();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
