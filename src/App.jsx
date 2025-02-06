import 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/login';
import Preview from './components/preview';
import GenericInformation from './components/genericInformation';
import EducationalBackground from './components/EducationalBackround';
import BackgroundInfor from './components/backgroundInfor';
import './App.css';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/background" element={<GenericInformation/>} />
          <Route path="/education" element={<EducationalBackground />} />
          <Route path="/supporting" element={<BackgroundInfor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
