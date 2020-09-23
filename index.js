
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
    // Except for the last line, you generally need to leave a space within the quotation marks at the end of a line
    var query = (
        // SELECT is the "FINAL" Table of information that gets displayed
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
        console.table(res);

        // Running employee manager again
        employeeManager();
    });
}

function viewAllByDepartment() {
    // Creating the query selector to be used to get the data from MySQL
    // This query gets ALL of the department names
    var query1 = (
        "SELECT " +
        "d.department_name " +
        "FROM departments AS d"
    );

    // Making the query to the database
    connection.query(query1, function (err1, res1) {
        // If there's an error, throw the error 
        if (err1) throw err1;

        // Creating an empty array for future use
        var listOfDepartmentNames = [];

        // Looping through the response object
        for (var i = 0; i < res1.length; i++) {
            // Pushing the department name into the listOfDepartmentNames
            listOfDepartmentNames.push(res1[i].department_name);
        }

        // Running inquirer to ask the user what department they want to select
        inquirer.prompt({
            name: "deptSelect",
            type: "list",
            message: "From which department would you like to select?",
            choices: listOfDepartmentNames // Using the array – consisting of all the department names – to create the list of choices
        }).then(function (answer) {

            var query2 = (
                // Similar query to the one in viewAllEmployees()
                "SELECT " +
                "d.department_name AS DepartmentName, " +
                "e.first_name AS First_Name, " +
                "e.last_name AS Last_Name, " +
                "r.title AS RoleTitle, " +
                "r.salary AS Salary, " +
                "CONCAT(manager.first_name, ' ', manager.last_name) AS Manager " +
                "FROM employees AS e " +
                "INNER JOIN roles AS r ON (e.role_id = r.id) " +
                "INNER JOIN departments AS d ON (r.department_id = d.id) " +
                "LEFT JOIN employees manager ON manager.id = e.manager_id " +
                // The one difference is this line:
                // When using the MySQL package, use ?s in place of any values to be inserted,
                // which are then swapped out with corresponding elements in the array.
                // This helps us avoid an exploit known as SQL injection
                "WHERE d.department_name = (?)"
            );

            // Making the query to the database
            // Using the value of answer.deptSelect in place of the (?) in query2
            connection.query(query2, [answer.deptSelect], function (err2, res2) {
                // If there's an error, throw the error
                if (err2) throw err2;

                // CONSOLE TABLE DISPLAY OF THE RESPONSE
                console.table(res2);

                // Running employee manager again
                employeeManager();
            });
        });
    });
}

function viewAllByRole() {
    // Creating the query selector to be used to get the data from MySQL
    // This query gets ALL of the role names
    var query1 = (
        "SELECT " +
        "r.title " +
        "FROM roles AS r"
    );

    // Making the query to the database
    connection.query(query1, function (err1, res1) {
        // If there's an error, throw the error 
        if (err1) throw err1;

        // Creating an empty array for future use
        var listOfRoleTitles = [];

        // Looping through the response object
        for (var i = 0; i < res1.length; i++) {
            // Pushing the role name into the listOfRoleTitles
            listOfRoleTitles.push(res1[i].title);
        }

        // Running inquirer to ask the user what role title they want to select
        inquirer.prompt({
            name: "roleSelect",
            type: "list",
            message: "From which role would you like to select?",
            choices: listOfRoleTitles // Using the array – consisting of all the role titles – to create the list of choices
        }).then(function (answer) {

            var query2 = (
                // Similar query to the one in viewAllEmployees()
                "SELECT " +
                "r.title AS RoleTitle, " +
                "e.first_name AS First_Name, " +
                "e.last_name AS Last_Name, " +
                "r.salary AS Salary, " +
                "d.department_name AS DepartmentName, " +
                "CONCAT(manager.first_name, ' ', manager.last_name) AS Manager " +
                "FROM employees AS e " +
                "INNER JOIN roles AS r ON (e.role_id = r.id) " +
                "INNER JOIN departments AS d ON (r.department_id = d.id) " +
                "LEFT JOIN employees manager ON manager.id = e.manager_id " +
                // The one difference is this line:
                // When using the MySQL package, use ?s in place of any values to be inserted,
                // which are then swapped out with corresponding elements in the array.
                // This helps us avoid an exploit known as SQL injection
                "WHERE r.title = (?)"
            );

            // Making the query to the database
            // Using the value of answer.deptSelect in place of the (?) in query2
            connection.query(query2, [answer.roleSelect], function (err2, res2) {
                // If there's an error, throw the error
                if (err2) throw err2;

                // CONSOLE TABLE DISPLAY OF THE RESPONSE
                console.table(res2);

                // Running employee manager again
                employeeManager();
            });
        });
    });

}

