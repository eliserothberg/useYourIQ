// var getDeals=require("./getDeals.js");
// var utils=require("./utils.js");

// function newBusinessMonthly(attributes, searches, startDate, endDate){
// 	return getDeals(attributes, searches)
// 	.then(function(result){
// 		var newBusiness=[];
// 		for (var i=0;i<result.length;i++){
// 			// if (Date.parse(result[i].closeDate)>=Date.parse(date)){
// 			var resultDate=Date.parse(result[i].closeDate);
// 			if (resultDate>=Date.parse(startDate) &&
// 				resultDate<=Date.parse(endDate)){
// 				var newId=result[i].dealType;
// 				var month=parseInt(result[i].month);
// 				var revenue=parseFloat(result[i].revenue);
// 				if (utils.objIndexOf(newBusiness,newId,"dealType")){
// 					var newEntry = {
// 						dealType: newId,
// 						monthly:[0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.]
// 					}
// 					newEntry.monthly[month]=revenue;
// 					newBusiness.push(newEntry);
// 				}else {
// 					newBusiness=utils.updateMonthly(newBusiness, newId, month, revenue,"dealType");
// 				}
// 			}
// 		}
// 		console.log('New Business by Type - monthly:');
// 		var annualNewBusiness=[];
// 		for (var i=0;i<newBusiness.length;i++){
// 			var yearlysum=0;
// 			console.log('Type: '+newBusiness[i].dealType);
// 			for (var j=1;j<newBusiness[i].monthly.length;j++){
// 				console.log("Month: "+j+", Sales: $"+newBusiness[i].monthly[j].toFixed(2));
// 				yearlysum+=newBusiness[i].monthly[j];
// 			}
// 			var newEntry={
// 				dealType: newBusiness[i].dealType,
// 				annualSales: yearlysum
// 			}
// 			annualNewBusiness.push(newEntry);
// 		}
// 		console.log('------------------------------------------');
// 		console.log('New Business by Type - yearly:');
// 		for (var i=0;i<annualNewBusiness.length;i++){
// 			console.log("Type: "+annualNewBusiness[i].dealType+", Sales: $"+annualNewBusiness[i].annualSales.toFixed(2));
// 		}
// 		console.log('------------------------------------------');
// 		return newBusiness;
// 	});
// }
// module.exports=newBusinessMonthly;