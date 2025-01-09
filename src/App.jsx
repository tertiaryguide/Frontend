import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'
// import './index.css';
// import Home from './components/home';
import Navbar from './components/navbar';
import { Alert } from 'bootstrap';
// import GenericInformation from './components/genericInformation';
// import EducationalBackround from './components/EducationalBackround';
// import BackgroundInfor from './components/backgroundInfor';
function App() {
return (
    <>
      {
<div>
<h1 className="text-3xl font-bold underline"></h1>
      <div>
       <Navbar />
       {/* <GenericInformation /> */}
       {/* <EducationalBackround /> */}
       {/* <BackgroundInfor /> */}
       <Alert />
      </div>
</div>

      } 
    </>
  );
};

export default App
