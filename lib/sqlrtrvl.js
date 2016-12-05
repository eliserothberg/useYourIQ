// var Deals = require('../models')["Deals"];
// var getDeals=require("./getDeals.js");
var medianDealSize=require("./medianDealSize.js");
var salesByMonth=require("./salesByMonth.js");
var monthlySalesByPerson=require("./monthlySalesByPerson.js");
var revenueByProductline=require("./revenueByProductLine.js");
var newBusinessMonthly=require("./newBusiness.js");
var maxMinRevenue=require("./maxMinRevenue.js");
// //*************************************************
console.log('------------------------------------------');
// var attributes = ["revenue","closeDate"];
// var column1 = ["dealStatus"];
// var conditions1 = ["Deal Won (100%)","Very Likely (90%)"];
// var column2 = ["newVersusReturning"];
// var conditions2 = ["New Business"];
// medianDealSize(attributes, column1, conditions1, column2, conditions2,"1/1/2016");
// //*************************************************
var attributes = ["month","revenue","closeDate"];
var column1 = ["dealStatus"];
var conditions1 = ["Deal Won (100%)","Very Likely (90%)"];
var column2 = ["newVersusReturning"];
var conditions2 = ["New Business"];
salesByMonth(attributes, column1, conditions1, column2, conditions2,"1/1/2016");
// //*************************************************
// var attributes = ["month","revenue","salesperson","closeDate"];
// var column1 = ["dealStatus"];
// var conditions1 = ["Deal Won (100%)","Very Likely (90%)"];
// var column2 = ["newVersusReturning"];
// var conditions2 = ["New Business"];
// monthlySalesByPerson(attributes, column1, conditions1, column2, conditions2,"1/1/2016");
// //*************************************************
// var attributes = ["productLine","revenue","dealStatus"];
// var column = ["dealStatus"];
// var conditions = ["Deal Won (100%)","Very Likely (90%)"];
// revenueByProductline(attributes, column, conditions);
// //*************************************************
// var attributes = ["month","revenue","dealType","newVersusReturning"];
// var column = ["dealStatus"];
// var conditions = ["Deal Won (100%)","Very Likely (90%)"];
// newBusinessMonthly(attributes, column, conditions);
//*************************************************
// var attributes = ["month","revenue","dealType","name","closeDate"];
// var column1 = ["dealStatus"];
// var conditions1 = ["Deal Won (100%)","Very Likely (90%)"];
// var column2 = ["newVersusReturning"];
// var conditions2 = ["New Business"];
// maxMinRevenue(attributes, column1, conditions1, column2, conditions2,"1/1/2016");
