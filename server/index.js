const express = require("express");

const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser')
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "toor",
    database: "crud_games"
});
app.use(cors());
app.use(bodyParser.json()) // for parsing application/json
app.use(express.json());
app.post("/register", (req, res)=>{
    const name = req.body.name
    const cost = req.body.cost
    const category = req.body.category

    console.log(name, cost, category)

    let SQL = "INSERT INTO games ( name, cost, category) VALUES (?, ?, ?)"

    

    db.query(SQL, [name, cost, category] , (err, result) => {
        console.log(err);
    })

})

app.get('/getCards', (req, res)=>{
    let SQL = "SELECT * FROM games";

    db.query(SQL, (err, result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})

app.put('/edit', (req, res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const cost = req.body.cost;
    const category = req.body.category;

    let SQL = "UPDATE games SET name = ?, cost = ?, category = ? WHERE id = ?";

    db.query(SQL, [name, cost, category, id] ,(err, result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
});

app.delete('/delete/:id', (req, res)=>{
    const id = req.params.id;

    let SQL = "DELETE FROM games WHERE id = ?";
    db.query(SQL, [id] ,(err, result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})


app.listen(9001, ()=>{
    console.log("server rodando")
})