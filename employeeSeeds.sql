USE employeeDB;

-- Seeding the departments table
INSERT INTO departments
    (id,department_name)
VALUES
    (NULL, "Park Operations"),
    (NULL, "Movies"),
    (NULL, "Video Games");

-- Seeding the roles table
INSERT INTO roles
    (id,title,salary,department_id)
VALUES
    (NULL, "Ride Operator", 50000, 1),
    (NULL, "Food Inspection", 65000, 1),
    (NULL, "Live Shows", 40000, 1),
    (NULL, "Director", 100000, 2),
    (NULL, "Actor", 75000, 2),
    (NULL, "Stagehand", 45000, 2),
    (NULL, "Creative Lead", 80000, 3),
    (NULL, "Art Director", 60000, 3),
    (NULL, "Animator", 35000, 3);

-- Seeding the employees table
INSERT INTO employees
    (id,first_name,last_name,role_id,manager_id)
VALUES
    (NULL, "Bob", "Parr", 1, NULL),
    (NULL, "Helen", "Parr", 2, NULL),
    (NULL, "Lucius", "Best", 3, NULL),
    (NULL, "Walt", "Disney", 4, NULL),
    (NULL, "Mickey", "Mouse", 5, 4),
    (NULL, "Donald", "Duck", 6, 4),
    (NULL, "Buzz", "Lightyear", 7, NULL),
    (NULL, "Slinky", "Dog", 8, 7),
    (NULL, "Bo", "Peep", 9, 7);