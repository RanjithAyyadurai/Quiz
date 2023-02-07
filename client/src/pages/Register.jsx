import React, {useState, useEffect} from 'react';
import {Input, message} from 'antd';
import {Link,useNavigate} from 'react-router-dom';
import avatar from '../assets/user.png';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../auth/authActions';


function Register () {
  const [username, setUsername] = useState ('');
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const navigate = useNavigate ();
  const {loading, error, userInfo, success} = useSelector (state => state.auth);
  const dispatch = useDispatch ();

  const handleRegister = e => {
    e.preventDefault ();
    let data = {
      username: username,
      email: email,
      password: password,
    };
    dispatch (registerUser (data));

    console.log (data);
  };
  useEffect (
    () => {
      if (error) {
        message.error (error);
      }
    },
    [error]
  );
  //   useEffect(()=>{
  //     if (success) {
  //         message.success ('User registered successfully!');
  //         redirect("/login");
  //       }
  //   },[success])
  useEffect (
    () => {
      // redirect user to login page if registration was successful
      if (success) {
        message.success ('User registered successfully!');
        navigate ('/login');
      }
      // redirect authenticated user to profile screen
      if (userInfo) navigate ('/user-profile');
    },
    [navigate, userInfo, success]
  );
  return (
    <div className="login__wrapper">
      <img src={avatar} alt="Register" />
      <h1>Register</h1>
      <form className="form__wrapper">
        <Input
          onChange={e => setUsername (e.target.value)}
          value={username}
          style={{margin: '10px', width: '95%'}}
          placeholder="Your username"
        />
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
            disabled={loading || !email || !password || !username}
            onClick={handleRegister}
          >
            {loading ? 'Loading...' : 'Register'}
          </button>
          <small>Existing User? <Link to="/login">Login Here</Link></small>
        </div>
      </form>
    </div>
  );
}

export default Register;
