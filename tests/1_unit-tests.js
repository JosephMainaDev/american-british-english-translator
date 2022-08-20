const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  test('#1', () => {
    console.log(translator.britishOnlyToAmerican('just black pudding foods'));
    console.log(translator.britishOnlyToAmerican('this be good'));
    console.log(translator.britishOnlyFromAmerican('this new answering machine from america'));
    console.log(translator.britishOnlyFromAmerican('very an incompetent or foolish person of all time'));
    console.log(translator.translate('very an incompetent or foolish person of all time'));
    console.log(translator.translate('get a provisional driving licence'));
  });
});
