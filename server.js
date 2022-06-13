//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTables = "console.teble";

//connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Khadka0529&",
  database: "employee_db"
});
//conect to mysql server and database
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected");

  start();
});
//functionality
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        massage: "What would you like to do?",
        choices: ["View", "Add", "Update", "Exit"],
      },
    ])
    .then(function (res) {
      switch (res.start) {
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
          console.log("default");
      }
    });
}
//view function
function view() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "view",
        message: "Select to view:",
        choices: ["All emploees", "By department", "By role"],
      },
    ])
    .then(function (res) {
      switch (res.view) {
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
function viewAllEmployees() {
  connection.query(
    "SELECT emp.id AS ID, emp.first_name AS First, emp.last_name AS Last, emp.role_id AS Role, r.salary AS Salary, mng.last_name AS Manager, dep.name AS Department FROM employee emp LEFT JOIN employee mng ON emp.manager_id = mng.id LEFT JOIN role r ON emp.role_id = r.title LEFT JOIN department dep ON r.department_id = dep.id",
    function (err, results) {
      if (err) throw err;
      console.table(results);
      start();
    }
  );
}
function viewByDepartment() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            let choiceArr = [];
            for (i = 0; i < results.length; i++) {
              choiceArr.push(results[i].name);
            }
            return choiceArr;
          },
          massage: "Select department",
        },
      ])
      .then(function (answer) {
        connection.query(
          "SELECT emp.id AS ID, emp.first_name AS First, emp.last_name AS Last, emp.role_id AS Role, r.salary AS Salary, mng.last_name AS Manager, dep.name AS Department FROM employee emp LEFT JOIN employee mng ON emp.manager_id = mng.id LEFT JOIN role r ON emp.role_id = r.title LEFT JOIN department dep ON r.department_id = dep.id WHERE dep.name =?",
          [answer.choice],
          function (er, results) {
            if (err) throw err;
            console.table(results);
            start();
          }
        );
      });
  });
}
function viewByRole() {
  connection.query("SELECT title FROM role", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            let choiceArr = [];
            for (i = 0; i < results.length; i++) {
              choiceArr.push(results[i].name);
            }
            return choiceArr;
          },
          massage: "Select role",
        },
      ])
      .then(function (answer) {
        console.log(answer.choice);
        connection.query(
          "SELECT emp.id AS ID, emp.first_name AS First, emp.last_name AS Last, emp.role_id AS Role, r.salary AS Salary, mng.last_name AS Manager, dep.name AS Department FROM employee emp LEFT JOIN employee mng ON emp.manager_id = mng.id LEFT JOIN role r ON emp.role_id = r.title LEFT JOIN department dep ON r.department_id = dep.id WHERE emp.role_id =?",
          [answer.choice],
          function (er, results) {
            if (err) throw err;
            console.table(results);
            start();
          }
        );
      });
  });
}
//ADD
function add() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "add",
        message: "What would you like to add?",
        choices: ["Department", "Employee role", "Employee"],
      },
    ])
    .then(function (res) {
      switch (res.add) {
        case "Department":
          addDepartment();
          break;
        case "Employee role":
          addEmploeeRole();
          break;
        case "Employee":
          addEmployee();
          break;
        default:
          console.log("default");
      }
    });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "Which department would you like to add?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department VALUES (DEFAULT, ?)",
        [answer.department],
        function (err) {
          if (err) throw err;
          console.log("________________");
          console.log("Updated with " + answer.department);
          console.log("________________");
          start();
        }
      );
    });
}
function addEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "role",
        type: "input",
        message: "Enter role title:",
      },
      {
        name: "salary",
        type: "number",
        message: "Enter salary",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },

      {
        name: "department_id",
        type: "number",
        message: "Enter department id",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.role,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        function (err) {
          if (err) throw err;
          console.log("________________");
          console.log("Role updated with " + answer.role);
          console.log("________________");
          start();
        }
      );
    });
}
function addEmployee() {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          massage: "Enter employee first name",
        },
        {
          name: "lastName",
          type: "input",
          massage: "Enter employee last name",
        },
        {
          name: "role",
          type: "rawlist",

          choices: function () {
            var choiceArr = [];
            for (i = 0; i < results.length; i++) {
              choiceArr.push(results[i].title);
            }
            return choiceArr;
          },
          massage: "Select title",
        },
        {
          name: "manager",
          type: "number",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          },
          massage: "Enter manager ID",
          default: "1",
        },
      ])
      .then(function (answer) {
        connection.query("INSERT INTO employee SET ?", {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role,
          manager_id: answer.manager,
        });
        console.log("________________"),
          console.log("Role updated with " + answer.role),
          console.log("________________");
        start();
      });
  });
}
//Update
function updateEmployee() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            let choiceArr = [];
            for (i = 0; i < results.length; i++) {
              choiceArr.push(results[i].last_name);
            }
            return choiceArr;
          },
          massage: "Select employee to update",
        },
      ])
      .then(function (answer) {
        const saveName = answer.choice;
        connection.query("SELECT * FROM employee", function (er, results) {
          if (err) throw err;
          inquirer
            .prompt([
              {
                name: "role",
                type: "rawlist",
                choices: function () {
                  let choiceArr = [];
                  for (i = 0; i < results.length; i++) {
                    choiceArr.push(results[i].role_id);
                  }
                  return choiceArr;
                },
                massage: "Select title",
              },

              {
                name: "manager",
                type: "number",
                validate: function (value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                },
                massage: "Enter new manager ID",
                default: "1",
              },
            ])
            .then(function (answer) {
              console.log(answer);
              console.log(saveName);
              connection.query("UPDATE employee SET ? WHERE last_name = ?", [
                { role_id: answer.role, manager_id: answer.manager },
                saveName,
              ]),
              console.log("________________");
              console.log("Employeeupdated");
              console.log("________________");
              start();
            });
        });
      });
  });
}

    

             