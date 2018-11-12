const http = require('http');
const fs = require('fs');

const Item = require('./models/item')
const moment = require('moment')
const getWatson = require('./scripts/watson')

const requestHandler = (req,res) => {
            const url = req.url;
            const method = req.method;
            //now if done
            if (url == '/') {
                res.setHeader('Content-Type','text/html');
                res.write('<html>');
                res.write('<head></head><body><h1>Hello</h1><form action="/message" method = "POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
                res.write('</html>');
                // want to exit out of if statement
                return res.end();
                }
                //&& method == 'POST'
                if(url=='/message' && method=='POST') {
                    const body = [];
                    console.log(method)
                    // event listener to listen to the streaming data in chunks, ahve to parse them and put into a string
                    req.on('data', function (chunk) {
                        console.log('in the data event')
                        console.log(chunk);
                        body.push(chunk);
                    })
                    req.on('error',function(){
                        console.log('error')
                    })
                    // now need to buffer them, create a buss for them
                    // buffer object
                    req.on('end', function () {
                        const parsedBody = Buffer.concat(body).toString();
                        console.log(parsedBody);

                        //this is where the watson part will go

                        // write to a file
                        let item = new Item(parsedBody,moment().toISOString());
                        item.save();
                        fs.writeFileSync('message.txt', parsedBody)
                        res.setHeader('Location','/')
                        res.statusCode = 302;
                        return res.end();
                    }
                    );
            // res.setHeader('Content-Type','text/html');
            // res.write('<html><head></head><body><h1>Hello</h1></body></html>');
            // res.end();
            // console.log(req);
            // console.log(req.url,req.method,req.headers);
        };
};
        
module.exports = requestHandler;