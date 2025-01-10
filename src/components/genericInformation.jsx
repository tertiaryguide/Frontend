import React, { useState } from 'react';
import './css/ginfor.css';
import { useNavigate } from "react-router-dom";

const GenericInformation = () => {
  const [dob, setDob] = useState('');
  const navigate = useNavigate(); 

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleClick = () => {
    navigate("/educational-background"); 
  };

  return (
    <>
      <div className="generic">
        <h1>Generic Form</h1>
        <h6 className='head6'>Save Your Data to Minimize Repetition</h6>
      </div>

      <div className="gForm">
        <h2>Background Information</h2>
        <h6>This data is automatically sent to the school you applied to.</h6>
        <form className='form-grid'>
          <div>
            <div className='form-group'>
              <label htmlFor="surname">Surname</label> <br />
              <input type="text" id="surname" name="surname" />
              <div style={{ marginTop: '10px' }}>
                <label htmlFor="dob">Date of Birth</label> <br />
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={dob}
                  onChange={handleDobChange} />
                {dob && (
                  <p style={{ marginTop: '10px' }}>
                    Selected Date of Birth: <strong>{dob}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='form-group1'>
            <label htmlFor="otherName">Other Name</label><br />
            <input type="text" id="otherName" name="otherName" />
            <label htmlFor="nationality">Nationality</label><br />
            <input type="text" id="nationality" name="nationality" />
          </div>
          <br />
          <br />
          <div className='form-group2'>
            <label htmlFor="city">City/Town</label><br />
            <input type="text" id="city" name="city" />
            <label htmlFor="digitalAddress">Digital Address</label><br />
            <input type="text" id="digitalAddress" name="digitalAddress" />
            <label htmlFor="homeAddress">Home Address</label><br />
            <input type="text" id="homeAddress" name="homeAddress" />
          </div>
          <br />
          <br />
          <div className='form-group3'>
            <label htmlFor="email">Email</label><br />
            <input type="text" id="email" name="email" />
            <label htmlFor="contact">Contact</label><br />
            <input type="text" id="contact" name="contact" />
          </div>
        </form>
      </div>
      <div>
        <button className='button' onClick={handleClick}>Save & Continue</button>
      </div>
    </>
  );
};

export default GenericInformation;
