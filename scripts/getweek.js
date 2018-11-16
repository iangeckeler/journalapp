const moment = require('moment');
const mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;

const happyScoreArray = require('./happyscore')

//returns the data
const getWeek = function () {
    let startDate = moment().subtract(1, 'week').toISOString()
    let endDate = moment().toISOString()
    let db;
    let items;
    let array;
    // added the longer date to query for multiple weeks
    return MongoClient.connect('mongodb://localhost:27017').then(client => {
        db = client.db("itemdb")
        items = db.collection('items')
        return items.find({"date": {"$gte": new Date(startDate), "$lt": new Date(endDate)}}).toArray().then(arr=>{
            let data;
            data = happyScoreArray(arr);
            return data
        })
})   
}


module.exports = getWeek;


