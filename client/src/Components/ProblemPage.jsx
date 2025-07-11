import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './problemPage.css';

const ProblemPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');

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

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/submit', {
        code,
        language,
        input: problem.sampleInput
      });
      setOutput(res.data.output);
    } catch (err) {
      console.error('Submission failed', err);
      setOutput('Error occurred while running your code.');
    }
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="problem-page-container">
      <div className="problem-details">
        <h2 style={{ marginTop: '3rem' }}>{problem.problemName}</h2>
        <p className="description">{problem.description}</p>
        <p><strong>Difficulty:</strong> {problem.difficulty}</p>
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

        <button onClick={handleSubmit} className="submit-code-btn">Run Code</button>

        <div className="output-section">
          <h4>Output:</h4>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
