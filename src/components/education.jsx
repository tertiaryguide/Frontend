import React, { useState } from "react";
import "./css/einfor.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "./page-header";

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
          applicantId: "",
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
      <PageHeader />
      <div className="Gform">
        <div className="text">
          <h2>Educational Information</h2>
          <h6>This data is automatically sent to the school you applied to.</h6>
        </div>
        <form className="form-container">
          <div className="lform">
            <label htmlFor="school">School</label>
            <input
              className="input1"
              type="text"
              id="school"
              name="school"
              value={values.school}
              onChange={(e) => setValues({ ...values, school: e.target.value })}
            />
          </div>
          <div className="lform">
            <label htmlFor="course">Course of Study</label>
            <input
              className="input66"
              type="text"
              id="course"
              name="course"
              value={values.course}
              onChange={(e) => setValues({ ...values, course: e.target.value })}
            />
          </div>
          <div className="lform">
            <label htmlFor="year">Batch</label>
            <input
              className="input66"
              type="text"
              id="year"
              name="year"
              value={values.year}
              onChange={(e) => setValues({ ...values, year: e.target.value })}
            />
          </div>
        </form>
        <form className="form-container">
          <div className="lform">
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
          <div className="lform">
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
        </form>
        <div>
          <h3>Subjects and Grades</h3>
          {values.results.map((result, index) => (
            <div className="subject-grade-row" key={index}>
              <input
                className="input4"
                type="text"
                placeholder="Subject"
                value={result.subject}
                onChange={(e) => handleChange(index, "subject", e.target.value)}
              />
              <input
                className="input5"
                type="text"
                placeholder="Grade"
                value={result.grade}
                onChange={(e) => handleChange(index, "grade", e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="button-container">
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

// import React, { useState } from "react";
// import "./css/einfor.css";
// import { useNavigate } from "react-router-dom";

// const initial = {
//   indexNumber: "",
//   school: "",
//   year: "",
//   course: "",
//   examsType: "",
//   results: [{ subject: "", score: "" }],
// };
// const EducationalBackround = () => {
//   const navigate = useNavigate();
//   const [values, setValues] = useState(initial);
//   const handleClick = async () => {
//     try {
//       setIsLoading(true);
//       await axios.post(
//         "http://localhost:8000/api/applicants/academic-history",
//         {
//           applicantId: "",
//           backgroundData: values,
//         }
//       );
//       navigate("/backgroundInfor");
//     } catch (error) {
//       console.error("Error saving background data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleBackButton = () => {
//     navigate(-1);
//   };
//   return (
//     <>
//       <div className="gen">
//         <h1> Generic Form</h1>
//         <h6 className="headd6">Save Your Data to Minimize Repitition</h6>
//       </div>
//       <div className="Gform">
//         <div className="text">
//           <h2>Educational Information</h2>
//           <h6>This data is automatically sent to the school you applied to.</h6>
//         </div>
//         <form className="form-container">
//           <div className="lform">
//             <label htmlFor="">School</label>
//             <input className="input1" type="text" id="School" name="School" />
//           </div>
//           <div className="lform">
//             <label htmlFor="">Course of Study</label>
//             <input className="input66" type="text" id="course" name="course" />
//           </div>
//           <div className="lform">
//             <label htmlFor="">Batch</label>
//             <input className="input66" type="text" id="Batch" name="Batch" />
//           </div>
//           <br />
//         </form>
//         <div className="type-container">
//           <div>
//             <label htmlFor="">Examination Type</label>
//             <br />
//             <input className="input6" type="text" id="School" name="School" />
//           </div>
//           <div>
//             <label htmlFor="">Index Number</label>
//             <br />
//             <input className="input7" type="text" id="Program" name="Prgram" />
//           </div>
//         </div>

//         <form className="form-container">
//           <div className="lform">
//             <label htmlFor="">Subject</label>
//             <input className="input4" type="text" id="subject1" name="subject" />
//             <input className="input4" type="text" id="subject2" name="subject" />
//             <input className="input4" type="text" id="subject3" name="subject" />
//             <input className="input4" type="text" id="subject4" name="subject" />
//             <input className="input4" type="text" id="subject5" name="subject" />
//             <input className="input4" type="text" id="subject6" name="subject" />
//             <input className="input4" type="text" id="subject7" name="subject" />
//             <input className="input4" type="text" id="subject8" name="subject" />
//             <input className="input4" type="text" id="subject9" name="subject" />
//             <input className="input4" type="text" id="subject10" name="subject" />
//           </div>
//           <div className="lform">
//             <label htmlFor="">Grade</label>
//             <input className="input5" type="text" id="grade1" name="grade" />
//             <input className="input5" type="text" id="grade2" name="grade" />
//             <input className="input5" type="text" id="grade3" name="grade" />
//             <input className="input5" type="text" id="grade4" name="grade" />
//             <input className="input5" type="text" id="grade5" name="grade" />
//             <input className="input5" type="text" id="grade6" name="grade" />
//             <input className="input5" type="text" id="grade7" name="grade" />
//             <input className="input5" type="text" id="grade8" name="grade" />
//             <input className="input5" type="text" id="grade9" name="grade" />
//             <input className="input5" type="text" id="grade10" name="grade" />
//           </div>
//         </form>
//       </div>
//       <div>
//         <div className="Gform">
//           <div className="text">
//             <h2>Academic Aspiration</h2>
//             <h6>
//               This data is automatically sent to the school you applied to.
//             </h6>
//           </div>
//           <div className="f-container">
//             <form className="form-container">
//               <div className="lform">
//                 <label htmlFor="">Programme of interest</label>
//                 <input
//                   className="input4"
//                   type="text"
//                   id="School"
//                   name="School"
//                 />
//                 <input
//                   className="input4"
//                   type="text"
//                   id="School"
//                   name="School"
//                 />
//                 <input
//                   className="input4"
//                   type="text"
//                   id="School"
//                   name="School"
//                 />
//                 <input
//                   className="input4"
//                   type="text"
//                   id="School"
//                   name="School"
//                 />
//               </div>
//               <div className="lform">
//                 <label htmlFor="">Priority</label>
//                 <input
//                   className="input5"
//                   type="text"
//                   id="Program"
//                   name="Prgram"
//                 />
//                 <input
//                   className="input5"
//                   type="text"
//                   id="Program"
//                   name="Prgram"
//                 />
//                 <input
//                   className="input5"
//                   type="text"
//                   id="Program"
//                   name="Prgram"
//                 />
//                 <input
//                   className="input5"
//                   type="text"
//                   id="Program"
//                   name="Prgram"
//                 />
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <div className="button-container">
//         <button className="go-back-button" onClick={handleBackButton}>
//           Go Back
//         </button>
//         <button className="save-exit-button" onClick={handleClick}>
//           Save & Continue
//         </button>
//       </div>
//     </>
//   );
// };

// export default EducationalBackround;
