import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './contribute.css'; // optional styling

const Contribute = () => {

    const navigate = useNavigate();

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains('contribute-container')) {
            const confirmExit = window.confirm("Progress may be lost. Do you really want to leave?");
            if (confirmExit) {
                navigate(-1);
            }
            // Else, do nothing (stay on form)
        }
    };

    const [formData, setFormData] = useState({
        problemName: '',
        difficulty: 'Easy',
        topicTag: '',
        description: '',
        sampleInput: '',
        sampleOutput: '',
        hiddenInput: '',
        hiddenOutput: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/contribute', formData);
            alert(response.data);
        } catch (err) {
            alert('Submission failed');
            console.error(err);
        }
    };

    return (
    <div className="contribute-container" onClick={handleBackgroundClick}>
      <form className="contribute-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <h2>Contribute a Problem</h2>
        <input type="text" name="title" placeholder="Problem Title" required />
        <select name="difficulty" required>
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <input type="text" name="topicTag" placeholder="Topic Tag (e.g. Arrays, DP)" required />
        <textarea name="description" placeholder="Problem Description" rows="4" required></textarea>
        <textarea name="sampleInput" placeholder="Sample Input" rows="3" required></textarea>
        <textarea name="sampleOutput" placeholder="Sample Output" rows="3" required></textarea>
        <textarea name="hiddenTestCases" placeholder="Hidden Test Cases" rows="4" required></textarea>
        <textarea name="expectedOutput" placeholder="Expected Output for Hidden Test Cases" rows="4" required></textarea>
        <button type="submit">Submit Problem</button>
      </form>
    </div>
  );
};

export default Contribute;
