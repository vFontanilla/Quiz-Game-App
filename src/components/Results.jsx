import React from 'react';

function Results({ score, totalQuestions, onRestart, questions, userAnswers }) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="results-summary">
      <h2>Hooray! You answered it thoughtfully!</h2>
      <p className="final-score">I know you're a smart Girl!</p>
      <p className="score-percentage">100% You're all mine!</p>
      <p>I Love you very much Sabby!</p>

      <div className="user-answers">
        <h3>Your Answers:</h3>
        <ul>
          {questions.map((question, index) => {
            const answer = userAnswers[question.id];
            const selectedOption = question.options.find(opt => opt.id === answer?.selectedOptionId);

            return (
              <li key={question.id} className="answer-item">
                <strong>{index + 1}. {question.text}</strong><br />
                <span>You answered: {selectedOption ? selectedOption.text : 'No answer'}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <button onClick={onRestart} className="quiz-button">
        Will you play it again?
      </button>
    </div>
  );
}

export default Results;
