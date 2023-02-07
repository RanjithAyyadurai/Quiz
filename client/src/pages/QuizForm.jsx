import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Input, Select, Button, message} from 'antd';
import quizService from '../services/quiz.service';

function QuizForm () {
  const [question, setQuestion] = useState ('');
  const [options, setOptions] = useState ([]);
  const [answer, setAnswer] = useState ([]);
  const [loading, setLoading] = useState (false);
  const [currentOption, setCurrentOption] = useState ('');
  const {userInfo} = useSelector (state => state.auth);

  const handleCreateQuiz = async () => {
    setLoading (true);
    let data = {
      question: question,
      options: options,
      answer: answer,
      createdBy: userInfo._id,
    };
    try {
      const response = await quizService.createQuiz (data);
      console.log (response.data);
      setQuestion ('');
      setAnswer ('');
      setOptions ([]);
      setCurrentOption ('');
      setLoading (false);
      message.success ('Quiz Added Successfully!');
    } catch (err) {
      console.log (err);
      message.error (err.message ? err.message : 'something went wrong!');
      setLoading (false);
    }
  };

  const handleAddOption = () => {
    let data = {
      value: currentOption,
      label: currentOption,
    };

    setOptions (prev => [...prev, data]);
    setCurrentOption ('');
  };

  useEffect (
    () => {
      if (options.length === 4) {
        message.info ('Only 4 Maximum options are allowed!');
      }
    },
    [options]
  );
  return (
    <div className="quiz__form__wrapper">
      <h2>Create a Quiz</h2>
      <hr />
      <div className="quiz__form">
        <div className="form__item">
          <label>Question</label>
          <Input
            placeholder="e.g. Who is the father of Computer?"
            value={question}
            onChange={e => setQuestion (e.target.value)}
            style={{margin: '10px'}}
          />
        </div>
        <div className="form__item">
          <label>Options</label>
          <Input.Group compact style={{display: 'flex', alignItems: 'center'}}>
            <Input
              placeholder="e.g. John Kennedy"
              value={currentOption}
              onChange={e => setCurrentOption (e.target.value)}
              disabled={options.length === 4}
              style={{margin: '10px', marginRight: '0px'}}
            />
            <Button
              type="primary"
              disabled={!currentOption}
              onClick={handleAddOption}
            >
              Add Option
            </Button>
          </Input.Group>

        </div>
        <div className="form__item">
          <label>Answer</label>
          <Select
            style={{width: '100%', marginLeft: '10px'}}
            onChange={val => setAnswer (val)}
            options={options}
          />
        </div>
        <Button
          disabled={!question || !answer || options.length < 2}
          type="primary"
          onClick={handleCreateQuiz}
          loading={loading}
        >
          Create Quiz
        </Button>
      </div>

    </div>
  );
}

export default QuizForm;
