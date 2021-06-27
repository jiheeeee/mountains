const express = require('express');
const app = express();
const mysql = require('mysql');
const PORT = process.env.port || 8000;

const bodyParser = require('body-parser');
const cors = require('cors');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Blueshift26!",
    database: "testdb"
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
    })
});

app.post("/api/todolist/insert", (req,res)=>{
    const sqlQuery = "INSERT INTO todolistdb.todolist (id, author, title, description, due, participants)"+
                    " VALUES ("+req.body.id+",'"+req.body.author+"','"+req.body.title+"','"+req.body.description+"','"+req.body.due+"','안재현');"
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(err);
    });
});

app.post("/api/todolist/delete", (req,res)=>{
    console.log('시작');
    console.log(req.body);
    const sqlQuery = "DELETE FROM todolistdb.todolist WHERE id="+req.body.id+";"
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
    })
});
    
app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`)
});