//write a function that will pull out all of the tones into an easier to use object with joyscore and sadness raw_scores
//leaves it be -1 if not
const toneSorter = (toneObj) => {
  let joyScore =0;
  let sadScore =0;
  for (let i=0;i<toneObj.length;i++) {
    //initialize variables
    if (toneObj[i].tone_id == 'joy') {
      joyScore = toneObj[i].score
    } else if (toneObj[i].tone_id == 'sadness')  {
      sadScore = toneObj[i].score
    }
  }
  return [joyScore,sadScore]
}
module.exports = toneSorter;
