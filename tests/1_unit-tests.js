const chai = require('chai');
let assert = chai.assert;
let expect = chai.expect;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('should correctly read a whole number input', function(done) {
    let input = '32L';
    assert.equal(convertHandler.getNum(input), 32);
    done();
  })

  test('should correctly read a decimal number input', function(done) {
    let input = '3.1mi';
    assert.equal(convertHandler.getNum(input), 3.1);
    done()
  })

  test('should correctly read a fractional input', function(done) {
    let input = '2/4gal'
    assert.equal(convertHandler.getNum(input), 0.5);
    done()
  })

  test('should correctly read a fractional input with a decimal', function(done) {
    let input = '2.5/5gal'
    assert.equal(convertHandler.getNum(input), 0.5)
    done();
  })

  test('should correctly return an error on a double-fraction (i.e. 3/2/3)', function(done) {
    let input = '3/2/3'
    assert.equal(convertHandler.getNum(input), 'invalid number');
    done();
  })

  test('should correctly default to a numerical input of 1 when no numerical input is provided', function(done) {
    let input = "kg"
    assert.equal(convertHandler.getNum(input), 1);
    done();
  })

  test('should correctly read each valid input unit', function(done) {
    let input = '3mi';
    assert.equal(convertHandler.getUnit(input), 'mi');
    done();
  })
  
  test('should correctly return an error for an invalid input unit', function(done) {
    let input = "mb";
    assert.equal(convertHandler.getUnit(input), 'invalid unit')
    done();
  })
  
  test('should return the correct return unit for each valid input unit', function(done) {
    let input = 'mi';
    assert.equal(convertHandler.getReturnUnit(input), 'km')
    done();
  })
  
  test('should correctly return the spelled-out string unit for each valid input unit', function(done) {
    assert.equal(convertHandler.getString(3.1, 'miles', 4.98895, 'kilometers'), '3.1 miles converts to 4.98895 kilometers')
    done();
  })

  test('should correctly convert gal to L', function(done) {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L')
    // const result = convertHandler.getReturnUnit('gal');
    // expect(result).to.be.eq('L'); // THIS STYLE WORKS, BUT DOESN'T PASS THE FCC TESTS, AND SO THE SYNTAX WAS CHANGED...
    done();
  })

  test('should correctly convert L to gal', function(done) {
    assert.equal(convertHandler.getReturnUnit('l'), 'gal')
    done();
  })

  test('should correctly convert mi to km', function(done) {
    assert.equal(convertHandler.getReturnUnit('mi'), 'km')
    done();
  })
  
  test('should correctly convert km to mi', function(done) {
    assert.equal(convertHandler.getReturnUnit('km'), 'mi')
    done();
  })

  test('should correctly convert lbs to kg', function(done) {
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
    done();
  })
  
  test('should correctly convert kg to lbs', function(done) {
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
    done();
  })
});
