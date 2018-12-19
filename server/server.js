let express = require('express')
let bodyParser = require("body-parser")
const {ObjectID} = require('mongodb')

let {mongoose} = require("./db/mongoose")
let {User} = require("./models/user")
let {Todo} = require("./models/todo")

let app = express()

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    let todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    })
})

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    },(e)=>res.status(400).send(e))
})

app.get('/todos/:id',(req,res)=>{
    let id = req.params.id
    // res.send(req.params)
    !ObjectID.isValid(id) && res.status(404).send()
    Todo.findById(id).then((todo)=>{
        !todo?res.status(404).send():
        res.send({todo})
    }).catch((e)=>res.status(404).send())
},(e)=>res.send(e))

app.listen(3000,()=>console.log(`connected to port 3000`))

module.exports = {app};

