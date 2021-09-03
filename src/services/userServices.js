const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

/**
 * Create a user and save it to the database
 *
 * @param {object} body request body
 */
exports.save = async function (body) {
  const hashedPassword = await bcrypt.hash(body.password, 10);
  return await User.create({
    ...body,
    password: hashedPassword,
  });
};
