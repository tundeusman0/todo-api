const {MongoClient,ObjectId} = require('mongodb');



MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true},(err,client)=>{
    err && console.log("Unable to connect to MongoDb database");
    console.log("Connected to MongoDb database")

    // let db = client.db('TodoApp')
    // db.collection('Todos').insertOne({
    //     text:'this is the second',
    //     completed:true
    // },(err,result)=>{
    //     err && console.log('unable to insert',err);
    //     console.log(JSON.stringify(result.ops,undefined,2))

    //     client.close();
    // })
});


// const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true},(err,client)=>{
    err && console.log("Unable to connect to mongodb")
    console.log("connected to mongodb")

    
    // let db = client.db("TodoApp")
    // db.collection("users").insertOne({
    //     name:"tunde usman",
    //     age: 25
    // },(err,result)=>{
    //     err && console.log("connection error", err);
    //     console.log(JSON.stringify(result.ops,undefined,2)) 
    //     client.close()

    // })
})


MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true},(err,client)=>{
    err && console.log("Unable to connect to Mongodb")
    console.log("connected to mongodb")
    // let db = client.db("TodoApp")
    // db.collection("states").insertOne({
    //     state:"kwara",
    //     capital: "ilorin"
    // },(err,result)=>{
    //     err && console.log("error ",err)
    //     console.log(JSON.stringify(result.ops,undefined,2))
    //     client.close()
    // })
})