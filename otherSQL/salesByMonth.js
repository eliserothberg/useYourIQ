// var getDeals=require("./getDeals.js");

// function salesByMonth(attributes, searches, startDate, endDate){
// 	return getDeals(attributes, searches)
// 	.then(function(result){
// 		var monthly=[0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.];
// 		for (var i=0;i<result.length;i++){
// 			var resultDate=Date.parse(result[i].closeDate);
// 			if (resultDate>=Date.parse(startDate) &&
// 				resultDate<=Date.parse(endDate)){
// 				monthly[parseInt(result[i].month)]+=parseFloat(result[i].revenue);
// 			};
// 		}
// 		console.log("Sales by Month:");
// 		for (var i=1;i<monthly.length;i++){
// 			console.log("Month: "+i+", Sales: $"+monthly[i].toFixed(2));
// 		}
// 		console.log('------------------------------------------');
// 		return monthly;
// 	});
// }
// module.exports=salesByMonth;