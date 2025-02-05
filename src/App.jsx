import 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar';
<<<<<<< HEAD
import EducationalBackround from './components/education';
import BackgroundInfor from './components/supporting';
import SupportingInfor from './components/supporting';
import Login from './components/login';
import Preview from './components/preview';
=======
import GenericInformation from './components/genericInformation';
import EducationalBackround from './components/education';
import BackgroundInfor from './components/supporting';
import SupportingInfor from './components/supporting';
import CongratulatoryPopUp from './components/congratulatory-popup';
>>>>>>> 3f257b9 (updated input)

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Login />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/background" element={<BackgroundInfor />} />
=======
        
          <Route path="/" element={<BackgroundInfor />} />
          <Route path="/congratulatory-popup" element={<CongratulatoryPopUp />} />
          <Route path="/genericInformation" element={<GenericInformation />} />
>>>>>>> 3f257b9 (updated input)
          <Route path="/education" element={<EducationalBackround />} />
          <Route path="/supporting" element={<SupportingInfor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
