const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/userModel');
const sequelize = require('../src/db/sequelize');

// This is built in jest
beforeAll(() => {
  return sequelize.sync();
});

// This is built in jest
beforeEach(() => {
  return User.destroy({ truncate: true }); // clean user table for every test
});

// Either use 'test' or 'it'

describe('User Registration', () => {
  it('returns 200 OK when signup request is valid', (done) => {
    // First Parameter 'done' for async functions
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P4ssword',
      })
      .then((respose) => {
        expect(respose.status).toBe(200);
        done();
      });
    // .expect(200, done); doing it asyc
  });

  it('returns success message when signup request is valid', (done) => {
    // First Parameter 'done' for async functions
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P4ssword',
      })
      .then((respose) => {
        expect(respose.body.message).toBe('User created!');
        done();
      });
    // .expect(200, done); doing it asyc
  });

  it('saves the user to database', (done) => {
    // First Parameter 'done' for async functions
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P4ssword',
      })
      .then(() => {
        // query user table
        User.findAll().then((users) => {
          expect(users.length).toBe(1);
          done();
        });
      });
  });

  it('saves the username and email to database', (done) => {
    // First Parameter 'done' for async functions
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P4ssword',
      })
      .then(() => {
        // query user table
        User.findAll().then((users) => {
          const savedUser = users[0];
          expect(savedUser.username).toBe('user1');
          expect(savedUser.email).toBe('user1@mail.com');
          done();
        });
      });
  });

  it('hashes the password in database', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P4ssword',
      })
      .then(() => {
        User.findAll().then((users) => {
          const savedUser = users[0];
          expect(savedUser.password).not.toBe('P4ssword');
          done();
        });
      });
  });
});
