const db = require ('../models');
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  console.log ('Got Data: ', req.body);
  // Username
  User.findOne ({
    username: req.body.username,
  }).exec ((err, user) => {
    if (err) {
      res.status (500).send ({message: err});
      return;
    }

    if (user) {
      res.status (400).send ({message: 'Failed! Username is already in use!'});
      return;
    }

    // Email
    User.findOne ({
      email: req.body.email,
    }).exec ((err, user) => {
      if (err) {
        res.status (500).send ({message: err});
        return;
      }

      if (user) {
        res.status (400).send ({message: 'Failed! Email is already in use!'});
        return;
      }

      next ();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
