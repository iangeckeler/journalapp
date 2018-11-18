const moment = require('moment');
const mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;

const connectDb = require('./database').db;
const dbName = require('./database').dbName;
const happyScoreArray = require('./happyscore')

//returns the data
const getEntries = function (period, user) {
    let startDate;
    let endDate;
    let collectionName = 'items'
    switch (period) {
        case 'week':
            startDate = moment().subtract(1, 'week').toISOString()
            break;
        case 'month':
            startDate = moment().subtract(1, 'month').toISOString()
            break;
        default: 
            startDate = moment().subtract(5, 'year').toISOString()
    }
    endDate = moment().toISOString()
    let items;
    let array;
    //handle all
    if (user == undefined){
        return 'Error, user undefined'
    } else {
        return new Promise((resolve,reject)=>{
            connectDb(client => {
                db = client.db(dbName);
                items = db.collection(collectionName)
                items.find({"date": {"$gte": new Date(startDate), "$lt": new Date(endDate)}, "user": user}).toArray().then(arr => {
                    let data;
                    data = happyScoreArray(arr);
                    resolve(data)
                    client.close();
                    }).catch(err=>{
                        reject(err)
                    })
            })

        })


        }
};  

// getEntries('','ikcgeckeler@gmail.com').then(res=>{
//     console.log(res)
// })

module.exports = getEntries;


