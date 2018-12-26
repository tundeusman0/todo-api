const { ObjectID } = require('mongodb')
const jwt = require('jsonwebtoken')

const { Todo } = require('./../../models/todo')
const { User } = require('./../../models/user')
const user1Id = new ObjectID();
const user2Id = new ObjectID();
const users = [{
    _id: user1Id,
    email:'tundeusma1@gmail.com',
    password: 'Userpassword1',
    tokens:[{
        access:'auth',
        token: jwt.sign({ _id:user1Id,access:'auth'},'123abc').toString()
    }]
},{
     _id: user2Id,
    email: 'tundeusmani2@gmail.com',
    password: 'Userpassword2',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: user2Id, access: 'auth' }, '123abc').toString()
    }]
}]

const todos = [{
    _id: new ObjectID(),
    text: "First test todo",
    _creator: user1Id
}, {
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333,
    _creator: user2Id
}]



const populateTodos = (done) => {
        Todo.deleteMany({}).then(() => {
            return Todo.insertMany(todos);
        }).then(() => done());
    }


const populateUsers = (done) => {
    User.deleteMany({}).then(() => {
        let userOne = new User(users[0]).save()
        let userTwo = new User(users[1]).save()
        return Promise.all([userOne, userTwo]);
    }).then(() => done());
}

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
}