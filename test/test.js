// <script src="chai.js" type="text/javascript"></script>
// var server = require('../project3server.js');

var options = require("../dataFromPostmanAPIcall.json");
// var salespeople = require("../salespeople.js");


'use strict';

// var fileWithFunctions = require("./dir/file");
// var fileWithFunctions2 = require("./dir/file2");
// var fileWithFunctions3 = require("./dir/file3");
  //set up pages with these files and put:

  // module.exports = {
  //   functionToBeTested() {

  //   }
  // };

  // the test will fail but if it does, you know it's
  // found the function.

var chai = require('chai');
var chaiHttp = require('chai-http');
// var server = require('../server/app');
var should = chai.should();
var expect = require('chai').expect;


chai.use(chaiHttp);


describe('project3server', function() {
  it('should get project name', function () {
    expect(options[0].name).to.equal('Project 1')
  });
  it('should get project ID', function () {
  expect(options[28].id).to.equal('57114e15e4b021319e914f54')
  // console.log("57114e15e4b021319e914f54 should be = to " + options[28].id);
  });

  it('should have options[0].name equal to Project 1', function () {
          expect(options[0].name).to.equal('Project 1');
  });
});
describe('salespeople', function() {
  it('should list unique salespeople', function () {
    expect(uniqueSalesperson[0]).to.equal('56be7dbae4b0cc328745bd12')
  });
});
  it('should add all revenue');
  it('should list sales total by salesman');
  it('should show total ytd sales by salesperson');
  it('should show total ytd sales by salesperson');
  it('should show quota per salesperson');
  it('should show Median deal size');
  it('should show monthly sales figures');
  it('should show seasonal/quarterly sales figures');
  it('should show monthly sales per salesperson');
  it('should show seasonal sales per salesperson');
  it('should show yearly sales per salesperson (if applicable)');
  it('should show average sales during company tenure (if applicable)');
  it('should show type of new business- monthly');
  it('should show type of new business- quarterly');
  it('should show type of new business- yearly');
  it('should show Sales cycles (time between open and close)');
  it('should show shortest sales cycle with revenue figures');
  it('should show highest revenue deals');
  it('should show highest revenue deals and sales cycle');
  it('should show lowest revenue deals');
  it('should show lowest revenue deals and sales cycle');
  it('should show salesperson with highest revenue deals');
  it('should show salesperson with highest revenue deals and sales cycle');
  it('should show salesperson with lowest revenue deals'); 
  it('should show salesperson with lowest revenue deals and sales cycle');
  it('should show revenue per product line');
  


// expand to:

// it('should list ALL blobs on /blobs GET', function(done) {
//   chai.request(server)
//     .get('/blobs')
//     .end(function(err, res){
//       res.should.have.status(200);
//       done();
//     });
// });
//   multiply = function (x, y) {
//     if (typeof x !== 'number' || typeof y !== 'number')
//       throw new Error('x or y is not a number.');
//     else
//       return x * y;
//   };

// describe('Multiply', function () {
//   it('should multiply properly when passed numbers', function () {
//     multiply(2, 4).should.equal(8);
//   });

//   it('should throw when not passed numbers', function () {
//     (function() { multiply(2, "4") }).should.throw(Error);
//   });
// });



// var disemvowel = require('../disemvowel');

// describe("disemvowel", function() {
//   it("removes vowels from a word", function(){
//     expect(disemvowel('frog')).to.equal('frg');
//   });

//   it("does nothing to words that don't have vowels", function() {
//     expect(disemvowel('rhythm')).to.equal('rhythm');
//   });

//   it("disemvowels capital letters too", function() {
//     expect(disemvowel("AARDVARK")).to.equal("RDVRK");
//   });

//   it("removes vowels from phrases", function(){
//     expect(
//       disemvowel('A long time ago in a Galaxy far far away')
//     ).to.equal(' lng tm g n  Glxy fr fr wy');
//   }); 
// });