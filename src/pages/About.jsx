import { useState } from 'react';
import '../styles/About.css';

function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const features = [
    {
      icon: '🌐',
      title: 'Real-Time API Integration',
      description: 'Connected to top trivia databases like Open Trivia DB, JService, and The Trivia API for fresh content.'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast Performance',
      description: 'Optimized for speed with instant question loading and real-time scoring updates.'
    },
    {
      icon: '🎯',
      title: 'Adaptive Difficulty',
      description: 'Choose from Easy, Medium, or Hard levels that match your expertise and comfort zone.'
    },
    {
      icon: '📱',
      title: 'Mobile-First Design',
      description: 'Fully responsive interface that works seamlessly across all devices and screen sizes.'
    },
    {
      icon: '🏆',
      title: 'Competitive Elements',
      description: 'Timer-based challenges and leaderboards to make learning competitive and exciting.'
    },
    {
      icon: '📊',
      title: 'Detailed Analytics',
      description: 'Comprehensive performance tracking with detailed results and progress insights.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Welcome to Trivia Master</h1>
          <p className="hero-subtitle">Where Knowledge Meets Fun</p>
          <p className="hero-description">
            Discover the ultimate trivia experience that challenges your mind, 
            expands your knowledge, and connects you with a community of learners.
          </p>
          <div className="hero-cta">
            <button className="cta-primary">Start Your Journey</button>
            <button className="cta-secondary">Watch Demo</button>
          </div>
        </div>
      </section>

      <div className="about-container">

        {/* Features Section */}
        <section className="features-section">
          <h2>What Makes Us Special</h2>
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

        {/* Call to Action */}
        <section className="about-cta">
          <div className="cta-content">
            <h2>Ready to Test Your Knowledge?</h2>
            <p>Join thousands of users who are already enhancing their knowledge through our interactive quizzes.</p>
            <div className="cta-buttons">
              <button className="btn-primary">Start Playing Now</button>
              <button className="btn-secondary">View Leaderboard</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
