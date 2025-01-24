import React from 'react'
import './css/backgroundinfor.css'
import { useNavigate } from "react-router-dom";

const BackgroundInfor = () => {
  const navigate = useNavigate();

  const handleSaveAndExit = () => {
    navigate("/alert");  
  };

  const handleBackButton = () => {
    navigate(-1);
  };
  return (
    <>
    <div>
      <div className='gen'>
        <h1>  Generic Form</h1>
        <h6 className='headd6'>Save Your Data to Minimize Repitition</h6>
      </div>
    </div>
    <div className='Gform'>
        <div className='text'>
          <h2>Supporting Documents</h2>
          <h6 className='nb'>NB: Accepted format include docs,pdf,rtf,png,jpg,jpeg</h6>
          
        </div>
        <div className="document-section">
  <div className="icon-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="currentColor"
      className="bi bi-cloud-upload"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"
      />
      <path
        fillRule="evenodd"
        d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z"
      />
    </svg>
  </div>
  <h6 className="h6">
    Upload your birth certificate, national ID, and passport picture.
  </h6>
</div>
        </div>
        <div className='Gform'>
        <div className='text'>
          <h2>Guardian(s) Data</h2>
          <h6>This data is automatically sent to the school you applied to.</h6>
        </div>
        <div className='borders'>
        <form className='form-container'>
                <div className='lform'> 
                  <label htmlFor="">Father's Name</label>
                  <input className='input1' type="text" id="School" name="School"/>
                  <label htmlFor="">Nationality</label>
                  <input className='input1' type="text" id="School" name="School"/>
                </div>
                <div className='lform'>
                  <label htmlFor="">Ocupation</label>
                  <input  className='input22' type="text"  id="Program" name="Prgram" />
                  <label htmlFor="">Email/Contact</label>
                  <input  className='input22' type="text"  id="Program" name="Prgram" />
                </div>
              </form>
              <div className='tick'>
                  <input type="checkbox" /> Tick if Deceased
                </div>
              </div>
              <div className='borders'>
        <form className='form-container'>
                <div className='lform'> 
                  <label htmlFor="">Mother's Name</label>
                  <input className='input1' type="text" id="School" name="School"/>
                  <label htmlFor="">Nationality</label>
                  <input className='input1' type="text" id="School" name="School"/>
                </div>
                <div className='lform'>
                  <label htmlFor="">Occupation</label>
                  <input  className='input22' type="text"  id="Program" name="Prgram" />
                  <label htmlFor="">Email/Contact</label>
                  <input  className='input22' type="text"  id="Program" name="Prgram" />
                </div>
              </form>
              <div className='tick'>
                  <input type="checkbox" /> Tick if Deceased
                </div>
              </div>
        </div>
        <div className="button-container">
      <button className="go-back-button" onClick={handleBackButton}>Go Back</button>
      <button className="save-exit-button" onClick={handleSaveAndExit}>Save & Exit</button>
    </div>
        </>
        )
        }

        export default BackgroundInfor