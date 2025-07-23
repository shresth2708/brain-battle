import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const [animatedStats, setAnimatedStats] = useState({ users: 0, quizzes: 0, questions: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const categories = [
    { 
      id: 1, 
      name: 'General Knowledge', 
      description: 'A mix of everything!', 
      image: '../../assets/images/quiz/quizimage1.png',
      difficulty: 'Mixed',
      questions: '50+',
      icon: '🧠'
    },
    { 
      id: 2, 
      name: 'Science & Nature', 
      description: 'Facts about physics, chemistry, biology, and more.', 
      image: '../../assets/images/quiz/quizimage2.png',
      difficulty: 'Medium',
      questions: '45+',
      icon: '🔬'
    },
    { 
      id: 3, 
      name: 'History', 
      description: 'Travel back in time with historical facts.', 
      image: '../../assets/images/quiz/quizimage3.png',
      difficulty: 'Hard',
      questions: '40+',
      icon: '🏛️'
    },
    { 
      id: 4, 
      name: 'Movies & TV Shows', 
      description: 'For film buffs and binge-watchers.', 
      image: '../../assets/images/quiz/quizimage4.png',
      difficulty: 'Easy',
      questions: '60+',
      icon: '🎬'
    },
    { 
      id: 5, 
      name: 'Sports', 
      description: 'From football to F1.', 
      image: '../../assets/images/quiz/quizimage5.png',
      difficulty: 'Medium',
      questions: '35+',
      icon: '⚽'
    },
    { 
      id: 6, 
      name: 'Geography', 
      description: 'Explore the world!', 
      image: '../../assets/images/quiz/quizimage6.png',
      difficulty: 'Medium',
      questions: '50+',
      icon: '🌍'
    },
    { 
      id: 7, 
      name: 'Art & Literature', 
      description: 'Questions on books, paintings, and famous authors.', 
      image: '../../assets/images/quiz/quizimage7.png',
      difficulty: 'Hard',
      questions: '30+',
      icon: '🎨'
    },
    { 
      id: 8, 
      name: 'Technology', 
      description: 'Computers, the internet, and inventions.', 
      image: '../../assets/images/quiz/quizimage8.png',
      difficulty: 'Medium',
      questions: '40+',
      icon: '💻'
    },
    { 
      id: 9, 
      name: 'Music', 
      description: 'From classical to pop culture.', 
      image: '../../assets/images/quiz/quizimage9.png',
      difficulty: 'Easy',
      questions: '45+',
      icon: '🎵'
    },
  ];

  const testimonials = [
    {
      text: "QuizQuest has become my daily brain workout! Love the variety of questions.",
      author: "Sarah M.",
      rating: 5,
      avatar: "S"
    },
    {
      text: "Perfect for family game nights. The difficulty levels keep everyone engaged!",
      author: "Mike R.",
      rating: 5,
      avatar: "M"
    },
    {
      text: "I've learned so much while having fun. The leaderboard keeps me motivated!",
      author: "Emma T.",
      rating: 5,
      avatar: "E"
    }
  ];

  const features = [
    {
      icon: "🎯",
      title: "Adaptive Difficulty",
      description: "Questions that match your skill level"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Instant feedback and smooth gameplay"
    },
    {
      icon: "🏆",
      title: "Global Leaderboard",
      description: "Compete with players worldwide"
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description: "Play anywhere, anytime"
    }
  ];

  useEffect(() => {
    // Animate stats on load
    const targets = { users: 1247, quizzes: 9856, questions: 15420 };
    Object.keys(targets).forEach(key => {
      let current = 0;
      const increment = Math.ceil(targets[key] / 50);
      const timer = setInterval(() => {
        current += increment;
        if (current >= targets[key]) {
          current = targets[key];
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({ ...prev, [key]: current }));
      }, 30);
    });

    // Rotate testimonials
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);

    return () => {
      clearInterval(testimonialTimer);
    };
  }, []);

  const handleStartQuiz = (categoryId) => {
    navigate(`/quiz/${categoryId}`);
  };
  
  const handleStartRandomQuiz = () => {
    const randomCategoryId = Math.floor(Math.random() * 9) + 1;
    navigate(`/quiz/${randomCategoryId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-particles"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">🎯</span>
            <span>The Ultimate Quiz Experience</span>
          </div>
          <h1 className="hero-title">
            Test Your Knowledge,<br />
            <span className="gradient-text">Challenge Your Mind</span>
          </h1>
          <p className="hero-description">
            Dive into an exciting world of trivia with thousands of questions across multiple categories. 
            Challenge yourself, compete with friends, and climb the global leaderboard!
          </p>
          <div className="hero-actions">
            <button className="cta-primary" onClick={handleStartRandomQuiz}>
              <span className="btn-icon">⚡</span>
              Start Quiz Now
            </button>
            <button className="cta-secondary" onClick={() => navigate('/leaderboard')}>
              <span className="btn-icon">🏆</span>
              View Leaderboard
            </button>
          </div>
          
          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{animatedStats.users.toLocaleString()}+</span>
              <span className="stat-label">Active Players</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{animatedStats.quizzes.toLocaleString()}+</span>
              <span className="stat-label">Quizzes Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{animatedStats.questions.toLocaleString()}+</span>
              <span className="stat-label">Questions Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-header">
          <h2>Why Choose QuizQuest?</h2>
          <p>Discover what makes our quiz platform the best choice for knowledge seekers</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="categories-section">
        <div className="categories-header">
          <h2>Choose Your Challenge</h2>
          <p>Explore our diverse collection of quiz categories, each designed to test different aspects of your knowledge</p>
        </div>
        <div className="categories-grid">
          {categories.map(category => (
            <div key={category.id} className="category-card">
              <div className="category-header">
                <div className="category-icon">{category.icon}</div>
                <div className="category-badges">
                  <span 
                    className="difficulty-badge" 
                    style={{ backgroundColor: getDifficultyColor(category.difficulty) }}
                  >
                    {category.difficulty}
                  </span>
                  <span className="questions-badge">{category.questions}</span>
                </div>
              </div>
              
              <div className="category-image">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <button 
                    className="quick-play-btn"
                    onClick={() => handleStartQuiz(category.id)}
                  >
                    <span>Play Now</span>
                    <span className="play-icon">▶</span>
                  </button>
                </div>
              </div>
              
              <div className="category-content">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                
                <div className="category-footer">
                  <div className="category-stats">
                    <span className="stat">
                      <span className="stat-icon">⏱️</span>
                      2-5 min
                    </span>
                    <span className="stat">
                      <span className="stat-icon">🎯</span>
                      {Math.floor(Math.random() * 30) + 70}% avg
                    </span>
                  </div>
                  <button 
                    className="play-button"
                    onClick={() => handleStartQuiz(category.id)}
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-header">
          <h2>What Our Players Say</h2>
          <p>Join thousands of satisfied quiz enthusiasts</p>
        </div>
        <div className="testimonials-container">
          <div className="testimonial-card active">
            <div className="testimonial-content">
              <div className="quote-icon">"</div>
              <p>{testimonials[currentTestimonial].text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="author-info">
                  <span className="author-name">{testimonials[currentTestimonial].author}</span>
                  <div className="rating">
                    {'★'.repeat(testimonials[currentTestimonial].rating)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta-section">
        <div className="cta-background">
          <div className="cta-particles"></div>
        </div>
        <div className="cta-content">
          <div className="cta-icon">🚀</div>
          <h2>Ready to Test Your Knowledge?</h2>
          <p>Join the ultimate quiz experience and discover how much you really know!</p>
          <div className="cta-actions">
            <button className="cta-primary large" onClick={handleStartRandomQuiz}>
              <span className="btn-icon">🎲</span>
              Random Quiz Challenge
            </button>
            <button className="cta-outline" onClick={() => navigate('/auth')}>
              <span className="btn-icon">👤</span>
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="quick-features">
        <div className="feature-highlight">
          <span className="feature-icon">✨</span>
          <span>New questions added weekly</span>
        </div>
        <div className="feature-highlight">
          <span className="feature-icon">⏱️</span>
          <span>Beat the clock challenges</span>
        </div>
        <div className="feature-highlight">
          <span className="feature-icon">👥</span>
          <span>Perfect for solo or group play</span>
        </div>
        <div className="feature-highlight">
          <span className="feature-icon">🏅</span>
          <span>Achievement system & rewards</span>
        </div>
      </section>
    </div>
  );
}

export default Home;
