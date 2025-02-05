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
                <div className='division'> 
                  <label htmlFor="">School</label>
                  <input className='input11' type="text" id="School" name="School"/>
                </div>
                <div className='division'>
                  <label htmlFor="">Prgram</label>
                  <input  className='input668' type="text"  id="Program" name="Prgram" />
                </div>
                  <div className='division'>
                  <label htmlFor="">Batch</label>
                  <input className='input668' type="text"  id="Batch" name="Batch" />
                  </div><br />
                  
              </form>
              <div className='type-container'>
              <div className='division'>
                <label htmlFor="">Examination Type</label><br />
                  <input className='input11' type="text" id="School" name="School"/>
                  </div>
                  <div className='division'>
                    <label htmlFor="">Index Number</label><br />
                  <input  className='input11' type="text"  id="Program" name="Prgram" />
                  </div>
              </div>

              <form className='type-container'>
                <div className='division'> 
                    <label htmlFor="">Subject</label>
                  {Array(10).fill(null).map((_, index) => (
  <input key={index} className="input111" type="text" id={`School${index}`} name="School" />
))}

                </div>
                <div className='division'>
                    <label htmlFor="">Score</label>
                    {Array(10).fill(null).map((_, index) => (
  <input key={index} className="input112" type="text" id={`program${index}`} name="program" />
))}
                </div>
              </form>
    </div>
    <div>
    <div className='Gform'>
     <div className='text'>
      <h2>Academic Aspiration</h2>
     <h6>Select your program of interest</h6>
     </div>
     <div className='f-container'>
    <form className='form-container'>
                <div className='division'> 
                    <label htmlFor="">According to priority</label>
                    {Array(10).fill(null).map((_, index) => (
  <input key={index} className="input44" type="text" id={`School${index}`} name="School" />
))}
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