import React, { useState, useEffect } from "react";
import "../css/einfor.css";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../lib/utils";
import axios from "axios";

const initial = {
  history: {
    indexNumber: "",
    school: "",
    year: "",
    course: "",
    examsType: "",
    results: [
      { subject: "Core Mathematics", grade: "" },
      { subject: "English Language", grade: "" },
      { subject: "Integrated Science", grade: "" },
      { subject: "Social Studies", grade: "" },
      { subject: "", grade: "" },
      { subject: "", grade: "" },
      { subject: "", grade: "" },
      { subject: "", grade: "" },
    ],
  },
  aspiration: ["", "", "", ""],
};

const AcademicInformationPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [userID, setUserID] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUserID = getCookie("userId");
    const storedToken = getCookie("token");
    setUserID(storedUserID);
    setToken(storedToken);
  }, []);

  const handleGradeChange = (index, value) => {
    const updatedResults = [...values.history.results];
    updatedResults[index].grade = value;
    setValues({
      ...values,
      history: { ...values.history, results: updatedResults },
    });
  };

  const handleSubjectChange = (index, value) => {
    const updatedResults = [...values.history.results];
    updatedResults[index].subject = value;
    setValues({
      ...values,
      history: { ...values.history, results: updatedResults },
    });
  };

  const handleAspirationChange = (index, value) => {
    const updatedAspiration = [...values.aspiration];
    updatedAspiration[index] = value;
    setValues({ ...values, aspiration: updatedAspiration });
  };

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://tg-backend-snex.onrender.com/api/applicant/academics",
        {
          applicantId: userID,
          academicHistory: values.history,
          academicAspiration: values.aspiration,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) navigate("/preview");
    } catch (error) {
      console.error("Error saving background data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="Gform">
        <div className="text">
          <h2>Academic History</h2>
        </div>
        <form className="form-container">
          <div className="division">
            <label htmlFor="school">School</label>
            <input
              type="text"
              id="school"
              value={values.history.school}
              onChange={(e) =>
                setValues({
                  ...values,
                  history: { ...values.history, school: e.target.value },
                })
              }
            />
          </div>
          <div className="division">
            <label htmlFor="course">Course of Study</label>
            <input
              type="text"
              id="course"
              value={values.history.course}
              onChange={(e) =>
                setValues({
                  ...values,
                  history: { ...values.history, course: e.target.value },
                })
              }
            />
          </div>
          <div className="division">
            <label htmlFor="year">Year</label>
            <input
              type="text"
              id="year"
              value={values.history.year}
              onChange={(e) =>
                setValues({
                  ...values,
                  history: { ...values.history, year: e.target.value },
                })
              }
            />
          </div>
        </form>
        <div className="type-container">
          <div className="division">
            <label htmlFor="examsType">Examination Type</label>
            <input
              type="text"
              id="examsType"
              value={values.history.examsType}
              onChange={(e) =>
                setValues({
                  ...values,
                  history: { ...values.history, examsType: e.target.value },
                })
              }
            />
          </div>
          <div className="division">
            <label htmlFor="indexNumber">Index Number</label>
            <input
              type="text"
              id="indexNumber"
              value={values.history.indexNumber}
              onChange={(e) =>
                setValues({
                  ...values,
                  history: { ...values.history, indexNumber: e.target.value },
                })
              }
            />
          </div>
        </div>

        <div className="f-container">
          <h3>Subjects and Grades</h3>
          {values.history.results.map((result, index) => (
            <div className="subject-grade-row" key={index}>
              {index >= 4 ? (
                <input
                  type="text"
                  placeholder="Elective Subject"
                  value={result.subject}
                  onChange={(e) => handleSubjectChange(index, e.target.value)}
                />
              ) : (
                <span>{result.subject}</span>
              )}
              <select
                value={result.grade}
                onChange={(e) => handleGradeChange(index, e.target.value)}
              >
                <option value="">Select</option>
                {["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"].map(
                  (grade) => (
                    <option key={grade} value={grade.toLowerCase()}>
                      {grade}
                    </option>
                  )
                )}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="Gform">
        <div className="text">
          <h2>Academic Aspiration</h2>
        </div>
        <div className="f-container">
          <form className="form-container">
            {values.aspiration.map((asp, index) => (
              <input
                key={index}
                type="text"
                placeholder="Programme of interest"
                value={asp}
                onChange={(e) => handleAspirationChange(index, e.target.value)}
              />
            ))}
          </form>
        </div>
      </div>

      <div className="bg-black">
        <button className="go-back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <button
          className="save-exit-button"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </>
  );
};

export default AcademicInformationPage;
