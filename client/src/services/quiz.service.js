import axios from 'axios';
import authHeader from './auth.header.js';
const API_URL = 'http://localhost:5000';
const getAllQuiz = () => {
  return axios.get (API_URL + '/api/get-all-quiz', {headers: authHeader ()});
};

const createQuiz = data => {
  return axios.post (API_URL + '/api/create-quiz', data, {
    headers: authHeader (),
  });
};

const addResult = (result, id) => {
  console.log ({result: result, userId: id});
  return axios.post (
    API_URL + '/api/add-user-result',
    {result: result, userId: id},
    {
      headers: authHeader (),
    }
  );
};

const getUserResultFromDb = id => {
  return axios.get (API_URL + '/api/get-user-result/' + id, {
    headers: authHeader (),
  });
};

const quizService = {
  getAllQuiz,
  createQuiz,
  addResult,
  getUserResultFromDb,
};

export default quizService;
