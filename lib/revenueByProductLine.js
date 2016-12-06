var getDeals=require("./getDeals.js");
var utils=require("./utils.js");

function revenueByProductline(attributes, column1, conditions1,column2, conditions2, date){
	return getDeals(attributes, column1, conditions1,column2, conditions2)
	.then(function(result){
		var revenue=[];
		for (var i=0;i<result.length;i++){
			if (Date.parse(result[i].closeDate)>=Date.parse(date)){
				var newProduct=result[i].productLine;
				if (utils.objIndexOf(revenue,newProduct,"id")){
					var newLine = {
						id: newProduct,
						revenue:parseFloat(result[i].revenue)
					}
					revenue.push(newLine);
				}else {
					for (j=0;j<revenue.length;j++){
						if (newProduct===revenue[j].id){
							revenue[j].revenue+=parseFloat(result[i].revenue);
						}
					}
				}
			}
		}
		for (var i=0;i<revenue.length;i++){
			console.log('ProductLine: '+revenue[i].id);
			console.log('Revenue: $'+revenue[i].revenue.toFixed(2));
		}
		console.log('------------------------------------------');
		return revenue;
	});
}
module.exports=revenueByProductline;