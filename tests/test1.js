//These are unit test of modules usingg Mocha 
// use this command to run these test
// node_modules\.bin\mocha --reporter spec tests              tests is the directory where tests are located


var app = require('../app.js');
var should = require('should');
var ccc = require('../models/calculator');
var InitializedDataUser = "";
var assert = require('assert');
const expect = require('chai').expect;


describe('Testing Suite 1:', function() {


      before(function(done)   //this is called once
      {
            InitializedDataUser = {    //here variable has been initialized
                name: 'tj',
                pets: ['tobi', 'loki', 'jane', 'bandit']
            };

            done();
      });


      beforeEach(function(done)    //this is called each time a  test case  IT is executed below
      {
            done();
      });



      describe('Batch 1', function()
      {
          it('This is test 1', function() {  //this will pass
              var zz = ccc.AddTwoNumber(1,2);
              //should(zz).be.exactly(3);
			  expect(zz).to.equal(3);
          });

          it('This is test 2',function() { //this will fail
              //console.log("Test 2");
              var zz = ccc.AddTwoNumber(1,2);
              should(zz).be.exactly(3);
          });

          it('This is test 3', function() {//this will pass
              var zz = ccc.AddTwoNumber(1,2);
              should(zz).equal(3);
          });





          it('This is test 4', function() {//this will pass
              InitializedDataUser.should.have.property('name', 'tj');
          });

          it('This is test 5', function() {//this will pass     you can have 2 should in the same function and all should pass to pass the test
              should(InitializedDataUser).have.property('name', 'tj');
              InitializedDataUser.should.have.property('pets').with.lengthOf(4);
          });


          /*
              Every assertion will return a should.js-wrapped Object, so assertions can be chained.
              To help chained assertions read more clearly, you can use the following helpers anywhere in your chain:
              .an, .of, .a, .and, .be, .have, .with, .is, .which. Use them for better readability; they do nothing at
               all. For example:

              InitializedDataUser.should.be.an.instanceOf(Object).and.have.property('name', 'tj');
              InitializedDataUser.pets.should.be.instanceof(Array).and.have.lengthOf(4);
          */


          it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
            [1,2,3].indexOf(5).should.equal(-1);
            [1,2,3].indexOf(0).should.equal(-1);
          });

      });


      afterEach(function(done) {
          done();
      });


});
