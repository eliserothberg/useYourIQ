var Deals = require('../models')["Deals"];

Deals.findAll({
	where:{
		dealStatus: "Deal Won (100%)"
	}
}).then(function(result){
	console.log("Median Deal size = $"+medianDealSize(result).toFixed(2));
	// console.log(result.length);
	// for (var i=0;i<result.length;i++){
	// 	console.log(i, result[i].dataValues.revenue);
	// }
	console.log('------------------------------------------');
	console.log('Sales by month:');
	var monthly=salesByMonth(result);
	for (var i=1;i<monthly.length;i++){
		console.log("Month: "+i+", Sales: $"+monthly[i].toFixed(2));
	}
	console.log('------------------------------------------');
	console.log('Monthly Sales by Person:');
	var salesbymonth=monthlySalesByPerson(result);
	var salesbyPerson=[];
	for (var i=0;i<salesbymonth.length;i++){
		console.log("Salesperson: "+salesbymonth[i].id);
		var annualSales=0;
		for (var j=1;j<salesbymonth[i].monthly.length;j++){
			console.log("Month: "+j+", Sales: $"+salesbymonth[i].monthly[j].toFixed(2));
			annualSales+=salesbymonth[i].monthly[j];
		}
		var totalSales={
			salesperson: salesbymonth[i].id,
			annualSales: annualSales
		}
		salesbyPerson.push(totalSales);
	}
	console.log('------------------------------------------');
	console.log('Annual Sales by Person:');
	for (var i=0;i<salesbyPerson.length;i++){
		console.log('Salesperson: '+salesbyPerson[i].salesperson);
		console.log('Totalsales: $'+salesbyPerson[i].annualSales.toFixed(2));
	}
	console.log('------------------------------------------');
	console.log('Revenue by Product Line:');
	var productRevenue=revenueByProductline(result);
	for (var i=0;i<productRevenue.length;i++){
		console.log('ProductLine: '+productRevenue[i].id);
		console.log('Revenue: $'+productRevenue[i].revenue.toFixed(2));
	}
	console.log('------------------------------------------');
	console.log('New Business by Type - monthly:');
	var newBusinessByMonth=newBusinessMonthly(result);
	var annualNewBusiness=[];
	for (var i=0;i<newBusinessByMonth.length;i++){
		var yearlysum=0;
		console.log('Type: '+newBusinessByMonth[i].dealType);
		for (var j=1;j<newBusinessByMonth[i].monthly.length;j++){
			console.log("Month: "+j+", Sales: $"+newBusinessByMonth[i].monthly[j].toFixed(2));
			yearlysum+=newBusinessByMonth[i].monthly[j];
		}
		var newEntry={
			dealType: newBusinessByMonth[i].dealType,
			annualSales: yearlysum
		}
		annualNewBusiness.push(newEntry);
	}
	console.log('------------------------------------------');
	console.log('New Business by Type - yearly:');
	for (var i=0;i<annualNewBusiness.length;i++){
		console.log("Type: "+annualNewBusiness[i].dealType+", Sales: $"+annualNewBusiness[i].annualSales.toFixed(2));
	}
});

