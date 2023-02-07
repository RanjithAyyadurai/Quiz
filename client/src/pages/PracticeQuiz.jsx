import React, {useState, useEffect} from 'react';

import quizService from '../services/quiz.service';
import {message, Space, Radio, Button} from 'antd';
import {useSelector} from 'react-redux';
function PracticeQuiz () {
  const [allQuizes, setAllQuizes] = useState ([]);
  const [currentQuiz, setCurrentQuiz] = useState ('');
  const [currentQuizOption, setCurrentQuizOption] = useState ('');
  const [currentQuizIndex, setCurentQuizIndex] = useState (0);
  const [allAnswers, setAllAnswers] = useState ([]);
  const [totalScore, setTotalScore] = useState (0);
  const [isSubmitted, setIsSubmitted] = useState (false);
  const [loading, setLoading] = useState (false);
  const [isEvaluate, setIsEvaluate] = useState (false);
  const {userInfo} = useSelector (state => state.auth);
  const [maxMarks, setMaxMarks] = useState (0);
  useEffect (
    () => {
      let isMounted = true;
      const getUserScore = async () => {
        try {
          const response = await quizService.getUserResultFromDb (userInfo.id);
          setMaxMarks (response.data.result);
        } catch (err) {
          console.log (err);
          message.error (err.message ? err.message : 'something went wrong!');
        }
      };
      if (isMounted && userInfo && userInfo.id) {
        getUserScore ();
      }
      return () => {
        isMounted = false;
      };
    },
    [userInfo]
  );
  useEffect (() => {
    let isMounted = true;
    const getAllQuiz = async () => {
      try {
        const response = await quizService.getAllQuiz ();
        // console.log (response.data);
        setAllQuizes (response.data);
      } catch (err) {
        console.log (err);
        message.error (err.message ? err.message : 'something went wrong!');
      }
    };
    if (isMounted) {
      getAllQuiz ();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect (
    () => {
      if (allQuizes.length > 0) {
        setCurrentQuiz (allQuizes[0]);
        setCurentQuizIndex (0);
      }
    },
    [allQuizes]
  );

  const handleCurrentQuizOption = e => {
    let selected = e.target.value;
    // console.log (selected);
    setCurrentQuizOption (selected);
  };

  const handleAddResultInDB = async () => {
    try {
      const response = await quizService.addResult (totalScore, userInfo.id);
      // console.log (response.data);
      if (response.data) {
        message.success ('Score Saved!');
      }
    } catch (err) {
      console.log (err);
      message.error (err.message ? err.message : 'something went wrong!');
    }
  };

  const handleNextQuiz = toGo => {
    let quizAnswer = {
      qId: currentQuiz._id,
      answer: currentQuizOption,
    };
    let index = allAnswers.findIndex (ans => ans.qId === currentQuiz._id);
    // console.log (index);
    if (index !== -1) {
      setAllAnswers (prev => {
        prev[index] = quizAnswer;
        return prev;
      });
    } else {
      setAllAnswers (prev => [...prev, quizAnswer]);
    }

    if (toGo === 'prev' && currentQuizIndex !== 0) {
      setCurrentQuiz (allQuizes[currentQuizIndex - 1]);
      setCurentQuizIndex (currentQuizIndex - 1);
      let currentSelected = allAnswers.find (
        ans => ans.qId === allQuizes[currentQuizIndex - 1]._id
      );
      //console.log (currentSelected);
      if (currentSelected) {
        setCurrentQuizOption (currentSelected.answer);
      }
    } else if (toGo === 'next' && currentQuizIndex !== allQuizes.length - 1) {
      setCurrentQuiz (allQuizes[currentQuizIndex + 1]);
      setCurentQuizIndex (currentQuizIndex + 1);
      let currentSelected = allAnswers.find (
        ans => ans.qId === allQuizes[currentQuizIndex + 1]._id
      );
      // console.log (currentSelected);
      if (currentSelected) {
        setCurrentQuizOption (currentSelected.answer);
      }
    } else if (toGo === 'next' && currentQuizIndex === allQuizes.length - 1) {
      setLoading (true);
      setIsEvaluate (true);
    }
  };

  useEffect (
    () => {
      if (allAnswers.length === allQuizes.length && isEvaluate) {
        let score = 0;
        for (let i = 0; i < allQuizes.length; i++) {
          for (let j = 0; j < allAnswers.length; j++) {
            if (
              allQuizes[i]._id === allAnswers[j].qId &&
              allQuizes[i].answer === allAnswers[j].answer
            ) {
              score++;
            }
          }
        }
        setLoading (false);
        setTotalScore (score);
        setIsSubmitted (true);
      }
    },
    [allAnswers, allQuizes, isEvaluate]
  );

  const handleRestartQuiz = () => {
    setAllAnswers ([]);
    setCurrentQuiz (allQuizes[0]);
    setCurentQuizIndex (0);
    setCurrentQuizOption ('');
    setTotalScore (0);
    setIsEvaluate (false);
    setIsSubmitted (false);
  };

  return (
    <div className="practice__quizWrapper">
      {isSubmitted &&
        <div className="final__score">
          <h2>{totalScore}</h2>
          <b>Total Score</b>
          <div style={{display: 'flex'}}>
            <Button onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
            <Button
              style={{marginLeft: '10px'}}
              type="primary"
              onClick={handleAddResultInDB}
            >
              Save Result
            </Button>
          </div>
        </div>}
      {currentQuiz &&
        isSubmitted === false &&
        <div className="singleQuiz__wrapper">
          <div key={currentQuiz._id} className="single__quiz">
            <div className="single__quizHeader">
              <div className="singleQuiz__top">
                <h2>{currentQuizIndex + 1}. {currentQuiz.question}</h2>
                <div className="singlQuiInfo">
                  <div><b>Total Quiz</b>: {allQuizes.length}</div>
                  <div><b>Max Marks: </b>{maxMarks}</div>
                </div>
              </div>
              <Radio.Group
                onChange={handleCurrentQuizOption}
                value={currentQuizOption}
              >
                <Space direction="vertical">
                  {currentQuiz.options.map (option => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>
          </div>
          <br />
          <Button
            disabled={currentQuizIndex === 0}
            onClick={() => handleNextQuiz ('prev')}
          >
            Prev
          </Button>
          <Button
            type="primary"
            style={{marginLeft: '10px'}}
            disabled={!currentQuizOption}
            onClick={() => handleNextQuiz ('next')}
            loading={loading}
          >
            {currentQuizIndex === allQuizes.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>}
    </div>
  );
}

export default PracticeQuiz;
