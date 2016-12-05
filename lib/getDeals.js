var Deals = require('../models')["Deals"];

function getDeals(attributes, column1, conditions1, column2, conditions2){
	 return Deals.findAll({
		attributes: attributes,
		where: {
			[column1]:conditions1,
			[column2]:conditions2
		}
	});
}
module.exports=getDeals;