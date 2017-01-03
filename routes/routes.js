var express = require('express');
var router  = express.Router();

var allRevenueProductLine = require('../charts/allRevenueProductLine.js');
var allRevenueSalesperson = require('../charts/allRevenueSalesperson.js');
var allRevenueDealType = require('../charts/allRevenueDealType.js');
var allRevenueVertical = require('../charts/allRevenueVertical.js');
var allRevenueProductLineCount = require('../charts/countProductLineAllRevenue.js');
var allRevenueByMonth = require('../charts/revenueByMonth.js');
var Repopulate = require('../lib/repopulate.js');
var thisSymbol="$";
var allowed="";
console.log('in routes.js');

router.get('/sign-in', function(req, res) {
  console.log('sign-in from the routes file');
  req.flash('info', 'Welcome');
  res.render('users/sign_in');
});

function isallowed(req){
	if (req==='admin'){
		allowed="admin";
	} else if (req==='basic'){
		allowed="basic";
	}
}
router.post('/newRevenueProductLine', function(req, res) {
	isallowed(req.session.level);
	console.log('New Revenue by product line from the routes file');
	console.log("req.session.level: "+req.session.level);
	var title ="New Revenue by Product Line";
	var dataName = "Product Line";
	var conditions2 = ["New Business", "Upsell/New Sale to Existing Project"];

	console.log("title. dataName conditions 2 req.body");
	console.log(title + dataName + conditions2 + req.body.startDate + req.body.endDate + res);
	console.log(req.body.startDate);
	console.log(req.body.endDate);

	if ((allowed==="admin")){
		allRevenueProductLine(title, dataName, conditions2,req.body.startDate,req.body.endDate, res, thisSymbol);
	} else {
		res.render('graphs/mainGraphPage', { info: 'Sorry, you do not have access to this graph: please choose another.'});
	};
});

router.post('/allRevenueProductLine', function(req, res) {
	isallowed(req.session.level);
	console.log('All Revenue by product line from the routes file');
	console.log("req.session.level: "+req.session.level);
	var conditions2 = ["New Business", "Upsell/New Sale to Existing Project", "Returning Business", "blank"];
	var title ="All Revenue by Product Line";
	var dataName = "Product Line";
	console.log(req.body.startDate);
	console.log(req.body.endDate);
	// var startDate="2016-01-01";
	// var endDate="2016-12-05";
	if (allowed==="admin"){
		allRevenueProductLine(title,dataName, conditions2,req.body.startDate,req.body.endDate, res, thisSymbol);
	} else {
		res.render('graphs/mainGraphPage', { info: 'Sorry, you do not have access to this graph: please choose another.'});
	};
});

router.post('/newRevenueSalesperson', function(req, res) {
	isallowed(req.session.level);
	console.log('All Revenue by Salesperson from the routes file');
	console.log("req.session.level: "+req.session.level);
	var conditions2 = ["New Business", "Upsell/New Sale to Existing Project"];
	var title ="New Revenue by Salesperson";
	var dataName = "Salesperson";
	console.log(req.body.startDate);
	console.log(req.body.endDate);
	// var startDate="2016-01-01";
	// var endDate="2016-12-05";
	if (allowed==="admin"){
		allRevenueSalesperson(title, dataName, conditions2,req.body.startDate,req.body.endDate, res, thisSymbol);
	} else {
		res.render('graphs/mainGraphPage', { info: 'Sorry, you do not have access to this graph: please choose another.'});

	}
});

router.post('/allRevenueSalesperson', function(req, res) {
	isallowed(req.session.level);
	console.log('All Revenue by Salesperson from the routes file');
	console.log("req.session.level: "+req.session.level);
	var conditions2 = ["New Business", "Upsell/New Sale to Existing Project", "Returning Business", "blank"];
	var title ="All Revenue by Salesperson";
	var dataName = "Salesperson";
	console.log(req.body.startDate);
	console.log(req.body.endDate);
	// var startDate="2016-01-01";
	// var endDate="2016-12-05";
	if (allowed==="admin"){
		allRevenueSalesperson(title, dataName, conditions2,req.body.startDate,req.body.endDate, res, thisSymbol);
	} else {
		res.render('graphs/mainGraphPage', { info: 'Sorry, you do not have access to this graph: please choose another.'});

	}
});

router.post('/newRevenueDealType', function(req, res) {
	isallowed(req.session.level);
	console.log('New Revenue by Deal Type from the routes file');
	console.log("req.session.level: "+req.session.level);
	var conditions2 = ["New Business", "Upsell/New Sale to Existing Project"];
	var title ="New Revenue by Deal Type";
	var dataName = "Deal Type";
	console.log(req.body.startDate);
	console.log(req.body.endDate);
	// var startDate="2016-01-01";
	// var endDate="2016-12-05";
	if (allowed==="admin"){
		allRevenueDealType(title, dataName, conditions2,req.body.startDate,req.body.endDate, res, thisSymbol);
	} else {
		res.render('graphs/mainGraphPage', { info: 'Sorry, you do not have access to this graph: please choose another.'});
	}
});

