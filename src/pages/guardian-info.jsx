// import React, { useState, useEffect } from "react";
// import "../css/supporting.css";
// import { useNavigate } from "react-router-dom";
// import MultipleFileUpload from "./upload-document";
// import CongratulatoryPopUp from "../components/congratulatory-popup";
// import axios from "axios";
// import { getCookie } from "../../lib/utils";

// const userID = getCookie("userID");
// const initial = {
//   father: {
//     name: "",
//     nationality: "",
//     address: "",
//     occupation: "",
//     contact: "",
//     isAlive: true,
//   },
//   mother: {
//     name: "",
//     nationality: "",
//     address: "",
//     occupation: "",
//     contact: "",
//     isAlive: true,
//   },
// };

// const GuardianInformationPage = () => {
//   const navigate = useNavigate();
//   const [showPop, setShowPop] = useState(false);
//   const [parentData, setParentData] = useState(initial);
//   const [isLoading, setIsLoading] = useState(false);
//   const [userID, setUserID] = useState(null);
//   const [token, setToken] = useState(null);
//   // Get userID and token after component mounts
//   useEffect(() => {
//     const storedUserID = getCookie("userId");
//     const storedToken = getCookie("token");
//     setUserID(storedUserID);
//     setToken(storedToken);
//   }, []);
//   const handleInputChange = (e, parent) => {
//     const { name, value } = e.target;
//     setParentData((prev) => ({
//       ...prev,
//       [parent]: {
//         ...prev[parent],
//         [name]: value,
//       },
//     }));
//   };

//   const handleCheckboxChange = (e, parent) => {
//     setParentData((prev) => ({
//       ...prev,
//       [parent]: {
//         ...prev[parent],
//         isAlive: !e.target.checked, // Checkbox unchecked = alive
//       },
//     }));
//   };

//   const handleSaveAndExit = async () => {
//     try {
//       setIsLoading(true);
//       await axios.post(
//         `https://tg-backend-snex.onrender.com/api/applicant/caretaker-data`,
//         {
//           applicantId: userID,
//           caretakerData: parentData,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setShowPop(true);
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
//       <div className="Gform">
//         <div className="text">
//           <h2>Guardian(s) Data</h2>
//           <h6>This data is automatically sent to the school you applied to.</h6>
//         </div>
//         {/* Father's Information */}
//         <div className="borders">
//           <form className="form-container">
//             <div className="lform">
//               <label htmlFor="fatherName">Father's Name</label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="name"
//                 value={parentData.father.name}
//                 onChange={(e) => handleInputChange(e, "father")}
//               />
//               <label htmlFor="fatherNationality">Nationality</label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="nationality"
//                 value={parentData.father.nationality}
//                 onChange={(e) => handleInputChange(e, "father")}
//               />
//             </div>
//             <div className="lform">
//               <label htmlFor="fatherOccupation">Occupation</label>
//               <input
//                 className="input22"
//                 type="text"
//                 name="occupation"
//                 value={parentData.father.occupation}
//                 onChange={(e) => handleInputChange(e, "father")}
//               />
//               <label htmlFor="fatherContact">Email/Contact</label>
//               <input
//                 className="input22"
//                 type="text"
//                 name="contact"
//                 value={parentData.father.contact}
//                 onChange={(e) => handleInputChange(e, "father")}
//               />
//             </div>
//           </form>
//           <div className="tick">
//             <input
//               type="checkbox"
//               checked={!parentData.father.isAlive}
//               onChange={(e) => handleCheckboxChange(e, "father")}
//             />{" "}
//             Tick if Deceased
//           </div>
//         </div>

//         <div className="borders">
//           <form className="form-container">
//             <div className="division">
//               <label htmlFor="">Mother's Name</label>
//               <input className="input1" type="text" id="School" name="School" />
//               <label htmlFor="">Nationality</label>
//               <input className="input1" type="text" id="School" name="School" />
//             </div>
//             <div className="division">
//               <label htmlFor="">Occupation</label>
//               <input
//                 className="input22"
//                 type="text"
//                 id="Program"
//                 name="Prgram"
//               />
//               <label htmlFor="">Email/Contact</label>
//               <input
//                 className="input22"
//                 type="text"
//                 id="Program"
//                 name="Prgram"
//               />
//             </div>
//           </form>
//           <div className="tick">
//             <input type="checkbox" /> Tick if Deceased
//           </div>
//         </div>
//         {/* Mother's Information */}
//         <div className="borders">
//           <form className="form-container">
//             <div className="lform">
//               <label htmlFor="motherName">Mother's Name</label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="name"
//                 value={parentData.mother.name}
//                 onChange={(e) => handleInputChange(e, "mother")}
//               />
//               <label htmlFor="motherNationality">Nationality</label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="nationality"
//                 value={parentData.mother.nationality}
//                 onChange={(e) => handleInputChange(e, "mother")}
//               />
//             </div>
//             <div className="lform">
//               <label htmlFor="motherOccupation">Occupation</label>
//               <input
//                 className="input22"
//                 type="text"
//                 name="occupation"
//                 value={parentData.mother.occupation}
//                 onChange={(e) => handleInputChange(e, "mother")}
//               />
//               <label htmlFor="motherContact">Email/Contact</label>
//               <input
//                 className="input22"
//                 type="text"
//                 name="contact"
//                 value={parentData.mother.contact}
//                 onChange={(e) => handleInputChange(e, "mother")}
//               />
//             </div>
//           </form>
//           <div className="tick">
//             <input
//               type="checkbox"
//               checked={!parentData.mother.isAlive}
//               onChange={(e) => handleCheckboxChange(e, "mother")}
//             />{" "}
//             Tick if Deceased
//           </div>
//         </div>
//       </div>
//       <div className="button-container">
//         <button className="go-back-button" onClick={handleBackButton}>
//           Go Back
//         </button>
//         <button
//           className="save-exit-button"
//           onClick={handleSaveAndExit}
//           disabled={isLoading}
//         >
//           {isLoading ? "Saving..." : "Save & Exit"}
//         </button>
//       </div>
//       {showPop && <CongratulatoryPopUp />}
//     </>
//   );
// };

