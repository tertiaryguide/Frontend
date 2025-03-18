// import React, { useState, useEffect } from "react";
// import "../css/einfor.css";
// import { useNavigate } from "react-router-dom";
// import { getCookie } from "../../lib/utils";
// import axios from "axios";

// const initial = {
//   history: {
//     indexNumber: "",
//     school: "",
//     year: "",
//     course: "",
//     examsType: "",
//     results: [
//       { subject: "Core Mathematics", grade: "" },
//       { subject: "English Language", grade: "" },
//       { subject: "Integrated Science", grade: "" },
//       { subject: "Social Studies", grade: "" },
//       { subject: "", grade: "" },
//       { subject: "", grade: "" },
//       { subject: "", grade: "" },
//       { subject: "", grade: "" },
//     ],
//   },
//   aspiration: ["", "", "", ""],
// };

// const AcademicInformationPage = () => {
//   const navigate = useNavigate();
//   const [values, setValues] = useState(initial);
//   const [isLoading, setIsLoading] = useState(false);
//   const [userID, setUserID] = useState(null);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const storedUserID = getCookie("userId");
//     const storedToken = getCookie("token");
//     setUserID(storedUserID);
//     setToken(storedToken);
//   }, []);

//   const handleGradeChange = (index, value) => {
//     const updatedResults = [...values.history.results];
//     updatedResults[index].grade = value;
//     setValues({
//       ...values,
//       history: { ...values.history, results: updatedResults },
//     });
//   };

//   const handleSubjectChange = (index, value) => {
//     const updatedResults = [...values.history.results];
//     updatedResults[index].subject = value;
//     setValues({
//       ...values,
//       history: { ...values.history, results: updatedResults },
//     });
//   };

//   const handleAspirationChange = (index, value) => {
//     const updatedAspiration = [...values.aspiration];
//     updatedAspiration[index] = value;
//     setValues({ ...values, aspiration: updatedAspiration });
//   };

//   const handleClick = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         "https://tg-backend-snex.onrender.com/api/applicant/academics",
//         {
//           applicantId: userID,
//           academicHistory: values.history,
//           academicAspiration: values.aspiration,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (response.data) navigate("/preview");
//     } catch (error) {
//       console.error("Error saving background data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="Gform">
//         <div className="text">
//           <h2>Academic History</h2>
//         </div>
//         <form className="form-container">
//           <div className="division">
//             <label htmlFor="school">School</label>
//             <input
//               type="text"
//               id="school"
//               value={values.history.school}
//               onChange={(e) =>
//                 setValues({
//                   ...values,
//                   history: { ...values.history, school: e.target.value },
//                 })
//               }
//             />
//           </div>
//           <div className="division">
//             <label htmlFor="course">Course of Study</label>
//             <input
//               type="text"
//               id="course"
//               value={values.history.course}
//               onChange={(e) =>
//                 setValues({
//                   ...values,
//                   history: { ...values.history, course: e.target.value },
//                 })
//               }
//             />
//           </div>
//           <div className="division">
//             <label htmlFor="year">Year</label>
//             <input
//               type="text"
//               id="year"
//               value={values.history.year}
//               onChange={(e) =>
//                 setValues({
//                   ...values,
//                   history: { ...values.history, year: e.target.value },
//                 })
//               }
//             />
//           </div>
//         </form>
//         <div className="type-container">
//           <div className="division">
//             <label htmlFor="examsType">Examination Type</label>
//             <input
//               type="text"
//               id="examsType"
//               value={values.history.examsType}
//               onChange={(e) =>
//                 setValues({
//                   ...values,
//                   history: { ...values.history, examsType: e.target.value },
//                 })
//               }
//             />
//           </div>
//           <div className="division">
//             <label htmlFor="indexNumber">Index Number</label>
//             <input
//               type="text"
//               id="indexNumber"
//               value={values.history.indexNumber}
//               onChange={(e) =>
//                 setValues({
//                   ...values,
//                   history: { ...values.history, indexNumber: e.target.value },
//                 })
//               }
//             />
//           </div>
//         </div>

//         <div className="f-container">
//           <h3>Subjects and Grades</h3>
//           {values.history.results.map((result, index) => (
//             <div className="subject-grade-row" key={index}>
//               {index >= 4 ? (
//                 <input
//                   type="text"
//                   placeholder="Elective Subject"
//                   value={result.subject}
//                   onChange={(e) => handleSubjectChange(index, e.target.value)}
//                 />
//               ) : (
//                 <span>{result.subject}</span>
//               )}
//               <select
//                 value={result.grade}
//                 onChange={(e) => handleGradeChange(index, e.target.value)}
//               >
//                 <option value="">Select</option>
//                 {["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"].map(
//                   (grade) => (
//                     <option key={grade} value={grade.toLowerCase()}>
//                       {grade}
//                     </option>
//                   )
//                 )}
//               </select>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="Gform">
//         <div className="text">
//           <h2>Academic Aspiration</h2>
//         </div>
//         <div className="f-container">
//           <form className="form-container">
//             {values.aspiration.map((asp, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 placeholder="Programme of interest"
//                 value={asp}
//                 onChange={(e) => handleAspirationChange(index, e.target.value)}
//               />
//             ))}
//           </form>
//         </div>
//       </div>

