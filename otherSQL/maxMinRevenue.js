// var getDeals=require("./getDeals.js");

// function maxMinRevenue(attributes, searches, startDate, endDate){
// 	return getDeals(attributes, searches)
// 	.then (function(result){
// 		var deals=[];
// 		var j=0;
// 		for (var i=0;i<result.length;i++){
// 			// if (Date.parse(result[i].closeDate)>=Date.parse(date)){
// 			var resultDate=Date.parse(result[i].closeDate);
// 			if (resultDate>=Date.parse(startDate) &&
// 				resultDate<=Date.parse(endDate)){
// 				deals[j]={
// 					name:result[i].name,
// 					month: result[i].month,
// 					dealType: result[i].dealType,
// 					closeDate: result[i].closeDate,
// 					revenue:parseFloat(result[i].revenue)
// 				}
// 				j++;
// 			}
// 		}
// 		deals.sort(function(a,b){return a.revenue-b.revenue});
// 		console.log('------------------------------------------');
// 		console.log('Top five deals by value:');
// 		for (var i=1;i<6;i++){
// 			console.log("deal= "+deals[deals.length-i].name);
// 			console.log("revenue= $"+parseFloat(deals[deals.length-i].revenue).toFixed(2));
// 			console.log("Date= "+deals[deals.length-i].closeDate);
// 		}
// 		console.log('');
// 		console.log('Bottom five deals by value:');
// 		for (var i=0;i<5;i++){
// 			console.log("deal= "+deals[i].name);
// 			console.log("revenue= $"+parseFloat(deals[i].revenue));
// 			console.log("Date= "+deals[i].closeDate);
// 		}
// 			console.log('------------------------------------------');
// 		return deals;
// 	});
// }
// module.exports=maxMinRevenue;