var request = require("request");
var Promise = require('bluebird');
var rp = require('request-promise');
var Deals = require('../models')["Deals"];
var Salespeople = require('../models')["Salespeople"];
var theList = require('../utils/key2.js');
var options = require('../utils/key.js');
var totalRecords = require('../utils/key.js');
var URLcounter;
var getData = require('../utils/key.js');
var auth = require('../utils/key3.js');


// counter for each campaign
var counter = 1;
var size;
var salesID;
var name;
var owner;
var dealStatus;
var revenue;
var newVersusReturning;
var dealType;
var productLine;
var closeDate;
var totals;
var thisRevenue;
var vertical;
var month;
var country;
var thisName;

getData().then(function(totalRecords) {
 
  request(theList, function (err, res, category) {

    for (var i=0;i<totalRecords.length;i++) {
    //******THE FOLLOWING IF STATEMENT IS COMMENTED OUT SO WE WILL PULL ALL THE DATA*******

      // if ((body.objects[i].fieldValues[0][0].raw == 12 || body.objects[i].fieldValues[0][0].raw == 8) && body.objects[i].fieldValues.process_close_date[0].raw >= 1451635200000) {
      
      var deal = {};
      
      function getOrElse(obj, def) {
        if(!obj) {
          return def;
        } else {
          return obj;
        }
      }

      function getOrElseFields(obj, def) {
        if(!obj) {
          return def;
        } else {
          return obj[0].raw;
        }
      }

      var thisItem = totalRecords[i];
      campaignID = getOrElse(thisItem.id, "blank");
      name = getOrElse(thisItem.name, "blank");
      dealStatus = getOrElseFields(thisItem.fieldValues[0], "blank");
      salesperson = getOrElseFields(thisItem.fieldValues[1], "blank");
      revenue = getOrElseFields(thisItem.fieldValues[3], 0);
      dateCreate = getOrElseFields(thisItem.fieldValues.process_created_date, "blank");
      dateClose = getOrElseFields(thisItem.fieldValues.process_close_date, "blank");
      newVersusReturning = getOrElseFields(thisItem.fieldValues[17], "blank");
      revenue = getOrElseFields(thisItem.fieldValues[3], 0);
      dealType = getOrElseFields(thisItem.fieldValues[44], "blank");
      vertical = getOrElseFields(thisItem.fieldValues[18], "blank");
      productLine = getOrElseFields(thisItem.fieldValues[45], "blank");
      dateCreate = getOrElse(dateCreate *1, "blank");
      dateClose = getOrElse(dateClose *1, "blank");
      closeDate = getOrElse(new Date(dateClose).toLocaleString().split(",")[0], "blank");
      createDate = getOrElse(new Date(dateCreate).toLocaleString().split(",")[0], "blank");
      dateClose = getOrElse(new Date(dateClose), "blank");
      dateCreate = getOrElse(new Date(dateCreate), "blank");
      month = getOrElse((dateClose.getMonth() + 1), "blank");
      country = getOrElseFields(thisItem.fieldValues[47], "USA");

      deal.dealStatus = dealStatus;
      deal.campaignID = campaignID;
      deal.name = name;
      deal.salesperson = salesperson;
      deal.closeDate = closeDate;
      deal.createDate = createDate;
      deal.month = month;
      deal.newVersusReturning = newVersusReturning;
      deal.revenue = revenue;
      deal.dealType = dealType;
      deal.vertical = vertical;
      deal.productLine = productLine;
      deal.country = country;

      var type;

      for (j=0; j<category.fields.length; j++) {
      thisName = category.fields[j].id;

        function filterById(choice, id) {
          var choice = category.fields[j].listOptions;
          return choice.filter(function(choice) {
            return (choice['id'] == id);
          })[0];
        }

        if (thisName == "18") {
          if (theChoice = filterById(category['choice'], vertical)) {
            deal.vertical = theChoice.display;
          }
        }

        if (thisName == "0") {
          if (theChoice = filterById(category['choice'], dealStatus)) {
            deal.dealStatus = theChoice.display; 
          }
        }

        if (thisName == "17") {
          if (theChoice = filterById(category['choice'], newVersusReturning)) {
            deal.newVersusReturning = theChoice.display; 
          }
        }

        if (thisName == "45") {
          if (theChoice = filterById(category['choice'], productLine)) {
          deal.productLine = theChoice.display;
          }
        }

        if (thisName == "44") {
          if (theChoice = filterById(category['choice'], dealType)) {
            deal.dealType = theChoice.display;
          }
        }
      }

      // console.log("\nStatus: " + deal.dealStatus);
      // console.log("Campaign ID#: " + campaignID);
      // console.log("Name: " + name);
      // console.log("Sales Lead: " + salesperson);
      // console.log("Process Create Date: " + createDate);
      // console.log("Process Close Date: " + closeDate);
      // console.log("Month: " + month);
      // console.log("Revenue: $" + revenue);
      // console.log("Deal Type: " + deal.dealType);
      // console.log("New Versus Returning: " + deal.newVersusReturning);
      // console.log("Vertical: " + deal.vertical);
      // console.log("Product Line: " + deal.productLine);
      // console.log("Country: " + deal.country);
      // console.log("**Counter = " + counter);
      // console.log("----------------------------------------------------");
      // console.log("deal #" + i + " = " + JSON.stringify(deal) + "\n");
      counter++;

      // Deals.create(deal);
    }
    //another file for parsing this data
    var salesLead = {};
    var uniqueSalesperson = {};
    var newSalesperson = [];
    var bob = {};

    for (var i=0;i<totalRecords.length;i++){
      // if ((body.objects[i].fieldValues[0][0].raw == 12 || body.objects[i].fieldValues[0][0].raw == 8) && body.objects[i].fieldValues.process_close_date[0].raw >= 1451635200000) {

      theSalesperson = totalRecords[i].fieldValues[1][0].raw;
      newSalesperson.push(totalRecords[i].fieldValues[1][0].raw);
      // console.log("newSalesperson = " + theSalesperson);
      // }
    }
    var uniqueSalesperson = newSalesperson.filter(function(elem, pos) {
    return newSalesperson.indexOf(elem) == pos;
    });
    console.log("--Salespeople length = " + uniqueSalesperson.length);
        // console.log("--Salespeople array = " + uniqueSalesperson);

  var peopleArray = [];

    // var salesLead = uniqueSalesperson.reduce(function(obj, result, key) {
    //   obj[key] = result;
    //   return obj;
    // }, {});
    //     console.log("--Saleslead = " + JSON.stringify(salesLead));

    for (var i=0;i<uniqueSalesperson.length;i++){
      var boo = uniqueSalesperson[i];
      var people = { 
        method: 'GET',
        url: 'https://api.salesforceiq.com/v2/users/' + boo,        
        headers: 
        { 
          'Authorization': auth,
          'Content-type': 'application/json'
        },
        json: true
      }
         console.log("--boo Salespeople names = " + boo);

      // uniqueSalespeopleArray.push(rp(people));
    }
        
      return rp(people)

  .then(function (x) {
  // console.log("\n***1st ret = " + JSON.stringify(ret));
      console.log("--then Salespeople names = " + x.name);
            console.log("--ret = " + JSON.stringify(x));
          // console.log("-- uniqueSalespeopleArray = " + uniqueSalespeopleArray);

          //change this so the salesLeads are names
var salesLead = uniqueSalesperson.reduce(function(obj, result, key) {
      obj[key] = result;
      return obj;
    }, {});
        // console.log("--Saleslead = " + JSON.stringify(salesLead));

});

    console.log("foo");

      // console.log("--people = " + JSON.stringify(people));

    //this gives "key number":"salesperson number",
    // var salesLead = uniqueSalesperson.reduce(function(obj, result, key) {
    //   obj[key] = result;
    //   return obj;
    // }, {});

    // for (i=0; i<uniqueSalesperson.length; i++) {
    //   Salespeople.build({'salesLead': salesLead[i]})
    //     .save()
    //     .catch(function(error) {
    //       if (error) throw new Error(error);
    //   })
    //   console.log("salesLead" + i + " = " + salesLead[i] + "\n");
    // }
    // console.log("Unique Salespeople = " + uniqueSalesperson  + ", " + "\n");
    // console.log("salesLead = " + JSON.stringify(salesLead));


  });
      // console.log("--people = " + JSON.stringify(people));
    console.log("foo");

});

// return Promise.all(uniqueSalespeopleArray)
//         .then(function (bob) {
//         // console.log("***requestPromiseArray = " + JSON.stringify(totalRecords.length));
//         console.log("**from keys.js * results.length = " + bob.length);
//         return bob;
//         });
//       })
//       .then(function(bob) {

//     // console.log("\n**hi**from keys.js * totalRecords = " + totalRecords.length); 
//     // debugger;
//         return bob.reduce(function(memo, currentRec) {
//       // debugger;
//           return memo.concat(currentRec.objects);
//         },[]);
//       })
//      .catch(function (err) {
//       console.log("error in sales API call")  
//       })



// var salesLead = uniqueSalesperson.reduce(function(obj, result, key) {
    //   obj[key] = result;
    //   return obj;
    // }, {});
    //     console.log("--Saleslead = " + JSON.stringify(salesLead));

