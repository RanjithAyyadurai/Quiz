import React, {useState, useEffect} from 'react';
import {Input, message} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import avatar from '../assets/user.png';
import {userLogin} from '../auth/authActions';
import {useDispatch, useSelector} from 'react-redux';
function Login () {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const {loading, error, userInfo} = useSelector (state => state.auth);
  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  // redirect authenticated user to profile screen
  useEffect (
    () => {
      if (userInfo) {
        navigate ('/user-profile');
      }
    },
    [navigate, userInfo]
  );

  const handleLogin = e => {
    e.preventDefault ();
    let data = {
      email: email,
      password: password,
    };

    dispatch (userLogin (data));
  };
  useEffect (
    () => {
      if (error) {
        message.error (error);
      }
    },
    [error]
  );
  return (
    <div className="login__wrapper">
      <img src={avatar} alt="login" />
      <h1>Login</h1>
      <form className="form__wrapper">
        <Input
          onChange={e => setEmail (e.target.value)}
          value={email}
          style={{margin: '10px', width: '95%'}}
          placeholder="Your email"
        />
        <Input.Password
          onChange={e => setPassword (e.target.value)}
          value={password}
          style={{margin: '10px', width: '95%'}}
          placeholder="Your Password"
        />
        <div className="form__btns">
          <button
            className="primary__btn"
            disabled={!email || !password || loading}
            onClick={handleLogin}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
          <small>New User? <Link to="/register">Register Here</Link></small>
        </div>
      </form>
    </div>
  );
}

export default Login;
