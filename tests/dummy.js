const fs = require('fs');

const dummyfun = require('./dummyfun')

let dummy;
fs.readFile('dummy.txt', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
        dummy = data.split('000');
        dummyfun(dummy)
});



