// var connection=require('../connection/connection.js');
// var co=require('co');
// var generate=require('node-chartist');
// var fs = require('fs');
// var jsonexport = require('jsonexport');

// function logResults(result, res){
// 	var monthlytotal=[0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.];
// 	var months=Object.keys(result[0]);
// 	months.shift();
// 	months.shift();
// 	var passEmp=[];
// 	// console.log(months);
// 	// console.log('logResults');
// 	// console.log(result);
// 	var graphMonth=[];
// 	for (var i=0;i<result.length;i++){
// 		// console.log('---------------------------------------------');
// 		// console.log("Salesperson: "+result[i].salesName);
// 		var total=0;
// 		var individual={};
// 		var values=[];
// 		individual.label=result[i].salesName;
// 		individual.dataType="Salesperson: ";
// 		// console.log(individual.dataType);
// 		for (var j=0;j<months.length;j++){
// 			individual[months[j]]=result[i][months[j]].toFixed(2);
// 			// console.log("$"+individual[months[j]]);
// 			total+=result[i][months[j]];
// 			monthlytotal[j]+=result[i][months[j]];
// 		}
// 		for (var k=0;k<months.length;k++){
// 			values[k]=individual[months[k]];
// 		}
// 		passEmp.push(individual);
// 		// console.log('Yearly total: $'+total.toFixed(2));
// 		console.log('---------------------------------------------');
// 		var passMonth=[];
// 		for (var l=0;l<months.length;l++){
// 			// console.log(months[i]+": $"+monthlytotal[i].toFixed(2));
// 			var intermediate={};
// 			intermediate.month=months[l];
// 			// intermediate.total=monthlytotal[l].toFixed(2);
// 			intermediate.total=monthlytotal[l].toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
// 			passMonth.push(intermediate);

// 		jsonexport(passEmp, { rowDelimiter: '\t' }, function(err, csv) {
//     if (err) return console.log(err);
//     var path = "excel.csv";
//     var data = csv;
//     //changes Product Line to "foo" to delete in columns so "Product Line" will be available for the title.
//     // data = data.replace(/\b(Product Line)\b/gi, 'foo');
//     //gets rid of "foo", "dataType" and "symbol"- leaving out foo
//     data = data.replace(/\b(dataType|symbol)\b/gi, '');
//     //gets rid of ":" and "$" by getting rid of everything but numbers and letters
//     //This leaves two empty columns
//     data = data.replace(/[^\w\s]/gi, '');
//     //replaces "label" with the chart title
//     data = data.replace(/\b(label)\b/gi, title);
//     //gets rid of two empty columns
//     data = data.replace(/(\t\t)/gi, '');
//     //gets rid of dataType" and "symbol"
//     data = data.replace(/\b(label)\b/gi, title);

//     fs.writeFile(path, data, function(error) {
//       if (error) {
//         console.error("write error:  " + error.message);
//       } else {

//         console.log("Successful Write to " + path);
//       }
//     });
//   });
// 		}
// 		graphMonth.push(values);
// 		// console.log(graphMonth);
// 	}
// 	// console.log("Monthly Totals:")
// 	console.log('about to render');

// 	co(function * () {
// 	 var options = {
// 	   width: 1200,
// 	   height: 600,
// 		 seriesBarDistance: 15,
// 	   axisX: { title: 'Month', offset: 50 },
// 	   axisY: { title: 'Sales (USD)', offset: 100 }
// 	 };
// 	 var series =[];
// 	 for (var m=0;m<result.length;m++){
// 	 	var serobj={};
// 	 	serobj.name = passEmp[m].label;
// 	 	serobj.value = graphMonth[m];
// 	 	series.push(serobj);
// 	 }
// 	 var bar = yield generate('bar', options, {
// 	   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
// 	   series: series
// 	});
// 	 console.log(bar);
// 	 res.render('./graphs/mainGraphPage', {
// 	 	bar,
// 		months:passMonth,
// 		descriptor:passEmp,
// 		tableTitl: individual.dataType,
// 		title: "Sales by Month"
// 	});
// 	   // console.log(graphMonth[0]);
// 	   // console.log(graphMonth[1]);
// 	   // console.log(graphMonth[2]);
// 	// res.render('./graphs/index', {
// 	// 	months:passMonth,
// 	// 	employees:passEmp
// 	// });
// 	});
// }
// function grabData(tableInput, cb, res) {
// 	// queryString holds query for mysql:
// 	connection.query(tableInput, function (err, result) {
// 		// if error throw it
// 		if (err) throw err;
// 		// if no error call the callback function with the query results
// 		return cb(result, res);
// 	});
// }
// function salesByMonth(newVersusReturning, startDate, endDate, res){
// var queryString = 'SELECT Deals.salesperson, Salespeople.salesName, ' +
//  'sum(if(month = 1, revenue, 0))  AS Jan, '+
//  'sum(if(month = 2, revenue, 0))  AS Feb, '+
//  'sum(if(month = 3, revenue, 0))  AS Mar, '+
//  'sum(if(month = 4, revenue, 0))  AS Apr, '+
//  'sum(if(month = 5, revenue, 0))  AS May, '+
//  'sum(if(month = 6, revenue, 0))  AS Jun, '+
//  'sum(if(month = 7, revenue, 0))  AS Jul, '+
//  'sum(if(month = 8, revenue, 0))  AS Aug, '+
//  'sum(if(month = 9, revenue, 0))  AS Sep, '+
//  'sum(if(month = 10, revenue, 0)) AS Oct, '+
//  'sum(if(month = 11, revenue, 0)) AS Nov, '+
//  'sum(if(month = 12, revenue, 0)) AS "Dec" '+
// 'FROM Deals '+
// 'INNER JOIN Salespeople '+
// 'ON Deals.salesperson=Salespeople.salesID '+
// 'WHERE (dealStatus = "Deal Won (100%)" OR dealStatus = "Very Likely (90%)") ';
//  queryString+='AND (newVersusReturning = ';
//  for (var i=0;i<newVersusReturning.length;i++){
//  	queryString+='"'+newVersusReturning[i]+'"';
//  	if (i<(newVersusReturning.length-1)){
//  		queryString+=' OR newVersusReturning = ';
//  	}
//  }
// queryString+=') AND closeDate BETWEEN "'+startDate+'" AND "'+endDate+'" GROUP BY salesperson;';
// // console.log(queryString);
// return grabData(queryString, logResults, res);
// connection.end();
// }

// module.exports=salesByMonth;
