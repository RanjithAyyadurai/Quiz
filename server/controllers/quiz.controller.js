const {quiz} = require ('../models');

exports.createQuiz = (req, res) => {
  let data = req.body;
  console.log ('quiz data', data);
  let quizItem = new quiz (data);

  quizItem.save ((err, result) => {
    if (err) {
      console.log (err);
      res.send (err);
      return;
    }
    console.log (result);
    res.status (201).send (result);
  });
};

exports.getAllQuiz = (req, res) => {
  quiz
    .find ({})
    .then (result => {
      console.log (result);
      res.send (result);
    })
    .catch (err => {
      console.log (err);
      res.status (400).send (err);
    });
};
