import React, { useState, useEffect } from "react";
import "./css/ginfor.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../lib/utils";

const userID = getCookie("userID");
const initial = {
  surname: "",
  otherNames: "",
  dateOfBirth: new Date(),
  nationality: "",
  placeOfResidence: "",
  digitalAddress: "",
  homeAddress: "",
  contact: "",
};

const GenericInformation = () => {
  const [values, setValues] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
    const [userID, setUserID] = useState(null);
    const [token, setToken] = useState(null);
  // Get userID and token after component mounts
  useEffect(() => {
    const storedUserID = getCookie("userId");
    const storedToken = getCookie("token");
    setUserID(storedUserID);
    setToken(storedToken);
  }, []);
  const handleClick = async () => {
    try {
      setIsLoading(true);
      await axios.post("http://localhost:8000/api/applicant/background-data", {
        applicantId: userID,
        backgroundData: values,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      navigate("/educational-background");
    } catch (error) {
      console.error("Error saving background data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading === true ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="gForm">
            <h2>Background Information</h2>
            <h6>
              This data is automatically sent to the school you applied to.
            </h6>
            <form className="" action="">
              <div className="">
                <div className="">
                  <label htmlFor="surname">Surname</label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={values.surname}
                    onChange={(e) =>
                      setValues({ ...values, surname: e.target.value })
                    }
                  />
                </div>
                <div className="">
                  <label htmlFor="otherName">Other Names</label>
                  <input
                    type="text"
                    id="otherName"
                    name="otherNames"
                    onChange={(e) =>
                      setValues({ ...values, otherNames: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div style={{ marginTop: "10px" }}>
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dateOfBirth"
                    value={values.dateOfBirth}
                    onChange={(e) =>
                      setValues({ ...values, dateOfBirth: e.target.value })
                    }
                  />
                </div>
                <div className="">
                  <label htmlFor="nationality">Nationality</label>
                  <select
                    className=""
                    name="nationality"
                    onChange={(e) =>
                      setValues({ ...values, nationality: e.target.value })
                    }
                  >
                    <option value="">Select your nationality</option>
                    <option value="ghana">Ghana</option>
                    <option value="nigeria">Nigeria</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="">
                  <label htmlFor="city">City/Town</label>
                  <input
                    type="text"
                    id="city"
                    name="placeOfResidence"
                    onChange={(e) =>
                      setValues({ ...values, placeOfResidence: e.target.value })
                    }
                  />
                </div>
                <div className="">
                  <label htmlFor="digitalAddress">Digital Address</label>
                  <input
                    type="text"
                    id="digitalAddress"
                    name="digitalAddress"
                    onChange={(e) =>
                      setValues({ ...values, digitalAddess: e.target.value })
                    }
                  />
                </div>
                <div className="">
                  <label htmlFor="homeAddress">Home Address</label>
                  <input
                    type="text"
                    id="homeAddress"
                    name="homeAddress"
                    onChange={(e) =>
                      setValues({ ...values, homeAddress: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="">
                  <label htmlFor="contact">Contact</label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    onChange={(e) =>
                      setValues({ ...values, contact: e.target.value })
                    }
                  />
                </div>
              </div>
            </form>
          </div>
          <div>
            <button className="button" onClick={handleClick}>
              Save & Continue
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default GenericInformation;
