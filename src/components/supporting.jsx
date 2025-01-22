import React from "react";
import "./css/supporting.css";
import { useNavigate } from "react-router-dom";
import MultipleFileUpload from "./file-upload";
import PageHeader from "./page-header";

const SupportingInfor = () => {
  const navigate = useNavigate();

  const handleSaveAndExit = () => {
    navigate("/alert");
  };

  const handleBackButton = () => {
    navigate(-1);
  };
  return (
    <>
      <PageHeader />
      <div className="Gform">
        <div className="text">
          <h2>Supporting Documents</h2>
          <h6 className="h6">
            Upload your birth certificate,national ID and passport picture.
          </h6>
        </div>
        <form className="form-container">
          <MultipleFileUpload />
          <br />
        </form>
        <div>
          <h6 className="nb">
            NB: Accepted format include docs,pdf,rtf,png,jpg,jpeg
          </h6>
        </div>
      </div>

      <div className="Gform">
        <div className="text">
          <h2>Guardian(s) Data</h2>
          <h6>This data is automatically sent to the school you applied to.</h6>
        </div>
        <div className="borders">
          <form className="form-container">
            <div className="lform">
              <label htmlFor="">Father's Name</label>
              <input className="input1" type="text" id="School" name="School" />
              <label htmlFor="">Nationality</label>
              <input className="input1" type="text" id="School" name="School" />
            </div>
            <div className="lform">
              <label htmlFor="">Ocupation</label>
              <input
                className="input22"
                type="text"
                id="Program"
                name="Prgram"
              />
              <label htmlFor="">Email/Contact</label>
              <input
                className="input22"
                type="text"
                id="Program"
                name="Prgram"
              />
            </div>
          </form>
          <div className="tick">
            <input type="checkbox" /> Tick if Deceased
          </div>
        </div>
        <div className="borders">
          <form className="form-container">
            <div className="lform">
              <label htmlFor="">Mother's Name</label>
              <input className="input1" type="text" id="School" name="School" />
              <label htmlFor="">Nationality</label>
              <input className="input1" type="text" id="School" name="School" />
            </div>
            <div className="lform">
              <label htmlFor="">Occupation</label>
              <input
                className="input22"
                type="text"
                id="Program"
                name="Prgram"
              />
              <label htmlFor="">Email/Contact</label>
              <input
                className="input22"
                type="text"
                id="Program"
                name="Prgram"
              />
            </div>
          </form>
          <div className="tick">
            <input type="checkbox" /> Tick if Deceased
          </div>
        </div>
      </div>
      <div className="button-container">
        <button className="go-back-button" onClick={handleBackButton}>
          Go Back
        </button>
        <button className="save-exit-button" onClick={handleSaveAndExit}>
          Save & Exit
        </button>
      </div>
    </>
  );
};

export default SupportingInfor;