function addDepartment() {
    // Running inquirer to ask the user what department they want to add
    inquirer.prompt({
        name: "newDept",
        type: "input",
        message: "What is the name of the department you are adding?",
        validate: Boolean
        // validate: Boolean will return false if you get null or an empty string
        // Therefore, it successfully ensures that you can't enter an empty string
    }).then(function (answer) {

        // Creating the query that will add the department
        var query = (
            "INSERT INTO departments " +
            "(id,department_name) " +
            "VALUES " +
            "(NULL, (?))"
        )

        // Making the query to the database
        connection.query(query, [answer.newDept], function (err, res) {
            // If there's an error, throw the error
            if (err) throw err;

            // Console logging a successful add to the database
            console.log(`Successfully added ${answer.newDept} to the database`)

            // Running employee manager again
            employeeManager();
        });
    });
}

function addRole() {
    // Creating the query selector to be used to get the data from MySQL
    // This query gets ALL of the department names
    var query1 = (
        "SELECT " +
        "d.id, " +
        "d.department_name " +
        "FROM departments AS d"
    );

    // Making the query to the database
    connection.query(query1, function (err1, res1) {
        // If there's an error, throw the error 
        if (err1) throw err1;

        // Creating an empty array for future use
        var listOfDepartmentNames = [];

        // Looping through the response object
        for (var i = 0; i < res1.length; i++) {
            // Pushing the department name into the listOfDepartmentNames
            listOfDepartmentNames.push(res1[i].department_name);
        }

        // Running inquirer to ask the user what role they want to add
        inquirer.prompt(
            [
                {
                    name: "newRole",
                    type: "input",
                    message: "What is the name of the role you are adding?",
                    validate: Boolean
                    // validate: Boolean will return false if you get null or an empty string
                    // Therefore, it successfully ensures that you can't enter an empty string
                },
                {
                    name: "whatDept",
                    type: "list",
                    message: "In which department does this role belong?",
                    choices: listOfDepartmentNames // Using the array – consisting of all the department names – to create the list of choices

                },
                {
                    name: "whatSalary",
                    type: "input",
                    message: "What is the salary of this role?",
                    validate: function (id) {
                        var valid = isNaN(id);
                        if (valid) {
                            console.log("\nPlease enter a valid number")
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                }
            ]
        ).then(function (answer) {

            // Initializing a deptID variable for future use
            var deptID = 0;
            // Going into each element of the res1 response
            // (res1 consisted of an object with department ids and department names)
            res1.forEach(element => {
                // if the department name matches that provided by the user...
                // set the department ID
                if (element.department_name === answer.whatDept) {
                    deptID = element.id;
                }
            });

            // Creating the query that will add the role
            var query2 = (
                "INSERT INTO roles " +
                "(id,title,salary,department_id) " +
                "VALUES " +
                "(NULL,(?),(?),(?))"
            )

            // Making an array of the queryInputs
            var queryInputs = [answer.newRole, answer.whatSalary, deptID];
        
            // Making the query to the database
            connection.query(query2, queryInputs, function (err2, res2) {
                // If there's an error, throw the error
                if (err2) throw err2;

                // Console logging a successful add to the database
                console.log(`Successfully added ${answer.newRole} to the database`)

                // Running employee manager again
                employeeManager();
            })
        });
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