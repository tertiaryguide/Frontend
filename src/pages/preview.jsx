// import axios from "axios";
// import React, { useEffect, useState, useMemo } from "react";
// import { getCookie } from "../../lib/utils";
// import { useAuth } from "../contexts/AuthContext";
// import EditablePersonalInformation from "../components/editable-personal-information";
// import EditableAcademicHistory from "../components/editable-academic-history";
// import EditableGuardianInformation from "../components/editable-guardian-information";

// const checkIncompleteFields = (data) => {
//   const incompleteFields = [];

//   if (
//     !data?.personalInfo ||
//     Object.values(data.personalInfo).some((value) => !value)
//   ) {
//     incompleteFields.push({
//       section: "Personal Information",
//       link: "/personal-info",
//     });
//   }

//   if (
//     !data?.academicHistory ||
//     Object.values(data.academicHistory).some((value) => !value) ||
//     !data.academicHistory.results?.length
//   ) {
//     incompleteFields.push({
//       section: "Academic History",
//       link: "/academic-info",
//     });
//   }

//   if (!data?.guardianInfo || data.guardianInfo.length === 0) {
//     incompleteFields.push({
//       section: "Guardian Information",
//       link: "/guardian-info",
//     });
//   }

//   if (!data?.documents || Object.keys(data.documents).length === 0) {
//     incompleteFields.push({ section: "Documents", link: "/upload-documents" });
//   }

//   return incompleteFields;
// };

// const Preview = () => {
//   const [data, setData] = useState(null);
//   const [incompleteFields, setIncompleteFields] = useState([]);
//   const { logout } = useAuth();

//   // Memoize userID and token to prevent infinite re-renders
//   const userID = useMemo(() => getCookie("userId"), []);
//   const token = useMemo(() => getCookie("token"), []);

//   useEffect(() => {
//     if (!userID || !token) return;
//     console.log(userID, token)
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://tg-backend-snex.onrender.com/api/applicant/${userID}/fetch-data`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (response.data.applicant) {
//           setData((prev) =>
//             JSON.stringify(prev) !== JSON.stringify(response.data.applicant)
//               ? response.data.applicant
//               : prev
//           );
//           setIncompleteFields((prev) =>
//             JSON.stringify(prev) !==
//             JSON.stringify(checkIncompleteFields(response.data.applicant))
//               ? checkIncompleteFields(response.data.applicant)
//               : prev
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [userID, token]);

//   const updatePersonalInfo = async (updatedInfo) => {
//     try {
//       const response = await axios.put(
//         `https://tg-backend-snex.onrender.com/api/applicant/${userID}/update-personal-info`,
//         { personalInfo: updatedInfo },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.personalInfo) {
//         setData((prev) => ({
//           ...prev,
//           personalInfo: response.data.personalInfo,
//         }));
//       }
//     } catch (error) {
//       console.error("Error updating personal info:", error);
//     }
//   };

//   const updateAcademicHistory = async (updatedHistory) => {
//     try {
//       const response = await axios.put(
//         `https://tg-backend-snex.onrender.com/api/applicant/${userID}/update-academic-history`,
//         { academicHistory: updatedHistory },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.academicHistory) {
//         setData((prev) => ({
//           ...prev,
//           academicHistory: response.data.academicHistory,
//         }));
//       }
//     } catch (error) {
//       console.error("Error updating academic history:", error);
//     }
//   };

//   const updateGuardianInfo = async (updatedGuardiannfo) => {
//     try {
//       const response = await axios.put(
//         `https://tg-backend-snex.onrender.com/api/applicant/${userID}/update-academic-history`,
//         { caretaker: updatedGuardiannfo },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.academicHistory) {
//         setData((prev) => ({
//           ...prev,
//           academicHistory: response.data.academicHistory,
//         }));
//       }
//     } catch (error) {
//       console.error("Error updating academic history:", error);
//     }
//   };

//   return (
//     <div className="w-4/5 mx-auto">
//       <header className="h-16 flex items-center justify-between">
//         <h1>Preview</h1>
//         <button onClick={logout} className="bg-blue-500 p-3 rounded-sm text-white">Log Out</button>
//       </header>

//       {data ? (
//         <>
//           {data.personalInfo && (
//             <EditablePersonalInformation
//               data={data.personalInfo}
//               updateData={updatePersonalInfo}
//               email={data.email}
//             />
//           )}
//           {data.academicHistory && (
//             <EditableAcademicHistory
//               data={data.academicHistory}
//               updateData={updateAcademicHistory}
//             />
//           )}
//           {data.academicHistory && (
//             <EditableGuardianInformation
//               data={data.guardianInfo}
//               updateData={updateGuardianInfo}
//             />
//           )}
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}

//       {incompleteFields.length > 0 ? (
//         <>
//           <h3 className="mt-4">Incomplete Sections</h3>
//           <ul className="list-disc list-inside">
//             {incompleteFields.map((field, index) => (
//               <li key={index}>
//                 <span>{field.section}</span>
//                 <a href={field.link} className="text-red--500 ml-2 underline">
//                   Complete Now
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </>
//       ) : (
//         <p>All sections are complete!</p>
//       )}
//     </div>
//   );
// };

