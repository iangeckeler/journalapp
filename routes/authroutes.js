const express = require('express');
const app = express();
const router = express.Router();

///stuff for the database
const User = require('../models/user')

const bodyParser = require('body-parser');

//login
router.get('/',(req,res)=>{
    res.render('login.ejs')
});

//login
router.post('/',(req,res)=>{
    console.log(req.body.email)
    res.send('nice job')
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