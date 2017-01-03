var connection = require('../connection/connection.js')
var co = require('co');
var generate = require('node-chartist');
var fs = require('fs');
var jsonexport = require('jsonexport');
var arraySort = require('array-sort');
var forCSVexport = require('../utils/export.js');

function logResults(result, res, title, dataName, thisSymbol) {
  var monthlytotal = [0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.];
  var salesTotal = [];
  var months = Object.keys(result[0]);
  months.shift();
  months.shift();
  var passEmp = [];
  var graphMonth = [];
  var labels = [];
  var max = 0;
  var annualTotal = 0;

  for (var i = 0; i < result.length; i++) {
    var total = 0;
    var individual = {};
    var values = [];
    individual.label = result[i].salesName;
    individual.dataType = "Salesperson: ";
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
    individual.total = total.toLocaleString();
    passEmp.push(individual);
    salesTotal.push(total);
    var passMonth = [];

    for (var l = 0; l < months.length; l++) {
      var intermediate = {};
      intermediate.month = months[l];
      intermediate.total = monthlytotal[l].toLocaleString();
      intermediate.symbol = thisSymbol;
      passMonth.push(intermediate);
    }
    graphMonth.push(values);
  }
  var totalMonthly = {};
  totalMonthly.label = "Total: ";
  totalMonthly.dataType = "Total Revenue: ";
  totalMonthly.symbol = thisSymbol;

  for (var o = 0; o < months.length; o++) {
    totalMonthly[months[o]] = monthlytotal[o].toLocaleString();
  }
  totalMonthly.total = annualTotal.toLocaleString();
  passEmp = [];
  passEmp[0] = totalMonthly;
  var thisType = "Month";

  forCSVexport(passEmp, thisType, title);

  for (var i = 0; i < months.length; i++) {
    if (monthlytotal[i] > max) { max = monthlytotal[i] };
  }

  max = max * 1.05;
  co(function*() {
    var options = {
      high: max,
      low: 0,
      width: 1200,
      height: 600,
      seriesBarDistance: 15,
      axisX: { title: dataName, offset: 50 },
      axisY: { title: 'Sales ($USD)', offset: 100 },
      distributeSeries: true
    };
    var series = [];
    var labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (var m = 0; m < result.length; m++) {
      var serobj = {};
      serobj.name = labels[m];
      serobj.value = monthlytotal[m];
      series.push(serobj);
    }
    var seriesSort = arraySort(series, "value");
    var passEmpin = {
      label: "Total: ",
      dataType: "Total Revenue: ",
      symbol: "$"
    }
    for (var q = 0; q < seriesSort.length; q++) {
      labels[q] = seriesSort[q].name;
      passEmpin[seriesSort[q].name] = seriesSort[q].value.toLocaleString();
    }
    passEmpin.total = passEmp[0].total;
    passEmp[0] = passEmpin;
    series = seriesSort;

    var bar = yield generate('bar', options, {
      labels: labels,
      series: series
    });
    var passData = [];

    for (var y = 0; y < series.length; y++) {
      series[y].value = series[y].value.toLocaleString();
      var inter = {};
      inter.value = series[y].value.toLocaleString();
      passData.push(inter);
    }
    res.render('./graphs/mainGraphPage', {
      bar,
      months: labels,
      series: passData,
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
function SalesByMonth(title, dataName, newVersusReturning, startDate, endDate, res, thisSymbol) {
  var queryString = 'SELECT Deals.salesperson, Salespeople.salesName, ' +
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
    'INNER JOIN Salespeople ' +
    'ON Deals.salesperson=Salespeople.salesID ' +
    'WHERE (dealStatus = "Deal Won (100%)" OR dealStatus = "Very Likely (90%)") ';
  queryString += 'AND (newVersusReturning = ';
  for (var i = 0; i < newVersusReturning.length; i++) {
    queryString += '"' + newVersusReturning[i] + '"';
    if (i < (newVersusReturning.length - 1)) {
      queryString += ' OR newVersusReturning = ';
    }
  }
  queryString += ') AND closeDate BETWEEN "' + startDate + '" AND "' + endDate + '" GROUP BY salesperson;';
  grabData(queryString, logResults, res, title, dataName, thisSymbol);
}

module.exports = SalesByMonth;