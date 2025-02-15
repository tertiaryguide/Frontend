import React, { useState, useEffect } from "react";
import "./css/supporting.css";
import { useNavigate } from "react-router-dom";
import MultipleFileUpload from "../components/file-upload";
import CongratulatoryPopUp from "../components/congratulatory-popup";
import axios from "axios";
import { getCookie } from "../../lib/utils";

const userID = getCookie("userID");
const initial = {
  father: {
    name: "",
    nationality: "",
    address: "",
    occupation: "",
    contact: "",
    isAlive: true,
  },
  mother: {
    name: "",
    nationality: "",
    address: "",
    occupation: "",
    contact: "",
    isAlive: true,
  },
};

const BackgroundInfor = () => {
  const navigate = useNavigate();
  const [showPop, setShowPop] = useState(false);
  const [parentData, setParentData] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
    const [userID, setUserID] = useState(null);
    const [token, setToken] = useState(null);
  // Get userID and token after component mounts
  useEffect(() => {
    const storedUserID = getCookie("userId");
    const storedToken = getCookie("token");
    setUserID(storedUserID);
    setToken(storedToken);
  }, []);
  const handleInputChange = (e, parent) => {
    const { name, value } = e.target;
    setParentData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [name]: value,
      },
    }));
  };

  const handleCheckboxChange = (e, parent) => {
    setParentData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        isAlive: !e.target.checked, // Checkbox unchecked = alive
      },
    }));
  };

  const handleSaveAndExit = async () => {
    try {
      setIsLoading(true);
      await axios.post(`http://localhost:8000/api/applicant/caretaker-data`, {
        applicantId: userID,
        caretakerData: parentData,
      },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
      setShowPop(true);
    } catch (error) {
      console.error("Error saving background data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackButton = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="Gform">
        <div className="text">
          <h2>Supporting Documents</h2>
          <h6 className="nb">
            NB: Accepted format include docs,pdf,rtf,png,jpg,jpeg
          </h6>
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
          <MultipleFileUpload />

          <h6 className="h6">
            Upload your birth certificate, national ID, and passport picture.
          </h6>
        </div>
      </div>
      <div className="Gform">
        <div className="text">
          <h2>Guardian(s) Data</h2>
          <h6>This data is automatically sent to the school you applied to.</h6>
        </div>
                {/* Father's Information */}
                <div className="borders">
          <form className="form-container">
            <div className="lform">
              <label htmlFor="fatherName">Father's Name</label>
              <input
                className="input1"
                type="text"
                name="name"
                value={parentData.father.name}
                onChange={(e) => handleInputChange(e, "father")}
              />
              <label htmlFor="fatherNationality">Nationality</label>
              <input
                className="input1"
                type="text"
                name="nationality"
                value={parentData.father.nationality}
                onChange={(e) => handleInputChange(e, "father")}
              />
            </div>
            <div className="lform">
              <label htmlFor="fatherOccupation">Occupation</label>
              <input
                className="input22"
                type="text"
                name="occupation"
                value={parentData.father.occupation}
                onChange={(e) => handleInputChange(e, "father")}
              />
              <label htmlFor="fatherContact">Email/Contact</label>
              <input
                className="input22"
                type="text"
                name="contact"
                value={parentData.father.contact}
                onChange={(e) => handleInputChange(e, "father")}
              />
            </div>
          </form>
          <div className="tick">
            <input
              type="checkbox"
              checked={!parentData.father.isAlive}
              onChange={(e) => handleCheckboxChange(e, "father")}
            />{" "}
            Tick if Deceased
          </div>
        </div>

        <div className="borders">
          <form className="form-container">
            <div className="division">
              <label htmlFor="">Mother's Name</label>
              <input className="input1" type="text" id="School" name="School" />
              <label htmlFor="">Nationality</label>
              <input className="input1" type="text" id="School" name="School" />
            </div>
            <div className="division">
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
                {/* Mother's Information */}
                <div className="borders">
          <form className="form-container">
            <div className="lform">
              <label htmlFor="motherName">Mother's Name</label>
              <input
                className="input1"
                type="text"
                name="name"
                value={parentData.mother.name}
                onChange={(e) => handleInputChange(e, "mother")}
              />
              <label htmlFor="motherNationality">Nationality</label>
              <input
                className="input1"
                type="text"
                name="nationality"
                value={parentData.mother.nationality}
                onChange={(e) => handleInputChange(e, "mother")}
              />
            </div>
            <div className="lform">
              <label htmlFor="motherOccupation">Occupation</label>
              <input
                className="input22"
                type="text"
                name="occupation"
                value={parentData.mother.occupation}
                onChange={(e) => handleInputChange(e, "mother")}
              />
              <label htmlFor="motherContact">Email/Contact</label>
              <input
                className="input22"
                type="text"
                name="contact"
                value={parentData.mother.contact}
                onChange={(e) => handleInputChange(e, "mother")}
              />
            </div>
          </form>
          <div className="tick">
            <input
              type="checkbox"
              checked={!parentData.mother.isAlive}
              onChange={(e) => handleCheckboxChange(e, "mother")}
            />{" "}
            Tick if Deceased
          </div>
        </div>
      </div>
      <div className="button-container">
        <button className="go-back-button" onClick={handleBackButton}>
          Go Back
        </button>
        <button className="save-exit-button" onClick={handleSaveAndExit} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save & Exit"}
        </button>
      </div>
      {showPop && <CongratulatoryPopUp />}
    </>
  );
};

export default BackgroundInfor;
