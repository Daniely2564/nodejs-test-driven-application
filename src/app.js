const express = require('express');
const app = express();
const User = require('./models/userModel');

app.use(express.json());

app.post('/api/1.0/users', (req, res) => {
  User.create(req.body).then(() => {
    res.status(200).send({ message: 'User created!' });
  });
});

module.exports = app;
