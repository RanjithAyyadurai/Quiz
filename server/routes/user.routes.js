const {verifySignUp, authJwt} = require ('../middlewares');
const controller = require ('../controllers/auth.controller');

module.exports = function (app) {
  app.use (function (req, res, next) {
    res.header (
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next ();
  });

  app.post (
    '/api/auth/signup',
    [verifySignUp.checkDuplicateUsernameOrEmail],
    controller.signup
  );

  app.post ('/api/auth/signin', controller.signin);
  app.post (
    '/api/add-user-result',
    [authJwt.verifyToken],
    controller.addUserResult
  );
  app.get ('/api/user/profile', [authJwt.verifyToken], controller.getUserById);
  app.get (
    '/api/get-user-result/:userId',
    [authJwt.verifyToken],
    controller.getUserResult
  );
};
