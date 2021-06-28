const express = require('express');
const app = express();
const mysql = require('mysql');
const PORT = process.env.port || 8000;

const bodyParser = require('body-parser');
const cors = require('cors');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "H/KMC123",
    database: "todolistdb",
    multipleStatements: true
});
connection.connect();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyParser.json());

app.get("/api/todolist/readdb", (req,res)=>{
    const sqlQuery = "SELECT * FROM todolistdb.todolist;"
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*result: "+result);
    })
});

app.post("/api/todolist/insert", (req,res)=>{
    let sqlQuery = "INSERT INTO todolistdb.todolist (id, author, title, description, due, participants)"+
                    " VALUES ('"+req.body.id+"','"+req.body.author+"','"+req.body.title+"','"+req.body.description+"','"+req.body.due+"','');"
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*result: "+result);
    });
});

app.post("/api/todolist/delete", (req,res)=>{
    /* 1) DELETE */
    /* 2) id Rearrange */
    let sqlQuery = "DELETE FROM todolistdb.todolist WHERE id="+req.body.id+";"
                    +"SET @CNT=-1;" + "UPDATE todolist SET todolist.id=@CNT:=@CNT+1;";
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*result: "+result);
    });
});
    
app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`)
});