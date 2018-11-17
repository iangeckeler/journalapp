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
    // checks passwords object against the one in the database
    //returns true or false
    validate() {
        return new Promise((resolve,reject) => {
            db(client =>{
                let db = client.db('itemdb');
                db.collection('users').findOne({email:this.email}).then(res=>{
                    if(res != null){
                        if(res.password==this.password){
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    } else {
                        reject('no user found')
                    }
                }).catch(err=>{
                    console.log(err)
                })
            })
        })
    }

    getPass() {
        return this.password
    }
}

let user1 = new User('ian@peepee.com','pooasdfasdfadsfadsfpoo')

module.exports = User;