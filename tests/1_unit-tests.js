const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  test('#1 Single word American to British', () => {
    const text = 'Mangoes are my favorite fruit.';
    const locale = 'american-to-british';
    const translation = 'Mangoes are my favourite fruit.';
    assert.equal(translator.translate(text, locale), translation);
  });
  
  test('#2 Single word American to British', () => {
    const text = 'I ate yogurt for breakfast.';
    const locale = 'american-to-british';
    const translation = 'I ate yoghurt for breakfast.';
    assert.equal(translator.translate(text, locale), translation);
  });
  
  test('#3 Single word American to British', () => {
    const text = "We had a party at my friend's condo.";
    const locale = 'american-to-british';
    const translation = "We had a party at my friend's flat.";
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#4 Single word American to British', () => {
    const text = 'Can you toss this in the trashcan for me?';
    const locale = 'american-to-british';
    const translation = 'Can you toss this in the bin for me?';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#5 Multiple words American to British', () => {
    const text = 'The parking lot was full.';
    const locale = 'american-to-british';
    const translation = 'The car park was full.';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#6 Multiple words American to British', () => {
    const text = 'Like a high tech Rube Goldberg machine.';
    const locale = 'american-to-british';
    const translation = 'Like a high tech Heath Robinson device.';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#7 Multiple words American to British', () => {
    const text = 'To play hooky means to skip class or work.';
    const locale = 'american-to-british';
    const translation = 'To bunk off means to skip class or work.';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#8 Title American to British', () => {
    const text = 'No Mr. Bond, I expect you to die.';
    const locale = 'american-to-british';
    const translation = 'No Mr Bond, I expect you to die.';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#9 Title American to British', () => {
    const text = 'Dr. Grosh will see you now.';
    const locale = 'american-to-british';
    const translation = 'Dr Grosh will see you now.';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#10 Time American to British', () => {
    const text = 'Lunch is at 12:15 today.';
    const locale = 'american-to-british';
    const translation = 'Lunch is at 12.15 today.';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#11 Single word British to American', () => {
    const text = 'We watched the footie match for a while.';
    const locale = 'british-to-american';
    const translation = 'We watched the soccer match for a while.';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#12 Single word British to American', () => {
    const text = 'Paracetamol takes up to an hour to work.';
    const locale = 'british-to-american';
    const translation = 'Tylenol takes up to an hour to work.';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#13 Single word British to American', () => {
    const text = 'First, caramelise the onions.';
    const locale = 'british-to-american';
    const translation = 'First, caramelize the onions.';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#14 Multiple words British to American', () => {
    const text = 'I spent the bank holiday at the funfair.';
    const locale = 'british-to-american';
    const translation = 'I spent the public holiday at the carnival.';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#15 Multiple words British to American', () => {
    const text = 'I had a bicky then went to the chippy.';
    const locale = 'british-to-american';
    const translation = 'I had a cookie then went to the fish-and-chip shop.';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#16 Multiple words British to American', () => {
    const text = "I've just got bits and bobs in my bum bag.";
    const locale = 'british-to-american';
    const translation = "I've just got odds and ends in my fanny pack.";
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#17 Multiple words British to American', () => {
    const text = 'The car boot sale at Boxted Airfield was called off.';
    const locale = 'british-to-american';
    const translation = 'The swap meet at Boxted Airfield was called off.';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#18 Title British to American', () => {
    const text = 'Have you met Mrs Kalyani?';
    const locale = 'british-to-american';
    const translation = 'Have you met Mrs. Kalyani?';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#19 Title British to American', () => {
    const text = "Prof Joyner of King's College, London.";
    const locale = 'british-to-american';
    const translation = "Prof. Joyner of King's College, London.";
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#20 Time British to American', () => {
    const text = 'Tea time is usually around 4 or 4.30.';
    const locale = 'british-to-american';
    const translation = 'Tea time is usually around 4 or 4:30.';
    assert.equal(translator.translate(text, locale), translation);
  });

  test('#21 Highlight single word American to British', () => {
    const text = 'Mangoes are my favorite fruit.';
    const locale = 'american-to-british';
    const highlighted = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
    const translation = translator.translate(text, locale);
    assert.equal(translator.highlight(translation, text), highlighted);
  });

  test('#22 Highlight single word American to British', () => {
    const text = 'I ate yogurt for breakfast.';
    const locale = 'american-to-british';
    const highlighted = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
    const translation = translator.translate(text, locale);
    assert.equal(translator.highlight(translation, text), highlighted);
  });

  test('#23 Highlight single word British to American', () => {
    const text = 'We watched the footie match for a while.';
    const locale = 'british-to-american';
    const highlighted = 'We watched the <span class="highlight">soccer</span> match for a while.';
    const translation = translator.translate(text, locale);
    assert.equal(translator.highlight(translation, text), highlighted);
  });

  test('#24 Highlight single word British to American', () => {
    const text = 'Paracetamol takes up to an hour to work.';
    const locale = 'british-to-american';
    const highlighted = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
    const translation = translator.translate(text, locale);
    assert.equal(translator.highlight(translation, text), highlighted);
  });
});
