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

app.get("/", (req,res)=>{
    res.send("Hello World!");
});

app.get("/send", (req,res)=>{
    //TODO: post로 변경
    const sqlQuery = "INSERT INTO testtable (name,phone,age) VALUES ('안재현', '01050453813', 30)";
    connection.query(sqlQuery, (err,result)=>{
        res.send('success!');
    });
});
    
app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`)
});