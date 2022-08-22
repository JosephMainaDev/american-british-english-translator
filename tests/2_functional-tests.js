const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  test('#1 Text and locale fields', (done) => {
    const text = 'Mangoes are my favorite fruit.';
    const translation = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
    const locale = 'american-to-british';
    chai.request(server)
      .post('/api/translate')
      .send({ text, locale })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { text, translation });
        done();
      })
  });
  
  test('#2 Invalid locale field', (done) => {
    const text = 'Mangoes are my favorite fruit.';
    const locale = 'british-to-gikuyu';
    const error = 'Invalid value for locale field';
    chai.request(server)
      .post('/api/translate')
      .send({ text, locale })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error });
        done();
      })
  });
  
  test('#3 Missing text field', (done) => {
    const locale = 'british-to-american';
    const error = 'Required field(s) missing';
    chai.request(server)
      .post('/api/translate')
      .send({ locale })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error });
        done();
      })
  });
  
  test('#4 Missing locale field', (done) => {
    const text = 'Mangoes are my favorite fruit.';
    const error = 'Required field(s) missing';
    chai.request(server)
      .post('/api/translate')
      .send({ text })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error });
        done();
      })
  });

  test('#5 Empty text', (done) => {
    const text = '';
    const locale = 'british-to-american';
    const error = 'No text to translate';
    chai.request(server)
      .post('/api/translate')
      .send({ text, locale })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error });
        done();
      })
  });
  
  test('#6 Text that needs no translation', (done) => {
    const text = "I don't require translation!";
    const locale = 'british-to-american';
    const translation = 'Everything looks good to me!';
    chai.request(server)
      .post('/api/translate')
      .send({ text, locale })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { text, translation });
        done();
      })
  });
});
