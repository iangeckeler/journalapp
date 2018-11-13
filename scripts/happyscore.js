//this function just needs to query the db and get the proper view for the data
const moment = require('moment')

// function that writes a function to change the date and pulls the happyscore out
const happyScore = function(items) {
    let data=[];
    for (let i =0;i<items.length;i++) {
        data.push({
            x: new Date(items[i].date),
            y: items[i].score[0]
        })
    }
    return data
}

const happyScoreArray = function(items) {
    let data={
        x: [],
        y: []
    };
    for (let i =0;i<items.length;i++) {
        data.x.push(new Date(items[i].date));
        data.y.push(items[i].score[0]);
        }
        return data
    }

module.exports= happyScoreArray;