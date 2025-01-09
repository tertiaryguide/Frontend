import React, { useState } from 'react';
import './css/ginfor.css'

const GenericInformation = () => {
  const [dob, setDob] = useState(''); 

  const handleDobChange = (e) => {
    setDob(e.target.value); 
  };

  return (
    <>
    <div className="generic">
    <h1>  Generic Form</h1>
    <h6 className='head6'>Save Your Data to Minimize Repitition</h6>
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
                  <label htmlFor="">Other Name</label><br />
                  <input type="text" id="Other Name" name="Other Name" />
                  <label htmlFor="">Nationality</label><br />
                  <input type="text" id="Nationality" name="Nationality" />
              </div>
              <br />
              <br />
              <div className='form-group2'>
                  <label htmlFor="">City/Town</label><br />
                  <input type="text" id="City/Town" name="City/Town" />
                  <label htmlFor="">Digital Address</label><br />
                  <input type="text" id="Digital Address" name="Digital Address" />
                  <label htmlFor="">Home Address</label><br />
                  <input type="text" id="Nationality" name="Nationality" />
              </div>
              <br /> 
              <br />
              <div className='form-group3'>
                  <label htmlFor="">Email</label><br />
                  <input type="text" id="Email" name="Email" />
                  <label htmlFor="">Contact</label><br />
                  <input type="text" id="Contact" name="Contact" />
              </div>
          </form>
      </div >
      <div>
    <button className='button'>save & Continue</button>
    </div>
      </>
  );
};

export default GenericInformation;
