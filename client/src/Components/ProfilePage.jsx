import { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = ({ userId }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`/api/users/${userId}/profile`)
      .then(res => setProfile(res.data))
      .catch(console.error);
  }, [userId]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{profile.name}</h1>
      <p className="text-gray-500">{profile.email}</p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Solved Problems</h2>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <StatBox label="Easy" value={profile.totalSolved.easy} />
          <StatBox label="Medium" value={profile.totalSolved.medium} />
          <StatBox label="Hard" value={profile.totalSolved.hard} />
        </div>
        <div className="mt-4 font-bold">Total: {profile.totalSolved.overall}</div>
      </div>

      {/* Add more sections: recent activity, submission history, etc. */}
    </div>
  );
};

const StatBox = ({ label, value }) => (
  <div className="p-4 border rounded shadow text-center">
    <p className="text-lg">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default ProfilePage;
