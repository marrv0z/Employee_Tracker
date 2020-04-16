var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mari$0l18R",
    database: "employee_trakerDB"
  });

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    
    console.log("connected as id " + connection.threadId);
});

console.log(
    `EMPLOYEE TRACKER`
);

init();

function init(){
    inquirer.prompt(
    {
        type: "list",
        message: "What would you like to do?",
        choices:[
            'View all employees',
            'View all departments',
            'View all roles',
            'Update an employee role',
            'Update an employee manager',
            'Add an employee',
            'Add a department',
            'Add a role',
            'View employees by department',
            'View employees by role',
            'View employees by manager',
            'Remove department',
            'Remove employee',
            'Remove role',
            'View budget by department'
        ],
        name: "firstQ"
    }).then(function(firstData){
        var choice = firstData.firstQ;

        switch(choice){
            case 'View all employees':
                viewAllEmp();
                break;
            case 'View all departments':
                viewAllDep();
                break;
            case 'View all roles':
                viewAllRol();
                break;
            case 'Update an employee role':
                updateEmpRol();
                break;
            case 'Update an employee manager':
                unavailableRN();
                //updateEmpMan();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add a department':
                addDept();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'View employees by department':
                viewEmpDep();
                break;
            case 'View employees by role':
                viewEmpRol();
                break;
            case 'View employees by manager':
                unavailableRN();
                //viewEmpMan();
                break;
            case 'Remove department':
                unavailableRN();
                //removeDept();
                break;
            case 'Remove employee':
                removeEmp();
                break;
            case 'Remove role':
                unavailableRN();
                //removeRole();
                break;
            case 'View budget by department':
                unavailableRN();
                //viewBudget();
                break;
            default:
                console.log("You didn't make a selection.");
                init();
                break;
        }
    });
}

function unavailableRN(){
    console.log("Option unavailable at the time.");
    init();
}

function viewAllEmp(){
    // this function shows all employees and their data

    console.log("ALL EMPLOYEES\n");

    connection.query("SELECT * FROM employee", function(err, result){
        if (err) throw err;
        for (var i = 0; i <result.length;i++){
            console.log(`ID: ${result[i].id} | Name: ${result[i].first_name} ${result[i].last_name} | Role ID: ${result[i].role_id} | Manager ID: ${result[i].manager_id}`);
        }
    });

    init();
}

function viewAllDep(){
    // this function shows all departments
    
    console.log("ALL DEPARTMENTS\n");

    connection.query("SELECT * FROM department", function(err, result){
        if (err) throw err;
        for (var i = 0; i <result.length;i++){
            console.log(`ID: ${result[i].id} | Department Name: ${result[i].name_}`);
        }
    });

    init();
    
}

function viewAllRol(){
    // this function shows all roles

    console.log("ALL ROLES\n");

    connection.query("SELECT * FROM role_", function(err, result){
        if (err) throw err;
        for (var i = 0; i <result.length;i++){
            console.log(`ID: ${result[i].id} | Title: ${result[i].title} | Salary: ${result[i].salary} | Department ID: ${result[i].department_id}`);
        }
    });

    init();
}

function updateEmpRol(){
    // this function updates an employee's role

    inquirer.prompt([
        {
            type: "input",
            message: "First name of employee: ",
            name: "first_n"
        },
        {
            type: "input",
            message: "Last name of employee: ",
            name: "last_n"
        }
    ]).then(function(data){
        var firstN = data.first_n;
        var lastN = data.last_n;

        // obtain role, console log it, and confirm
        var queryString = "SELECT role_id FROM employee WHERE ? ?";

        connection.query(queryString, {first_name: firstN, last_name: lastN}, function(err, res){
            if (err) throw err;
            //console.log(res.role_id);

            var thisID = res.role_id;

            connection.query("SELECT title FROM role_ WHERE ?", {id: thisID}, function(err, response){
                if (err) throw err;
                console.log(`${firstN} ${lastN} role is ${response.title}`); 
            });
        });

        inquirer.prompt({
            type: "confirm",
            message: `Are you sure you would like to change ${firstN} ${lastN}'s role?`,
            name: "changerole"
        }).then(function(dataSet){
            if (dataSet.changerole == true){
                // change role

                connection.query("SELECT * FROM role_", function(err,res){
                    if (err) throw err;

                    var options = [];

                    for(var i =0; i<res.length;i++){
                        options += JSON.stringify(res[i].id + " "+ res[i].title);
                    }

                    inquirer.prompt({
                        type: "list",
                        message: "Select new role: ",
                        choices: options,
                        name: "newrole"
                    }).then(function (dataR){
                        var newRole = dataR.newrole.split(" ");
                        var newRoleID = newRole[0];

                        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ? last_name = ?", [newRoleID, firstN, lastN],function(err,result){
                            if (err) throw err;
                            console.log(`Success! ${result.first_name} new role ID is: ${result.role_id}.`); 
                        });
                        
                        init();
                    });
                });
                
            }
            else{
                // initialize again
                console.log("Ok, no changes were made.");
                init();
            }
        });
    });
}

