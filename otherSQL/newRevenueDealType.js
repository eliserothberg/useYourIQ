// var mysql = require('mysql');

// // connect with the mysql database
// var connection = require('../connection/connection.js')

// connection.connect(function (err) {
// 	if (err) {
// 		console.error('error connecting: ' + err.stack);
// 		return;
// 	}
// 	console.log('connected as id ' + connection.threadId);
// });


// function logResults(result){
// 	var monthlytotal=[0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.];
// 	var months=Object.keys(result[0]);
// 	months.shift();
// 	months.shift();
// 	// console.log(months);
// 	// console.log('logResults');
// 	// console.log(result);
// 	for (var i=0;i<result.length;i++){
// 		console.log('---------------------------------------------');
// 		console.log("Deal Type: "+result[i].dealType);
// 		var total=0;
// 		for (var j=0;j<months.length;j++){
// 			console.log(months[j]+": $"+result[i][months[j]].toFixed(2));
// 			total+=result[i][months[j]];
// 			monthlytotal[j]+=result[i][months[j]];
// 		}
// 		console.log('Yearly total: $'+total);
// 		console.log('---------------------------------------------');
// 	}
// 	console.log("Monthly Totals:")
// 	for (var i=0;i<months.length;i++){
// 		console.log(months[i]+": $"+monthlytotal[i].toFixed(2));
// 	}
// }

// function grabData(tableInput, cb) {
// 	// queryString holds query for mysql:
// 	connection.query(tableInput, function (err, result) {
// 		// if error throw it
// 		if (err) throw err;
// 		// if no error call the callback function with the query results
// 		cb(result);
// 	});
// }
// function salesByMonth(newVersusReturning, startDate, endDate){
// var queryString = 'SELECT Deals.dealType, ' +
//  'sum(if(month = 01, revenue, 0))  AS Jan, '+
//  'sum(if(month = 02, revenue, 0))  AS Feb, '+
//  'sum(if(month = 03, revenue, 0))  AS Mar, '+
//  'sum(if(month = 04, revenue, 0))  AS Apr, '+
//  'sum(if(month = 05, revenue, 0))  AS May, '+
//  'sum(if(month = 06, revenue, 0))  AS Jun, '+
//  'sum(if(month = 07, revenue, 0))  AS Jul, '+
//  'sum(if(month = 08, revenue, 0))  AS Aug, '+
//  'sum(if(month = 09, revenue, 0))  AS Sep, '+
//  'sum(if(month = 10, revenue, 0)) AS Oct, '+
//  'sum(if(month = 11, revenue, 0)) AS Nov, '+
//  'sum(if(month = 12, revenue, 0)) AS "Dec" '+
// 'FROM Deals '+
// // 'INNER JOIN Salespeople '+
// // 'ON Deals.salesperson=Salespeople.salesID '+
// 'WHERE (dealStatus = "Deal Won (100%)" OR dealStatus = "Very Likely (90%)") ';
//  queryString+='AND (newVersusReturning = ';
//  for (var i=0;i<conditions2.length;i++){
//  	queryString+='"'+conditions2[i]+'"';
//  	if (i<(conditions2.length-1)){
//  		queryString+=" OR "+column2+' = ';
//  	}
//  }
// queryString+=') AND closeDate BETWEEN "'+startDate+'" AND "'+endDate+'" GROUP BY dealType;';
// console.log(queryString);
// grabData(queryString,logResults);
// }
// var attributes = ["dealType","closeDate"];
// var column1 = "dealStatus";
// var conditions1 = ["Deal Won (100%)","Very Likely (90%)"];
// var column2 = "newVersusReturning";
// var conditions2 = ["New Business", "Upsell/New Sale to Existing Project"];
// var table="Deals";
// var startDate="2016-01-01";
// var endDate="2016-12-31";
// salesByMonth(conditions2,startDate,endDate);