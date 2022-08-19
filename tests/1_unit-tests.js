const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  test('#1', () => {
    console.log(translator.toAmericanTitle('Dr Mash today.'));
    console.log(translator.toAmericanTitle('Julie is a Prof of all.'));
    console.log(translator.toAmericanTitle('Julie is a prof. of all.'));
    
    console.log(translator.toBritishTitle('Mash is Mrs.'));
    console.log(translator.toBritishTitle('Julie is a prof. of all.'));
    console.log(translator.toBritishTitle('Julie is of all.'));
  });
});
