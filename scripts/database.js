//had trouble getting mongo to work properly

const mongodb = require('mongodb')
const moment = require('moment')
const mongoose = require('mongoose')
const MongoClient =mongodb.MongoClient;

const db =function (callback) {
    MongoClient.connect('mongodb://localhost:27017').then(res=>{
        callback(res)
    }).catch(err=> {
        return err
    })
}

module.exports = db;