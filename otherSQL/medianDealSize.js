// var getDeals=require("./getDeals.js");

// // function medianDealSize(attributes, column1, conditions1,column2, conditions2, startDate, endDate){
// // 	return getDeals(attributes, column1, conditions1, column2, conditions2)
// function medianDealSize(attributes, searches, startDate, endDate){
// 	return getDeals(attributes, searches)
// 	.then (function(result){
// 		var deals=[];
// 		var j=0;
// 		for (var i=0;i<result.length;i++){
// 			var resultDate=Date.parse(result[i].closeDate);
// 			if (resultDate>=Date.parse(startDate) &&
// 				resultDate<=Date.parse(endDate)){
// 			// if (Date.parse(result[i].closeDate)>=Date.parse(date)){
// 				deals[j]=parseFloat(result[i].revenue);
// 				j++;
// 			}
// 		}
// 		deals.sort(function(a,b){return a-b});
// 		for (var i=0;i<result.length;i++){
// 		}
// 		var halfWay=Math.floor(deals.length/2);
// 		if (deals.length%2 == 0){
// 			var median = (deals[halfWay]+deals[halfWay-1])/2;
// 		}else {
// 			var median = deals[Math.floor(deals.length/2)];
// 		}
// 		console.log('------------------------------------------');
// 		console.log("median deal size= $"+median.toFixed(2));
// 		console.log('------------------------------------------');
// 		return median;
// 	});
// }
// module.exports=medianDealSize;