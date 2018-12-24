// hash

const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// let data = {
//     id:4
// }

// let token = jwt.sign(data,'123abc')
// console.log(token)

// let decorded = jwt.verify(token,'123abc')
// console.log(JSON.stringify(decorded.id).toString())
// console.log(data.id === decorded.id? 'data verified' : 'data bridged')



// let message = "i am number 1"
// let hash = SHA256(message).toString()
// console.log(hash)

// let data = {
//     id:4
// }

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+"someserect").toString()
// }

// let id = data.id = 5
// token.hash = SHA256(JSON.stringify(id)).toString()
// dataResult = SHA256(JSON.stringify(data) + "someserect").toString()

// console.log(token.hash === dataResult? 'data trust':'data brigded')