let express = require('express')
let bodyParser = require("body-parser")

let {mongoose} = require("./db/mongoose")
let {User} = require("./models/user")
let {Todo} = require("./models/todo")

let app = express()

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    let todo = new Todo({
        text: req.body.text
    })
    // todo.save().then((doc)=>{
    //     res.send(doc);
    // },(e)=>{
    //     res.status(400).send(e);
    // })
    todo.save().then((res)=>res.send(res),(e)=>res.status(400).send(e))
})
app.listen(3000,()=>console.log(`connected to port 3000`))

// let newUser = new User({
//     email:"tundeusman@gmail.com"
// })

// let newtodo = new Todo({
//     text: "tundeusman@gmail.com"
// })


// newtodo.save().then((res)=>console.log("isokay",res),(e)=>console.log(e))
// newUser.save().then((res)=>console.log("saved",res),(e)=>console.log(e))

