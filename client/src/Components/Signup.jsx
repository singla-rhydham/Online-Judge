import React from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const navigate = useNavigate();

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains('signup-container')) {
            navigate(-1); // Go back to previous page
        }
    };

    return (
        <div className="signup-container" onClick={handleBackgroundClick}>
            <form
                action={`${import.meta.env.VITE_BACKEND_URL}/signup/register`}
                method="POST"
                className="signup-form"
                onClick={(e) => e.stopPropagation()}
            >
            <h2 className="signup-title">Sign Up</h2>
            <input type="text" name="userName" placeholder="Username" required className="input-field" />
            <input type="text" name="firstName" placeholder="First Name" required className="input-field" />
            <input type="text" name="lastName" placeholder="Last Name" required className="input-field" />
            <input type="email" name="email" placeholder="Email" required className="input-field" />
            <input type="password" name="password" placeholder="Password" required className="input-field" />
            <button type="submit" className="submit-btn">Sign Up</button>
        </form>
        </div>
    );
};

export default Signup;
