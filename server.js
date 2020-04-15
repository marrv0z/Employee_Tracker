var express = require("express");
var app = express();
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mari$0l18R",
    database: "employee_trakerDB"
  });

function init(){

    connection.connect(function(err) {
        if (err) {
          console.error("error connecting: " + err.stack);
          return;
        }
        
        console.log("connected as id " + connection.threadId);
    });

    inquirer.prompt(
    {
        type: "list",
        mssage: "What would you like to do?",
        choices:['this', 'that', 'other'],
        name: "firstQ"
    }).then(function(firstData){
        
    });

}