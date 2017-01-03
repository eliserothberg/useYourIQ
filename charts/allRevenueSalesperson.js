var connection = require('../connection/connection.js')
var co=require('co');
var generate=require('node-chartist');
var arraySort=require('array-sort');
var fs = require('fs');
var jsonexport = require('jsonexport');
var forCSVexport = require('../utils/export.js');
var clearFile = require('../utils/wipeFile.js');

function logResults(result, res, title, dataName, thisSymbol){
    var monthlytotal=[0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.];
    var salesTotal=[];
    var months=Object.keys(result[0]);
    months.shift();
    months.shift();
    var passEmp=[];
    var graphMonth=[];
    var labels=[];
    var max=0;
    var annualTotal=0;

    for (var i=0;i<result.length;i++){
        var total=0;
        var individual={};
        var values=[];
        individual.label=result[i].salesName;
        individual.dataType="Salesperson: ";
        individual.symbol=thisSymbol;
        for (var j=0;j<months.length;j++){
            individual[months[j]]=result[i][months[j]].toLocaleString();
            // console.log(months[j]+": $"+result[i][months[j]]);
            total+=result[i][months[j]];
            monthlytotal[j]+=result[i][months[j]];
            annualTotal+=result[i][months[j]];
        }
        for (var k=0;k<months.length;k++){
            values[k]=individual[months[k]];
        }
        individual.total=total;
        passEmp.push(individual);
        salesTotal.push(total);

        if (total>max){
            max=total
        };
        var passMonth=[];

        for (var l=0;l<months.length;l++){
            // console.log(months[l]+": $"+monthlytotal[l]);
            var intermediate={};
            intermediate.month=months[l];
            intermediate.total=monthlytotal[l].toLocaleString();
            intermediate.symbol=thisSymbol;
            passMonth.push(intermediate);
        }
        graphMonth.push(values);
    }
    var sortEmp=arraySort(passEmp,"total");
    passEmp=sortEmp;
    var totalMonthly={};
    totalMonthly.label="Total: ";
    totalMonthly.dataType="Salesperson: ";
    totalMonthly.symbol=thisSymbol;

    for (var o=0;o<months.length;o++){
        totalMonthly[months[o]]=monthlytotal[o].toLocaleString();
    }
    totalMonthly.total=annualTotal.toLocaleString();
    passEmp.push(totalMonthly);

    max=max*1.05;
    co(function * () {
        var options = {
            high:max,
            low:0,
            width: 1200,
            height: 600,
            seriesBarDistance: 15,
            axisX: { title: dataName, offset: 50 },
            axisY: { title: 'Sales ($USD)', offset: 100 },
            distributeSeries:true
        };
        var series =[];
        var theNames = [];
        for (var m=0;m<result.length;m++){
        var serobj={};
        serobj.name = passEmp[m].label;
        names = passEmp[m].label.split(' ')[1];
        serobj.value = passEmp[m].total;
        series.push(serobj);
        theNames.push(names);
        }
        for (var p=0;p<passEmp.length;p++){
            passEmp[p].total=passEmp[p].total.toLocaleString();
        }
        var thisType = "Salesperson";
        //function to send information to csv file
        forCSVexport(passEmp, thisType, title);
        //function that wipes the csv file after five minutes
        setTimeout(clearFile, 300000);

        var bar = yield generate('bar', options, {
        labels: theNames,
        series: series
        });
        res.render('./graphs/mainGraphPage', {
        bar,
        months:passMonth,
        descriptor:passEmp,
        title: title,
        dataName: dataName
        });
    });
}
function grabData(tableInput, cb, res, title, dataName, thisSymbol) {
    // queryString holds query for mysql:
    connection.query(tableInput, function (err, result) {
        // if error throw it
        if (err) throw err;
        // if no error call the callback function with the query results
        cb(result, res, title, dataName, thisSymbol);
    });
}
function RevenueSalesPerson(title, dataName, newVersusReturning, startDate, endDate, res, thisSymbol){
    var queryString = 'SELECT Deals.salesperson, Salespeople.salesName, ' +
    'sum(if(month = 01, revenue, 0))  AS Jan, '+
    'sum(if(month = 02, revenue, 0))  AS Feb, '+
    'sum(if(month = 03, revenue, 0))  AS Mar, '+
    'sum(if(month = 04, revenue, 0))  AS Apr, '+
    'sum(if(month = 05, revenue, 0))  AS May, '+
    'sum(if(month = 06, revenue, 0))  AS Jun, '+
    'sum(if(month = 07, revenue, 0))  AS Jul, '+
    'sum(if(month = 08, revenue, 0))  AS Aug, '+
    'sum(if(month = 09, revenue, 0))  AS Sep, '+
    'sum(if(month = 10, revenue, 0)) AS Oct, '+
    'sum(if(month = 11, revenue, 0)) AS Nov, '+
    'sum(if(month = 12, revenue, 0)) AS "Dec" '+
    'FROM Deals '+
    'INNER JOIN Salespeople '+
    'ON Deals.salesperson=Salespeople.salesID '+
    'WHERE (dealStatus = "Deal Won (100%)" OR dealStatus = "Very Likely (90%)") ';
    queryString+='AND (newVersusReturning = ';

    for (var i=0;i<newVersusReturning.length;i++){
        queryString+='"'+newVersusReturning[i]+'"';

        if (i<(newVersusReturning.length-1)){
            queryString+=' OR newVersusReturning = ';
        }
    }
    queryString+=') AND closeDate BETWEEN "'+startDate+'" AND "'+endDate+'" GROUP BY salesperson;';
    grabData(queryString,logResults, res, title, dataName, thisSymbol);
}

module.exports =RevenueSalesPerson;
