//this will test the end points of the application

var app = require('../app.js'),
request = require('supertest'),
should = require('should');



describe('Testing Suite 2 ---------------:', function() {

      beforeEach(function(done)
      {
            console.log("Before each called ....");
            done();
      });



      describe('Testing the REST service product with id', function()
      {
          it('This is test 1', function() {  //this will pass

                request(app).get('/rest/product/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    //res.body.should.be.an.Array.and.have.lengthOf(1);
                    res.body.should.have.property('name', 'product 1');
                });
            });
        });


      afterEach(function(done) {
          console.log("After each called ....");
          done();
      });


});
