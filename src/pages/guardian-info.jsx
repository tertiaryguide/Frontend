import React, { useState, useEffect } from "react";
import "../css/supporting.css";
import { useNavigate } from "react-router-dom";
import MultipleFileUpload from "./upload-document";
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

const GuardianInformationPage = () => {
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
      await axios.post(
        `https://tg-backend-snex.onrender.com/api/applicant/caretaker-data`,
        {
          applicantId: userID,
          caretakerData: parentData,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        <button
          className="save-exit-button"
          onClick={handleSaveAndExit}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save & Exit"}
        </button>
      </div>
      {showPop && <CongratulatoryPopUp />}
    </>
  );
};

export default GuardianInformationPage;
