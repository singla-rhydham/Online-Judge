import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="quote-section">
        <h1 className="main-quote">
          “The best way to learn to code is to write code.”
        </h1>
        <p className="quote-author">— Unknown</p>
      </div>

      <div className="info-section">
        <div className="info-card">
          <h2>💻 Practice Problems</h2>
          <p>Solve hand-picked coding questions that strengthen your DSA skills.</p>
        </div>
        {/* <div className="info-card">
          <h2>🏁 Live Contests</h2>
          <p>Compete in real-time, improve your rank, and sharpen your logic.</p>
        </div> */}
        <div className="info-card">
          <h2>📊 Track Progress</h2>
          <p>View your submission history, problem stats, and performance growth.</p>
        </div>
        <div className="info-card">
          <h2>🧑‍🤝‍🧑 Community</h2>
          <p>Discuss problems, share insights, and learn with other developers.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
