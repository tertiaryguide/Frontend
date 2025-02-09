import React, { useState } from "react";
import "./css/einfor.css";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../lib/utils";
import axios from "axios";

const userID = getCookie("userID");

const initial = {
  indexNumber: "",
  school: "",
  year: "",
  course: "",
  examsType: "",
  results: Array(10).fill({ subject: "", grade: "" }),
};

const EducationalBackground = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (index, field, value) => {
    const updatedResults = [...values.results];
    updatedResults[index][field] = value;
    setValues({ ...values, results: updatedResults });
  };
  const handleClick = async () => {
    try {
      setIsLoading(true);
      await axios.post(
        "http://localhost:8000/api/applicants/academic-history",
        {
          applicantId: userID,
          backgroundData: values,
        }
      );
      navigate("/backgroundInfor");
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
      <div className="Gform ">
        <div className="text">
          <h2 className="">Educational Information</h2>
          <h6>This data is automatically sent to the school you applied to.</h6>
        </div>
        <form className="form-container">
          <div className="division">
            <label htmlFor="school">School</label>
            <input
              className="input11"
              type="text"
              id="school"
              name="school"
              value={values.school}
              onChange={(e) => setValues({ ...values, school: e.target.value })}
            />
          </div>
          <div className="division">
            <label htmlFor="course">Course of Study</label>
            <input
              className="input668"
              type="text"
              id="program"
              name="course"
              value={values.course}
              onChange={(e) => setValues({ ...values, course: e.target.value })}
            />
          </div>
          <div className="division">
            <label htmlFor="year">Batch</label>
            <input
              className="input668"
              type="text"
              id="Batch"
              name="year"
              value={values.year}
              onChange={(e) => setValues({ ...values, year: e.target.value })}
            />
          </div>
          <br />
        </form>
        <div className="type-container">
          <div className="division">
            <label htmlFor="examsType">Examination Type</label>
            <input
              className="input6"
              type="text"
              id="examsType"
              name="examsType"
              value={values.examsType}
              onChange={(e) =>
                setValues({ ...values, examsType: e.target.value })
              }
            />
          </div>
          <div className="division">
            <label htmlFor="indexNumber">Index Number</label>
            <input
              className="input7"
              type="text"
              id="indexNumber"
              name="indexNumber"
              value={values.indexNumber}
              onChange={(e) =>
                setValues({ ...values, indexNumber: e.target.value })
              }
            />
          </div>
        </div>

        <form className="type-container">
          <div className="f-container">
            <h3>Subjects and Grades</h3>
            {values.results.map((result, index) => (
              <div className="subject-grade-row" key={index}>
                <input
                  className="input111"
                  type="text"
                  placeholder="Subject"
                  value={result.subject}
                  onChange={(e) =>
                    handleChange(index, "subject", e.target.value)
                  }
                />
                <select
                  onChange={(e) => handleChange(index, "grade", e.target.value)}
                  className="input6 "
                >
                  <option className="input112" value="">
                    select
                  </option>
                  <option className="input112" value="a1">
                    A1
                  </option>
                  <option className="input112" value="b2">
                    B2
                  </option>
                  <option className="input112" value="b3">
                    B3
                  </option>
                  <option className="input112" value="c4">
                    C4
                  </option>
                  <option className="input112" value="c5">
                    C5
                  </option>
                  <option className="input112" value="c6">
                    C6
                  </option>
                  <option className="input112" value="d7">
                    D7
                  </option>
                  <option className="input112" value="e8">
                    E8
                  </option>
                  <option className="input112" value="f9">
                    F9
                  </option>
                </select>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div>
        <div className="Gform">
          <div className="text">
            <h2>Academic Aspiration</h2>
            <h6>Select your program of interest</h6>
          </div>
          <div className="f-container">
            <form className="form-container">
              <div className="division">
                <label htmlFor="">Programme of interest</label>
                <input
                  className="input4"
                  type="text"
                  id="School"
                  name="School"
                />
                <input
                  className="input4"
                  type="text"
                  id="School"
                  name="School"
                />
                <input
                  className="input4"
                  type="text"
                  id="School"
                  name="School"
                />
                <input
                  className="input4"
                  type="text"
                  id="School"
                  name="School"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-black ">
        <button className="go-back-button" onClick={handleBackButton}>
          Go Back
        </button>
        <button
          className="save-exit-button"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </>
  );
};

export default EducationalBackground;
