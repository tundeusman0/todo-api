const express = require('express')
const bodyParser = require("body-parser")
const {ObjectID} = require('mongodb')
const _ = require('lodash')

const {mongoose} = require("./db/mongoose")
const {User} = require("./models/user")
const {Todo} = require("./models/todo")

let app = express()
const port = process.env.PORT || 3000

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

app.delete('/todos/:id',(req,res)=>{
    let id = req.params.id
    !ObjectID.isValid(id) && res.status(404).send()
    Todo.findByIdAndDelete(id).then((todo)=>{
        !todo? res.status(404).send(): res.status(200).send({todo})
    }).catch((e)=>res.status(404).send())
})

app.patch('/todos/:id',(req,res)=>{
    let id = req.params.id
    let body = _.pick(req.body,['text','completed'])
    !ObjectID.isValid(id) && res.status(404).send()
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false,
        body.completedAt = null
    }
    
    Todo.findOneAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        !todo ? res.status(404).send() : res.status(200).send({ todo })
    }).catch((e) => res.status(404).send())
})

app.listen(port,()=>console.log(`connected to port ${port}`))

module.exports = {app};

