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
var another=new Date().getFullYear();
var startDate ="1/1/"+another.toString();
// console.log(startDate);
var currentDate = new Date().toLocaleDateString("en-US");
var endDate = currentDate.toString();
// console.log(endDate);
var attributes = ["revenue","closeDate"];
var column1 = "dealStatus";
var conditions1 = ["Deal Won (100%)","Very Likely (90%)"];
var column2 = "newVersusReturning";
var conditions2 = ["New Business", "Upsell/New Sale to Existing Project"];
medianDealSize(attributes, column1, conditions1, column2, conditions2,startDate, endDate);
// //*************************************************
// var attributes = ["month","revenue","closeDate"];
// var column1 = ["dealStatus"];
// var conditions1 = ["Deal Won (100%)","Very Likely (90%)"];
// var column2 = ["newVersusReturning"];
// var conditions2 = ["New Business", "Upsell/New Sale to Existing Project"];
// salesByMonth(attributes, column1, conditions1, column2, conditions2, startDate, endDate);
// //*************************************************
// var attributes = ["month","revenue","salesperson","closeDate"];
// var column1 = ["dealStatus"];
// var conditions1 = ["Deal Won (100%)","Very Likely (90%)"];
// var column2 = ["newVersusReturning"];
// var conditions2 = ["New Business", "Upsell/New Sale to Existing Project"];
// monthlySalesByPerson(attributes, column1, conditions1, column2, conditions2, startDate, endDate);
// //*************************************************
// var attributes = ["productLine","revenue","dealStatus","closeDate"];
// var column1 = ["dealStatus"];
// var conditions1 = ["Deal Won (100%)","Very Likely (90%)"];
// var column2 = ["newVersusReturning"];
// var conditions2 = ["New Business", "Upsell/New Sale to Existing Project"];
// revenueByProductline(attributes, column1, conditions1, column2, conditions2, startDate, endDate);
// //*************************************************
// var attributes = ["month","revenue","dealType","newVersusReturning","closeDate"];
// var column1 = ["dealStatus"];
// var conditions1 = ["Deal Won (100%)","Very Likely (90%)"];
// var column2 = ["newVersusReturning"];
// var conditions2 = ["New Business", "Upsell/New Sale to Existing Project"];
// newBusinessMonthly(attributes, column1, conditions1, column2, conditions2, startDate, endDate);
//*************************************************
// var attributes = ["month","revenue","dealType","name","closeDate"];
// var column1 = ["dealStatus"];
// var conditions1 = ["Deal Won (100%)","Very Likely (90%)"];
// var column2 = ["newVersusReturning"];
// var conditions2 = ["New Business"];
// maxMinRevenue(attributes, column1, conditions1, column2, conditions2, startDate, endDate);




// Don't uncomment the next five lines:
// var searches = {
// 	[column1]:conditions1,
// 	[column2]:conditions2
// };
// medianDealSize(attributes, searches,"1/1/2016");
