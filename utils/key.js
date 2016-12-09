var request = require("request");
var Promise = require('bluebird');
var rp = require('request-promise');
var auth = require('../utils/key3.js');

var getNum;
var options;
var size;
var callNumber;
var URLcounter = 0;
var totalRecords;

var getNum = {
  method: 'GET',
  uri: 'https://api.salesforceiq.com/v2/lists/57114e10e4b0a3f93805ebc6/listitems?_start=0&_limit=1',
    headers: 
    { 
      'Authorization': auth,
      'Content-type': 'application/json'
    },
    json: true
};
function getData () { 

return rp(getNum)
  .then(function (ret) {
  console.log("**from keys.js * totalSize = " + ret.totalSize);
  // console.log("\n***1st ret = " + JSON.stringify(ret));

  size = ret.totalSize;
  callNumber = Math.ceil(size/200);
  var requestPromiseArray = [];
    for (j=0; j<callNumber; j++) {  
    //create the requestPromiseArray using a loop
      options = { 
        method: 'GET',
        uri: 'https://api.salesforceiq.com/v2/lists/57114e10e4b0a3f93805ebc6/listitems?_start=' + URLcounter + '&_limit=200',
        headers: 
        { 
          'Authorization': auth,
          'Content-type': 'application/json'
        },
        json: true
      }
      if (!options.uri) {
      }
      requestPromiseArray.push(rp(options));
      URLcounter = URLcounter +200;
    }

    return Promise.all(requestPromiseArray)
      .then(function (totalRecords) {
        console.log("***requestPromiseArray = " + JSON.stringify(totalRecords.length));
        console.log("\n**from keys.js * results.length = " + totalRecords.length);
        console.log("\n**from keys.js * URLcounter = " + URLcounter);
        return totalRecords;
      });
    })
    .catch(function (err) {
      console.log("error in API call")  
    })
    .then(function(totalRecords) {

    console.log("\n**hi**from keys.js * totalRecords = " + totalRecords.length); 
    // debugger;
    return totalRecords.reduce(function(memo, currentRec) {
      // debugger;
      return memo.concat(currentRec.objects);
    },[]);
  });
}
console.log("\n****from keys.js * totalRecords = " + totalRecords);

module.exports = getData;