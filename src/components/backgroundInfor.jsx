import React from 'react'
import './css/backgroundinfor.css'

const BackgroundInfor = () => {
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
          <h6 className='h6'>Upload your birth certificate,national ID and passport picture.</h6>
        </div>
        <form className='form-container'>
          <div className='lform'>
            <input className='input0' type="text" id="School" placeholder='Upload Passport Picture' name="School" />
          </div>
          <div className='lform'>
            <input className='input2' type="text" id="Program" placeholder='Upload national ID' name="Prgram" />
          </div>
          <div className='lform'>
            <input className='input3' type="text" id="Batch" placeholder='Upload Birth Certificate' name="Batch" />
          </div><br />
        </form>
        <div>
        <h6 className='nb'>NB: Accepted format include docs,pdf,rtf,png,jpg,jpeg</h6>
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
      <button className="go-back-button">Go Back</button>
      <button className="save-exit-button">Save & Exit</button>
    </div>
        </>
        )
        }

        export default BackgroundInfor