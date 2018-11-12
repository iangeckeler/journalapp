const moment = require('moment');
const mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;


// MongoClient.connect('mongodb://localhost:27017').then(client => {
//     db = client.db("itemdb")
//     items = db.collection('items')
//     items.findOne({"date": {"$gte": new Date(startDate), "$lt": new Date(endDate)}}).then(res => {
//     console.log(res)
//     client.close()
//     })
// }).catch(err => {
//     throw err
// })

const getWeek = function () {
    let startDate = moment().subtract(1, 'week').startOf('week').toISOString()
    let endDate = moment().startOf('week').add(1,'day').toISOString()
    let db;
    let items;
    let array;
    // added the longer date to query for multiple weeks
    return MongoClient.connect('mongodb://localhost:27017').then(client => {
        db = client.db("itemdb")
        items = db.collection('items')
        return items.find({"date": {"$gte": new Date(startDate), "$lt": new Date(endDate)}}).toArray().then(arr=>{
            console.log(arr);
            return arr
        })
})   
}
//returns a promise I understand promises much better now that was awesome I'm so in the flow right now this is so fucking fun...  
getWeek().then(function(items) {
  console.info('The promise was fulfilled with items!', items);
}, function(err) {
  console.error('The promise was rejected', err, err.stack);
});

module.exports = getWeek;


