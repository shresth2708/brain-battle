import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css';

function Header() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Brain Battle</h1>
      </div>
      <nav className="navigation">
        <ul>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/services">Services</NavLink></li>
          <li><NavLink to="/blog">Blog</NavLink></li>
          <li><NavLink to="/leaderboard">Leaderboard</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </nav>
      
      <div className="auth-section">
        {currentUser ? (
          <div className="user-menu">
            <span className="user-greeting">Hello, {currentUser.displayName || 'User'}!</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/auth" className="auth-link">
            Sign In
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
