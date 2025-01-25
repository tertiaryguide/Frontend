import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar';
import EducationalBackround from './components/education';
import BackgroundInfor from './components/supporting';
import SupportingInfor from './components/supporting';
import Login from './components/login';
import Preview from './components/preview';

function App() {
  return (
    <Router>
      <div style={{padding: '10px'}}>
        <Navbar />
        {/* <h1 className="text-3xl font-bold underline"></h1> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/background" element={<BackgroundInfor />} />
          <Route path="/education" element={<EducationalBackround />} />
          <Route path="/supporting" element={<SupportingInfor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
