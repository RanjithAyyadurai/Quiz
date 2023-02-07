import React from 'react';
import homeImg from '../assets/home.svg';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
function Home () {
  const {userInfo} = useSelector (state => state.auth);

  return (
    <div className="home__wrapper">
      <div className="home__col1">
        <h1>Let's Learn and Practice MCQs</h1>
        <div className="btn__wrapper">
          {userInfo
            ? <Link to="/quiz" className="primary__btn">Go to Quiz</Link>
            : <Link to="/login" className="primary__btn">Login</Link>}
          <Link to="/register" className="secondary__btn">Register</Link>
        </div>
      </div>
      <div className="home__col2">
        <img src={homeImg} alt="img" />
      </div>
    </div>
  );
}

export default Home;
