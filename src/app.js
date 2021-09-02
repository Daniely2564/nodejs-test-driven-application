const express = require('express');
const app = express();
const User = require('./models/userModel');
const bcrypt = require('bcryptjs');

app.use(express.json());

app.post('/api/1.0/users', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await User.create({
    ...req.body,
    password: hashedPassword,
  });
  res.status(200).send({ message: 'User created!' });
});

module.exports = app;
