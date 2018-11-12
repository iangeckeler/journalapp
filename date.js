const moment = require('moment');
const mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://localhost:27017').then(client => {
    db = client.db("itemdb")
    items = db.collection('items')
    items.findOne({"date": {"$gte": new Date("2015-10-01T00:00:00.000Z")}}).then(res => {
        console.log(res)
    }).catch(err => {
        throw err
    })
}).catch(err => {
    throw err
})

