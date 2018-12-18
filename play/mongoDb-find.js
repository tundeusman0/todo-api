const {MongoClient,ObjectId} = require('mongodb');



MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true},(err,client)=>{
    err && console.log("Unable to connect to MongoDb database");
    console.log("Connected to MongoDb database")
    let db = client.db('TodoApp')

    db.collection("Todos").find().count().then((count)=>
    console.log(`Todos count ${count}`),
    (err)=> console.log(err)
    )
    
});



MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true},(err,client)=>{
    err && console.log("Unable to connect to mongodb")
    console.log("connected to mongodb")
    let db = client.db("TodoApp");

    db.collection("Todos").find({
        _id: new ObjectId("5c17a266d4eb3007bc1b2646")
    }).toArray().then((docs)=>{
        console.log("Todo")
        console.log(JSON.stringify(docs,undefined,2))
    },(err)=>
        console.log(err)
    )
    client.close()
    
    
})


MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true},(err,client)=>{
    err && console.log("Unable to connect to mongodb")
    console.log("connected to mongodb")

    let db = client.db("TodoApp")

    db.collection("users").find({
        
    }).count().then((result)=>console.log(JSON.stringify(result)),
    (err)=>console.log(err))
})
