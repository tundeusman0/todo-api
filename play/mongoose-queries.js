const {mongoose} = require('../server/db/mongoose')
const {User} = require('../server/models/user')
const {ObjectID} = require('mongodb')

const id = "5c19007d9a1e741a680d5bd6"
// !ObjectID.isValid(id) &&
User.findById(id).then((user)=>{
    !user ? console.log("Id not found"):
    console.log(user)
},(e)=>console.log(e))