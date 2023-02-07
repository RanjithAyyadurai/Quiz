import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

const backendURL = 'http://localhost:5000';

export const registerUser = createAsyncThunk (
  'auth/register',
  async ({username, email, password}, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post (
        `${backendURL}/api/auth/signup`,
        {username, email, password},
        config
      );
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue (error.response.data.message);
      } else {
        return rejectWithValue (error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk (
  'auth/login',
  async ({email, password}, {rejectWithValue}) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axios.post (
        `${backendURL}/api/auth/signin`,
        {email, password},
        config
      );
      // store user's token in local storage
      localStorage.setItem ('userToken', data.userToken);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue (error.response.data.message);
      } else {
        return rejectWithValue (error.message);
      }
    }
  }
);