// function updateEmpMan(){
//     // this function updates an employee's manager

//     inquirer.prompt([
//         {
//             type: "input",
//             message: "First name of employee: ",
//             name: "first_n"
//         },
//         {
//             type: "input",
//             message: "Last name of employee: ",
//             name: "last_n"
//         }
//     ]).then(function(data){
//         var firstN = data.first_n;
//         var lastN = data.last_n;

//         // obtain manager from database

//         // log who the employee's manager is and confirm if they want to change it
//         console.log(`${firstN} ${lastN} manager is `);

//         inquirer.prompt({
//             type: "confirm",
//             message: `Are you sure you would like to change ${firstN} ${lastN}'s manager?`,
//             name: "managerUp"
//         }).then(function(dataSet){
//             if (dataSet.managerUp == true){
//                 // ask who's the employee's new manager
//                 inquirer.prompt({
//                     type: "input",
//                     message: "New manager's id: ",
//                     name: "managID"
//                 }).then(function(dataM){
//                     var managerID = dataM.managID;
//                     // get id from database and change manager
//                 });
//             }
//             else{
//                 // initialize again
//                 console.log("Ok, no changes were made.");
//                 init();
//             }
//         });
//     });
// }

function addEmployee(){
    // this function adds a new employee

    inquirer.prompt([
        {
            type: "input",
            message: "First name of employee: ",
            name: "first_n"
        },
        {
            type: "input",
            message: "Last name of employee: ",
            name: "last_n"
        },
        {
            type: "input",
            message: "Role id: ",
            name: "roleid"
        },
        {
            type: "input",
            message: "Manager ID: ",
            name: "manid"
        }
    ]).then(function(data){
        var firstN = data.first_n;
        var lastN = data.last_n;
        var roleID = data.roleid;
        var managerID = data.manid;

        // Add employee

        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstN}", "${lastN}", ${roleID}, ${managerID})`, function(err, res){
            if (err) throw err;

            console.log(`Success! You have added ${firstN} ${lastN} as an employee.`);    
        });
        
        init();
    });
}

function addDept(){
    // this function adds a new department
    
    inquirer.prompt({
        type: "input",
        message: "Name of department: ",
        name: "deptname"
    }).then(function(data){
        var deptN = data.deptname;

        // Add department

        connection.query(`INSERT INTO department (name_) VALUES ("${deptN}")`, function(err, res){
            if (err) throw err;

            console.log(`Success! You have added ${deptN} as a new department.`); 
        });
        
        init();
    });
}

function addRole(){
    // this function adds a new role

    inquirer.prompt([
        {
            type: "input",
            message: "Role title: ",
            name: "rtitle"
        },
        {
            type: "input",
            message: "Salary: ",
            name: "salary"
        },
        {
            type: "input",
            message: "Department id: ",
            name: "deptd"
        }
    ]).then(function(data){
        var role_title = data.rtitle;
        var sal = data.salary;
        var deptID = data.deptid;

        // Add role

        connection.query(`INSERT INTO role_ (title, salary, department_id) VALUES ("${role_title}", ${sal}, ${deptID})`, function(err, res){
            if (err) throw err;

            console.log(`Success! You have added ${role_title} as a new role.`); 
        });
        
        init();
    });
}

