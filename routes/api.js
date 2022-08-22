'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      if (req.body.locale === undefined || req.body.text === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      if (!req.body.text.length) {
        return res.json({ error: 'No text to translate' });
      }

      if (['american-to-british', 'british-to-american'].indexOf(req.body.locale) == -1) {
        return res.json({ error: 'Invalid value for locale field' });
      }

      // Translate [text] according to [locale]
      let translation = translator.translate(req.body.text, req.body.locale);
      translation = translator.highlight(translation, req.body.text);
      
      return res.json({ text: req.body.text, translation });
    });
};
