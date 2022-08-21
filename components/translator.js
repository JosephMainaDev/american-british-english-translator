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
    /**
    * Translates British titles {Mr, dr, prof} to American titles {Mr., dr., prof.}
    */
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
    /**
    * Translates American titles {Mr., dr., prof.} etc to British equivalent {Mr, dr, prof}
    */
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

  phraseFrom(text, file) {
    /**
    * Translates word(s) in [text] depending on the [file] used
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
    * Translates word(s) in [text] depending on the [file] used
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

  britishSpelling(text) {
    /**
    * Translates words in [text] from American to British
    */
    text = text.split(' ');
    let index = null;
    let originalWord = null;
    for (let word of text) {
      if (word.toLowerCase() in americanToBritishSpelling) {
        index = text.indexOf(word);
        originalWord = text[index];
        text[index] = this.matchCase(originalWord, americanToBritishSpelling[word.toLowerCase()]);
      }
    }
    return text.join(' ');
  }
  
  americanSpelling(text) {
    /**
    * Translates words in [text] from British to American
    */
    text = text.split(' ');
    let index = null;
    let originalWord = null;
    for (let word of text) {
      if (Object.values(americanToBritishSpelling).includes(word.toLowerCase())) {
        const newWord = Object.keys(americanToBritishSpelling)
        .find(key => americanToBritishSpelling[key] === word.toLowerCase());
        index = text.indexOf(word);
        originalWord = text[index];
        text[index] = this.matchCase(originalWord, newWord);
      }
    }
    return text.join(' ');
  }

  americanToBritish(text) {
    /**
    * Translates [text] from American to British
    */
    text = this.toBritishTime(text);
    text = this.toBritishTitle(text);
    text = this.phraseFrom(text, americanOnly);
    text = this.phraseTo(text, britishOnly);
    text = this.britishSpelling(text);
    return text;
  }
  
  britishToAmerican(text) {
    /**
    * Translates [text] from British to American
    */
    text = this.toAmericanTime(text);
    text = this.toAmericanTitle(text);
    text = this.phraseFrom(text, britishOnly);
    text = this.phraseTo(text, americanOnly);
    text = this.americanSpelling(text);
    return text;
  }

  highlight() {}

  translate(text, locale) {
    /**
    * Returns [text] translated to [locale]
    */
    return locale === 'american-to-british' ?
      this.americanToBritish(text) :
      this.britishToAmerican(text);
  }
}

module.exports = Translator;
