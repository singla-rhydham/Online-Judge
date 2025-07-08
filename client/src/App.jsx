import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar.jsx';
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';
import Contribute from './Components/Contribute.jsx';
import Practice from './Components/Practice';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </Router>
  );
}

export default App;