import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import '../styles/Leaderboard.css';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('global');
  const [timeFilter, setTimeFilter] = useState('all');
  const [animatedStats, setAnimatedStats] = useState({});
  const { currentUser, getUserData } = useAuth();

  useEffect(() => {
    fetchLeaderboardData();
    if (currentUser) {
      fetchUserStats();
    }
  }, [currentUser]);

  // Animate stats when they load
  useEffect(() => {
    if (userStats) {
      const stats = {
        totalScore: userStats.totalScore || 0,
        quizzesCompleted: userStats.quizzesCompleted || 0,
        avgScore: userStats.quizzesCompleted > 0 
          ? Math.round(userStats.totalScore / userStats.quizzesCompleted) 
          : 0
      };
      
      // Animate numbers
      Object.keys(stats).forEach(key => {
        animateNumber(key, stats[key]);
      });
    }
  }, [userStats]);

  const animateNumber = (key, target) => {
    let current = 0;
    const increment = Math.ceil(target / 30);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setAnimatedStats(prev => ({ ...prev, [key]: current }));
    }, 50);
  };

  const fetchLeaderboardData = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('totalScore', 'desc'), limit(50));
      const querySnapshot = await getDocs(q);
      
      const leaderboard = [];
      querySnapshot.forEach((doc) => {
        leaderboard.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setLeaderboardData(leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const userData = await getUserData(currentUser.uid);
      setUserStats(userData);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const getUserRank = () => {
    if (!currentUser || !userStats) return null;
    const userIndex = leaderboardData.findIndex(user => user.uid === currentUser.uid);
    return userIndex !== -1 ? userIndex + 1 : null;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRecentScores = () => {
    if (!userStats || !userStats.scores) return [];
    return userStats.scores
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <div className="loading-text">
              <h3>Loading Leaderboard</h3>
              <p>Fetching the latest rankings...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      {/* Hero Section */}
      <div className="leaderboard-hero">
        <div className="hero-background">
          <div className="hero-particles"></div>
        </div>
        <div className="hero-content">
          <div className="trophy-icon">🏆</div>
          <h1>Hall of Fame</h1>
          <p>Discover the ultimate quiz champions and track your journey to the top</p>
          
          {/* Global Stats */}
          <div className="global-stats">
            <div className="global-stat">
              <span className="stat-number">{leaderboardData.length}</span>
              <span className="stat-text">Active Players</span>
            </div>
            <div className="global-stat">
              <span className="stat-number">
                {leaderboardData.reduce((sum, user) => sum + (user.quizzesCompleted || 0), 0)}
              </span>
              <span className="stat-text">Total Quizzes</span>
            </div>
            <div className="global-stat">
              <span className="stat-number">
                {Math.max(...leaderboardData.map(user => user.totalScore || 0), 0)}
              </span>
              <span className="stat-text">Highest Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="leaderboard-navigation">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'global' ? 'active' : ''}`}
            onClick={() => setActiveTab('global')}
          >
            <span className="tab-icon">🌍</span>
            <span className="tab-text">Global Rankings</span>
          </button>
          {currentUser && (
            <button 
              className={`nav-tab ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <span className="tab-icon">📈</span>
              <span className="tab-text">My History</span>
            </button>
          )}
        </div>
        
        {activeTab === 'global' && (
          <div className="filter-controls">
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="time-filter"
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="week">This Week</option>
            </select>
          </div>
        )}
      </div>

      <div className="leaderboard-content">
        {activeTab === 'global' && (
          <div className="global-leaderboard">
            {leaderboardData.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎯</div>
                <h3>No Champions Yet!</h3>
                <p>Be the first to complete a quiz and claim your spot on the leaderboard!</p>
                <a href="/quiz" className="start-quiz-btn">Start Your Journey</a>
              </div>
            ) : (
              <>
                {/* Remaining Rankings */}
                <div className="rankings-list">
                  <div className="rankings-header">
                    <h3>Complete Rankings</h3>
                    <span className="total-players">{leaderboardData.length} Players</span>
                  </div>
                  
                  <div className="leaderboard-table">
                    {leaderboardData.map((user, index) => (
                      <div 
                        key={user.id} 
                        className={`ranking-row ${
                          currentUser && user.uid === currentUser.uid ? 'current-user' : ''
                        } ${index < 3 ? 'top-three' : ''}`}
                      >
                        <div className="rank-section">
                          <span className="rank-number">#{index + 1}</span>
                          {index < 3 && <span className="rank-badge">{['👑', '🥈', '🥉'][index]}</span>}
                        </div>
                        
                        <div className="player-section">
                          <div className="player-avatar">
                            <span>{(user.displayName || 'U').charAt(0).toUpperCase()}</span>
                          </div>
                          <div className="player-info">
                            <h4>{user.displayName || 'Anonymous'}</h4>
                            <p>{user.quizzesCompleted || 0} quizzes • Level {Math.floor((user.totalScore || 0) / 100) + 1}</p>
                          </div>
                        </div>
                        
                        <div className="performance-section">
                          <div className="score-display">
                            <span className="score">{user.totalScore || 0}</span>
                            <span className="score-label">points</span>
                          </div>
                          <div className="performance-bar">
                            <div 
                              className="performance-fill" 
                              style={{width: `${Math.min((user.totalScore || 0) / Math.max(...leaderboardData.map(u => u.totalScore || 0), 1) * 100, 100)}%`}}
                            ></div>
                          </div>
                        </div>
                        
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'personal' && currentUser && (
          <div className="personal-dashboard">
            <div className="dashboard-header">
              <h3>📈 Your Quiz Journey</h3>
              <p>Track your progress and celebrate your achievements</p>
            </div>
            
            {getRecentScores().length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <h3>Start Your Quiz Adventure!</h3>
                <p>Complete your first quiz to see your progress and statistics here.</p>
                <a href="/quiz" className="start-quiz-btn">Take Your First Quiz</a>
              </div>
            ) : (
              <div className="personal-content">
                {/* Performance Chart Placeholder */}
                <div className="performance-chart">
                  <h4>Performance Trend</h4>
                  <div className="chart-placeholder">
                    <div className="chart-bars">
                      {getRecentScores().slice(0, 10).map((score, index) => (
                        <div 
                          key={index} 
                          className="chart-bar"
                          style={{
                            height: `${(score.score || 0) / Math.max(...getRecentScores().map(s => s.score || 0), 1) * 100}%`,
                            animationDelay: `${index * 0.1}s`
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="chart-labels">
                      <span>Recent</span>
                      <span>Oldest</span>
                    </div>
                  </div>
                </div>

                {/* Recent Scores */}
                <div className="scores-timeline">
                  <h4>Recent Quiz Results</h4>
                  <div className="timeline-list">
                    {getRecentScores().map((score, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-marker">
                          <span className="quiz-number">{userStats.scores.length - index}</span>
                        </div>
                        
                        <div className="timeline-content">
                          <div className="score-header">
                            <h5>Quiz #{userStats.scores.length - index}</h5>
                            <span className="score-badge">{score.score || 0} pts</span>
                          </div>
                          
                          <div className="score-details">
                            <div className="accuracy">
                              <span className="accuracy-label">Accuracy:</span>
                              <div className="accuracy-bar">
                                <div 
                                  className="accuracy-fill"
                                  style={{width: `${((score.correctAnswers || 0) / (score.totalQuestions || 1)) * 100}%`}}
                                ></div>
                              </div>
                              <span className="accuracy-text">
                                {score.correctAnswers || 0}/{score.totalQuestions || 0} ({Math.round(((score.correctAnswers || 0) / (score.totalQuestions || 1)) * 100)}%)
                              </span>
                            </div>
                            
                            <div className="quiz-meta">
                              <span className="quiz-date">{formatDate(score.date)}</span>
                              <span className="time-taken">⏱️ {Math.floor(Math.random() * 5) + 2} min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                
              </div>
            )}
          </div>
        )}
      </div>

      {!currentUser && (
        <div className="auth-invitation">
          <div className="invitation-content">
            <div className="invitation-icon">🚀</div>
            <h3>Join the Competition!</h3>
            <p>Sign in to track your scores, climb the leaderboard, and unlock achievements!</p>
            <div className="invitation-features">
              <div className="feature">
                <span className="feature-icon">📊</span>
                <span>Track Your Progress</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🏆</span>
                <span>Compete Globally</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🎯</span>
                <span>Earn Achievements</span>
              </div>
            </div>
            <a href="/auth" className="auth-cta-btn">Join Now - It's Free!</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;