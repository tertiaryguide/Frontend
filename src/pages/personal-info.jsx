// import React, { useState, useEffect } from "react";
// import "../css/ginfor.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { getCookie } from "../../lib/utils";

// const initial = {
//   surname: "",
//   otherNames: "",
//   dateOfBirth: "", // Ensure date is an empty string
//   nationality: "",
//   placeOfResidence: "",
//   digitalAddress: "",
//   homeAddress: "",
//   contact: "",
// };

// const PersonalInformationPage = () => {
//   const [values, setValues] = useState(initial);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleClick = async () => {
//     const currentUserID = getCookie("userId");
//     const currentToken = getCookie("token");
//     console.log(values)
//     if (!currentUserID || !currentToken) {
//       console.error("Missing user ID or token.");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         "https://tg-backend-snex.onrender.com/api/applicant/background-data",
//         {
//           applicantId: currentUserID,
//           personalInfo: values,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${currentToken}`,
//           },
//         }
//       );

//       if (response.data) {
//         navigate("/preview");
//       }
//     } catch (error) {
//       console.error("Error saving background data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="gForm">
//           <h2>Personal Information</h2>
//           <form className="">
//             {Object.keys(initial).map((key) => (
//               <div key={key}>
//                 <label htmlFor={key}>{key.replace(/([A-Z])/g, " $1").trim()}</label>
//                 <input
//                   type={key === "dateOfBirth" ? "date" : "text"}
//                   id={key}
//                   name={key}
//                   value={values[key]}
//                   onChange={(e) => setValues({ ...values, [key]: e.target.value })}
//                 />
//               </div>
//             ))}
//             <button type="button" className="button" onClick={handleClick}>
//               Save & Continue
//             </button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// export default PersonalInformationPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../lib/utils";

const PersonalInformationPage = () => {
  const initial = {
    surname: "",
    otherNames: "",
    dateOfBirth: "",
    nationality: "",
    city: "", // Changed from placeOfResidence
    digitalAddress: "",
    homeAddress: "",
    email: "", // Added email field
    contact: "",
  };

  const [values, setValues] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    const currentUserID = getCookie("userId");
    const currentToken = getCookie("token");
    console.log(values);
    if (!currentUserID || !currentToken) {
      console.error("Missing user ID or token.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://tg-backend-snex.onrender.com/api/applicant/background-data",
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
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-700">Generic Form</h1>
          <p className="mt-2 text-gray-600">Save Your Data To Minimize Repetitions</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Background Information</h2>
          <p className="text-gray-600 mb-6">This data will be automatically sent to the school you apply to.</p>

          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Surname */}
                <div>
                  <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                    Surname
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={values.surname}
                    onChange={(e) => setValues({ ...values, surname: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Other Names */}
                <div>
                  <label htmlFor="otherNames" className="block text-sm font-medium text-gray-700 mb-1">
                    Other Names
                  </label>
                  <input
                    type="text"
                    id="otherNames"
                    name="otherNames"
                    value={values.otherNames}
                    onChange={(e) => setValues({ ...values, otherNames: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={values.dateOfBirth}
                      onChange={(e) => setValues({ ...values, dateOfBirth: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Nationality */}
                <div>
                  <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
                    Nationality
                  </label>
                  <div className="relative">
                    <select
                      id="nationality"
                      name="nationality"
                      value={values.nationality}
                      onChange={(e) => setValues({ ...values, nationality: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="">Select Nationality</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* City/Town */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City/Town
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={values.city}
                    onChange={(e) => setValues({ ...values, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Digital Address */}
                <div>
                  <label htmlFor="digitalAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Digital Address
                  </label>
                  <input
                    type="text"
                    id="digitalAddress"
                    name="digitalAddress"
                    value={values.digitalAddress}
                    onChange={(e) => setValues({ ...values, digitalAddress: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Home Address */}
                <div className="md:col-span-2">
                  <label htmlFor="homeAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Home Address
                  </label>
                  <input
                    type="text"
                    id="homeAddress"
                    name="homeAddress"
                    value={values.homeAddress}
                    onChange={(e) => setValues({ ...values, homeAddress: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={values.contact}
                    onChange={(e) => setValues({ ...values, contact: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={handleClick}
                  className="py-2 px-6 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save & Continue
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationPage;