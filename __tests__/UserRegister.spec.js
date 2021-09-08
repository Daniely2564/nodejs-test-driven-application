const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/userModel');
const sequelize = require('../src/db/sequelize');
const agent = request(app);

// it === test
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

  // Instead of testing each one by one, we can use dynamically test our application.
  // Using a dynamic testing
  it.each([
    ['username', 'Username cannot be empty or null'],
    ['password', 'Password cannot be empty or null'],
    ['email', 'Email cannot be empty or null'],
  ])("when %s is null '%s' is received", async (field, expectedMsg) => {
    const res = await postUser({
      ...validUser,
      [field]: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(expectedMsg);
  });

  // Another way of dynamically testing
  it.each`
    field         | exptMsg
    ${'username'} | ${'Username cannot be empty or null'}
    ${'password'} | ${'Password cannot be empty or null'}
    ${'email'}    | ${'Email cannot be empty or null'}
  `("when '$field' is empty or null '$exptMsg' is received.", async ({ field, exptMsg }) => {
    const res = await postUser({
      ...validUser,
      [field]: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(exptMsg);
  });
});
