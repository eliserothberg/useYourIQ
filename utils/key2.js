var auth = require('../utils/key3.js');

var theList = { method: 'GET',
  url: 'https://api.salesforceiq.com/v2/lists/57114e10e4b0a3f93805ebc6',
  headers: 
   { 
     'Authorization': auth,
     'Content-type': 'application/json'
   },
 
  json: true
};

module.exports = theList;