import React, { useState } from 'react'
import Authentication from './pages/Authentication';
import "./App.css"
import Icard from './pages/Icard'
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';;


function App() {
  const [show, setShow] = useState(true);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/addUser', { username });
      navigate(`/icard/${response.data.userId}`);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <>
    <Authentication show={show} setShow={setShow}/>
      <div className='forms'>
        <h1>Enter Your Username</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
export default function RouterComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/icard/:userId" element={<Icard />} />
      </Routes>
    </Router>
  );
}



