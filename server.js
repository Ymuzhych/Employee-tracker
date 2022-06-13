//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const tables = ("console.teble");

//connection 
const connection =mysql.creatConnection({
    host:"localhost",
    port: 3001,
    user:"root",
    password:"Khadka0529&",
    database:"emploee_db"
});
//conect to mysql server and database
connection.connect(function(err){
    if(err) throw err;
    console.log("Connected");

    start();

});
//functionality
function start(){
    inquirer
    .prompt([{
        type: "list",
        name: "start",
        massage: "What would you like to do?",
        choices: ["View", "Add", "Update", "Exit"]
    }
]).then (function(res){
    switch (res.start){
        case "View":
            view();
            break;
        case "Add":
            add();
            break;
        case "Update":
            updateEmployee();
            break;
        case "Exit":
            console.log("___________________");
            console.log("All done");
            console.log("___________________");
            break;
        default:
            console.log("default")
        }
    });
}  
//view function
function view(){
    inquirer.prompt([
        {
            type: "list",
            name: "view",
            message: "Select to view:",
            choices: ["All emploees", "By department", "By role"]
        }
    ]).then(function(res){
        switch(res.view){
            case "All emploees":
                viewAllEmployees();
                break;
            case "By department":
                viewByDepartment();
                break;
            case "By role":
                viewByRole();
                default:
                    console.log("default");


        }
    });
} 
function viewAllEmployees(){
    connection.query("SELECT emp.id AS ID, emp.first_name AS First, emp.last_name AS Last, emp.role_id AS Role, r.salary AS Salary, mng.last_name AS Manager, dep.name AS Department FROM employee emp LEFT JOIN employee mng ON emp.manager_id = mng.id LEFT JOIN role r ON emp.role_id = r.title LEFT JOIN department dep ON r.department_id = dep.id",
    function(err, results){
        if (err) throw err;
        console.table(results);
        start();
    });
}
function viewByDepartment(){
    connection.query("SELECT * FROM department", function(err, results){
        if (err) throw err;
        inquirer
        .prompt([{
            name: "choice",
            type: "rawlist",
            choices: function(){
                let choceArr = [];
                for(i=0; i< results.length; i++){
                    choiceArr.push(results[i].name);
                }
                return choiceArr;
            },
            massage: "Select department"
    },
]).then(function(answer){
    connection.query(
      "SELECT emp.id AS ID, emp.first_name AS First, emp.last_name AS Last, emp.role_id AS Role, r.salary AS Salary, mng.last_name AS Manager, dep.name AS Department FROM employee emp LEFT JOIN employee mng ON emp.manager_id = mng.id LEFT JOIN role r ON emp.role_id = r.title LEFT JOIN department dep ON r.department_id = dep.id WHERE dep.name =?", 
      [answer.choice], function(er, results){
        if(err) throw err;
        console.table(results);
        start();
       }
     )
   });
 });
}
function viewByRole(){
    connection.query("SELECT title FROM role", function(err, results){
        if (err) throw err;
        inquirer
        .prompt([{
            name: "choice",
            type: "rawlist",
            choices: function(){
                let choceArr = [];
                for(i=0; i< results.length; i++){
                    choiceArr.push(results[i].name);
                }
                return choiceArr;
            },
            massage: "Select role"
    },
]).then(function(answer){
    console.log(answer.choice);
    connection.query(
      "SELECT emp.id AS ID, emp.first_name AS First, emp.last_name AS Last, emp.role_id AS Role, r.salary AS Salary, mng.last_name AS Manager, dep.name AS Department FROM employee emp LEFT JOIN employee mng ON emp.manager_id = mng.id LEFT JOIN role r ON emp.role_id = r.title LEFT JOIN department dep ON r.department_id = dep.id WHERE emp.role_id =?", 
      [answer.choice], function(er, results){
        if(err) throw err;
        console.table(results);
        start();
       }
     )
   });
 });
}