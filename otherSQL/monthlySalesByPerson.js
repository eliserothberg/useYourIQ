// var getDeals=require("./getDeals.js");
// var utils=require("./utils.js");

// function monthlySalesByPerson(attributes, searches, startDate, endDate){
// 	return getDeals(attributes, searches)
// 	.then(function(result){
// 		var salespeople=[];
// 		for (var i=0;i<result.length;i++){
// 			// if(Date.parse(result[i].closeDate)>=Date.parse(date)){
// 			var resultDate=Date.parse(result[i].closeDate);
// 			if (resultDate>=Date.parse(startDate) &&
// 				resultDate<=Date.parse(endDate)){
// 				var newId=result[i].salesperson;
// 				var month=parseInt(result[i].month);
// 				var revenue=parseFloat(result[i].revenue);
// 				if (utils.objIndexOf(salespeople,newId,"id")){
// 					var newSalesPerson = {
// 						id: newId,
// 						monthly:[0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.]
// 					}
// 					newSalesPerson.monthly[month]=revenue;
// 					salespeople.push(newSalesPerson);
// 				}else {
// 					salespeople=utils.updateMonthly(salespeople, newId, month, revenue,"id");
// 				}
// 			}
// 		}
// 		console.log('Monthly Sales by Person:');
// 		var salesbyPerson=[];
// 		for (var i=0;i<salespeople.length;i++){
// 			console.log("Salesperson: "+salespeople[i].id);
// 			var annualSales=0;
// 			for (var j=1;j<salespeople[i].monthly.length;j++){
// 				console.log("Month: "+j+", Sales: $"+salespeople[i].monthly[j].toFixed(2));
// 				annualSales+=salespeople[i].monthly[j];
// 			}
// 			var totalSales={
// 				salesperson: salespeople[i].id,
// 				annualSales: annualSales
// 			}
// 			salesbyPerson.push(totalSales);
// 		}
// 		console.log('Annual Sales by Person:');
// 		for (var i=0;i<salesbyPerson.length;i++){
// 			console.log('Salesperson: '+salesbyPerson[i].salesperson);
// 			console.log('Totalsales: $'+salesbyPerson[i].annualSales.toFixed(2));
// 		}
// 		console.log('------------------------------------------');
// 		return salespeople;
// 	});
// }
// module.exports=monthlySalesByPerson;