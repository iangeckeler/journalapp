//had trouble getting mongo to work properly

const mongodb = require('mongodb')
const moment = require('moment')
const mongoose = require('mongoose')
const MongoClient =mongodb.MongoClient;

const user = 'geckeler'
const pass = 'eHwR44nP7XzUU9u';
const dbName = 'moody'

const mongoUrl = 'mongodb://'+user+':'+pass+'@ds151068.mlab.com:51068/moody';
const localMongoUrl = 'mongodb://localhost:27017';

const db =function (callback) {
    MongoClient.connect(mongoUrl).then(res=>{
        callback(res)
    }).catch(err=> {
        return err
    })
}

// db((res)=>{
//     console.log(res)
// })

module.exports = {
    db:db,
    dbName:dbName,
    mongoUrl:mongoUrl
}