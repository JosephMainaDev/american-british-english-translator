const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  test('#1', () => {
    //console.log(translator.britishSpelling('A kilogram of meat.'));
    //console.log(translator.britishSpelling('Get me Yogurt from.'));
    console.log(translator.americanSpelling('A kilogramme of meat.'));
    console.log(translator.americanSpelling('Get me Yoghurt from.'));
  });
});
