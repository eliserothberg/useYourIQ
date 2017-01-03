var connection = require('../connection/connection.js')
var co = require('co');
var generate = require('node-chartist');
var fs = require('fs');
var jsonexport = require('jsonexport');
var arraySort = require('array-sort');
var forCSVexport = require('../utils/export.js');
var clearFile = require('../utils/wipeFile.js');

function logResults(result, res, title, dataName, thisSymbol) {
  var monthlytotal = [0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.];
  var salesTotal = [];
  var productLineTotal = [];
  var months = Object.keys(result[0]);
  months.shift();
  var passEmp = [];
  var graphMonth = [];
  var labels = [];
  var max = 0;
  var annualTotal = 0;

  for (var i = 0; i < result.length; i++) {
    labels[i] = result[i].productLine;
    var pos = labels[i].indexOf('(');
    if (pos > 0) {
      var inter = labels[i].substring(0, (pos - 1));
      labels[i] = inter;
    }
    var total = 0;
    var individual = {};
    var values = [];
    individual.label = labels[i];
    individual.dataType = "Product Line: ";
    individual.symbol = thisSymbol;
    for (var j = 0; j < months.length; j++) {
      individual[months[j]] = result[i][months[j]].toFixed(0);
      total += result[i][months[j]];
      monthlytotal[j] += result[i][months[j]];
      annualTotal += result[i][months[j]];
    }
    for (var k = 0; k < months.length; k++) {
      values[k] = individual[months[k]];
    }
    individual.total = total;
    passEmp.push(individual);
    salesTotal.push(total);
    productLineTotal.push(total);

    if (total > max) { max = total };
    var passMonth = [];
    for (var l = 0; l < months.length; l++) {
      var intermediate = {};
      intermediate.month = months[l];
      intermediate.total = monthlytotal[l].toFixed(0);
      intermediate.symbol = thisSymbol;
      passMonth.push(intermediate);
    }
    graphMonth.push(values);
  }

  var sortEmp = arraySort(passEmp, "total");
  console.log('sortEmp: ');
  for (var n = 0; n < sortEmp.length; n++) {
    console.log("passEmp");
    console.log(passEmp[n].label, sortEmp[n].total);
    console.log("sortEmp");
    console.log(sortEmp[n].label, sortEmp[n].total);
  }
  passEmp = sortEmp;
  var totalMonthly = {};
  totalMonthly.label = "Total: ";
  totalMonthly.dataType = "Product Line: ";
  totalMonthly.symbol = thisSymbol;
  for (var o = 0; o < months.length; o++) {
    totalMonthly[months[o]] = monthlytotal[o];
  }
  totalMonthly.total = annualTotal.toFixed(0);
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
      axisY: { title: 'Number of Deals', offset: 100 },
      distributeSeries: true
    };
    var series = [];
    var classes = {};
    var sortedClasses = [];
    var amounts = {};
    var sortedAmounts = [];
    for (var n = 0; n < sortEmp.length - 1; n++) {
      classes = sortEmp[n].label;
      sortedClasses.push(classes);
      amounts = sortEmp[n].total;
      sortedAmounts.push(amounts);
    }
    var thisType = "Product Line";
    //function to send information to csv file
    forCSVexport(passEmp, thisType, title);
    //function that wipes the csv file after five minutes
    setTimeout(clearFile, 300000);

    var bar = yield generate('bar', options, {
      labels: sortedClasses,
      series: sortedAmounts
    });
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

function productLineRevenueCount(title, dataName, newVersusReturning, startDate, endDate, res, thisSymbol) {
  var queryString = 'SELECT Deals.productLine, ' +
    'sum(if(month = 01, 1, 0))  AS Jan, ' +
    'sum(if(month = 02, 1, 0))  AS Feb, ' +
    'sum(if(month = 03, 1, 0))  AS Mar, ' +
    'sum(if(month = 04, 1, 0))  AS Apr, ' +
    'sum(if(month = 05, 1, 0))  AS May, ' +
    'sum(if(month = 06, 1, 0))  AS Jun, ' +
    'sum(if(month = 07, 1, 0))  AS Jul, ' +
    'sum(if(month = 08, 1, 0))  AS Aug, ' +
    'sum(if(month = 09, 1, 0))  AS Sep, ' +
    'sum(if(month = 10, 1, 0)) AS Oct, ' +
    'sum(if(month = 11, 1, 0)) AS Nov, ' +
    'sum(if(month = 12, 1, 0)) AS "Dec" ' +
    'FROM Deals ' +
    'WHERE (dealStatus = "Deal Won (100%)" OR dealStatus = "Very Likely (90%)") ';
  queryString += 'AND (newVersusReturning = ';

  for (var i = 0; i < newVersusReturning.length; i++) {
    queryString += '"' + newVersusReturning[i] + '"';

    if (i < (newVersusReturning.length - 1)) {
      queryString += ' OR newVersusReturning = ';
    }
  }
  queryString += ') AND closeDate BETWEEN "' + startDate + '" AND "' + endDate + '" GROUP BY productLine;';
  grabData(queryString, logResults, res, title, dataName, thisSymbol);
}

module.exports = productLineRevenueCount;
