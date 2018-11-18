//script to define the Item class for the data.
const moment = require('moment');
const mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;
const connectDb = require('../scripts/database').db;
const dbName =  require('../scripts/database').dbName;

const Item  = class {
    constructor (text,date,score,watsonObject,user) {
        this.text = text;
        this.date = new Date(date);
        this.watsonObject = watsonObject
        this.score = score;
        this.user = user;
    };

    save() {
        //connect to db
        connectDb(client => {
            let db = client.db(dbName);
            let item = {text: this.text, date: new Date(this.date),watsonObject: this.watsonObject,user:this.user,score:this.score};
            db.collection("items").insertOne(item).then(res => {
                console.log("1 document inserted ");
                console.log(item)
                client.close();
            console.log('connected to db')
                }).catch(err => {
                    console.log(err);
                    throw err
                })
        //save this.text
        })   
    }
}



module.exports = Item;