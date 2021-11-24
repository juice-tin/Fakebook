const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const secrets = require('../data/secrets');

exports.authenticate = async (req, res) => {
  const {name, password} = req.body;
  // Replace this with searching database for user
  // const user = users.find((user) => {
  //   return user.email === email &&
  //   bcrypt.compareSync(password, user.password);
  // });
  const user = {
    name: name,
  };
  // For now use username dev and password dev
  if (user.name === 'dev' && password === 'dev') {
    const accessToken = jwt.sign(
      {name: user.name},
      secrets.accessToken, {
        expiresIn: '30m',
        algorithm: 'HS256'
      });
    res.status(200).json({name: user.name, accessToken: accessToken});
  } else {
    res.status(401).send('Username or password incorrect');
  }
};

exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secrets.accessToken, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
    next();
  } else {
    res.sendStatus(401);
  }
};
