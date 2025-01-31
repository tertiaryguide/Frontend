import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar';
import GenericInformation from './components/background';
import EducationalBackround from './components/education';
import BackgroundInfor from './components/supporting';
import Alert from './components/alert';
import SupportingInfor from './components/supporting';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<BackgroundInfor />} />
          <Route path="/education" element={<EducationalBackround />} />
          <Route path="/supporting" element={<SupportingInfor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
