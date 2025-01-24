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
        <form className='form-container'>
            <div className='lform'>
              <label className='surname' htmlFor="surname">Surname</label> <br />
              <input className='input667' type="text" id="surname" name="surname" />
              <br />
              <div style={{ marginTop: '10px' }}>
                <label  htmlFor="dob">Date of Birth</label> <br />
                <input className='input667'
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
            <div className='blform'>
                  <label htmlFor="">Other name </label>
                  <input  className='input667' type="text"  id="Program" name="Prgram" />
                  <br />
                  <label htmlFor="">Nationality</label>
                  <select
              className="input667 w-full border border-gray-300 p-3 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select your nationality</option>
              <option value="ghanaian">Ghanaian</option>
              <option value="nigerian">Nigerian</option>
              <option value="others">Others</option>
            </select>
                </div>
        </form>
        <br />
        <form className='form-container'>
                <div className='lform'> 
                  <label htmlFor="">City/Town</label>
                  <input className='input66' type="text" id="School" name="School"/>
                </div>
                <div className='lform'>
                  <label htmlFor="">Digital Address</label>
                  <input  className='input66' type="text"  id="Program" name="Prgram" />
                </div>
                  <div className='lform'>
                  <label htmlFor="">Home Address</label>
                  <input className='input66' type="text"  id="Batch" name="Batch" />
                  </div>
              </form>
              <form className='form-container'>
                <div className='lform'> 
                  <label htmlFor="">Email</label>
                  <input className='input667' type="text" id="School" name="School"/>
                </div>
                <div className='lform'>
                  <label htmlFor="">Contact</label>
                  <input  className='input667 m-lg-1' type="text"  id="Program" name="Prgram" />
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
