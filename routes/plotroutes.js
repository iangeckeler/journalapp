const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session')

const getWeek = require('../scripts/getweek');
const getAll = require('../scripts/getallentries');
const getMonth = require('../scripts/getmonth')

router.get('/month',(req,res)=>{
    getMonth().then(function(data) {
    console.log(data)
    res.render('plot.html',{message:'Month Plot', data: data})
    }).catch(err=>{
        res.render('plot')
        console.log('whoops')
    })
})

router.get('/all',(req,res)=>{
    getAll().then(function(data) {
    console.log(data)
    res.render('plot.html',{message:'All Plot', data: data})
    }).catch(err=>{
        res.render('plot')
        console.log('whoops')
    })
})

router.get('/week',(req,res)=>{
    getWeek().then(function(data) {
    console.log(data)
    res.render('plot.html',{message:'Week Plot', data: data})
    }).catch(err=>{
        res.render('plot')
        console.log('whoops')
    })
})

module.exports = router;