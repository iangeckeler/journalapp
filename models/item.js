//script to define the Item class for the data.

const moment = require('moment');
const mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;

const Item  = class {
    constructor (text,date,score) {
        this.text = text;
        this.date = date;
        this.score = score;
    };

    save() {
        //connect to db
        MongoClient.connect('mongodb://localhost:27017').then(client => {
            let db = client.db("itemdb");
            let item = { text: this.text, date: this.date};
            db.collection("items").insertOne({ text: this.text, date: new Date(this.date), score: this.score}).then(res => {
                console.log("1 document inserted "+item.date);
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