// export default Preview;

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { getCookie } from "../../lib/utils";
import { useAuth } from "../contexts/AuthContext";

const Preview = () => {
  const [data, setData] = useState(null);
  const [incompleteFields, setIncompleteFields] = useState([]);
  const [activeTab, setActiveTab] = useState("preview");
  const { logout } = useAuth();

  // Memoize userID and token to prevent infinite re-renders
  const userID = useMemo(() => getCookie("userId"), []);
  const token = useMemo(() => getCookie("token"), []);

  useEffect(() => {
    if (!userID || !token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://tg-backend-snex.onrender.com/api/applicant/${userID}/fetch-data`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.applicant) {
          setData((prev) =>
            JSON.stringify(prev) !== JSON.stringify(response.data.applicant)
              ? response.data.applicant
              : prev
          );
          setIncompleteFields((prev) =>
            JSON.stringify(prev) !==
            JSON.stringify(checkIncompleteFields(response.data.applicant))
              ? checkIncompleteFields(response.data.applicant)
              : prev
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userID, token]);

  const updatePersonalInfo = async (updatedInfo) => {
    try {
      const response = await axios.put(
        `https://tg-backend-snex.onrender.com/api/applicant/${userID}/update-personal-info`,
        { personalInfo: updatedInfo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.personalInfo) {
        setData((prev) => ({
          ...prev,
          personalInfo: response.data.personalInfo,
        }));
      }
    } catch (error) {
      console.error("Error updating personal info:", error);
    }
  };

  // Display data table row
  const DataRow = ({ label, value }) => (
    <div className="flex border-b">
      <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">
        {label}
      </div>
      <div className="p-3 w-2/3 text-sm">{value}</div>
    </div>
  );

  // Display subject row
  const SubjectRow = ({ subject, grade }) => (
    <div className="flex border-b">
      <div className="p-3 w-2/3 text-sm border-r">{subject}</div>
      <div className="p-3 w-1/3 text-sm text-center">{grade}</div>
    </div>
  );

  // Display guardian information section
  const GuardianSection = ({
    title,
    name,
    occupation,
    alive,
    nationality,
    address,
    contact,
  }) => (
    <div className="mb-8">
      <h3 className="font-medium text-lg mb-4">{title}</h3>
      <div className="border rounded overflow-hidden">
        <div className="flex border-b">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">{`${title}'s Name`}</div>
          <div className="p-3 w-2/3 text-sm">{name}</div>
        </div>
        <div className="flex border-b">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">
            Occupation
          </div>
          <div className="p-3 w-2/3 text-sm">{occupation}</div>
        </div>
        <div className="flex border-b">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">
            Alive
          </div>
          <div className="p-3 w-2/3 text-sm">{alive}</div>
        </div>
        <div className="flex border-b">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">
            Nationality
          </div>
          <div className="p-3 w-2/3 text-sm">{nationality}</div>
        </div>
        <div className="flex border-b">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">
            Address
          </div>
          <div className="p-3 w-2/3 text-sm">{address}</div>
        </div>
        <div className="flex">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">
            Contact
          </div>
          <div className="p-3 w-2/3 text-sm">{contact}</div>
        </div>
      </div>
    </div>
  );

  // Document card component
  const DocumentCard = ({ title }) => (
    <div className="border rounded p-4 flex items-center gap-3">
      <div className="text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
      </div>
      <span>{title}</span>
    </div>
  );

  // Tab buttons
  const TabButton = ({ name, label, active }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`px-6 py-2 ${
        active ? "bg-blue-500 text-white" : "bg-white text-gray-700"
      }`}
    >
      {label}
    </button>
  );

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-700 text-white px-8 py-4 flex justify-between items-center">
        <div className="font-bold text-xl">LOGO</div>
        <button
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white text-sm"
        >
          Log out
        </button>
      </header>

      {/* Applicant name and info */}
      <div className="bg-slate-600 text-white px-8 py-4">
        <h1 className="text-xl font-medium">
          Preview: {data.personalInfo?.firstName} {data.personalInfo?.lastName}
        </h1>
        <p className="text-sm text-gray-200">
          See all information you provided for this application
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b px-8 bg-white">
        <TabButton
          name="personal"
          label="Personal"
          active={activeTab === "personal"}
        />
        <TabButton
          name="education"
          label="Education"
          active={activeTab === "education"}
        />
        <TabButton
          name="documents"
          label="Documents"
          active={activeTab === "documents"}
        />
        <TabButton
          name="preview"
          label="Preview"
          active={activeTab === "preview"}
        />
      </div>

      {/* Main Content */}
      <div className="px-8 py-6 max-w-4xl mx-auto">
        {/* Profile Photo */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <img
              src="/api/placeholder/150/150"
              alt="Profile"
              className="w-36 h-36 rounded-md object-cover border-4 border-white shadow-md"
            />
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
              onClick={() => console.log("Edit photo")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Documents */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <DocumentCard title="Birth Certificate.pdf" />
          <DocumentCard title="National ID" />
        </div>

        {/* Personal Information */}
        <div className="mb-8">
          <div className="border rounded overflow-hidden">
            <DataRow
              label="Surname"
              value={data.personalInfo?.lastName || "Ayisi"}
            />
            <DataRow
              label="Other Names"
              value={data.personalInfo?.firstName || "Solomon Annan"}
            />
            <DataRow
              label="Date of Birth"
              value={data.personalInfo?.dob || "08/03/2000"}
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="border rounded overflow-hidden">
            <DataRow
              label="Nationality"
              value={data.personalInfo?.nationality || "Ayisi"}
            />
            <DataRow
              label="Residential Address"
              value={
                data.personalInfo?.address ||
                "Albaji Building No. 3\nLakeside, Adenta\nAccra, Ghana"
              }
            />
            <DataRow
              label="Digital Address"
              value={data.personalInfo?.digitalAddress || "GR-123-6776"}
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="border rounded overflow-hidden">
            <DataRow
              label="Email Address"
              value={data.email || "solomonaaa@gmail.com"}
            />
            <DataRow
              label="Telephone Number"
              value={data.personalInfo?.phone || "0555533444"}
            />
          </div>
        </div>

        {/* Academic Information */}
        <div className="mb-8">
          <div className="border rounded overflow-hidden">
            <DataRow
              label="School"
              value={data.academicHistory?.schoolName || "Mfantsipim School"}
            />
            <DataRow
              label="Course"
              value={data.academicHistory?.course || "General Arts"}
            />
            <DataRow
              label="Batch Year"
              value={data.academicHistory?.graduationYear || "2024/25"}
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="border rounded overflow-hidden">
            <DataRow
              label="Examination Type"
              value={data.academicHistory?.examType || "WASSCE"}
            />
            <DataRow
              label="Index Number"
              value={data.academicHistory?.indexNumber || "210787362"}
            />
          </div>
        </div>

        {/* Academic Results */}
        <div className="mb-8">
          <h3 className="font-medium text-lg mb-4">Examination Results</h3>
          <div className="border rounded overflow-hidden">
            <div className="flex border-b bg-blue-50">
              <div className="p-3 w-2/3 font-medium text-sm text-gray-700 border-r">
                Subject
              </div>
              <div className="p-3 w-1/3 font-medium text-sm text-center text-gray-700">
                Aggregate
              </div>
            </div>
            <SubjectRow subject="Core Mathematics" grade="A1" />
            <SubjectRow subject="English Language" grade="B2" />
            <SubjectRow subject="Integrated Science" grade="B2" />
            <SubjectRow subject="Social Studies" grade="A1" />
            <SubjectRow subject="History" grade="A1" />
            <SubjectRow subject="Government" grade="B2" />
            <SubjectRow subject="Literature" grade="B3" />
            <SubjectRow subject="Economics" grade="A1" />
          </div>
        </div>

        {/* Guardian Information */}
        <GuardianSection
          title="Mother"
          name="Ama Ama Amama"
          occupation="Nurse"
          alive="Yes"
          nationality="Ghana"
          address="Koforidua"
          contact="0244567383"
        />

        <GuardianSection
          title="Father"
          name="Kwaku Kwaws"
          occupation="Policeman"
          alive="Yes"
          nationality="Ghana"
          address="Koforidua"
          contact="0244567383"
        />

        {/* Incomplete Fields Warning */}
        {incompleteFields.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded p-4 mb-8">
            <h3 className="font-medium text-red-800 mb-2">
              Incomplete Sections
            </h3>
            <ul className="list-disc list-inside text-red-700">
              {incompleteFields.map((field, index) => (
                <li key={index} className="mb-1">
                  <span>{field.section}</span>
                  <a href={field.link} className="text-blue-600 ml-2 underline">
                    Complete Now
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to check incomplete fields
const checkIncompleteFields = (data) => {
  const incompleteFields = [];

  if (
    !data?.personalInfo ||
    Object.values(data.personalInfo).some((value) => !value)
  ) {
    incompleteFields.push({
      section: "Personal Information",
      link: "/personal-info",
    });
  }

  if (
    !data?.academicHistory ||
    Object.values(data.academicHistory).some((value) => !value) ||
    !data.academicHistory.results?.length
  ) {
    incompleteFields.push({
      section: "Academic History",
      link: "/academic-info",
    });
  }

  if (!data?.guardianInfo || data.guardianInfo.length === 0) {
    incompleteFields.push({
      section: "Guardian Information",
      link: "/guardian-info",
    });
  }

  if (!data?.documents || Object.keys(data.documents).length === 0) {
    incompleteFields.push({ section: "Documents", link: "/upload-documents" });
  }

  return incompleteFields;
};

export default Preview;
