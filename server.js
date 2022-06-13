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