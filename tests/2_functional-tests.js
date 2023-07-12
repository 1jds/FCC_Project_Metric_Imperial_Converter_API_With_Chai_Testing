const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    // #1
    test('Test a valid input such as 10L: GET request to /api/convert', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=10L')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.string, "10 liters converts to 2.64172 gallons");
          done();
        });
    });
  
    // #2
    test('Test an invalid input such as 32g: GET request to /api/convert', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=32g')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid unit");
          done();
        });
    });
  
    // #3
    test('Test an invalid number such as 3/7.2/4kg: GET request to /api/convert', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=3/7.2/4kg')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number");
          done();
        });
    });
  
    // #4
    test('Test an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number and unit");
          done();
        });
    });
  
    // #5
    test('Test with no number such as kg: GET request to /api/convert', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=mi')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.string, "1 miles converts to 1.60934 kilometers");
          done();
        });
    });
  
});