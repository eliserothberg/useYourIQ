var getDeals=require("./getDeals.js");

function medianDealSize(attributes, column, conditions){
	return getDeals(attributes, column, conditions)
	.then (function(result){;
		var deals=[];
		for (var i=0;i<result.length;i++){
			deals[i]=parseFloat(result[i].revenue);
		}
		deals.sort(function(a,b){return a-b});
		for (var i=0;i<result.length;i++){
		}
		var halfWay=Math.floor(deals.length/2);
		if (deals.length%2 == 0){
			var median = (deals[halfWay]+deals[halfWay-1])/2;
		}else {
			var median = deals[Math.floor(deals.length/2)];
		}
		console.log('------------------------------------------');
		console.log("median deal size= $"+median.toFixed(2));
		console.log('------------------------------------------');
		return median;
	});
}
module.exports=medianDealSize;