//       <div className="bg-black">
//         <button className="go-back-button" onClick={() => navigate(-1)}>
//           Go Back
//         </button>
//         <button
//           className="save-exit-button"
//           onClick={handleClick}
//           disabled={isLoading}
//         >
//           {isLoading ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </>
//   );
// };

// export default AcademicInformationPage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../lib/utils";
import axios from "axios";

const EducationalBackgroundForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userID, setUserID] = useState(null);
  const [token, setToken] = useState(null);
  
  const [formData, setFormData] = useState({
    history: {
      school: "",
      course: "",
      year: "", // renamed from "year" to "batch" to match UI
      examsType: "",
      indexNumber: "",
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
  });

  useEffect(() => {
    const storedUserID = getCookie("userId");
    const storedToken = getCookie("token");
    setUserID(storedUserID);
    setToken(storedToken);
  }, []);

  const handleGradeChange = (index, value) => {
    const updatedResults = [...formData.history.results];
    updatedResults[index].grade = value;
    setFormData({
      ...formData,
      history: { ...formData.history, results: updatedResults },
    });
  };

  const handleSubjectChange = (index, value) => {
    const updatedResults = [...formData.history.results];
    updatedResults[index].subject = value;
    setFormData({
      ...formData,
      history: { ...formData.history, results: updatedResults },
    });
  };

  const handleAspirationChange = (index, value) => {
    const updatedAspiration = [...formData.aspiration];
    updatedAspiration[index] = value;
    setFormData({ ...formData, aspiration: updatedAspiration });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://tg-backend-snex.onrender.com/api/applicant/academics",
        {
          applicantId: userID,
          academicHistory: formData.history,
          academicAspiration: formData.aspiration,
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
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">Generic Form</h1>
          <p className="text-sm text-gray-500">Save Your Data To Minimize Repetitions</p>
        </div>
        
        {/* Educational Background Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-medium text-gray-700 mb-2">Educational Background</h2>
          <p className="text-sm text-gray-500 mb-6">This data will be automatically sent to the school you apply to.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md"
                value={formData.history.school}
                onChange={(e) => setFormData({
                  ...formData,
                  history: { ...formData.history, school: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md"
                value={formData.history.course}
                onChange={(e) => setFormData({
                  ...formData,
                  history: { ...formData.history, course: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md"
                value={formData.history.year}
                onChange={(e) => setFormData({
                  ...formData,
                  history: { ...formData.history, year: e.target.value }
                })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Examination Type</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md"
                value={formData.history.examsType}
                onChange={(e) => setFormData({
                  ...formData,
                  history: { ...formData.history, examsType: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Index Number</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md"
                value={formData.history.indexNumber}
                onChange={(e) => setFormData({
                  ...formData,
                  history: { ...formData.history, indexNumber: e.target.value }
                })}
              />
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="font-medium text-gray-700">Subject</div>
              <div className="font-medium text-gray-700">Grade</div>
            </div>
            
            {formData.history.results.map((result, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  {index < 4 ? (
                    <div className="p-2 bg-white border border-gray-200 rounded-md">
                      {result.subject}
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="Elective Subject"
                      className="w-full p-2 bg-white border border-gray-200 rounded-md"
                      value={result.subject}
                      onChange={(e) => handleSubjectChange(index, e.target.value)}
                    />
                  )}
                </div>
                <div>
                  <select
                    className="w-full p-2 bg-white border border-gray-200 rounded-md"
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
              </div>
            ))}
          </div>
        </div>
        
        {/* Academic Aspiration Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-medium text-gray-700 mb-2">Academic Aspiration</h2>
          <p className="text-sm text-gray-500 mb-4">Select your programmes of interest</p>
          
          <div className="space-y-3">
            {formData.aspiration.map((aspiration, index) => (
              <input
                key={index}
                type="text"
                placeholder="Programme of interest"
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md"
                value={aspiration}
                onChange={(e) => handleAspirationChange(index, e.target.value)}
              />
            ))}
          </div>
        </div>
        
        {/* Form Controls */}
        <div className="flex justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Go Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationalBackgroundForm;