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

      if (!['american-to-british', 'british-to-american'].incluldes(req.body.locale)) {
        return res.json({ error: 'Invalid value for locale field' });
      }
    });
};
