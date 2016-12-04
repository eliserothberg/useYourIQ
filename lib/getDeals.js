var Deals = require('../models')["Deals"];

function getDeals(attributes, column, conditions){
	 return Deals.findAll({
		attributes: attributes,
		where: {
			[column]:conditions
		}
	});
}
module.exports=getDeals;