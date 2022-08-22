const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  test('#1 Single word American to British', () => {
    assert.equal(
      translator.translate('Mangoes are my favorite fruit.', 'american-to-british'),
      'Mangoes are my favourite fruit.'
    );
  });
  
  test('#2 Single word American to British', () => {
    assert.equal(
      translator.translate('I ate yogurt for breakfast.', 'american-to-british'),
      'I ate yoghurt for breakfast.'
    );
  });
  
  test('#3 Single word American to British', () => {
    assert.equal(
      translator.translate("We had a party at my friend's condo.", 'american-to-british'),
      "We had a party at my friend's flat."
    );
  });

  test('#4 Single word American to British', () => {
    assert.equal(
      translator.translate('Can you toss this in the trashcan for me?', 'american-to-british'),
      'Can you toss this in the bin for me?'
    );
  });

  test('#5 Multiple words American to British', () => {
    assert.equal(
      translator.translate('The parking lot was full.', 'american-to-british'),
      'The car park was full.'
    );
  });

  test('#6 Multiple words American to British', () => {
    assert.equal(
      translator.translate('Like a high tech Rube Goldberg machine.', 'american-to-british'),
      'Like a high tech Heath Robinson device.'
    );
  });

  test('#7 Multiple words American to British', () => {
    assert.equal(
      translator.translate('To play hooky means to skip class or work.', 'american-to-british'),
      'To bunk off means to skip class or work.'
    );
  });

  test('#8 Title American to British', () => {
    assert.equal(
      translator.translate('No Mr. Bond, I expect you to die.', 'american-to-british'),
      'No Mr Bond, I expect you to die.'
    );
  });

  test('#9 Title American to British', () => {
    assert.equal(
      translator.translate('Dr. Grosh will see you now.', 'american-to-british'),
      'Dr Grosh will see you now.'
    );
  });

  test('#10 Time American to British', () => {
    assert.equal(
      translator.translate('Lunch is at 12:15 today.', 'american-to-british'),
      'Lunch is at 12.15 today.'
    );
  });

  test('#11 Single word British to American', () => {
    assert.equal(
      translator.translate('We watched the footie match for a while.', 'british-to-american'),
      'We watched the soccer match for a while.'
    );
  });

  test('#12 Single word British to American', () => {
    assert.equal(
      translator.translate('Paracetamol takes up to an hour to work.', 'british-to-american'),
      'Tylenol takes up to an hour to work.'
    );
  });

  test('#13 Single word British to American', () => {
    assert.equal(
      translator.translate('First, caramelise the onions.', 'british-to-american'),
      'First, caramelize the onions.'
    );
  });

  test('#14 Multiple words British to American', () => {
    assert.equal(
      translator.translate('I spent the bank holiday at the funfair.', 'british-to-american'),
      'I spent the public holiday at the carnival.'
    );
  });

  test('#15 Multiple words British to American', () => {
    assert.equal(
      translator.translate('I had a bicky then went to the chippy.', 'british-to-american'),
      'I had a cookie then went to the fish-and-chip shop.'
    );
  });

  test('#16 Multiple words British to American', () => {
    assert.equal(
      translator.translate("I've just got bits and bobs in my bum bag.", 'british-to-american'),
      "I've just got odds and ends in my fanny pack."
    );
  });

  test('#17 Multiple words British to American', () => {
    assert.equal(
      translator.translate('The car boot sale at Boxted Airfield was called off.', 'british-to-american'),
      'The swap meet at Boxted Airfield was called off.'
    );
  });

  test('#18 Title British to American', () => {
    assert.equal(
      translator.translate('Have you met Mrs Kalyani?', 'british-to-american'),
      'Have you met Mrs. Kalyani?'
    );
  });

  test('#19 Title British to American', () => {
    assert.equal(
      translator.translate("Prof Joyner of King's College, London.", 'british-to-american'),
      "Prof. Joyner of King's College, London."
    );
  });

  test('#20 Time British to American', () => {
    const text = 'Tea time is usually around 4 or 4.30.';
    const locale = 'british-to-american'
    const translation = 'Tea time is usually around 4 or 4:30.';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#21 Highlight single word American to British', () => {
    const text = 'Mangoes are my favorite fruit.';
    const highlighted = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
    assert.equal(
      translator.highlight(translator.translate(text, 'american-to-british'), text), highlighted
    );
  });

  test('#22 Highlight single word American to British', () => {
    const text = 'I ate yogurt for breakfast.';
    const highlighted = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
    assert.equal(
      translator.highlight(translator.translate(text, 'american-to-british'), text), highlighted
    );
  });

  test('#23 Highlight single word British to American', () => {
    const text = 'We watched the footie match for a while.';
    const highlighted = 'We watched the <span class="highlight">soccer</span> match for a while.';
    assert.equal(
      translator.highlight(translator.translate(text, 'british-to-american'), text), highlighted
    );
  });

  test('#23 Highlight single word British to American', () => {
    const text = 'Paracetamol takes up to an hour to work.';
    const highlighted = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
    assert.equal(
      translator.highlight(translator.translate(text, 'british-to-american'), text), highlighted
    );
  });
});
