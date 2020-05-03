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
    res.send("List of all users")
})

app.get('/users/:id', (req, res)=>{
    let user_id = req.params.id;
    res.send("Fetch the user with ID:" + user_id);
})

app.post('/users', (req, res)=>{
    let username = req.body.username;
    let pass = req.body.password;
    console.log(username, pass);
    res.send("User created!!");
})

app.put('/users/:id', (req, res)=>{
    user_id = req.params.id;
    username = req.body.username;

    res.send("User with Id: "+ user_id + "Get updated with username: "+ username);
})

app.patch('/users/:id', (req, res)=>{
    user_id = req.params.id;
    username = req.body.username;

    res.send("User with Id: "+ user_id + "Get updated with username: "+ username);
})

app.delete('/users/:id', (req, res)=>{
    let user_id = req.params.id;
    res.send("Delete user from table where user_id = "+ user_id);
})

app.listen(3000, ()=>{
    console.log("server started at 3000");
})
