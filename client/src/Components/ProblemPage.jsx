import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { jwtDecode } from 'jwt-decode';
import './ProblemPage.css';

const ProblemPage = () => {
  const { id } = useParams();

  // All hooks must be inside the component
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiReview, setAIReview] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get(`http://54.80.126.183/problems/${id}`);
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
      const res = await axios.post('http://54.80.126.183:8000/run', {
        code,
        language,
        input: problem?.sampleInput || ''
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

    if (!user) {
      alert("Please log in to submit your code.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post('http://54.80.126.183/submit', {
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

  const handleAI_Review = async () => {
    if (!code.trim()) {
      alert("Please write some code before requesting an AI review.");
      return;
    }

    setIsReviewing(true);
    setAIReview('');

    try {
      const response = await fetch('http://54.80.126.183/ai-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        setAIReview(`❌ Server error: ${response.status}`);
        setIsReviewing(false);
        return;
      }

      // Defensive JSON parsing
      let data = null;
      try {
        data = await response.json();
      } catch (jsonError) {
        setAIReview("⚠️ Error: Server returned invalid response. Please try again.");
        setIsReviewing(false);
        return;
      }

      if (data && data.success) {
        setAIReview(data.ai_response);
      } else {
        setAIReview("❌ AI failed to review your code.");
      }
    } catch (error) {
      console.error("AI Review error:", error);
      setAIReview("⚠️ Error while fetching AI review.");
    } finally {
      setIsReviewing(false);
    }
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
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="language-select"
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>

        <textarea
          className="code-editor"
          value={code}
          onChange={e => setCode(e.target.value)}
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

          <button
            onClick={handleAI_Review}
            className="submit-code-btn"
            disabled={isReviewing}
            style={{ opacity: isReviewing ? 0.5 : 1 }}
          >
            {isReviewing ? "Reviewing..." : "AI Review"}
          </button>
        </div>

        <div className="output-section">
          <h4>Output:</h4>
          <pre>{output}</pre>
        </div>
        <div className="ai-review-section">
          <h4>AI Review:</h4>
          <div className="markdown-output">
            <ReactMarkdown>{aiReview}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
