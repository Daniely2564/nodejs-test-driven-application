const UserService = require('../services/userServices');

exports.postUser = async (req, res) => {
  await UserService.save(req.body);
  res.status(200).send({ message: 'User created!' });
};
