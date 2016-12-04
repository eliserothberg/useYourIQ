/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var models = require('../models');
var deals = require('../lib/salesData.js');
var express = require('express');
var router = express.Router();
// var sales = require('../models/sales.js');

router.get('/', function (req, res) {
	res.redirect('/');
});

router.get('/sales', function (req, res) {
  //this needs to change
	sales.all(function (data) {
		var hbsObject = { sales: data };
		console.log(hbsObject);
		res.render('sales', hbsObject);
	});
});


module.exports = router;
