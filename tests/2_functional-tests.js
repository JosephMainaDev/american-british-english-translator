const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', (done) => {
  /*test('#1 Text and locale fields', () => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Mangoes are my favorite fruit.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { translation: 'translation' });
        done();
      })
  });*/
  
  test('#2 Invalid locale field', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Mangoes are my favorite fruit.', locale: 'british-to-gikuyu' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Invalid value for locale field' });
        done();
      })
  });
  
  test('#3 Missing text field', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({ locale: 'british-to-american' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Required field(s) missing' });
        done();
      })
  });
  
  test('#4 Missing locale field', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Mangoes are my favorite fruit.' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Required field(s) missing' });
        done();
      })
  });

  test('#5 Empty text', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: '', locale: 'british-to-american' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'No text to translate' });
        done();
      })
  });
  
  /*test('#6 Text that needs no translation', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'This is a sentence.', locale: 'british-to-american' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        // assert.deepEqual(res.body, { translation: 'Everything looks good to me!' });
        assert.deepEqual(res.body.translation, 'Everything looks good to me!');
        done();
      })
  });*/
});
