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

  
// function that writes data to a format for plotly
const happyScoreArray = function(items) {
    //first sort the items by date
    items.sort(function compare(a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateB - dateA;
      });
      //console.log(items)

    let data={
        x: [],
        id:[],
        y: [],
        z:[],
        text:[]
    };
    for (let i =0;i<items.length;i++) {
        let text = items[i].text;
        text = text.replace(/[^a-z0-9., ]+/gi, '')
        data.text.push(text);
        data.id.push(items[i]._id);
        data.x.push(new Date(items[i].date));
        data.y.push(items[i].score[0]);     
        data.z.push(items[i].score[1]);  
    }
        return data
    }

module.exports= happyScoreArray;