const mongoose = require("mongoose")
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

let UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: `{VALUE} is not a valid email`
            }
        },
        password: {
            type: String,
            required: true,
            monlength: 6
        },
        tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]

    }
)

UserSchema.methods.toJSON = function (){
    let user = this
    let userObject = user.toObject()
    return _.pick(userObject,['_id','email'])
}

UserSchema.methods.generateAuthToken = function () {
    let user = this
    let access = 'auth'
    let token = jwt.sign({_id:user._id.toHexString(),access},'123abc').toString()
    user.tokens.push({access,token})
    return user.save().then(()=>token)
}
UserSchema.statics.findByToken = function (token) {
    let User = this;
    let decorded;

    try{
        decorded = jwt.verify(token,'123abc')
    }catch (e){
        return Promise.reject();
    }
    return User.findOne({
        '_id':decorded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    })
    
}
UserSchema.pre('save',function (next){
    let user = this
    user.isModified('password')?
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
            user.password = hash
            next()
        })
    })
    :next()
})

let User = mongoose.model("User", UserSchema)

module.exports = {User}