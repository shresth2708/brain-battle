import { useState } from 'react';
import '../styles/About.css';

function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { number: '10K+', label: 'Questions Available', icon: '📝' },
    { number: '25+', label: 'Categories', icon: '📚' },
    { number: '5K+', label: 'Active Users', icon: '👥' },
    { number: '95%', label: 'User Satisfaction', icon: '⭐' }
  ];

  const teamMembers = [
    {
      name: 'Agnik Misra',
      role: 'Lead Developer',
      bio: 'Passionate about creating engaging educational experiences through technology.',
      skills: ['React', 'Node.js', 'Firebase'],
      avatar: '👨‍💻'
    },
    {
      name: 'Quiz Team',
      role: 'Content Curators',
      bio: 'Dedicated to providing high-quality, diverse trivia content from trusted sources.',
      skills: ['Content Strategy', 'API Integration', 'Quality Assurance'],
      avatar: '👥'
    }
  ];

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

  const tabContent = {
    mission: {
      title: 'Our Mission',
      content: 'To revolutionize learning through gamification, making education engaging, accessible, and fun for everyone. We believe that knowledge should be an adventure, not a chore.'
    },
    vision: {
      title: 'Our Vision',
      content: 'To become the world\'s leading platform for interactive learning, where curiosity meets technology to create meaningful educational experiences.'
    },
    values: {
      title: 'Our Values',
      content: 'Innovation, Accessibility, Quality, and Community. We\'re committed to creating inclusive educational tools that empower learners worldwide.'
    }
  };

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
        {/* Stats Section */}
        <section className="stats-section">
          <h2>By the Numbers</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Company Info Tabs */}
        <section className="company-info">
          <div className="tabs-container">
            <div className="tab-buttons">
              {Object.keys(tabContent).map(tab => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tabContent[tab].title}
                </button>
              ))}
            </div>
            <div className="tab-content">
              <h3>{tabContent[activeTab].title}</h3>
              <p>{tabContent[activeTab].content}</p>
            </div>
          </div>
        </section>

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

        {/* Team Section */}
        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.avatar}</div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-skills">
                    {member.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="tech-section">
          <h2>Built With Modern Technology</h2>
          <div className="tech-stack">
            <div className="tech-category">
              <h4>Frontend</h4>
              <div className="tech-items">
                <span className="tech-item">React</span>
                <span className="tech-item">CSS3</span>
                <span className="tech-item">JavaScript ES6+</span>
              </div>
            </div>
            <div className="tech-category">
              <h4>Backend & APIs</h4>
              <div className="tech-items">
                <span className="tech-item">Firebase</span>
                <span className="tech-item">Open Trivia DB</span>
                <span className="tech-item">REST APIs</span>
              </div>
            </div>
            <div className="tech-category">
              <h4>Tools & Deployment</h4>
              <div className="tech-items">
                <span className="tech-item">Vite</span>
                <span className="tech-item">Git</span>
                <span className="tech-item">Modern Hosting</span>
              </div>
            </div>
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
