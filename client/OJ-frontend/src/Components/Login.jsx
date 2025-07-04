import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains('login-container')) {
            navigate(-1); // Go back to previous page
        }
    };

  return (
    <div className="login-container" onClick={handleBackgroundClick}>
      <form action="http://localhost:5000/api/login" method="POST" className="login-form" onClick={(e) => e.stopPropagation()}>
        <h2 className="login-title">Login</h2>
        <input type="email" name="email" placeholder="Email" required className="input-field" />
        <input type="password" name="password" placeholder="Password" required className="input-field" />
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
