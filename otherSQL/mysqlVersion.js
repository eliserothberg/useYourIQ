// var connection=require('../connection/connection.js');

// function logResults(result){
// 	var monthlytotal=[0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.];
// 	var months=Object.keys(result[0]);
// 	months.shift();
// 	console.log(months);
// 	for (var i=0;i<result.length;i++){
// 		console.log('---------------------------------------------');
// 		console.log("Salesperson: "+result[i].salesperson);
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
// 	// var queryString = 'SELECT dealType FROM ' + tableInput + ';';
// 	connection.query(tableInput, function (err, result) {
// 		// if error throw it
// 		if (err) throw err;
// 		// if no error call the callback function with the query results
// 		cb(result);
// 	});
// }
// var attributes = ["salesperson","closeDate"];
// var column1 = "dealStatus";
// var conditions1 = ["Deal Won (100%)","Very Likely (90%)"];
// var column2 = "newVersusReturning";
// var conditions2 = ["New Business", "Upsell/New Sale to Existing Project"];
// var table="Deals";
// var closeDate="2016";
// // var queryString= 'SELECT dealType, SUM(revenue)'+
// // ' FROM Deals WHERE (dealStatus = "Deal Won (100%)" OR dealStatus = "Very Likely (90%)")'+
// // 'AND (newVersusReturning = "New Business" OR newVersusReturning = "Upsell/New Sale to Existing Project")'+
// // 'AND closeDate LIKE "%2016" GROUP BY `dealType`;';
// var queryString = 'SELECT salesperson, ' +
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
// 'WHERE (dealStatus = "Deal Won (100%)" OR dealStatus = "Very Likely (90%)") '+
// 'AND (newVersusReturning = "New Business" OR newVersusReturning = "Upsell/New Sale to Existing Project") '+
// 'AND closeDate LIKE "%2016" '+
// 'GROUP BY salesperson;'
// var queryString = 'SELECT '+ attributes[0]+', '+
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
//  'FROM ' + table +' '+
//  'WHERE ('+column1+' = ';
//  for (var i=0;i< conditions1.length;i++){
//  	queryString+='"'+conditions1[i]+'"';
//  	if (i<(conditions1.length-1)){
//  		queryString+=" OR "+column1+" = ";
//  	}
//  }
//  queryString+=') AND ('+column2+' = ';
//  for (var i=0;i<conditions2.length;i++){
//  	queryString+='"'+conditions2[i]+'"';
//  	if (i<(conditions2.length-1)){
//  		queryString+=" OR "+column2+' = ';
//  	}
//  }
// queryString+=') AND closeDate LIKE "%'+closeDate+'" GROUP BY '+attributes[0]+';';
// grabData(queryString,logResults);