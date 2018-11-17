const moment = require('moment');
const mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;

const happyScoreArray = require('./happyscore')

//returns the data
const getAll = function () {
    let startDate = moment().subtract(1, 'month').startOf('month').toISOString()
    let endDate = moment().startOf('month').add(3,'day').toISOString()
    let db;
    let items;
    let array;
    // added the longer date to query for multiple weeks
    return MongoClient.connect('mongodb://localhost:27017').then(client => {
        db = client.db("itemdb")
        items = db.collection('items')
        return items.find({}).toArray().then(arr=>{
            let data;
            data = happyScoreArray(arr);
            return data
        })
})   
}


module.exports = getAll;