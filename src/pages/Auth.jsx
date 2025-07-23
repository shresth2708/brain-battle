import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  // Clear form and errors when switching between login/signup
  const handleModeSwitch = (loginMode) => {
    setIsLogin(loginMode);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (!isLogin && password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    if (!isLogin && !displayName.trim()) {
      return setError('Display name is required');
    }

    try {
      setError('');
      setLoading(true);
      
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, displayName.trim());
      }
      navigate('/');
    } catch (error) {
      let errorMessage = 'Failed to ' + (isLogin ? 'sign in' : 'create account');
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
    }

    setLoading(false);
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-emoji">🧠</span>
            <span className="app-name">QuizMaster</span>
          </div>
          <div className="auth-tabs">
            <button 
              type="button"
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => handleModeSwitch(true)}
            >
              Sign In
            </button>
            <button 
              type="button"
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => handleModeSwitch(false)}
            >
              Sign Up
            </button>
          </div>
          <p className="auth-subtitle">
            {isLogin ? 'Welcome back to your learning journey!' : 'Join our quiz community today!'}
          </p>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="displayName">Display Name</label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                placeholder="Enter your display name"
                className="form-input"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              minLength={6}
              className="form-input"
            />
            {!isLogin && (
              <span className="input-hint">Must be at least 6 characters</span>
            )}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
                className="form-input"
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="auth-button"
          >
            {loading ? (
              <span className="loading-content">
                <span className="spinner"></span>
                Processing...
              </span>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Auth;