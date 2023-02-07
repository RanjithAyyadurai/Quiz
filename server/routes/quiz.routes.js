const {verifySignUp} = require ('../middlewares');
const {authJwt} = require ('../middlewares');
const controller = require ('../controllers/quiz.controller');

module.exports = function (app) {
  app.use (function (req, res, next) {
    res.header (
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next ();
  });

  app.post ('/api/create-quiz', [authJwt.verifyToken], controller.createQuiz);

  app.get ('/api/get-all-quiz', [authJwt.verifyToken], controller.getAllQuiz);
};
