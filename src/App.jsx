import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar';
import GenericInformation from './components/genericInformation';
import EducationalBackround from './components/EducationalBackround';
import BackgroundInfor from './components/backgroundInfor';
import Alert from './components/alert';

function App() {
  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        <h1 className="text-3xl font-bold underline"></h1>
        <Routes>
          <Route path="/" element={<GenericInformation />} />
          <Route path="/educational-background" element={<EducationalBackround />} />
          <Route path="/backgroundInfor" element={<BackgroundInfor />} />
          <Route path="/alert" element={<Alert />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
