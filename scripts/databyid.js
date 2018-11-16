const moment = require('moment');
const mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;
var ObjectID = require('mongodb').ObjectID;


//returns the data
const getById = function (id) {
    let db;
    let items;
    let array;
    // added the longer date to query for multiple weeks
    return MongoClient.connect('mongodb://localhost:27017').then(client => {
        db = client.db("itemdb")
        items = db.collection('items')
        return items.findOne({"_id": new ObjectID(id)}).then(res=>{
            return res
        }).catch(err=>{
            console.log(err);
        })
})   
}

const deleteById = function (id) {
    let db;
    let items;
    let array;
    // added the longer date to query for multiple weeks
    return MongoClient.connect('mongodb://localhost:27017').then(client => {
        db = client.db("itemdb")
        items = db.collection('items')
        return items.deleteOne({"_id": new ObjectID(id)}).then(res=>{
            return res
        }).catch(err=>{
            console.log(err);
        })
})   
}

getById().then(res=>{
  console.log(res)
})


module.exports = {
    deleteById: deleteById,
    getById: getById
}