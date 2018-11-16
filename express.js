const fs = require('fs');
const http = require('http');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Item = require('./models/item');
const getById = require('./scripts/getById')
const getWeek = require('./scripts/getweek');
const getAll = require('./scripts/getallentries');
const getMonth = require('./scripts/getmonth')
const moment = require('moment');
const getWatson = require('./scripts/getwatson');
const toneSorter = require('./scripts/toneSorter');

app.use(bodyParser.urlencoded({extended:false}));

// respond with "hello world" when a GET request is made to the homepage
app.get('/',(req,res,next)=>{
    res.render('create.ejs');
})

app.post('/message',(req,res)=>{
    console.log(req.body)
    getWatson(req.body.message).then(res=> {
        //tone will be the full object
        let tone = res;
        console.log(tone)
        let overallTone = tone.document_tone.tones
        // write to a file
        let item = new Item(req.body.message,moment().toISOString(),toneSorter(overallTone),tone);
        item.save();
        fs.writeFileSync('message.txt', req.body.message)
        res.setHeader('Location','/')
        res.statusCode = 302;
        return res.end();
    }).catch(err=> {
        console.log(err)
    })

    console.log(req.body.message)
    res.redirect('/')
})

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'))


app.get('/weekplot',(req,res)=>{
    getWeek().then(function(data) {
    console.log(data)
    res.render('plot.html',{message:'Week Plot', data: data})
    }).catch(err=>{
        res.render('plot')
        console.log('whoops ge')
    })
})

app.get('/monthplot',(req,res)=>{
    getMonth().then(function(data) {
    console.log(data)
    res.render('plot.html',{message:'Month Plot', data: data})
    }).catch(err=>{
        res.render('plot')
        console.log('whoops')
    })
})

//route to handle
app.get('/entry/:id',(req,res) => {
    console.log(req.params.id)
    getById(req.params.id).then(data=>{
        console.log(data)
        res.render('show.ejs',{data:data})
    })
})

app.get('/all',(req,res)=>{
    getAll().then(function(data) {
    console.log(data)
    res.render('all.ejs',{message:'Month Plot', data: data})
    }).catch(err=>{
        res.render('all')
        console.log('whoops')
    })
})

const server = http.createServer(app)

server.listen(3000)