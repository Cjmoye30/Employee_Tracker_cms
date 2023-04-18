// install inquirer and MYSQL pacakges/libraries
const inquirer = require('inquirer');
const express = require('express');
const {determineDBQuery, addDepartment} = require('./queries');
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
            // Normal Query Functions used
            "View All Departments",
            "View All Roles",
            "View All Employees",

            // Add Department Queries used
            "Add a Department",
            "Add a Role",
            "Add an Employee",

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

                if (answers.mainList === "Add a Department") {
                    addDepartment(answers.addDepartment);
                    
                } else {
                    determineDBQuery(answers.mainList);
                }
                // Ending the program based on input - else run the questions again
                // Adding a timeout function so that the next prompt does not overwrite the previous output in the console.
                setTimeout(function(){
                    if (answers.endProgram) {
                        console.log("Byeeeeeee")
                    } else {
                        runQuestions()
                    }
                },500)
        })
}

runQuestions();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
