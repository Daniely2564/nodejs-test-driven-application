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
  const postValidUser = () => {
    return request(app).post('/api/1.0/users').send({
      username: 'user1',
      email: 'user1@mail.com',
      password: 'P4ssword',
    });
  };

  it('returns 200 OK when signup request is valid', async () => {
    const response = await postValidUser();
    expect(response.status).toBe(200);
    // .expect(200, done); doing it asyc
  });

  it('returns success message when signup request is valid', async () => {
    const response = await postValidUser();
    expect(response.body.message).toBe('User created!');
  });

  it('saves the user to database', async () => {
    await postValidUser();
    const users = await User.findAll();
    expect(users.length).toBe(1);
  });

  it('saves the username and email to database', async () => {
    await postValidUser();
    const users = await User.findAll();
    const savedUser = users[0];
    expect(savedUser.username).toBe('user1');
    expect(savedUser.email).toBe('user1@mail.com');
  });

  it('hashes the password in database', async () => {
    await postValidUser();
    const users = await User.findAll();
    const savedUser = users[0];
    expect(savedUser.password).not.toBe('P4ssword');
  });
});
