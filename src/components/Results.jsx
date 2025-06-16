import React from 'react';

function Results({ score, totalQuestions, onRestart }) {
  const percentage = Math.round((score / totalQuestions) * 100);
  let message = '';

  if (percentage === 100) {
    message = 'Flawless Victory! You are a quiz master!';
  } else if (percentage >= 80) {
    message = 'Excellent Work! You really know your stuff.';
  } else if (percentage >= 50) {
    message = 'Good Job! A solid performance.';
  } else if (percentage >= 20) {
    message = 'Not bad! Keep learning and try again.';
  } else {
    message = 'Keep practicing! Every attempt is a step forward.';
  }

  return (
    <div className="results-summary">
      <h2>Quiz Completed!</h2>
      <p className="final-score">
        Your Score: {score} / {totalQuestions}
      </p>
      <p className="score-percentage">{percentage}%</p>
      <p>{message}</p>
      <button onClick={onRestart} className="quiz-button">
        Play Again
      </button>
    </div>
  );
}

export default Results;