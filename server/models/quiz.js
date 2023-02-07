const mongoose = require ('mongoose');

const Quiz = mongoose.model (
  'Quiz',
  new mongoose.Schema (
    {
      question: String,
      options: Array,
      answer: String,
      createdBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Quiz;
