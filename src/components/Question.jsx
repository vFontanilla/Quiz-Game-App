import React, { useState, useEffect } from 'react';

function Question({ question, onAnswer, questionNumber, totalQuestions, isAnswered, userAnswer }) {
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  useEffect(() => {
    // Reset selected option when question changes if it's not already answered in a previous session
    if (!isAnswered) {
      setSelectedOptionId(null);
    } else if (userAnswer) {
      setSelectedOptionId(userAnswer.selectedOptionId);
    }
  }, [question, isAnswered, userAnswer]);

  const handleOptionChange = (optionId) => {
    if (!isAnswered) {
      setSelectedOptionId(optionId);
    }
  };

  const handleSubmit = () => {
    if (selectedOptionId) {
      onAnswer(question.id, selectedOptionId);
    }
  };

  return (
    <div className="question-card">
      <p className="question-text">
        {questionNumber}. {question.text}
      </p>
      <ul className="options-list">
        {question.options.map((option) => {
          let itemClassName = 'option-item';
          if (isAnswered) {
            if (option.id === question.correctAnswerId) {
              itemClassName += ' correct';
            } else if (option.id === userAnswer?.selectedOptionId) {
              itemClassName += ' incorrect';
            }
          } else if (option.id === selectedOptionId) {
            itemClassName += ' selected';
          }

          return (
            <li
              key={option.id}
              className={itemClassName}
              onClick={() => handleOptionChange(option.id)}
            >
              <input
                type="radio"
                id={`${question.id}-${option.id}`}
                name={`question-${question.id}`}
                value={option.id}
                checked={isAnswered ? option.id === userAnswer?.selectedOptionId : option.id === selectedOptionId}
                onChange={() => handleOptionChange(option.id)}
                disabled={isAnswered}
              />
              <label htmlFor={`${question.id}-${option.id}`}>{option.text}</label>
            </li>
          );
        })}
      </ul>
      {!isAnswered && (
        <button
          onClick={handleSubmit}
          className="quiz-button"
          disabled={!selectedOptionId}
        >
          Submit Answer
        </button>
      )}
      {isAnswered && userAnswer && (
        <div className={`feedback-message ${userAnswer.isCorrect ? 'correct' : 'incorrect'}`}>
          {userAnswer.isCorrect ? 'Correct!' : `Incorrect. The right answer was "${question.options.find(o => o.id === question.correctAnswerId)?.text}".`}
        </div>
      )}
    </div>
  );
}

export default Question;