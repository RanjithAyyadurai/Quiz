import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import {message} from 'antd';
import avatar from '../assets/user.png';
import quizService from '../services/quiz.service';
function UserInfo () {
  const {userInfo} = useSelector (state => state.auth);
  const [result,setResult] = useState(0);
  useEffect(()=>{
    let isMounted = true;
    const getUserScore = async ()=>{
      try{
        const response = await quizService.getUserResultFromDb(userInfo.id);
        // console.log(response.data);
        setResult(response.data.result);
      }catch(err){
        console.log(err);
        message.error(err.message ? err.message : 'something went wrong!');
      }
    } 
    if(isMounted && userInfo && userInfo.id){
      getUserScore();
    }
    return ()=>{
      isMounted = false;
    }
  },[userInfo])
  return(
  <div className='info__card'>
    <img src={avatar} alt="user"/>
    <h1>Hi, {userInfo?.username}</h1>
    <div className='info__table'>
      <h3>Email: {userInfo?.email}</h3>
      <h3>Result: {result}</h3>
    </div>
  </div>);
}

export default UserInfo;
