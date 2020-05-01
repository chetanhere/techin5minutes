const express = require('express')
const app = express();

app.get('/', (req, res)=>{
    res.send("Hello, this is root of project awesome!!!")
})
app.get('/users', (req, res)=>{
    res.send("List of all users")
})


app.listen(3000, ()=>{
    console.log("server started at 3000");
})