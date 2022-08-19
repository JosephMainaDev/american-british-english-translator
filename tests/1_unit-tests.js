const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  test('#1', () => {
    console.log(translator.toBritishTitle('Dr. Mash today.'));
  });
});
