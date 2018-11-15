//creates a bunch of dummy data to be able to practice over the course of a long time

//dummy data json object is a bunch of data, array of strings, each string is a journal entry
const moment = require('moment')

const getWatson = require('../scripts/getwatson')
const toneSorter = require('../scripts/toneSorter')
const Item = require('../models/item')

const dummyfun = function(dummy) {
    for (let i = 0;i<dummy.length;i++) {
    //puts the date in 
    let day = moment().subtract(i, 'day').toISOString();

    // stop the random and actually retrieve the data from api
    getWatson(dummy[i]).then(res=> {
        let tone = res;
        let overallTone = tone.document_tone.tones
        console.log(overallTone);
        console.log(overallTone.length)
        console.log(toneSorter(overallTone))
        let item = new Item(dummy[i],day,toneSorter(overallTone),tone);
        item.save();
    }).catch(err=> {
        console.log(err)
    })
}
}

module.exports = dummyfun;