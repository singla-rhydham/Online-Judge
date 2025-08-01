import React from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('login-container')) {
      navigate(-1); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userName = formData.get('userName');
    const password = formData.get('password');
    console.log(userName, "hello");

    try {
      const response = await axios.post(
        'http://localhost:5000/login',
        { userName, password },
        { withCredentials: true }
      );
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      
      localStorage.setItem("redirectAfterLogin", redirectPath);
      window.location.reload();
      loadUser();

    } catch (error) {
      alert('Login failed: ' + error.response.data.message);
      navigate(-1);
    }
  };

  return (
    <div className="login-container" onClick={handleBackgroundClick}>
      <form className="login-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <h2 className="login-title">Login</h2>
        <input type="text" name="userName" placeholder="User Name" required className="input-field" />
        <input type="password" name="password" placeholder="Password" required className="input-field" />
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
