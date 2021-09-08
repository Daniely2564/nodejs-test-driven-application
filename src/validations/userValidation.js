exports.validatePostUser = (req, res, next) => {
  const { username, password, email } = req.body;
  let missing = [];
  if (!username) missing.push('Username');
  if (!password) missing.push('Password');
  if (!email) missing.push('Email');
  if (missing.length > 0) {
    return res.status(400).send({ message: `${missing.join(',')} cannot be empty or null` });
  }
  next();
};
