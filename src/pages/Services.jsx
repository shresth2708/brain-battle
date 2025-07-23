import { Link } from 'react-router-dom';
import '../styles/Services.css';

function Services() {
  const mainFeatures = [
    {
      id: 1,
      icon: '🧠',
      title: 'Intelligent Quiz Engine',
      description: 'Our advanced quiz system adapts to your knowledge level and provides personalized challenges.',
      features: ['AI-powered question selection', 'Adaptive difficulty', 'Personalized recommendations']
    },
    {
      id: 2,
      icon: '🏆',
      title: 'Competitive Gaming',
      description: 'Challenge yourself and compete with players worldwide through our ranking system.',
      features: ['Global leaderboards', 'Achievement system', 'Weekly tournaments']
    },
    {
      id: 3,
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Track your progress with detailed statistics and performance insights.',
      features: ['Performance tracking', 'Progress charts', 'Strength analysis']
    }
  ];

  const services = [
    {
      id: 1,
      icon: '📚',
      title: 'Diverse Quiz Categories',
      description: 'Explore knowledge across multiple domains with our comprehensive question database.',
      category: 'Content'
    },
    {
      id: 2,
      icon: '⏱️',
      title: 'Timed Challenges',
      description: 'Test your quick thinking with time-based questions that challenge your reflexes.',
      category: 'Gameplay'
    },
    {
      id: 3,
      icon: '🎯',
      title: 'Real-Time Scoring',
      description: 'Get instant feedback with our dynamic scoring system and performance metrics.',
      category: 'Analytics'
    },
    {
      id: 4,
      icon: '🎮',
      title: 'Multiple Difficulty Modes',
      description: 'Choose from Easy, Medium, or Hard levels to match your expertise.',
      category: 'Gameplay'
    },
    {
      id: 5,
      icon: '📱',
      title: 'Cross-Platform Access',
      description: 'Play seamlessly across all devices with our responsive design.',
      category: 'Technology'
    },
    {
      id: 6,
      icon: '�',
      title: 'Secure User Accounts',
      description: 'Your progress and achievements are safely stored with Firebase authentication.',
      category: 'Security'
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-content">
          <h1>Powerful Features for Ultimate Quiz Experience</h1>
          <p>Discover what makes Trivia Master the best platform for testing your knowledge and competing with others.</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Questions</span>
            </div>
            <div className="stat">
              <span className="stat-number">25+</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat">
              <span className="stat-number">5K+</span>
              <span className="stat-label">Active Users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="main-features">
        <div className="container">
          <h2>Core Features</h2>
          <div className="features-grid">
            {mainFeatures.map(feature => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul className="feature-list">
                  {feature.features.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="services-section">
        <div className="container">
          <h2>Complete Service Overview</h2>
          <p className="section-subtitle">Everything you need for an engaging quiz experience</p>
          
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-header">
                  <div className="service-icon">{service.icon}</div>
                  <span className="service-category">{service.category}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-footer">
                  <span className="learn-more">Learn More →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="cta-content">
          <h2>Ready to Test Your Knowledge?</h2>
          <p>Join thousands of users who are already enjoying our quiz platform</p>
          <div className="cta-buttons">
            <Link to="/quiz" className="cta-button primary">Start Quiz Now</Link>
            <Link to="/about" className="cta-button secondary">Learn More</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
