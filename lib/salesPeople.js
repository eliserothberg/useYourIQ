var request = require("request");
var Promise = require('bluebird');
var rp = require('request-promise');
var Deals = require('../models')["Deals"];
var Salespeople = require('../models')["Salespeople"];
var people = require('../utils/key2.js');
var options = require('../utils/key.js');
var totalRecords = require('../utils/key.js');
var getData = require('../utils/key.js');
var auth = require('../utils/key3.js');
var theList = require('../utils/key.js');
var salesID;
var salesName;

function getNames() {
  getData().then(function(totalRecords) {

    request(theList, function (err, res, category) {
      var salesPeople = {};
      var uniqueSalesperson = {};
      var newSalesperson = [];
      var bob = {};

      for (var i=0;i<totalRecords.length;i++){
        // if ((body.objects[i].fieldValues[0][0].raw == 12 || body.objects[i].fieldValues[0][0].raw == 8) && body.objects[i].fieldValues.process_close_date[0].raw >= 1451635200000) {

        theSalesperson = totalRecords[i].fieldValues[1][0].raw;
        newSalesperson.push(totalRecords[i].fieldValues[1][0].raw);
        // }
      }
      var uniqueSalesperson = newSalesperson.filter(function(elem, pos) {
      return newSalesperson.indexOf(elem) == pos;
      });
      // console.log("--Salespeople length = " + uniqueSalesperson.length);
          // console.log("--Salespeople array = " + uniqueSalesperson);

      var peopleArray = [];

      for (var i=0;i<uniqueSalesperson.length;i++){

        var boo = uniqueSalesperson[i];
        rp.get({
          uri: 'https://api.salesforceiq.com/v2/users/' + boo,        
          headers: 
          { 
            'Authorization': auth,
            'Content-type': 'application/json'
          },
            transform: function(body, res){
              bob = JSON.parse(body);
              return bob;
            }
          }).then(function(bob) {
            salesPeople.salesID = bob.id;
            salesPeople.salesName = bob.name;
            Salespeople.create(salesPeople);

            // console.log(salesPeople.salesName);
            // console.log(salesPeople.salesID);
            console.log("salesPeople = " + JSON.stringify(salesPeople) + "\n");
          })
          .catch(function (err) {
          console.log("A salesID no longer correlates to a person.\n")  
        })
      }
    });
  });
}
module.exports = getNames;