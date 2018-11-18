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
        return new Promise((resolve,reject)=>{
        //connect to db
        connectDb(client => {
            let db = client.db(dbName);
            let item = {text: this.text, date: new Date(this.date),watsonObject: this.watsonObject,user:this.user,score:this.score};
            db.collection("items").insertOne(item).then(res => {
                console.log("1 document inserted ");
                client.close();
                resolve(res)
            console.log('connected to db')
                }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            })
        //save this.text
        })   
    }
}



module.exports = Item;