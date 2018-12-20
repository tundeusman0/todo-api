const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')


const {app} = require('./../server')
const {Todo} = require('./../models/todo')

const todos = [{
    _id: new ObjectID(),
    text:"First test todo"

},{
    _id: new ObjectID(),
    text:"Second test todo",
    completed: true,
    completedAt: 333
}]

beforeEach((done)=>{
    Todo.deleteMany({}).then(()=>{
        Todo.insertMany(todos);
    }).then(()=>done())
})

describe('POST /todos',()=>{
    it('should create a new todo',(done)=>{
        let text = "test todo text"
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text)
            })
            .end((err)=>{
                err && done(err)
                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text)
                    done();
                }).catch((e)=>done(e))
            })
    })

    it('should not set when bad data if created',(done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .expect((res)=>{
                expect(res.body.text).toBe()
            })
            .end((err)=>{
                err && done(err)
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2)
                    done();
                }).catch((e)=>done(e))
            })
    })

});

describe("GET /todo",()=>{
    it('should get all todos',(done)=>{
        request(app)
            .get("/todos")
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)
            })
            .end(done)
    })
    
})


describe('GET /todo/:id',()=>{
    it('should return todo doc',(done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    })
    
    it('should return a 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    })

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .expect((res) => {
                expect(res.body.todo).toBe()
            })
            .end(done)
    })
})

describe('DELETE /Todos/:id',()=>{
    it('should delete todos with valid id',(done)=>{
        let id = todos[0]._id.toHexString()
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo._id).toBe(id)
            })
            .end((err)=>{
                err? done(err):
                Todo.findById(id).then((doc)=>{
                    expect(doc).toNotExist()
                    done()
                }).catch((e)=>done(e))

            })
    })

    it('should return 404 for invalid delete id',(done)=>{
        let id = new ObjectID()
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .expect((res)=>{
                expect(res.body.todo).toBe()
            })
            .end(done)
    })

    it('should return 404 for non-object id',(done)=>{
        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done)
    })
})

describe('PATCH /Todos/:id',()=>{
    it('should update with a valid id',(done)=>{
        let id = todos[0]._id.toHexString()
        let text = "this should be the new text"
        let completed = true
        request(app)
            .patch(`/todos/${id}`)
            .send({text,completed})
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(text)   
                expect(res.body.todo.completed).toBe(completed)   
                expect(res.body.todo.completedAt).toBeA('number')   
            })
            .end((err)=>{
                err ? done(err) :
                Todo.find({ text, completed }).then((todos) => {
                    expect(todos[0].text).toBe(text)
                    expect(todos[0].completed).toBe(completed)
                    expect(todos[0].completedAt).toBeA('number')
                    done();
                }).catch((e) => done(e))
            })
    })

    it('should clear completedAt when todo is not completed',(done)=>{
        let id = todos[1]._id.toHexString()
        let text = "this should be the new text !!"
        let completed = false
        request(app)
            .patch(`/todos/${id}`)
            .send({ text,completed})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text)
                expect(res.body.todo.completed).toBe(completed)
                expect(res.body.todo.completedAt).toNotExist()
            })
            .end((err) => {
                err ? done(err) :
                    Todo.find({ text, completed }).then((todos) => {
                        expect(todos[0].text).toBe(text)
                        expect(todos[0].completed).toBe(completed)
                        expect(todos[0].completedAt).toNotExist()
                        done();
                    }).catch((e) => done(e))
            })
    })
})