const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "cp",
    password: "1234",
    database: "cptest"
})

try {
    db.connect((err)=>{
        if(err){
            throw err
        }
        else{
            console.log("DB connected successfully!!!")
        }
    })
} catch (error) {
    
}

app.use(bodyParser.json());


app.get('/', (req, res)=>{
    res.send("Hello, this is root of project awesome!!!")
})

app.get('/users', (req, res)=>{

    sql = `select * from users`;
    db.query(sql,(err, results)=>{
        if(err){
            throw err;
        }
        else{
            res.status(200).send(results);
        }
    })
})

app.get('/users/:id', (req, res)=>{
    let user_id = req.params.id;
    sql = `select * from users where uid=${user_id}`;
    db.query(sql, (err, results)=>
    {
        if(err){
            throw err;
        }
        else{
            res.status(200).send(results);
        }
    })
})

app.post('/users', (req, res)=>{
    let username = req.body.username;
    let mobile = req.body.mobile;
    let data = {username, mobile};
    sql = `INSERT INTO users SET ?`
    db.query(sql, data, (err, results)=>{
        if(err){
            throw err;
        }
        else{
            res.status(201).send(results);
        }

    })

})

app.put('/users/:id', (req, res)=>{
    user_id = req.params.id;
    username = req.body.username;

    res.send("User with Id: "+ user_id + "Get updated with username: "+ username);
})

app.patch('/users/:id', (req, res)=>{
    user_id = req.params.id;
    username = req.body.username;
    data = [username, user_id];
    sql = `update users set username=? where uid=?`;
    db.query(sql, data, (err, results)=>
    {
        if(err){
            throw err;
        }
        else{
            res.status(201).send(results);
        }
    })

    //res.send("User with Id: "+ user_id + "Get updated with username: "+ username);
})

app.delete('/users/:id', (req, res)=>{
    let user_id = req.params.id;
    sql =`delete from users where uid = ${user_id}`;
    db.query(sql, (err, results)=>{
        if(err){
            throw err;
        }
        else{
            res.status(200).send(results);
        }
    })
    //res.send("Delete user from table where user_id = "+ user_id);
})

app.listen(3000, ()=>{
    console.log("server started at 3000");
})
