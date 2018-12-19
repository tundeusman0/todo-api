const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')


beforeEach((done)=>{
    Todo.deleteMany({}).then(()=>done())
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
            .end((err,res)=>{
                err && done(err)
                Todo.find().then((todos)=>{
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
                    expect(todos.length).toBe(0)
                    done();
                }).catch((e)=>done(e))
            })
    })
})