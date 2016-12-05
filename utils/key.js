var request = require("request");


var options = { method: 'GET',
  url: 'https://api.salesforceiq.com/v2/lists/57114e10e4b0a3f93805ebc6',
  headers:
   {
     authorization: 'NTgwN2IyYmFlNGIwOWQzYjc1ZmMwMjU4OkUxaFZCc0ozQ1dPS0hnR3V6Rkx1NGNZTHkyNA==',
     'content-type': 'application/json'},

  json: true
};

var size;
var callNumber;
var URLcounter = 0;

request(options, function (error, response, body) {
  size = body.totalSize -1;
  console.log("total records = " + size + "\n");

  var callNumber = Math.ceil(size/200);
  return callNumber;
  console.log("number of API calls needed: " + callNumber);

  var j = callNumber;

  for (j=0; j<callNumber; j++) {

    var options = { method: 'GET',
      url: '-' + URLcounter + '&_limit=200',
      headers:
       {
         'authorization': '-',
         'content-type': 'application/json'
       },
      json: true
    }
    URLcounter = URLcounter + 200;

    console.log("inside URLcounter = " + URLcounter + "\n");
  }

    console.log("outside URLcounter = " + URLcounter + "\n");
});

module.exports = options;
