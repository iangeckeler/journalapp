const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session')

///stuff for the database
const User = require('../models/user')

//login
router.get('/',(req,res)=>{
    res.render('login.ejs',{message:''})
});

//login
router.post('/',(req,res)=>{
    let user = new User(req.body.email,req.body.password);
    //check if user exists
    user.exists().then(exists=>{
        if (!exists){
            res.render('login.ejs', {message: 'No User exists'});
        } else {
            user.validate().then(validated=>{
                if (validated) {
                    req.session.loggedIn = true;
                    req.session.user = user.email;
                    res.redirect('/')
                } else {
                    res.render('login.ejs',{message:"Oops, incorrect password"})
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }).catch(err=>{
        console.log(err)
    })
});

//sign up
router.get('/signup',(req,res)=>{
    res.render('signup.ejs',{message: ''})
});

router.post('/signup',(req,res)=>{
    let user = new User(req.body.email,req.body.password1);
    //check if user exists
    user.exists().then(exists=>{
        if (exists){
            res.render('signup.ejs', {message: 'User already exists, idiot'});
        } else if (req.body.password1!=req.body.password2) {
            res.render('signup.ejs', {message: "Passwords don't match"})
        } else {
        user.save()
        res.redirect('/login')
        }
    }).catch(err=>{
        console.log(err)
    })
})


module.exports = router;