import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import {Provider} from 'react-redux';
import store from './store';
import Quiz from './pages/Quiz';
import UserInfo from './pages/UserInfo';
import QuizForm from './pages/QuizForm';
import PracticeQuiz from './pages/PracticeQuiz';

const router = createBrowserRouter ([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/user-profile',
    element: <UserProfile />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/user-profile',
        element: <UserInfo />,
      },
      {
        path: '/user-profile/quiz',
        element: <Quiz />,
      },
      {
        path: '/user-profile/create-quiz',
        element: <QuizForm />,
      },
      {
        path: '/user-profile/practice-quiz',
        element: <PracticeQuiz />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot (document.getElementById ('root'));
root.render (
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals ();
