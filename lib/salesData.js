var request = require("request");
var Deals = require('../models')["Deals"];
var Salespeople = require('../models')["Salespeople"];
var theList = require('../utils/key2.js');
var options = require('../utils/key.js');

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

request(theList, function (err, res, category) {

  request(options, function (error, response, body) {

    if (error) throw new Error(error);
    console.log("total records = " + body.totalSize);

    for (var i=0;i<body.objects.length;i++) {
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

      function getRawValueForIdOrElse(obj, id, def) {
          return getOrElseFields(obj.fieldValues[id], def);

        }
                  console.log("body.objects[i].fieldValues = " + JSON.stringify(body.objects[i].fieldValues[i]));

        //go get this catergory, if it's (List or whatever) get id and field value, 
        //match to category list, return
var thisCategory;
        function getMappedValueForIdOrElse(obj, id, def) {
          var rawValue = getRawValueForIdOrElse(obj, id, undefined);
          var result = def;
          for (var i = 0; i < 20; i++) {
          thisCategory = category.fields[i];
            return thisCategory;
            // if (thisCategory.id == id) {
            //   if(thisCategory.dataType == "List") {
            //       if(thisCategory.listOptions.id == rawValue) {
            //         result = thisCategory.listOptions[j].display;
            //         break;
                                // console.log("thisCategory = " + thisCategory);

                  }
                }
              // }
              // }  else {
              //   result = rawValue;
              // }
//                if(thisCategory.dataType == "User") {
//                   // for(var j = 0; j < thisCategory.listOptions.length; j++) {
//                   if(thisCategory.listOptions.id == rawValue) {
//                     result = thisCategory.listOptions[j].display;
//                     break;
//                                 console.log("thisCategory = " + thisCategory);
// // }
// // }
// //                   }
//           }
//                       // console.log("thisCategory = " + thisCategory);

//         }
                              console.log("thisCategory = " + thisCategory);


      var thisItem = body.objects[i];
      campaignID = getOrElse(thisItem.id, "blank");
      name = getOrElse(thisItem.name, "blank");
      dealStatus = getOrElseFields(thisItem.fieldValues[0], "blank");
      salesperson = getOrElseFields(thisItem.fieldValues[1], "blank");
      revenue = getOrElseFields(thisItem.fieldValues[3], 0);
      date = getOrElseFields(thisItem.fieldValues.process_close_date, "blank");
      newVersusReturning = getOrElseFields(thisItem.fieldValues[17], "blank");
      revenue = getOrElseFields(thisItem.fieldValues[3], 0);
      dealType = getOrElseFields(thisItem.fieldValues[44], "blank");
      vertical = getOrElseFields(thisItem.fieldValues[18], "blank");
      productLine = getOrElseFields(thisItem.fieldValues[45], "blank");
      date = getOrElse(date *1, "blank");
      closeDate = getOrElse(new Date(date).toLocaleString().split(",")[0], "blank");
      date = getOrElse(new Date(date), "blank");
      month = getOrElse((date.getMonth() + 1), "blank");
      country = getOrElseFields(thisItem.fieldValues[47], "USA");


      deal.dealStatus = dealStatus;
      deal.campaignID = campaignID;
      deal.name = name;
      deal.salesperson = salesperson;
      deal.closeDate = closeDate;
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

      console.log("\nStatus: " + deal.dealStatus);
      console.log("Campaign ID#: " + campaignID);
      console.log("Name: " + name);
      console.log("Sales Lead: " + salesperson);
      console.log("Process Close Date: " + closeDate);
      console.log("Month: " + month);
      console.log("Revenue: $" + revenue);
      console.log("Deal Type: " + deal.dealType);
      console.log("New Versus Returning: " + deal.newVersusReturning);
      console.log("Vertical: " + deal.vertical);
      console.log("Product Line: " + deal.productLine);
      console.log("Country: " + deal.country);
      console.log("**Counter = " + counter);
      console.log("----------------------------------------------------");
      console.log("deal #" + i + " = " + JSON.stringify(deal) + "\n");
      counter++;

      // Deals.create(deal);
    }
    //another file for parsing this data
    var salesLead = {};
    var uniqueSalesperson = {};
    var newSalesperson = [];

    for (var i=0;i<body.objects.length;i++){
      // if ((body.objects[i].fieldValues[0][0].raw == 12 || body.objects[i].fieldValues[0][0].raw == 8) && body.objects[i].fieldValues.process_close_date[0].raw >= 1451635200000) {

      theSalesperson = body.objects[i].fieldValues[1][0].raw;
      newSalesperson.push(body.objects[i].fieldValues[1][0].raw);
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

    // for (i=0; i<uniqueSalesperson.length; i++) {
    //   Salespeople.build({'salesLead': salesLead[i]})
    //     .save()
    //     .catch(function(error) {
    //       if (error) throw new Error(error);
    //   })
    //   console.log("salesLead" + i + " = " + salesLead[i] + "\n");
    // }
    console.log("Unique Salespeople = " + uniqueSalesperson  + ", " + "\n");
    console.log("salesLead = " + JSON.stringify(salesLead));

    // var j = body.objects.length;

    // while (j--) {
    // // pulls all closed (100%) deals AFTER 1/1/16
    //   if ((body.objects[j].fieldValues[0][0].raw==12 || body.objects[j].fieldValues[0][0].raw==8) && 
    //     body.objects[j].fieldValues.process_close_date[0].raw >= 1451635200000) {
    //     totRev = body.objects[j].fieldValues[3][0].raw;
    //     totalRevenue += parseFloat(totRev);

    //     console.log("\ncounter: " + counter + "\nname: "+ body.objects[j].name);
    //     console.log("Revenue: $"+ body.objects[j].fieldValues[3][0].raw);
    //     console.log("Total revenue: $" + totalRevenue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

    //       counter++;
    //   };
    // };
    // console.log("****************Total Revenue = $" + totalRevenue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
  });
});