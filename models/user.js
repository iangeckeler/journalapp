//script to define the Item class for the data.
const mongodb = require('mongodb');
const db = require('../scripts/database')

const User  = class {
    constructor (email,password) {
        this.email = email;
        this.password = password;
    };

    save() {
        //remember, db is a database
        db(client=>{
            let db = client.db('itemdb');
            let user = {email: this.email, password: this.password};
            db.collection('users').insertOne(user).then(res=>{
                console.log('1 user successfully inserted')
                client.close();
            }).catch(err=>{
                console.log(err)
            })
        }) 
    };
}

let user1 = new User('ian@peepee.com','poopoo')

user1.save()

module.exports = User;