const request = require('supertest');
const app = require('../app');
// Either use 'test' or 'it'

it('returns 200 OK when signup request is valid', (done) => {
  // First Parameter 'done' for async functions
  request(app)
    .post('/api/1.0/users')
    .send({
      username: 'user1',
      email: 'user1@mail.com',
      password: 'P4ssword',
    })
    .expect(200, done);
});
