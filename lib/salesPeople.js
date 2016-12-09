var request = require("request");
var Promise = require('bluebird');
var rp = require('request-promise');
var Deals = require('../models')["Deals"];
var Salespeople = require('../models')["Salespeople"];
var people = require('../utils/key2.js');
var options = require('../utils/key.js');
var totalRecords = require('../utils/key.js');
var URLcounter;
var getData = require('../utils/key.js');
var auth = require('../utils/key3.js');

var people = { method: 'GET',
  url: 'https://api.salesforceiq.com/v2/users/',
  headers: 
   { 
     'Authorization': auth,
     'Content-type': 'application/json'
   },
 
  json: true
};
getData().then(function(totalRecords) {

   for (var i=0;i<totalRecords.length;i++){
      // if ((body.objects[i].fieldValues[0][0].raw == 12 || body.objects[i].fieldValues[0][0].raw == 8) && body.objects[i].fieldValues.process_close_date[0].raw >= 1451635200000) {

      theSalesperson = totalRecords[i].fieldValues[1][0].raw;
      newSalesperson.push(totalRecords[i].fieldValues[1][0].raw);
      // }
    }
    var uniqueSalesperson = newSalesperson.filter(function(elem, pos) {
    return newSalesperson.indexOf(elem) == pos;
    });

    //this gives "key number":"salesperson number",
    var salesLead = uniqueSalesperson.reduce(function(obj, result, key) {
      obj[key] = result;
      return obj;
    }, {});

    for (i=0; i<uniqueSalesperson.length; i++) {
      Salespeople.build({'salesLead': salesLead[i]})
        .save()
        .catch(function(error) {
          if (error) throw new Error(error);
      })
      console.log("salesLead" + i + " = " + salesLead[i] + "\n");
    
    console.log("Unique Salespeople = " + uniqueSalesperson  + ", " + "\n");
    console.log("salesLead = " + JSON.stringify(salesLead));

return rp(getNum)
  .then(function (ret) {
  console.log("**from keys.js * totalSize = " + ret.totalSize);
  // console.log("\n***1st ret = " + JSON.stringify(ret));
  
    //create the requestPromiseArray using a loop
      people = { 
        method: 'GET',
        url: 'https://api.salesforceiq.com/v2/users/' + uniqueSalesperson + "'",        
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
    .then(function(totalRecords) {

    console.log("\n**hi**from keys.js * totalRecords = " + totalRecords.length); 
    // debugger;
    return totalRecords.reduce(function(memo, currentRec) {
      // debugger;
      return memo.concat(currentRec.objects);
    },[]);
  })
     .catch(function (err) {
      console.log("error in API call")  
    })
}
console.log("\n****from keys.js * totalRecords = " + totalRecords);

module.exports = getData;
 var salesLead = {};
    var uniqueSalesperson = {};
    var newSalesperson = [];
}
module.exports = theList;