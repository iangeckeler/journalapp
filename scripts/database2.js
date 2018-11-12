//had trouble getting mongo to work properly

const mongodb = require('mongodb')
const moment = require('moment')
const mongoose = require('mongoose')
const MongoClient =mongodb.MongoClient;

MongoClient.connect('mongodb://localhost:27017')
.then(client=> {
    let db = client.db("itemdb");
    let item = { text: "Today was bad", date: moment().calendar()};
    db.collection("items").insertOne(item).then(res=> {
        console.log("1 document inserted");
        client.close();
    }).catch(err=>{
        console.log(err)
    })
    })
.catch(err=>{
    console.log(err);
})  