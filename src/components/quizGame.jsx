import React, { useState, useEffect } from 'react';
import { quizQuestions } from '../data/quizData';
import Question from './Question';
import Results from './Results';
import '../quizGame.css'; // Import component-specific styles

function QuizGame() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // Stores { questionId: { selectedOptionId, isCorrect } }
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  // Shuffle questions on initial load
  useEffect(() => {
    const shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswer = (questionId, selectedOptionId) => {
    const question = questions.find((q) => q.id === questionId);
    const isCorrect = question.correctAnswerId === selectedOptionId;

    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: { selectedOptionId, isCorrect },
    }));

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setIsCurrentQuestionAnswered(true);
  };

  const handleNextQuestion = () => {
    // Save answer
    setUserAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].id]: { selectedOptionId },
    }));

    // Go to next or show results
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOptionId(null);
    } else {
      setQuizFinished(true);
    }
  };



  const handleRestartQuiz = () => {
    const shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(0);
    setQuizFinished(false); // ✅ this is crucial
    setSelectedOptionId(null);
  };

  if (questions.length === 0) {
    return <div className="quiz-container">Loading Quiz...</div>;
  }

  const progressPercentage = ((currentQuestionIndex + (isCurrentQuestionAnswered ? 1: 0)) / questions.length) * 100;
  // If quiz is finished, ensure progress is 100%
  const finalProgress = quizFinished ? 100 : progressPercentage;


  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>For Sabby's Questions</h1>
        <p>I Love You My Palangga ko Sabby!</p>
      </div>

      {!quizFinished ? (
        <>
          {/* <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${finalProgress}%` }}></div>
          </div> */}
          {/* <p className="score-tracker">Score: {score}</p> */}
          <Question
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            selectedOptionId={selectedOptionId}
            setSelectedOptionId={setSelectedOptionId}
          />

          {selectedOptionId && (
            <button onClick={handleNextQuestion} className="quiz-button">
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Show Results'}
            </button>
          )}
        </>
      ) : (
        <Results
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestartQuiz}
          questions={questions}
          userAnswers={userAnswers}
        />
      )}
    </div>
  );
}

export default QuizGame;