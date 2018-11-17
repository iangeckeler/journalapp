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

    exists() {
        return new Promise((resolve,reject)=>{
            db(client=>{
                let db = client.db('itemdb');
                console.log(this.email)
                db.collection('users').findOne({email: this.email}).then(res=>{
                    if (res != null) {
                        resolve(true)
                    } else {
                        resolve(false)
                    };
                }).catch(err=>{
                    reject(err)
                });
            })
        })

    }
}

let user1 = new User('ijohnathan@peepee.com','poopoo')

module.exports = User;