function viewEmpDep(){
    // this functions shows employees by department

    var depOptions = [];

    connection.query("SELECT * FROM department", function(err,res){
        if (err) throw err;

        for (var i =0; i < res.length; i++){
            depOptions += JSON.stringify(res[i].name_);
        }
    });

    inquirer.prompt({
        type: "list",
        message: "Choose a department:",
        choices: depOptions,
        name: "selectDept"
    }).then(function(data){
        var dept = data.selectDept;

        connection.query("SELECT * FROM employee WHERE department_id = ?", [dept], function(err,result){
            if (err) throw err;

            console.log(`Emploeyees in the ${dept[1]} department`);

            for(var i = 0; i < result.length; i++){
                console.log(`ID: ${result[i].id} | Name: ${result[i].first_name} ${result[i].last_name}`);
            }
        });
        
        init();
    });
}

function viewEmpRol(){
    // this function shows employees by role

    var roleOptions = [];

    connection.query("SELECT * FROM role_", function(err,res){
        if (err) throw err;

        for (var i =0; i < res.length; i++){
            roleOptions += JSON.stringify(res[i].id + " " + res[i].title);
        }
    });

    inquirer.prompt({
        type: "list",
        message: "Choose a role:",
        choices: roleOptions,
        name: "selectRole"
    }).then(function(data){
        var roleS = data.selectROle.split(" ");

        connection.query("SELECT * FROM employee WHERE role_id = ?", [roleS[0]], function(err,result){
            if (err) throw err;

            console.log(`Emploeyees with the role ${roleS[1]}`);

            for(var i = 0; i < result.length; i++){
                console.log(`ID: ${result[i].id} | Name: ${result[i].first_name} ${result[i].last_name}`);
            }
        });
        
        init();
    });
}

// function viewEmpMan(){
//     // this function shows employees by manager

//     inquirer.prompt({
//         type: "list",
//         message: "Choose a manager:",
//         choices: ['this'],
//         name: "selectMang"
//     }).then(function(data){
//         var mang = data.selectMang;

//         // switch case by manager
//     });
// }

// function removeDept(){
//     // this function removes an exiting department and all employees in such department

//     inquirer.prompt({
//         type: "input",
//         message: "ID of department you would like to delete: ",
//         name: "deptDel"
//     }).then(function(data){
//         var departmentDel = data.deptDel;

//         // obtain manager from database

//         inquirer.prompt({
//             type: "confirm",
//             message: `Are you sure you would like to remove the ${departmentDel} department and all employees and roles in this department?`,
//             name: "removeDept"
//         }).then(function(dataSet){
//             if (dataSet.removeDept == true){
//                 // remove whole department
//                 console.log(`Removed ${departmentDel} department.`);
//             }
//             else{
//                 // initialize again
//                 console.log("Ok, no changes were made.");
//                 init();
//             }
//         });
//     });
// }

function removeEmp(){
    // this function removes an exiting employee

    inquirer.prompt([
        {
            type: "input",
            message: "First name of employee: ",
            name: "first_n"
        },
        {
            type: "input",
            message: "Last name of employee: ",
            name: "last_n"
        }
    ]).then(function(data){
        var firstN = data.first_n;
        var lastN = data.last_n;

        // obtain manager from database

        inquirer.prompt({
            type: "confirm",
            message: `Are you sure you would like to remove ${firstN} ${lastN}?`,
            name: "removeE"
        }).then(function(dataSet){
            if (dataSet.removeE == true){
                // remove emp

                connection.query("DELETE FROM employee WHERE first_name = ? last_name = ?", [firstN,lastN], function(err, res){
                    if (err) throw err;
                    console.log(`Employee ${firstN} ${lastN} has been removed from the database.`)
                });
                init();
            }
            else{
                // initialize again
                console.log("Ok, no changes were made.");
                init();
            }
        });
    });
}

// function removeRole(){
//     // this function removes an exiting role and all employees with such role

//     inquirer.prompt({
//         type: "input",
//         message: "ID of role you would like to delete: ",
//         name: "roleDel"
//     }).then(function(data){
//         var roleDelete = data.roleDel;

//         // obtain manager from database

//         inquirer.prompt({
//             type: "confirm",
//             message: `Are you sure you would like to remove ${roleDelete} and all employees and roles in that department?`,
//             name: "removeRole"
//         }).then(function(dataSet){
//             if (dataSet.removeRole == true){
//                 // remove whole department
//             }
//             else{
//                 // initialize again
//                 console.log("Ok, no changes were made.");
//                 init();
//             }
//         });
//     });
// }

// function viewBudget(){
//     // this function shows the budget of a specific department
// }