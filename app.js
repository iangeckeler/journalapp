const http = require('http');
const fs = require('fs')

const mongodb = require('mongodb')
const MongoClient =mongodb.MongoClient;

const requestHandler = require('./routes')



const server = http.createServer(requestHandler);

server.listen(3000)