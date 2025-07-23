import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { saveQuizScore } from '../services/scoreService';
import '../styles/Quiz.css';

function Quiz() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [retryTimeLeft, setRetryTimeLeft] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [scoreSaved, setScoreSaved] = useState(false);
  
  const isFetchingRef = useRef(false);
  const retryTimerRef = useRef(null);
  
  const categoryApiMap = {
    1: { url: 'https://opentdb.com/api.php?amount=10&category=9', name: 'General Knowledge' },
    2: { url: 'https://opentdb.com/api.php?amount=10&category=17', name: 'Science & Nature' },
    3: { url: 'https://opentdb.com/api.php?amount=10&category=23', name: 'History' },
    4: { url: 'https://opentdb.com/api.php?amount=10&category=11', name: 'Entertainment: Film' },
    5: { url: 'https://opentdb.com/api.php?amount=10&category=21', name: 'Sports' },
    6: { url: 'https://opentdb.com/api.php?amount=10&category=22', name: 'Geography' },
    7: { url: 'https://opentdb.com/api.php?amount=10&category=25', name: 'Art' },
    8: { url: 'https://opentdb.com/api.php?amount=10&category=18', name: 'Science: Computers' },
    9: { url: 'https://opentdb.com/api.php?amount=10&category=12', name: 'Entertainment: Music' },
  };
  
  const getSessionToken = async () => {
    if (isFetchingRef.current) return null;
    
    isFetchingRef.current = true;
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      
      if (data.response_code === 0) {
        localStorage.setItem('trivia_token', data.token);
        return data.token;
      }
      return null;
    } catch (err) {
      return null;
    } finally {
      isFetchingRef.current = false;
    }
  };
  
  const resetSessionToken = async (token) => {
    if (isFetchingRef.current) return null;
    
    isFetchingRef.current = true;
    try {
      await fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`);
      return token;
    } catch (err) {
      return null;
    } finally {
      isFetchingRef.current = false;
    }
  };
  
  const fetchQuestions = async () => {
    if (isFetchingRef.current) return;
    
    setLoading(true);
    isFetchingRef.current = true;
    
    try {
      let token = localStorage.getItem('trivia_token');
      if (!token) token = await getSessionToken();
      
      let apiUrl = categoryApiMap[categoryId]?.url;
      if (!apiUrl) throw new Error('Invalid category');
      if (token) apiUrl += `&token=${token}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      try {
        const response = await fetch(apiUrl, { 
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
        });
        
        clearTimeout(timeoutId);
        
        if (response.status === 429) {
          setRetryTimeLeft(10);
          const countdownInterval = setInterval(() => {
            setRetryTimeLeft(prev => {
              if (prev <= 1) {
                clearInterval(countdownInterval);
                setRetryCount(prev => prev + 1);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          
          retryTimerRef.current = countdownInterval;
          return;
        }
        
        const data = await response.json();
        
        if (data.response_code === 4) {
          token = await resetSessionToken(token);
          return;
        }
        
        if (data.response_code === 1) throw new Error('Not enough questions available for this category.');
        if (data.response_code !== 0) throw new Error('Failed to fetch questions');
        
        const processedQuestions = data.results.map(question => {
          let answers;
          
          if (question.type === 'boolean') {
            answers = [
              { text: 'True', correct: question.correct_answer === 'True' },
              { text: 'False', correct: question.correct_answer === 'False' }
            ];
          } else {
            answers = [
              { text: question.correct_answer, correct: true },
              ...question.incorrect_answers.map(answer => ({ text: answer, correct: false }))
            ].sort(() => Math.random() - 0.5);
          }
          
          return {
            ...question,
            answers,
            difficulty: question.difficulty
          };
        });
        
        setQuestions(processedQuestions);
        setRetryCount(0);
        setQuizStartTime(new Date());
        
      } catch (err) {
        clearTimeout(timeoutId);
        
        if (err.name === 'AbortError') {
          throw new Error('Request timed out. Please check your internet connection and try again.');
        } else {
          throw err;
        }
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchQuestions();
    
    return () => {
      if (retryTimerRef.current) clearInterval(retryTimerRef.current);
    };
  }, [categoryId, retryCount]);
  
  useEffect(() => {
    if (!loading && !quizFinished && questions.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleNextQuestion(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [loading, currentQuestionIndex, quizFinished, questions.length]);
  
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    
    if (answer.correct) {
      setScore(prev => prev + 10);
      setCorrectAnswers(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => prev + 1);
    
    setTimeout(() => handleNextQuestion(answer), 1000);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setQuizFinished(true);
      saveScoreToFirebase();
    }
  };

  const saveScoreToFirebase = async () => {
    if (!currentUser || scoreSaved) return;

    try {
      const timeSpent = quizStartTime ? Math.floor((new Date() - quizStartTime) / 1000) : 0;
      const categoryInfo = categoryApiMap[categoryId];
      
      const quizData = {
        score: score,
        totalQuestions: questions.length,
        correctAnswers: correctAnswers,
        categoryId: categoryId,
        category: categoryInfo?.name || 'Unknown',
        timeSpent: timeSpent
      };

      await saveQuizScore(currentUser.uid, quizData);
      setScoreSaved(true);
    } catch (error) {
      console.error('Failed to save score:', error);
    }
  };
  
  const resetQuiz = () => navigate('/');
  
  const retryFetch = () => {
    setError(null);
    setRetryCount(prev => prev + 1);
  };
  
  if (loading) {
    return (
      <div className="quiz-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }
  
  if (retryTimeLeft > 0) {
    return (
      <div className="quiz-container">
        <div className="retry-message">
          <h3>API Rate Limit Reached</h3>
          <p>The quiz API is currently busy. Trying again in {retryTimeLeft} seconds...</p>
          <div className="retry-progress">
            <div className="retry-progress-bar" style={{ width: `${(retryTimeLeft / 10) * 100}%` }}></div>
          </div>
          <button onClick={resetQuiz}>Cancel and Return Home</button>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="quiz-container">
        <div className="error-message">
          <h3>Unable to Load Questions</h3>
          <p>{error}</p>
          <div className="error-actions">
            <button onClick={retryFetch}>Try Again</button>
            <button onClick={resetQuiz}>Go Back to Home</button>
          </div>
        </div>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="error-message">
          <p>No questions available. Please try a different category.</p>
          <button onClick={resetQuiz}>Go Back</button>
        </div>
      </div>
    );
  }
  
  if (quizFinished) {
    return (
      <div className="quiz-container">
        <div className="quiz-results">
          <h2>Quiz Completed!</h2>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-value">{score}</span>
              <span className="score-label">POINTS</span>
            </div>
          </div>
          
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-value">{questions.length}</span>
              <span className="stat-label">Total Questions</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{correctAnswers}</span>
              <span className="stat-label">Correct Answers</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{answeredQuestions - correctAnswers}</span>
              <span className="stat-label">Wrong Answers</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{questions.length - answeredQuestions}</span>
              <span className="stat-label">Skipped</span>
            </div>
          </div>

          {currentUser && (
            <div className="score-saved-message">
              <p>✅ Your score has been saved to the leaderboard!</p>
            </div>
          )}

          {!currentUser && (
            <div className="auth-prompt">
              <p>Sign in to save your score and appear on the leaderboard!</p>
              <button onClick={() => navigate('/auth')} className="auth-button">
                Sign In / Sign Up
              </button>
            </div>
          )}
          
          <div className="result-actions">
            <button className="play-again-button" onClick={resetQuiz}>Play Again</button>
            <button className="leaderboard-button" onClick={() => navigate('/leaderboard')}>
              View Leaderboard
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="question-counter">Question {questionNumber} of {questions.length}</div>
        <div className="timer">
          <div className="timer-bar" style={{ width: `${(timeLeft / 30) * 100}%` }}></div>
          <span className="timer-text">{timeLeft}</span>
        </div>
        <div className="score-counter">Score: {score}</div>
      </div>
      
      <div className="question-container">
        <div className="question-meta">
          <span className="question-category">{currentQuestion.category}</span>
          <span className={`question-difficulty ${currentQuestion.difficulty}`}>
            {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
          </span>
        </div>
        
        <h2 dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></h2>
        
        <div className="answers-container">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              className={`answer-button ${
                selectedAnswer === answer
                  ? answer.correct ? 'correct' : 'incorrect'
                  : ''
              }`}
              onClick={() => handleAnswerSelect(answer)}
              disabled={selectedAnswer !== null}
              dangerouslySetInnerHTML={{ __html: answer.text }}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
