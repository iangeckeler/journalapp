// tone analyzer
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const requireText = require('require-text');

const toneSorter = require('./toneSorter')


//api and requirements
const toneAnalyzer = new ToneAnalyzerV3({
  version_date: '2017-09-21',
  iam_apikey: 'jIavl_avmdfmEBuoql6Wm-BDL7mc4T4Dxjhog2CyULZ7',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
});
//write a function that returns text from the watson object
const getWatson = function (text) {
    let toneParams = {
        tone_input: { 'text': text },
        content_type: 'application/json'
      };
        return new Promise((resolve,reject)=> {
          toneAnalyzer.tone(toneParams, function (error, toneAnalysis) {
              if (error) {
                console.log(error);
                reject(error)
              } else {
                //console.log(JSON.stringify(toneAnalysis, null, 2));
                //currently writes to JSON file and saves it
                let data = JSON.stringify(toneAnalysis);
                resolve(data)
                //fs.writeFileSync('toneAnalysis.json', data);
              }
            });
        })
}

module.exports = getWatson;

// //this is how you utilize the object
// getWatson(text).then(res=> {
//     let tone = JSON.parse(res);
//     let overallTone = tone.document_tone.tones
//     console.log(overallTone);
//     console.log(overallTone.length)
//     console.log(toneSorter(overallTone))
// }).catch(err=> {
//     console.log(err)
// })