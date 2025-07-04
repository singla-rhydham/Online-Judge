import React, { useState } from 'react';
import './Navbar.css'; 

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <a href="/" className="logo">
          <img src="https://flowbite.com/docs/images/logo.svg" className="logo-img" alt="Flowbite Logo" />
          <span className="logo-text">TestifyCode</span>
        </a>

        {/* Right Buttons */}
        <div className="navbar-buttons">
          <button type="button" className="login-btn" onClick={() => window.location.href = '/login'}>
            Login
          </button>
          <button type="button" className="signup-btn" onClick={() => window.location.href = '/signup'}>
            Sign Up
          </button>

          {/* Hamburger Icon */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            type="button" 
            className="hamburger-btn"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="hamburger-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className={`menu-items ${isOpen ? 'show' : ''}`}>
          <ul className="menu-list">
            <li>
              <a href="#" className="menu-link">Home</a>
            </li>
            <li>
              <a href="#" className="menu-link">About</a>
            </li>
            <li>
              <a href="#" className="menu-link">Practice</a>
            </li>
            <li>
              <a href="#" className="menu-link">Contest</a>
            </li>
            <li>
              <a href="#" className="menu-link">Discussions</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;

/*
  database hard-code
  online compiler
*/