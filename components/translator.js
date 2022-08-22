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
    return text.join(' ');
  }

  phraseFrom(text, file) {
    /**
    * Translates word(s) in [text] depending on the [file] used
    * If file == britishOnly, text is converted from British to American
    * If file == americanOnly, text is converted from American to British
    */
    for (let [key, value] of Object.entries(file)) {
      const re = new RegExp(`(?<!-)\\b${key}\\b`, 'i');
      if (re.test(text)) {
        text = text.split(re);
        text = text[0] + value + text[1];
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
    text = this.britishSpelling(text);
    // text = this.phraseTo(text, britishOnly);
    return text;
  }
  
  britishToAmerican(text) {
    /**
    * Translates [text] from British to American
    */
    text = this.toAmericanTime(text);
    text = this.toAmericanTitle(text);
    text = this.phraseFrom(text, britishOnly);
    text = this.americanSpelling(text);
    // text = this.phraseTo(text, americanOnly);
    return text;
  }

  translate(text, locale) {
    /**
    * Returns [text] translated to [locale]
    */
    // text ends with a '.' or '?'
    let mark = text.slice(-1);
    text = text.slice(0, -1);
    return (locale === 'american-to-british' ?
      this.americanToBritish(text) :
      this.britishToAmerican(text)) + mark;
  }

  highlight(translation, text) {
    /**
    * Checks the translated word(s) in [translation] and adds <span class="highlight">[word]</span>
    */
    // No translation required!
    if (text === translation) return 'Everything looks good to me!';

    // Remove the mark at end of the sentence
    let mark = text.slice(-1);
    text = text.slice(0, -1);
    translation = translation.slice(0, -1);
  
    text = text.split(' ');
    translation = translation.split(' ');
    for (const word of translation) {
      if (!text.includes(word)) {
        let index = translation.indexOf(word);
        translation[index] = `<span class="highlight">${word}</span>`;
      }
    }
    return translation.join(' ') + mark;
  }
}

module.exports = Translator;
