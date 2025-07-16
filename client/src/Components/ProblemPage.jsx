import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './problemPage.css';
import { jwtDecode } from 'jwt-decode'; 

const ProblemPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/problems/${id}`);
        setProblem(res.data);
      } catch (err) {
        console.error('Failed to load problem', err);
      }
    };
    fetchProblem();
  }, [id]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('');
    try {
      const res = await axios.post('http://localhost:8000/run', {
        code,
        language,
        input: problem.sampleInput || ''
      });
      setOutput(res.data.output || res.data.error || 'No output');
    } catch (err) {
      setOutput('Error occurred while running your code.');
    }
    setIsRunning(false);
  };

  const handleSubmitCode = async () => {
    const token = localStorage.getItem('token');
    let user = null;

    if (token) {
      user = jwtDecode(token);
    }

    console.log("User:", user.id);

    if (!user) {
      alert("Please log in to submit your code.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/submit', {
        code,
        language,
        problemId: id,
        userId: user.id
      });
      console.log(id);
      console.log("Submitting payload:", {
        code,
        language,
        problemId: id,
        userId: user.id
      });

      alert(res.data.message);
    } catch (err) {
      console.error('Submit error', err.message);
      alert('Failed to submit your code.');
    }
    setIsSubmitting(false);
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="problem-page-container">
      <div className="problem-details">
        <h2 style={{ marginTop: '3rem' }}>{problem.problemName}</h2>
        <p className="description">{problem.description}</p>
        <p><strong>Difficulty:</strong> {problem.difficulty}</p>
        {problem.sampleInput && (
          <div className="sample-section">
            <p><strong>Sample Input:</strong></p>
            <pre>{problem.sampleInput}</pre>
          </div>
        )}
        {problem.sampleOutput && (
          <div className="sample-section">
            <p><strong>Sample Output:</strong></p>
            <pre>{problem.sampleOutput}</pre>
          </div>
        )}
      </div>

      <div className="editor-section">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="language-select">
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>

        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
        />

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            onClick={handleRun}
            className="submit-code-btn"
            disabled={isRunning || isSubmitting}
            style={{ opacity: isSubmitting ? 0.5 : 1 }}
          >
            {isRunning ? "Running..." : "Run Code"}
          </button>

          <button
            onClick={handleSubmitCode}
            className="submit-code-btn"
            disabled={isRunning || isSubmitting}
            style={{ opacity: isRunning ? 0.5 : 1 }}
          >
            {isSubmitting ? "Submitting..." : "Submit Code"}
          </button>
        </div>


        <div className="output-section">
          <h4>Output:</h4>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
