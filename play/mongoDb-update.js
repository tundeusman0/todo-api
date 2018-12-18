const {MongoClient,ObjectId} = require('mongodb');



// MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true},(err,client)=>{
//     err && console.log("Unable to connect to mongodb")
//     console.log("connected to mongodb")
//     let db = client.db("TodoApp");

//     db.collection("Todos").findOneAndUpdate({
//         _id: new ObjectId("5c17a1f18c7a2317a4d6ca7f")
//     },{
//         $set:{
//             text: "this is the first"
//         }
//     },{
//         returnOriginal:false
//     }).then((result)=>console.log(result),(err)=>console.log(err))
// })

MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true},(err,client)=>{
    err && console.log("Unable to connect to Mongodb")
    console.log("connected to mongodb")

    let db = client.db("TodoApp")

    // db.collection("users").findOneAndUpdate({
    //     _id: new ObjectId("5c17a48e130bcd1220264dd6")
    // },{
    //     $set:{
    //         name: "tunde usman"
    //         }
    // },{
    //     returnOriginal:false
    // }).then((result)=>console.log(result),(err)=>console.log(err))

    db.collection("users").findOneAndUpdate({
        _id: new ObjectId("5c17a48e130bcd1220264dd6")
    },{
        $inc:{
            age: +1
        }
    },{
        returnOriginal:false
    }).then((result)=>console.log(result),(err)=>console.log(err))
})