function medianDealSize(array){
	var deals=[];
	for (var i=0;i<array.length;i++){
		deals[i]=parseFloat(array[i].dataValues.revenue);
	}
	deals.sort(function(a,b){return a-b});
	for (var i=0;i<array.length;i++){
		// console.log(i,deals[i]);
	}
	var halfWay=Math.floor(deals.length/2);
	// console.log(halfWay);
	if (deals.length%2 == 0){
		var median = (deals[halfWay]+deals[halfWay-1])/2;
	}else {
		var median = deals[Math.floor(deals.length/2)];
	}
	return median;
}
function salesByMonth(array){
	var monthly=[0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.];
	for (var i=0;i<array.length;i++){
		monthly[parseInt(array[i].dataValues.month)]+=parseFloat(array[i].dataValues.revenue);
	}
	return monthly;

}
function monthlySalesByPerson(array){
	var salespeople=[];
	for (var i=0;i<array.length;i++){
		var newId=array[i].dataValues.salesperson;
		var month=parseInt(array[i].dataValues.month);
		var revenue=parseFloat(array[i].dataValues.revenue);
		if (objIndexOf(salespeople,newId,"id")){
			var newSalesPerson = {
				id: newId,
				monthly:[0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.]
			}
			newSalesPerson.monthly[month]=revenue;
			salespeople.push(newSalesPerson);
			// console.log('new salesperson created');
			// console.log(newSalesPerson);
		}else {
			salespeople=updateMonthly(salespeople, newId, month, revenue,"id");
			// console.log('Salespeople:');
			// console.log(salespeople);
		}
	}
	return salespeople;
	// console.log("here's the salespeople:");
	// for (var j=0;j<salespeople.length;j++){
	// 	console.log(salespeople[j]);
	// }
}
function objIndexOf(obj,arg, sub){
	// console.log("in objIndexOf");
	// console.log(obj.length);
	// console.log("arg:"+arg);
	// console.log('sub: '+sub);
	for (var i=0;i<obj.length;i++){
		// console.log("obj["+i+"]: "+obj[i][sub]);
		// console.log(obj[i][sub]);
		if (obj[i][sub]===arg){
			// console.log('returning false');
			return false;
		}
	}
	// console.log('returning true');
	return true;
}
function TobjIndexOf(obj,arg, sub){
	// console.log("in objIndexOf");
	// console.log(obj.length);
	// console.log("arg:"+arg);
	// console.log('sub: '+sub);
	for (var i=0;i<obj.length;i++){
		// console.log("obj["+i+"]: "+obj[i][sub]);
		// console.log(obj[i][sub]);
		if (obj[i][sub]===arg){
			// console.log('returning false');
			return false;
		}
	}
	// console.log('returning true');
	return true;
}

function updateMonthly(array, objid, month, revenue, type){
	var success=false;
	for (var i=0;i<array.length;i++){
		if (array[i][type]===objid){
			success=true;
			array[i].monthly[month]+=revenue;
		}
	}
	if (success){return array;} else return false;
	
}
function revenueByProductline(array){
	var revenue=[];
	for (var i=0;i<array.length;i++){
		var newProduct=array[i].dataValues.productLine;
		// console.log(newProduct);
		if (objIndexOf(revenue,newProduct,"id")){
			// console.log('creating new productline');
			var newLine = {
				id: newProduct,
				revenue:parseFloat(array[i].dataValues.revenue)
			}
			revenue.push(newLine);
			// console.log('new revenue created');
			// console.log(revenue);
		}else {
			for (j=0;j<revenue.length;j++){
				// console.log('newProduct: '+newProduct);
				// console.log('revenue id: '+revenue[j].id);
				if (newProduct===revenue[j].id){
					// console.log('in revenueByProductline, '+array[i].dataValues.revenue)
					revenue[j].revenue+=parseFloat(array[i].dataValues.revenue);
				}
			}
			// console.log('Salespeople:');
			// console.log(salespeople);
		}
	}
	return revenue;
}
function newBusinessMonthly(array){
	var newBusiness=[];
	for (var i=0;i<array.length;i++){
		if (array[i].dataValues.newVersusReturning==="New Business"){
			var newId=array[i].dataValues.dealType;
			// console.log('newid: '+newId);
			var month=parseInt(array[i].dataValues.month);
			// console.log('month: '+month);
			var revenue=parseFloat(array[i].dataValues.revenue);
			// console.log('revenue: $'+revenue);
			// console.log(newBusiness);
			if (TobjIndexOf(newBusiness,newId,"dealType")){
				var newEntry = {
					dealType: newId,
					monthly:[0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.]
				}
				newEntry.monthly[month]=revenue;
				newBusiness.push(newEntry);
				// console.log(newBusiness);
				// console.log('new salesperson created');
				// console.log(newEntry);
			}else {
				// console.log('Newbusiness:');
				// console.log(newBusiness)
				// console.log(newId, month, revenue);
				newBusiness=updateMonthly(newBusiness, newId, month, revenue,"dealType");
				// console.log("back from update:");
				// console.log(newBusiness);
			}
		}
	}
	return newBusiness;
}
	// console.log("here's the salespeople:");
	// for (var j=0;j<salespeople.length;j++){
	// 	console.log(salespeople[j]);
	// }
