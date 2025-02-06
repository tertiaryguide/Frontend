import React, { useState } from "react";
import "./css/ginfor.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "./page-header";
import MultipleFileUpload from "./file-upload";
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
  email: "",
  contact: "",
};

const BackgroundInformation = () => {
  const [values, setValues] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await axios.post("http://localhost:8000/api/applicants/background-data", {
        applicantId: userID,
        backgroundData: values,
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
  <PageHeader/>
<MultipleFileUpload/>
      {isLoading === true ? (
        <div>Loading...</div>
      ) : (
        <>
        <Navbar />

          <div className="gForm">
            <h2>Background Information</h2>
            <h6>
              This data is automatically sent to the school you applied to.
            </h6>
            <form className="form-grid" action="">
              <div>
                <div className="form-group">
                  <>
                    <label htmlFor="surname">Surname</label> <br />
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      value={values.surname}
                      onChange={(e) =>
                        setValues({ ...values, surname: e.target.value })
                      }
                    />{" "}
                  </>
                  <div style={{ marginTop: "10px" }}>
                    <label htmlFor="dob">Date of Birth</label> <br />
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
                </div>
              </div>
              <div className="form-group1">
                <>
                  <label htmlFor="otherName">Other Name</label>
                  <br />
                  <input
                    type="text"
                    id="otherName"
                    name="otherNames"
                    onChange={(e) =>
                      setValues({ ...values, otherNames: e.target.value })
                    }
                  />
                </>
                <>
                  <label htmlFor="nationality">Nationality</label>
                  <br />
                  <input
                    type="text"
                    id="nationality"
                    name="nationality"
                    onChange={(e) =>
                      setValues({ ...values, nationality: e.target.value })
                    }
                  />
                </>
              </div>
              <br />
              <br />
              <div className="form-group2">
                <label htmlFor="city">City/Town</label>
                <br />
                <input
                  type="text"
                  id="city"
                  name="placeOfResidence"
                  onChange={(e) =>
                    setValues({ ...values, placeOfResidence: e.target.value })
                  }
                />
                <label htmlFor="digitalAddress">Digital Address</label>
                <br />
                <input
                  type="text"
                  id="digitalAddress"
                  name="digitalAddress"
                  onChange={(e) =>
                    setValues({ ...values, digitalAddess: e.target.value })
                  }
                />
                <label htmlFor="homeAddress">Home Address</label>
                <br />
                <input
                  type="text"
                  id="homeAddress"
                  name="homeAddress"
                  onChange={(e) =>
                    setValues({ ...values, homeAddress: e.target.value })
                  }
                />
              </div>
              <br />
              <br />
              <div className="form-group3">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
                <label htmlFor="contact">Contact</label>
                <br />
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  onChange={(e) =>
                    setValues({ ...values, contact: e.target.value })
                  }
                />
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

export default BackgroundInformation;
