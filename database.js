const mongodb = require('mongodb');
const MongoClient =mongodb.MongoClient;

let _db;

// this functionn allows you to pass a callback into the mongoclient connect, and this will call it on the database for easier operations
// const mongoConnect = function (callback) {
//     MongoClient.connect('mongodb://localhost:27017',(err,res) => {
//     }.then(client => {
//         console.log(client)
//         _db = client.db("database");
//         console.log('connected to db')
//         return _db
//             }).catch(err => {
//                 console.log(err);
//                 throw err
//             })

// }

  
// db = mongoConnect()
// setTimeout(() => {
//     console.log(db)
// },1000)


// const getDb = () => {
//     if (_db!=null) {
//         return _db
//     } else{
//         throw 'No database found!'
//     }
// };
// db = getDb()
// console.log(db)

//exports.mongoConnect = mongoConnect;
//exports.getDb = getDb;