// export default GuardianInformationPage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../lib/utils";
import CongratulatoryPopUp from "../components/congratulatory-popup";

const GuardianInformationPage = () => {
  const navigate = useNavigate();
  const [showPop, setShowPop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
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
  
  const [parentData, setParentData] = useState(initial);
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
      console.error("Error saving guardian data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackButton = () => {
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-700">Generic Form</h1>
          <p className="mt-2 text-gray-600">Save Your Data To Minimize Repetitions</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Guardian(s) Data</h2>
            <p className="text-gray-600 mt-1">This data is automatically sent to the school you applied to.</p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Father's Information */}
              <div className="mb-6 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Father's Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-1">
                      Father's Name
                    </label>
                    <input
                      type="text"
                      id="fatherName"
                      name="name"
                      value={parentData.father.name}
                      onChange={(e) => handleInputChange(e, "father")}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="fatherNationality" className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality
                    </label>
                    <input
                      type="text"
                      id="fatherNationality"
                      name="nationality"
                      value={parentData.father.nationality}
                      onChange={(e) => handleInputChange(e, "father")}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="fatherOccupation" className="block text-sm font-medium text-gray-700 mb-1">
                      Occupation
                    </label>
                    <input
                      type="text"
                      id="fatherOccupation"
                      name="occupation"
                      value={parentData.father.occupation}
                      onChange={(e) => handleInputChange(e, "father")}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="fatherContact" className="block text-sm font-medium text-gray-700 mb-1">
                      Email/Contact
                    </label>
                    <input
                      type="text"
                      id="fatherContact"
                      name="contact"
                      value={parentData.father.contact}
                      onChange={(e) => handleInputChange(e, "father")}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="fatherAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="fatherAddress"
                      name="address"
                      value={parentData.father.address}
                      onChange={(e) => handleInputChange(e, "father")}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    id="fatherDeceased"
                    checked={!parentData.father.isAlive}
                    onChange={(e) => handleCheckboxChange(e, "father")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="fatherDeceased" className="ml-2 text-sm text-gray-700">
                    Tick if Deceased
                  </label>
                </div>
              </div>
              
              {/* Mother's Information */}
              <div className="mb-6 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Mother's Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="motherName" className="block text-sm font-medium text-gray-700 mb-1">
                      Mother's Name
                    </label>
                    <input
                      type="text"
                      id="motherName"
                      name="name"
                      value={parentData.mother.name}
                      onChange={(e) => handleInputChange(e, "mother")}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="motherNationality" className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality
                    </label>
                    <input
                      type="text"
                      id="motherNationality"
                      name="nationality"
                      value={parentData.mother.nationality}
                      onChange={(e) => handleInputChange(e, "mother")}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="motherOccupation" className="block text-sm font-medium text-gray-700 mb-1">
                      Occupation
                    </label>
                    <input
                      type="text"
                      id="motherOccupation"
                      name="occupation"
                      value={parentData.mother.occupation}
                      onChange={(e) => handleInputChange(e, "mother")}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="motherContact" className="block text-sm font-medium text-gray-700 mb-1">
                      Email/Contact
                    </label>
                    <input
                      type="text"
                      id="motherContact"
                      name="contact"
                      value={parentData.mother.contact}
                      onChange={(e) => handleInputChange(e, "mother")}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="motherAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="motherAddress"
                      name="address"
                      value={parentData.mother.address}
                      onChange={(e) => handleInputChange(e, "mother")}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    id="motherDeceased"
                    checked={!parentData.mother.isAlive}
                    onChange={(e) => handleCheckboxChange(e, "mother")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="motherDeceased" className="ml-2 text-sm text-gray-700">
                    Tick if Deceased
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handleBackButton}
                  className="py-2 px-6 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Go Back
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndExit}
                  disabled={isLoading}
                  className="py-2 px-6 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isLoading ? "Saving..." : "Save & Exit"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {showPop && <CongratulatoryPopUp />}
    </div>
  );
};

export default GuardianInformationPage;