router.post('/allRevenueDealType', function(req, res) {
	isallowed(req.session.level);
	console.log('All Revenue by Deal Type from the routes file');
	console.log("req.session.level: "+req.session.level);
	var conditions2 = ["New Business", "Upsell/New Sale to Existing Project", "Returning Business", "blank"];
	var title ="All Revenue by Deal Type";
	var dataName = "Deal Type";
	console.log(req.body.startDate);
	console.log(req.body.endDate);
	// var startDate="2016-01-01";
	// var endDate="2016-12-05";
	if (allowed==="admin"){
		allRevenueDealType(title, dataName, conditions2,req.body.startDate,req.body.endDate, res, thisSymbol);
	} else {
		res.render('graphs/mainGraphPage', { info: 'Sorry, you do not have access to this graph: please choose another.'});
	}
});

router.post('/newRevenueVertical', function(req, res) {
	isallowed(req.session.level);
	console.log('New Revenue by Vertical from the routes file');
	console.log("req.session.level: "+req.session.level);
	var conditions2 = ["New Business", "Upsell/New Sale to Existing Project"];
	var title ="New Revenue by Vertical";
	var dataName = "Vertical";
	console.log(req.body.startDate);
	console.log(req.body.endDate);
	// var startDate="2016-01-01";
	// var endDate="2016-12-05";
	if (allowed==="admin"){
		allRevenueVertical(title, dataName, conditions2,req.body.startDate,req.body.endDate, res, thisSymbol);
	} else {
		res.render('graphs/mainGraphPage', { info: 'Sorry, you do not have access to this graph: please choose another.'});
	}
});

router.post('/allRevenueVertical', function(req, res) {
	isallowed(req.session.level);
	console.log('All Revenue by Vertical from the routes file');
	console.log("req.session.level: "+req.session.level);
	var conditions2 = ["New Business", "Upsell/New Sale to Existing Project", "Returning Business", "blank"];
	var title ="All Revenue by Vertical";
	var dataName = "Vertical";
	console.log(req.body.startDate);
	console.log(req.body.endDate);
	// var startDate="2016-01-01";
	// var endDate="2016-12-05";
	if (allowed==="admin"){
		allRevenueVertical(title, dataName, conditions2,req.body.startDate,req.body.endDate, res, thisSymbol);
	} else {
		res.render('graphs/mainGraphPage', { info: 'Sorry, you do not have access to this graph: please choose another.'});
	}
});

router.post('/newRevenueProductLineCount', function(req, res) {
	isallowed(req.session.level);
	console.log('New Revenue by Product Line Count from the routes file');
	console.log("req.session.level: "+req.session.level);
	var conditions2 = ["New Business", "Upsell/New Sale to Existing Project"];
	var title ="New Revenue by Product Line (Count)";
	var dataName = "Product Line";
	var thisSymbol="";
	console.log(req.body.startDate);
	console.log(req.body.endDate);
	// var startDate="2016-01-01";
	// var endDate="2016-12-05";
	if (allowed==="admin" || allowed==="basic") {
		allRevenueProductLineCount(title, dataName, conditions2,req.body.startDate,req.body.endDate, res, thisSymbol);
	} else {res.redirect('/graphs/mainGraphPage');}
});

router.post('/allRevenueProductLineCount', function(req, res) {
	isallowed(req.session.level);
	console.log('All Revenue by Product Line Count from the routes file');
	console.log("req.session.level: "+req.session.level);
	var conditions2 = ["New Business", "Upsell/New Sale to Existing Project", "Returning Business", "blank"];
	var title ="All Revenue by Product Line (Count)";
	var dataName = "Product Line";
	var thisSymbol="";
	console.log(req.body.startDate);
	console.log(req.body.endDate);
	// var startDate="2016-01-01";
	// var endDate="2016-12-05";
	if (allowed==="admin" || allowed==="basic") {
		allRevenueProductLineCount(title, dataName, conditions2,req.body.startDate,req.body.endDate, res, thisSymbol);
	} else {res.redirect('graphs/mainGraphPage');}
});

router.post('/newRevenueByMonth', function(req, res) {
	isallowed(req.session.level);
	console.log('New Revenue by Month from the routes file');
	console.log("req.session.level: "+req.session.level);
	var conditions2 = ["New Business", "Upsell/New Sale to Existing Project"];
	var title ="New Revenue by Month";
	var dataName = "Revenue";
	var thisSymbol="$";
	console.log(req.body.startDate);
	console.log(req.body.endDate);
	// var startDate="2016-01-01";
	// var endDate="2016-12-05";
	if (allowed==="admin" || allowed==="basic") {
		allRevenueByMonth(title, dataName, conditions2,req.body.startDate,req.body.endDate, res, thisSymbol);
	} else {res.redirect('graphs/mainGraphPage');}
});

router.post('/allRevenueByMonth', function(req, res) {
	isallowed(req.session.level);
	console.log('All Revenue by Month from the routes file');
	console.log("req.session.level: "+req.session.level);
	var conditions2 = ["New Business", "Upsell/New Sale to Existing Project", "Returning Business", "blank"];
	var title ="All Revenue by Month";
	var dataName = "Revenue";
	var thisSymbol="$";
	console.log(req.body.startDate);
	console.log(req.body.endDate);
	// var startDate="2016-01-01";
	// var endDate="2016-12-05";
	if (allowed==="admin" || allowed==="basic") {
		allRevenueByMonth(title, dataName, conditions2,req.body.startDate,req.body.endDate, res, thisSymbol);
	} else {res.redirect('graphs/mainGraphPage');}
});

module.exports = router;
