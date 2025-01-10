import React from 'react'
import './css/einfor.css'
import { useNavigate } from "react-router-dom";
const EducationalBackround = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/backgroundInfor"); 
  };
  const handleBackButton = () => {
    navigate(-1); 
  };
  return (
    <>
    <div className="gen">
    <h1>  Generic Form</h1>
    <h6 className='headd6'>Save Your Data to Minimize Repitition</h6>
    </div>
    <div className='Gform'>
     <div className='text'>
      <h2>Educational Information</h2>
     <h6>This data is automatically sent to the school you applied to.</h6>
     </div>
    <form className='form-container'>
                <div className='lform'> 
                  <label htmlFor="">School</label>
                  <input className='input1' type="text" id="School" name="School"/>
                </div>
                <div className='lform'>
                  <label htmlFor="">Prgram</label>
                  <input  className='input66' type="text"  id="Program" name="Prgram" />
                </div>
                  <div className='lform'>
                  <label htmlFor="">Batch</label>
                  <input className='input66' type="text"  id="Batch" name="Batch" />
                  </div><br />
                  
              </form>
              <div className='type-container'>
              <div><label htmlFor="">Examination Type</label><br />
                  <input className='input6' type="text" id="School" name="School"/>
                  </div>
                  <div><label htmlFor="">Index Number</label><br />
                  <input  className='input7' type="text"  id="Program" name="Prgram" />
                  </div>
              </div>

              <form className='form-container'>
                <div className='lform'> 
                    <label htmlFor="">Subject</label>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                </div>
                <div className='lform'>
                    <label htmlFor="">Score</label>
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                </div>
              </form>
    </div>
    <div>
    <div className='Gform'>
     <div className='text'>
      <h2>Academic Aspiration</h2>
     <h6>This data is automatically sent to the school you applied to.</h6>
     </div>
     <div className='f-container'>
    <form className='form-container'>
                <div className='lform'> 
                    <label htmlFor="">Programme of interest</label>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                  <input className='input4' type="text" id="School" name="School"/>
                </div>
                <div className='lform'>
                    <label htmlFor="">Priority</label>
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                  <input  className='input5' type="text"  id="Program" name="Prgram" />
                </div>
              </form>
              </div>
    </div>
    </div>
    <div className="button-container">
      <button className="go-back-button" onClick={handleBackButton}>Go Back</button>
      <button className="save-exit-button" onClick={handleClick}>Save & Continue</button>
    </div>
    </>
  );
};

export default EducationalBackround