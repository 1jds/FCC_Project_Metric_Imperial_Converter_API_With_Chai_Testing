'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const queryString = req.query.input

    let isUnitValid = true;
    let isNumberValid = true;

    const initNum = convertHandler.getNum(queryString)
    if (initNum === 'invalid number') {
      isNumberValid = false
    }
    const initUnit = convertHandler.getUnit(queryString)
    if (initUnit === 'invalid unit') {
      isUnitValid = false
    }

    if (!isUnitValid && !isNumberValid) {
      return res.send('invalid number and unit')
    } else if (!isUnitValid) {
      return res.send('invalid unit')
    } else if (!isNumberValid) {
      return res.send('invalid number')
    }

    const returnNum = convertHandler.convert(initNum, initUnit)
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const spelledOutInitUnit = convertHandler.spellOutUnit(initUnit)
    const spelledOutReturnUnit = convertHandler.spellOutUnit(returnUnit)
    const string = convertHandler.getString(initNum, spelledOutInitUnit, returnNum, spelledOutReturnUnit)

    return res.send({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    })

  }) //end of app.get('/api/convert'... here.

};
