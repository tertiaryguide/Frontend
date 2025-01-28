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
<<<<<<< HEAD
      <div>
        {/* <Navbar /> */}
        <h1 className="text-3xl font-bold underline"></h1>
=======
      <div style={{padding: '10px'}}>
        <Navbar />
        {/* <h1 className="text-3xl font-bold underline"></h1> */}
>>>>>>> dde7ac207785b1c47f03e5d7a142d281d717e98d
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
