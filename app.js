const fs = require('fs');
const http = require('http');

const express = require('express');
const methodOverride = require('method-override');
const app = express();
const bodyParser = require('body-parser');

const Item = require('./models/item');
const dataById = require('./scripts/databyid');
const getById = dataById.getById;
const deleteById = dataById.deleteById;
const getWeek = require('./scripts/getweek');
const getAll = require('./scripts/getallentries');
const getMonth = require('./scripts/getmonth')
const moment = require('moment');
const getWatson = require('./scripts/getwatson');
const toneSorter = require('./scripts/toneSorter');

app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/new',(req,res,next)=>{
    res.render('create.ejs');
})

app.post('/message',(req,res)=>{
    console.log(req.body)
    getWatson(req.body.message).then(res=> {
        //tone will be the full object
        let tone = res;
        console.log(tone)
        let overallTone = tone.document_tone.tones;
        let date = new Date(req.body.date).toISOString();
        // write to a file
        let item = new Item(req.body.message,date,toneSorter(overallTone),tone);
        console.log(item);
        item.save();
    }).catch(err=> {
        console.log(err)
    })

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

// SHOW route
app.get('/entry/:id',(req,res) => {
    console.log(req.params.id)
    getById(req.params.id).then(data=>{
        console.log(data)
        res.render('show.ejs',{data:data})
    })
})

app.delete('/edit/:id',(req,res)=>{
    console.log(req.params.id)
    deleteById(req.params.id).then(data=> {
        console.log(data)
        res.redirect('/')
    }).catch(err=>{
        console.log(err)
    })
})

app.get('/edit/:id',(req,res) => {
    console.log(req.params.id)
    getById(req.params.id).then(data=>{
        console.log(data)
        res.render('edit.ejs',{data:data})
    })
})

//edit route
app.put('/edit/:id',(req,res)=> {
    console.log(req)    
    res.send('Update route')
})

app.get('/',(req,res)=>{
    getAll().then(function(data) {
    console.log(data)
    res.render('index.ejs',{data: data})
    }).catch(err=>{
        res.render('index')
        console.log('whoops')
    })
})

const server = http.createServer(app)

server.listen(3000)