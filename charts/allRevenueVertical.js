var connection = require('../connection/connection.js')
var co = require('co');
var generate = require('node-chartist');
var jsonexport = require('jsonexport');
var fs = require('fs');
var arraySort = require('array-sort');
var forCSVexport = require('../utils/export.js');
var clearFile = require('../utils/wipeFile.js');

function logResults(result, res, title, dataName, thisSymbol) {
  var monthlytotal = [0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.];
  var verticalTotal = [];
  var months = Object.keys(result[0]);
  months.shift();
  var passEmp = [];
  var graphMonth = [];
  var labels = [];
  var max = 0;
  var annualTotal = 0;

  for (var i = 0; i < result.length; i++) {
    labels[i] = result[i].vertical;
    var total = 0;
    var individual = {};
    var values = [];
    individual.label = labels[i];
    individual.dataType = "Vertical: ";
    individual.symbol = thisSymbol;

    for (var j = 0; j < months.length; j++) {
      individual[months[j]] = result[i][months[j]].toLocaleString();
      total += result[i][months[j]];
      monthlytotal[j] += result[i][months[j]];
      annualTotal += result[i][months[j]];
    }
    for (var k = 0; k < months.length; k++) {
      values[k] = individual[months[k]];
    }
    individual.total = total;
    passEmp.push(individual);
    verticalTotal.push(total);

    if (total > max) {
      max = total
    };
    var passMonth = [];

    for (var l = 0; l < months.length; l++) {
      // console.log(months[i]+": $"+monthlytotal[i]);
      var intermediate = {};
      intermediate.month = months[l];
      intermediate.total = monthlytotal[l].toLocaleString();
      intermediate.symbol = thisSymbol;
      passMonth.push(intermediate);
    }
    graphMonth.push(values);
  }
  var sortEmp = arraySort(passEmp, "total");
  passEmp = sortEmp;
  var totalMonthly = {};
  totalMonthly.label = "Total: ";
  totalMonthly.dataType = "Vertical: ";
  totalMonthly.symbol = thisSymbol;

  for (var o = 0; o < months.length; o++) {
    totalMonthly[months[o]] = monthlytotal[o].toLocaleString();
  }
  totalMonthly.total = annualTotal.toLocaleString();
  passEmp.push(totalMonthly);

  max = max * 1.05;
  co(function*() {
    var options = {
      high: max,
      low: 0,
      width: 1200,
      height: 600,
      seriesBarDistance: 15,
      axisX: { title: dataName, offset: 50 },
      axisY: { title: 'Sales (# of deals)', offset: 100 },
      distributeSeries: true
    };
    var series = [];
    var categories = [];

    for (var m = 0; m < result.length; m++) {
      var serobj = {};
      var types = {};
      serobj.name = passEmp[m].label;
      serobj.value = passEmp[m].total;
      types = passEmp[m].label;
      categories.push(types);
      series.push(serobj);
    }

    var bar = yield generate('bar', options, {
      labels: categories,
      series: series
    });
    for (var n = 0; n < passEmp.length; n++) {
      passEmp[n].total = passEmp[n].total.toLocaleString();
    }
    var thisType = "Vertical";
    //function to send information to csv file
    forCSVexport(passEmp, thisType, title);
    //function that wipes the csv file after five minutes
    setTimeout(clearFile, 300000);
    
    res.render('./graphs/mainGraphPage', {
      bar,
      months: passMonth,
      descriptor: passEmp,
      title: title,
      dataName: dataName
    });
  });
}

function grabData(tableInput, cb, res, title, dataName, thisSymbol) {
  // queryString holds query for mysql:
  connection.query(tableInput, function(err, result) {
    // if error throw it
    if (err) throw err;
    // if no error call the callback function with the query results
    cb(result, res, title, dataName, thisSymbol);
  });
}

function revenueVertical(title, dataName, newVersusReturning, startDate, endDate, res, thisSymbol) {
  var queryString = 'SELECT Deals.vertical, ' +
    'sum(if(month = 01, revenue, 0))  AS Jan, ' +
    'sum(if(month = 02, revenue, 0))  AS Feb, ' +
    'sum(if(month = 03, revenue, 0))  AS Mar, ' +
    'sum(if(month = 04, revenue, 0))  AS Apr, ' +
    'sum(if(month = 05, revenue, 0))  AS May, ' +
    'sum(if(month = 06, revenue, 0))  AS Jun, ' +
    'sum(if(month = 07, revenue, 0))  AS Jul, ' +
    'sum(if(month = 08, revenue, 0))  AS Aug, ' +
    'sum(if(month = 09, revenue, 0))  AS Sep, ' +
    'sum(if(month = 10, revenue, 0)) AS Oct, ' +
    'sum(if(month = 11, revenue, 0)) AS Nov, ' +
    'sum(if(month = 12, revenue, 0)) AS "Dec" ' +
    'FROM Deals ' +
    'WHERE (dealStatus = "Deal Won (100%)" OR dealStatus = "Very Likely (90%)") ';
  queryString += 'AND (newVersusReturning = ';

  for (var i = 0; i < newVersusReturning.length; i++) {
    queryString += '"' + newVersusReturning[i] + '"';

    if (i < (newVersusReturning.length - 1)) {
      queryString += ' OR newVersusReturning = ';
    }
  }
  queryString += ') AND closeDate BETWEEN "' + startDate + '" AND "' + endDate + '" GROUP BY vertical;';
  grabData(queryString, logResults, res, title, dataName, thisSymbol);
}

module.exports = revenueVertical;
