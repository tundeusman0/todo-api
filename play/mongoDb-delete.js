const {MongoClient,ObjectId} = require('mongodb');



MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true},(err,client)=>{
    err && console.log("Unable to connect to MongoDb database");
    console.log("Connected to MongoDb database")
    let db = client.db('TodoApp')

    
    
});



MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true},(err,client)=>{
    err && console.log("Unable to connect to mongodb")
    console.log("connected to mongodb")
    let db = client.db("TodoApp");

    // deleteMany
    // db.collection("Todos").deleteMany({
    //     text:"this is the first"
    // }).then((result)=>console.log(result),(err)=>console.log(err))

    // deleteOne
    // db.collection("Todos").deleteOne({
    //     text: "this is the first"
    // }).then((result)=>console.log(result),
    // (err)=>console.log(err)
    // )

    // findOneAndDelete
    // db.collection("Todos").findOneAndDelete({
    //     text: "this is the first"
    // }).then((result)=>console.log(result),(err)=>console.log(err))
      
})

MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true},(err,client)=>{
    err && console.log("Unable to connect to mongodb")
    console.log("connected to mongodb")

    let db = client.db("TodoApp")

    // deleteMany
    // db.collection("users").deleteMany({
    //     name:"tunde usman"
    // }).then((result)=>console.log(result.result),(err)=>
    //     console.log(err)
    // )

    // findOneAndDelete
    db.collection("users").findOneAndDelete({
        _id: new ObjectId("5c18b70873c6b617d8d45b46")
    }).then((result)=>console.log(result),(err)=>console.log(err))
})



