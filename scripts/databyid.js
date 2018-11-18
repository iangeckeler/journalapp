const moment = require('moment');
const mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;
var ObjectID = require('mongodb').ObjectID;
const connectDb = require('./database').db;
const dbName = require('./database').dbName;



//returns the data
const getById = function (id) {
    let db;
    let items;
    let array;
    // added the longer date to query for multiple weeks
    return new Promise((resolve,reject)=>{
        connectDb(client => {
            db = client.db(dbName)
            items = db.collection('items')
            items.findOne({"_id": new ObjectID(id)}).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err);
            })
    })

})   
}

//returns the data
const deleteById = function (id) {
    let db;
    let items;
    let array;
    // added the longer date to query for multiple weeks
    return new Promise((resolve,reject)=>{
        connectDb(client => {
            db = client.db(dbName)
            items = db.collection('items')
            items.deleteOne({"_id": new ObjectID(id)}).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err);
            })
    })
})   
}

// const deleteById = function (id) {
//     let db;
//     let items;
//     let array;
//     // added the longer date to query for multiple weeks
//     connectDb(client => {
//         db = client.db("itemdb")
//         items = db.collection('items')
//         return items.deleteOne({"_id": new ObjectID(id)}).then(res=>{
//             return res
//         }).catch(err=>{
//             console.log(err);
//         })
// })   
// }

// getById("5bf1e7cec1733c1ccc5e2bd0").then(res=>{
//   console.log(res)
// })

// deleteById("5bf1e7cec1733c1ccc5e2bd0").then(res=>{
//     console.log(res)
//   })

module.exports = {
    deleteById: deleteById,
    getById: getById
}