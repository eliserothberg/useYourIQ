// "starting point" in our code.
var React = require('react');
var ReactDOM = require('react-dom');

// Grab the property associated with the Router
var Router = require('react-router').Router;

// We are going to create a routes object 
var routes = require('./app/controllers/user_controller');

// ReactDOM.render((
//   <Router>{routes}</Router>),
// document.getElementById('app'))