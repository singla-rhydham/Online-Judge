import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Navbar.css';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token', error);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to="/" className="logo">
          <img src="https://flowbite.com/docs/images/logo.svg" className="logo-img" alt="Flowbite Logo" />
          <span className="logo-text">TestifyCode</span>
        </Link>

        {/* Right Buttons */}
        <div className="navbar-buttons">
          {!user ? (
            <>
              <button type="button" className="login-btn" onClick={() => navigate('/login')}>
                Login
              </button>
              <button type="button" className="signup-btn" onClick={() => navigate('/signup')}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              {user.isAdmin && (
                <button type="button" className="contribute-btn" onClick={() => navigate('/contribute')}>
                  Contribute
                </button>
              )}
              <Link to="/profile">
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile" className="profile-picture" />
              </Link>
              <button type="button" className="signup-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}

          {/* Hamburger Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="hamburger-btn"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="hamburger-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className={`menu-items ${isOpen ? 'show' : ''}`} id="mobile-menu">
          <ul className="menu-list">
            <li><Link to="/" className="menu-link" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/about" className="menu-link" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link to="/practice" className="menu-link" onClick={() => setIsOpen(false)}>Practice</Link></li>
            <li><Link to="/contest" className="menu-link" onClick={() => setIsOpen(false)}>Contest</Link></li>
            <li><Link to="/discussions" className="menu-link" onClick={() => setIsOpen(false)}>Discussions</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
