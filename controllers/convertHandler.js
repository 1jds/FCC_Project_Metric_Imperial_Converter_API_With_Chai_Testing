function ConvertHandler() {

  this.getNum = function(input) {
    const numberRegex = /[0-9.]+\/?[0-9.]*/gi
    const foundNumberStrArr = input.match(numberRegex)
    if (foundNumberStrArr === null) {
      return 1
    } else if (foundNumberStrArr.length > 1) {
      return 'invalid number'
    } else {
      const numberStr = foundNumberStrArr[0]
      const isSlash = /\//.test(numberStr);
      if (isSlash) { // a nested conditional here
        const capturedGroups = numberStr.match(/([0-9.]+)(\/)([0-9.]+)/);
        const firstHalfOfFraction = +capturedGroups[1]
        const secondHalfOfFraction = +capturedGroups[3]
        return firstHalfOfFraction / secondHalfOfFraction
      } else {
        return +numberStr
      }
    }
  };

  this.getUnit = function(input) {
    const arrOfSuitableUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km']
    const unitRegex = /[A-Za-z]+/gi
    const foundUnitStrArr = input.match(unitRegex)
    const firstStr = foundUnitStrArr[0].toLowerCase()
    if (foundUnitStrArr.length > 1) {
      return 'invalid unit'
    } else if (!arrOfSuitableUnits.includes(firstStr)) {
      return 'invalid unit'
    } else if(firstStr === 'l') {
      return 'L'
    } else {
      return firstStr
    }
  };

  this.getReturnUnit = function(initUnit) {
    let result
    switch (initUnit) {
      case 'gal':
        result = 'L'
        break;
      case 'l':
      case 'L':
        result = 'gal'
        break;
      case 'lbs':
        result = 'kg'
        break;
      case 'kg':
        result = 'lbs'
        break;
      case 'mi':
        result = 'km'
        break;
      case 'km':
        result = 'mi'
        break;
    } //end of switch statement
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result
    switch (unit) {
      case 'gal':
        result = 'gallons'
        break;
      case 'l':
      case 'L':
        result = 'liters'
        break;
      case 'lbs':
        result = 'pounds'
        break;
      case 'kg':
        result = 'kilograms'
        break;
      case 'mi':
        result = 'miles'
        break;
      case 'km':
        result = 'kilometers'
        break;
    } //end of switch statement
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL
        break;
      case 'l':
      case 'L':
        result = initNum / galToL
        break;
      case 'lbs':
        result = initNum * lbsToKg
        break;
      case 'kg':
        result = initNum / lbsToKg
        break;
      case 'mi':
        result = initNum * miToKm
        break;
      case 'km':
        result = initNum / miToKm
        break;
    } //end of switch statement
    let convertedNumber = +result.toFixed(5)
    return convertedNumber;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    return result;
  };

}

module.exports = ConvertHandler;
