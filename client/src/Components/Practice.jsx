import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Practice.css';

const Practice = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get('http://54.80.126.183/practice');
        setProblems(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchProblems();
  }, []);

  const navigate = useNavigate();

  const handleProblemClick = (problemId) => {
    navigate(`/problems/${problemId}`);
  };

  return (
    <div className="practice-container">
      <h2 className="practice-title">Practice Problems</h2>

      {problems.length === 0 ? (
        <p className="no-problems">No problems found 😞</p>
      ) : (
        <div className="problem-list">
          {problems.map((problem, index) => (
            <div
              className="problem-card"
              key={problem._id || index}
              onClick={() => handleProblemClick(problem._id)}
            >
              <p className="problem-name">{problem.problemName}</p>
              <div className="problem-meta">
                <p className={`problem-difficulty ${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty}
                </p>
                <p className="problem-tags">
                  {/* {problem.topicTags?.length ? problem.topicTags.join(', ') : 'No tags'} */}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Practice;
