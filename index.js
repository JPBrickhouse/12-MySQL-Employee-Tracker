
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
    password: "MyNeighborTotoro867", // root password
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
    // Creating the query selector to be used to get the data from MySQL
    // Sometimes need to leave a space at the end of a line
    var query = (
        // SELECT is the "FINAL" Table that gets displayed
        // Using AS [string] after the SELECT stuff is HOW the returned information gets displayed
        "SELECT " +
        "e.id AS EmployeeID, " +
        "e.first_name AS FirstName, " +
        "e.last_name AS LastName, " +
        "r.title AS JobTitle, " +
        "d.department_name AS DepartmentName, " +
        "r.salary AS Salary, " +
        "CONCAT(manager.first_name, ' ', manager.last_name) AS ManagerName " +
        
        // The FROM command is used to specify which table to select or delete data from.
        "FROM employees AS e " +
        
        // The INNER JOIN keyword selects records that have matching values in both tables.
        
        // Using the employee role ID to go into the roles table and find a matching role ID
        "INNER JOIN roles AS r ON (e.role_id = r.id) " +
        
        // Using the roles department ID to go into the departments table and find a matching department ID
        "INNER JOIN departments AS d ON (r.department_id = d.id) " +
        
        // The LEFT JOIN keyword returns all records from the left table and the matched records from the right table
        // In this instance, FROM employees makes employees the "left" table...
        // And LEFT JOIN employees manager makes employees manager the "right" table.
        // NOTE about this LEFT JOIN, as it is essentially a "SELF" JOIN (i.e. essentially reference its own table)
        // employees is the original table, and manager is the "alias / copy" that is used to be referenced
        // https://stackoverflow.com/questions/2458519/explanation-of-self-joins
        // https://www.sqlitetutorial.net/sqlite-self-join/
        "LEFT JOIN employees manager ON manager.id = e.manager_id"
    );

    // Making the query to the database
    connection.query(query, function (err, res) {
        // If there's an error, throw the error    
        if (err) throw err;

        // CONSOLE TABLE DISPLAY OF THE RESPONSE
        console.log(res[0]);
        console.table(res);

        // Running employee manager again
        employeeManager();
    });
}

function viewAllByDepartment() {
    // Another inquirer prompt
    // The list of all the options should be the list of departments


    // Creating the query selector to be used to get the data from MySQL

    // Making the query to the database


}

function viewAllByRole() {
    // Another inquirer prompt
    // The list of all the options should be the list of roles


    // Creating the query selector to be used to get the data from MySQL

    // Making the query to the database

}

function addDepartment() {
    inquirer
        .prompt({
            name: "newDepartment",
            type: "input",
            message: "What is the name of the department you are adding?",
            validate: Boolean
            // validate: Boolean will return false if you get null or an empty string
            // Therefore, it successfully ensures that you can't enter an empty string
        }).then(function (answer) {




            // Creating the query selector to be used to get the data from MySQL

            // Making the query to the database


            // Running employee manager again
            employeeManager();
        });
}

function addRole() {
    inquirer
        .prompt({
            name: "newRole",
            type: "input",
            message: "What is the name of the role you are adding?",
            validate: Boolean
            // validate: Boolean will return false if you get null or an empty string
            // Therefore, it successfully ensures that you can't enter an empty string
        }).then(function (answer) {

            // Creating the query selector to be used to get the data from MySQL

            // Making the query to the database


            employeeManager();
        });
}

function addEmployee() {
    // Another inquirer prompt

    // Asking a series of questions:
    // - First Name - INPUT
    // - Last Name - INPUT
    // - Role - SELECT FROM A LIST OF ROLES

    // - Are they a manager? Yes / No

    // - If they are a manager...
    // - Manager over which employee(s) - SELECT FROM A LIST OF EMPLOYEES

    // - If they aren't a manager...
    // - Who is their manager - SELECT FROM A LIST OF MANAGERS



    // Creating the query selector to be used to get the data from MySQL

    // Making the query to the database

}

function updateEmployeeRole() {
    // Another inquirer prompt
    // Asking a series of questions:
    // - Employee Name - SELECT FROM A LIST OF EMPLOYEES
    // - Role - SELECT FROM A LIST OF ROLES


    // Creating the query selector to be used to get the data from MySQL

    // Making the query to the database

}