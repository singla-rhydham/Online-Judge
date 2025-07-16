import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://localhost:5000/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProfile(res.data))
    .catch(err => console.error('Failed to load profile', err));
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
<h2 style={{ marginTop: '3rem', color: '#7e22ce' }}>My Profile</h2>
      <p>Email: {profile.email}</p>
      <p>Problems Solved: {profile.solvedCount}</p>

      <h3>Submission History</h3>
      <table className="submission-table">
        <thead>
          <tr>
            <th>Problem</th>
            <th>Language</th>
            <th>Status</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {profile.submissions.map((sub, i) => (
            <tr key={i}>
              <td>{sub.problemId.problemName}</td>
              <td>{sub.language}</td>
              <td className={sub.status === 'Accepted' ? 'accepted' : 'failed'}>
                {sub.status}
              </td>
              <td>{new Date(sub.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfilePage;
