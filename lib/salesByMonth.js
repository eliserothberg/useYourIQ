var getDeals=require("./getDeals.js");

function salesByMonth(attributes, column1, conditions1,column2, conditions2, date){
	return getDeals(attributes, column1, conditions1,column2, conditions2)
	.then(function(result){
		var monthly=[0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.,0.];
		for (var i=0;i<result.length;i++){
			if (Date.parse(result[i].closeDate)>=Date.parse(date)){
				monthly[parseInt(result[i].month)]+=parseFloat(result[i].revenue);
			};
		}
		console.log("Sales by Month:");
		for (var i=1;i<monthly.length;i++){
			console.log("Month: "+i+", Sales: $"+monthly[i].toFixed(2));
		}
		console.log('------------------------------------------');
		return monthly;
	});
}
module.exports=salesByMonth;