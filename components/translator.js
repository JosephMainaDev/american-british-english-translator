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

  toAmericanTitle(text) {
    let textCopy = text.toLowerCase().split(' ');
    text = text.split(' ');
    for (const [key, value] of Object.entries(americanToBritishTitles)) {
      if (textCopy.includes(value)) {
        const index = textCopy.indexOf(value);
        text[index] = this.matchCase(text[index], key);
      }
    }
    return text.join(' ');
  }

  toBritishTitle(text) {
    let textCopy = text.toLowerCase().split(' ');
    text = text.split(' ');
    for (const [key, value] of Object.entries(americanToBritishTitles)) {
      if (textCopy.includes(key)) {
        const index = textCopy.indexOf(key);
        text[index] = this.matchCase(text[index], value);
      }
    }
    return textArr.join(' ');
  }

  britishOnlyToAmerican(text) {
    /**
    * Converts British-only phrases to American phrases.
    */
    for (let [key, value] of Object.entries(britishOnly)) {
      if (text.includes(key)) {
        text = text.split(key);
        return text[0] + value + text[1];
      }
    }
    return text;
  }

  britishOnlyFromAmerican(text) {
    /**
    * Converts American phrases to British-only phrases.
    */
    for (let [key, value] of Object.entries(britishOnly)) {
      if (text.includes(value)) {
        text = text.split(value);
        return text[0] + key + text[1];
      }
    }
    return text;
  }

  phraseFrom(text, file) {
    /**
    * Translates [text] depending on the [file] used
    * If file == britishOnly, text is converted from British to American
    * If file == americanOnly, text is converted from American to British
    */
    for (let [key, value] of Object.entries(file)) {
      if (text.includes(key)) {
        text = text.split(key);
        return text[0] + value + text[1];
      }
    }
    return text;
  }

  phraseTo(text, file) {
    /**
    * Translates [text] depending on the [file] used
    * If file == britishOnly, text is converted from American to British
    * If file == americanOnly, text is converted from British to American
    */
    for (let [key, value] of Object.entries(file)) {
      if (text.includes(value)) {
        text = text.split(value);
        return text[0] + key + text[1];
      }
    }
    return text;
  }

  britishToAmerican(text) {} 

  americanToBritish(text) {}

  highlight() {}

  translate(text) {
    return this.phraseFrom(text, britishOnly);
  }
}

module.exports = Translator;
