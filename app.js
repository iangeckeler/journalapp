const fs = require('fs');
const http = require('http');

const express = require('express');
const methodOverride = require('method-override');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const moment = require('moment');

//auth routes
const authRoutes = require('./routes/authroutes');
//other routes

const plotRoutes = require('./routes/plotroutes');
const Item = require('./models/item');
const dataById = require('./scripts/databyid');
const getById = dataById.getById;
const deleteById = dataById.deleteById;
const mongoUrl = require('./scripts/database').mongoUrl;
const getEntries = require('./scripts/getentries');


const getWatson = require('./scripts/getwatson');
const toneSorter = require('./scripts/toneSorter');

app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));

//connect session store
const store = new MongoDBStore({
    uri: mongoUrl,
    collection: 'mySessions'
  });

  // Catch errors
store.on('error', function(error) {
    console.log(error)
  });
app.use(
    session({secret:'my secret', resave:true, saveUninitialized:true,store:store})
)




//check if loggedin
app.use((req,res,next)=>{
    if (req.originalUrl =='/login' || 'css/login' || 'js/login') {
        return next()
    } else {
        console.log(req.originalUrl)
        if (!req.session.loggedIn) {
            res.redirect('./login')
        } else {
            return next()
        }
    }
})

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'))

// respond with "hello world" when a GET request is made to the homepage
app.get('/new',(req,res,next)=>{
    res.render('create.ejs',{date:moment().toISOString()});
})

app.post('/new',(req,res)=>{
    getWatson(req.body.message).then(obj=> {
        //tone will be the full object
        let tone = obj;
        //console.log(tone)
        let overallTone = tone.document_tone.tones;
        let date = new Date(req.body.date).toISOString();
        // write to a file
        let item = new Item(req.body.message,date,toneSorter(overallTone),tone,req.session.user);
        //console.log(item);
        item.save().then(data=>{
            res.redirect('/')
        }).catch(err=>{
            console.log(err)
        });
    }).catch(err=> {
        console.log(err)
        res.send('There was an error')
    })
})


app.use('/login', authRoutes);

app.use('/plot', plotRoutes)

// SHOW route
app.get('/entry/:id',(req,res) => {
    if (req.session.loggedIn) {
        getById(req.params.id).then(data=>{
            console.log(data)
            res.render('show.ejs',{data:data})
        })
    } else {
        res.redirect('/login')
    }
})

app.delete('/edit/:id',(req,res)=>{
    deleteById(req.params.id).then(data=> {
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

//edit route NOTE not complete
app.put('/edit/:id',(req,res)=> {
    console.log(req)    
    res.redirect('/edit/'+req.params.id)
})

app.get('/',(req,res)=>{
    console.log(req.session.user)
    if (req.session.loggedIn){
        getEntries('',req.session.user).then(data=> {
            let dates = data.x.map(num=>{return num.toISOString().substring(0,10)});
            console.log(data.id)
            res.render('index.ejs', {data: data,dates:dates})
            }).catch(err=>{
                res.render('index')
                console.log(err)
            })
    } else {
        res.redirect('/login')
    }
    
})

const server = http.createServer(app)

server.listen(process.env.PORT || 3000)

