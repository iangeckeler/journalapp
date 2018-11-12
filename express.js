const fs = require('fs');
const http = require('http');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Item = require('./models/item');
const moment = require('moment');
const getWatson = require('./scripts/watson');
const toneSorter = require('./scripts/toneSorter');

app.use(bodyParser.urlencoded({extended:false}));

// respond with "hello world" when a GET request is made to the homepage
app.get('/',(req,res,next)=>{
    res.send('<head></head><body><h1>Hello</h1><form action="/message" method ="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
})

app.post('/message',(req,res)=>{
    console.log(req.body)
    getWatson(req.body.message).then(res=> {
        let tone = JSON.parse(res);
        let overallTone = tone.document_tone.tones
        // write to a file
        let item = new Item(req.body.message,moment().toISOString(),toneSorter(overallTone));
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

const server = http.createServer(app)

server.listen(3000)