
// Importing the necessary packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

// Creating a connection to the MySQL database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Username
    user: "root",

    // Password
    password: "", // root password
    database: "employeeDB" // MySQL database being referenced
});

// Making the connection to the database
connection.connect(function (err) {
    // Throwing an error if one occurs
    if (err) throw err;

    // Text to ASCII Art Generator (TAAG)
    // http://patorjk.com/software/taag/
    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -")
    console.log("#######")
    console.log("#       #    # #####  #       ####  #   # ###### ######")
    console.log("#       ##  ## #    # #      #    #  # #  #      #")
    console.log("#####   # ## # #    # #      #    #   #   #####  #####")
    console.log("#       #    # #####  #      #    #   #   #      #")
    console.log("#       #    # #      #      #    #   #   #      #")
    console.log("####### #    # #      ######  ####    #   ###### ######")
    console.log("")
    console.log("#     #")
    console.log("##   ##   ##   #    #   ##    ####  ###### #####")
    console.log("# # # #  #  #  ##   #  #  #  #    # #      #    #")
    console.log("#  #  # #    # # #  # #    # #      #####  #    #")
    console.log("#     # ###### #  # # ###### #  ### #      #####")
    console.log("#     # #    # #   ## #    # #    # #      #   #")
    console.log("#     # #    # #    # #    #  ####  ###### #    #")
    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -")

    // Running the employeManager function
    employeeManager();
});

// The employeeManager function is the "main menu" for the employee manager application
function employeeManager() {
    // Running inquirer to ask the user what they want to do...
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all employees by department",
            "View all employees by role",
            "Add department",
            "Add role",
            "Add employee",
            "Update employee role",
            "Exit"

            // Above are the basic choices.
            // If these are accomplished and there is time,
            // consider adding more choices below:
            // "Update employee manager"
            // "View all employees by manager"
            // "Delete department"
            // "Delete role"
            // "Delete employee"
            // "View department budget"
        ]
    }).then(function (answer) {
        // Callback function that runs a switch case
        // Depending on what the user selected,
        // Run that particular function
        switch (answer.action) {
            case "View all employees": {
                viewAllEmployees();
                break;
            }
            case "View all employees by department": {
                viewAllByDepartment();
                break;
            }
            case "View all employees by role": {
                viewAllByRole();
                break;
            }
            case "Add department": {
                addDepartment();
                break;
            }
            case "Add role": {
                addRole();
                break;
            }
            case "Add employee": {
                addEmployee();
                break;
            }
            case "Update employee role": {
                updateEmployeeRole();
                break;
            }
            case "Exit": {
                connection.end();
                break;
            }
        }
    })
}

function viewAllEmployees() {

}

function viewAllByDepartment() {

}

function viewAllByRole() {

}

function addDepartment() {

}

function addRole() {

}

function addEmployee() {

}

function updateEmployeeRole () {

}