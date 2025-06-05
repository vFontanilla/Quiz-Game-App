import React from 'react';

function Question({ question, questionNumber, selectedOptionId, setSelectedOptionId }) {
  const handleOptionSelect = (optionId) => {
    setSelectedOptionId(optionId);
  };

  return (
    <div className="question-card">
      <p className="question-text">
        {questionNumber}. {question.text}
      </p>
      <ul className="options-list">
        {question.options.map((option) => (
          <li
            key={option.id}
            className={`option-item ${option.id === selectedOptionId ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option.id)}
          >
            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={option.id === selectedOptionId}
                onChange={() => handleOptionSelect(option.id)}
              />
              {option.text}
            </label>
          </li>
        ))}
      </ul>

      {selectedOptionId && (
        <div className="feedback-message">
          You selected: <strong>{question.options.find(o => o.id === selectedOptionId)?.text}</strong>
        </div>
      )}
    </div>
  );
}

export default Question;
