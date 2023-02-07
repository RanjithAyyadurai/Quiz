import React from 'react';
import {Link} from 'react-router-dom';
import quiz from '../assets/quiz.jpg';
function Quiz () {
  return (
    <div className="quiz__wrapper">
      <img src={quiz} alt="icon" />
      <div className="quiz__footer">

        <Link to="/user-profile/create-quiz" className="secondary__btn">
          Create Quiz
        </Link>
        <Link to="/user-profile/practice-quiz" className="primary__btn">
          Practice
        </Link>
      </div>

    </div>
  );
}

export default Quiz;
