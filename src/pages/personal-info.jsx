import React, { useState, useEffect } from "react";
import "../css/ginfor.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../lib/utils";

const initial = {
  surname: "",
  otherNames: "",
  dateOfBirth: "", // Ensure date is an empty string
  nationality: "",
  placeOfResidence: "",
  digitalAddress: "",
  homeAddress: "",
  contact: "",
};

const PersonalInformationPage = () => {
  const [values, setValues] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    const currentUserID = getCookie("userId");
    const currentToken = getCookie("token");
    console.log(values)
    if (!currentUserID || !currentToken) {
      console.error("Missing user ID or token.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/applicant/background-data",
        {
          applicantId: currentUserID,
          personalInfo: values,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      if (response.data) {
        navigate("/preview");
      }
    } catch (error) {
      console.error("Error saving background data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="gForm">
          <h2>Personal Information</h2>
          <form className="">
            {Object.keys(initial).map((key) => (
              <div key={key}>
                <label htmlFor={key}>{key.replace(/([A-Z])/g, " $1").trim()}</label>
                <input
                  type={key === "dateOfBirth" ? "date" : "text"}
                  id={key}
                  name={key}
                  value={values[key]}
                  onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                />
              </div>
            ))}
            <button type="button" className="button" onClick={handleClick}>
              Save & Continue
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default PersonalInformationPage;
