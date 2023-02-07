const User = require ('../models/user');
const bcrypt = require ('bcryptjs');
const config = require ('../config/auth.config.js');
const jwt = require ('jsonwebtoken');
exports.signup = (req, res) => {
  console.log (req.body);
  const user = new User ({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync (req.body.password, 8),
    completedQuiz: [],
  });
  user.save ((err, result) => {
    if (err) {
      console.log (err);
      res.send (err);
      return;
    }
    res.status (200).send (result);
  });
};

exports.signin = (req, res) => {
  User.findOne ({
    email: req.body.email,
  }).exec (async (err, user) => {
    if (err) {
      res.status (500).send ({message: err});
      return;
    }

    if (!user) {
      return res.status (500).send ({message: 'User Not found.'});
    }

    let passwordIsValid = bcrypt.compareSync (req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status (401).send ({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }

    let token = jwt.sign ({id: user.id}, config.secret);

    res.status (200).send ({
      id: user._id,
      username: user.username,
      email: user.email,
      completedQuiz: user.completedQuiz,
      userToken: token,
    });
  });
};

exports.addUserResult = (req, res) => {
  let id = req.body.userId;
  try {
    User.findById (id, (err, user) => {
      if (req.body.result > user.result) {
        User.findByIdAndUpdate (
          id,
          {$set: {result: req.body.result}},
          (err, result) => {
            if (err) {
              res.send (err);
              return;
            }
            res.status (201).send (result);
          }
        );

        return;
      } else {
        res.sendStatus (200);
        return;
      }
    });
  } catch (Err) {
    res.send (Err);
  }
};

exports.getUserById = (req, res) => {
  let id = req.userId;
  console.log ('userId in Cont. ', id);
  User.findById (id, (err, result) => {
    if (err) {
      res.send (err);
      return;
    }
    res.status (201).send (result);
  });
};

exports.getUserResult = (req, res) => {
  let id = req.params.userId;
  console.log ('userId in result cont. ', id);
  User.findById (id, (err, result) => {
    if (err) {
      res.send (err);
      return;
    }
    res.status (201).send ({result: result.result});
  });
};
