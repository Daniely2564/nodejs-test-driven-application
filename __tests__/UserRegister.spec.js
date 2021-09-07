const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/userModel');
const sequelize = require('../src/db/sequelize');
const agent = request(app);

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
  const validUser = {
    username: 'user1',
    email: 'user1@mail.com',
    password: 'P4ssword',
  };
  const postUser = (user = validUser) => {
    return agent.post('/api/1.0/users').send(user);
  };

  it('returns 200 OK when signup request is valid', async () => {
    const response = await postUser();
    expect(response.status).toBe(200);
    // .expect(200, done); doing it asyc
  });

  it('returns success message when signup request is valid', async () => {
    const response = await postUser();
    expect(response.body.message).toBe('User created!');
  });

  it('saves the user to database', async () => {
    await postUser();
    const users = await User.findAll();
    expect(users.length).toBe(1);
  });

  it('saves the username and email to database', async () => {
    await postUser();
    const users = await User.findAll();
    const savedUser = users[0];
    expect(savedUser.username).toBe('user1');
    expect(savedUser.email).toBe('user1@mail.com');
  });

  it('hashes the password in database', async () => {
    await postUser();
    const users = await User.findAll();
    const savedUser = users[0];
    expect(savedUser.password).not.toBe('P4ssword');
  });

  it('returns 400 when username is null or empty', async () => {
    const res = await postUser({
      username: null,
      password: '1234',
      email: 'random@email.com',
    });
    expect(res.status).toBe(400);
  });

  it('returns 400 when password is null or empty', async () => {
    const res = await postUser({
      username: 'abc',
      password: null,
      email: 'random@email.com',
    });
    expect(res.status).toBe(400);
  });

  it('returns 400 when email is null or empty', async () => {
    const res = await postUser({
      username: 'abc',
      password: 'ba',
      email: '',
    });
    expect(res.status).toBe(400);
  });

  it('returns validationError field when validating body fails', async () => {
    const { body } = await postUser({
      username: null,
      email: 'user1@email.com',
      password: 'password',
    });

    expect(body).not.toBeUndefined();
    expect((body || {}).message).not.toBeUndefined();
  });
});
