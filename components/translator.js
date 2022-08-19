const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  toBritishTime(text) {
    /**
    * Converts time in [text] from American format '12:30' to British format '12.30'
    */
    const time = /(\d|\d{2})\:(\d{2})/;
    const match = text.match(time);
    if (match) return text.replace(time, match[1] + '.' + match[2]);
    return text;
  }
  
  toAmericanTime(text) {
    /**
    * Converts time in [text] from British format '12.30' to American format '12:30'
    */
    const time = /(\d|\d{2})\.(\d{2})/;
    const match = text.match(time);
    if (match) return text.replace(time, match[1] + ':' + match[2]);
    return text;
  }

  matchCase(originalWord, newWord) {
    /**
    * Returns Capitalized [newWord] if [originalWord] is Capitalized
    *
    * >>> matchCase('Kim', 'julie') => 'Julie'
    * >>> matchCase('jane', 'jesslyn') => 'jesslyn'
    */
    if (/^[A-Z]/.test(originalWord)) {
      return newWord[0].toUpperCase() + newWord.slice(1);
    }
    return newWord;
  }

  toAmericanTitle() {}
  
  toBritishTitle(text) {
    text = text.split(' ');
    for (let title in americanToBritishTitles) {
      console.log(title);
      console.log(americanToBritishTitles[title]);
    }
  }

  highlight() {}
  
  britishToAmerican(text) {}
  
  americanToBritish(text) {}
}

module.exports = Translator;