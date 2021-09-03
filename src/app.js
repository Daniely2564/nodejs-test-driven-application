const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/1.0/users', require('./routes/userRoutes'));

module.exports = app;
