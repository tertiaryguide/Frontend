import axios from "axios";
import React, { useEffect, useState } from "react";
import { getCookie } from "../../lib/utils";
import { useAuth } from "../contexts/AuthContext";
const checkIncompleteFields = (data) => {
  const incompleteFields = [];

  if (
    !data?.backgroundData?.surname || 
    !data?.backgroundData?.otherNames || 
    !data?.backgroundData?.dateOfBirth
  ) {
    incompleteFields.push({ section: "Personal Information", link: "/complete-personal-info" });
  }

  if (data?.academicHistory?.results?.length === 0) {
    incompleteFields.push({ section: "Academic History", link: "/complete-academic-history" });
  }

  if (data?.academicAspiration?.length === 0) {
    incompleteFields.push({ section: "Academic Aspiration", link: "/complete-academic-aspiration" });
  }

  if (data?.documents?.length === 0) {
    incompleteFields.push({ section: "Documents", link: "/upload-documents" });
  }

  return incompleteFields;
};


const Preview = () => {
  const [data, setData] = useState(null);
  const [incompleteFields, setIncompleteFields] = useState([]);
  const [userID, setUserID] = useState(null);
  const [token, setToken] = useState(null);
  const [editOff, setEditOff] = useState(true); // Toggle for editing
  const { logout } = useAuth();

  // Get userID and token after component mounts
  useEffect(() => {
    const storedUserID = getCookie("userId");
    const storedToken = getCookie("token");
    setUserID(storedUserID);
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userID && token) { 
        try {
          const response = await axios.get(
            `http://localhost:8000/api/applicant/${userID}/fetch-data`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setData(response.data.applicant);
          setIncompleteFields(checkIncompleteFields(response.data.applicant));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [userID, token]);

  const handleChange = (e, field) => {
    setData(prev => ({
      ...prev,
      backgroundData: {
        ...prev.backgroundData,
        [field]: e.target.value
      }
    }));
  };

  return (
    <div className="w-4/5 mx-auto">
      <header className="h-16 flex items-center justify-between">
        <h1>Preview</h1>
        <button onClick={async () => await logout()}>Log Out</button>
      </header>
      <section className="border p-4 rounded-md ">
        <h2>Personal Information</h2>
        {data && (
          <div className="space-y-4">
            <div>
              <label>Email</label>
              <input value={data?.email} disabled className="border p-2 rounded-md w-full"/>
            </div>
            <div>
              <label>Surname</label>
              <input 
                value={data?.backgroundData?.surname || ""}
                onChange={(e) => handleChange(e, "surname")}
                disabled={editOff}
                className="border p-2 rounded-md w-full"
              />
            </div>
            <div>
              <label>Other Names</label>
              <input 
                value={data?.backgroundData?.otherNames || ""}
                onChange={(e) => handleChange(e, "otherNames")}
                disabled={editOff}
                className="border p-2 rounded-md w-full"
              />
            </div>
            <div>
              <label>Date of Birth</label>
              <input 
                value={data?.backgroundData?.dateOfBirth || ""}
                onChange={(e) => handleChange(e, "dateOfBirth")}
                disabled={editOff}
                className="border p-2 rounded-md w-full"
              />
            </div>
          </div>
        )}

        <h3 className="mt-4">Incomplete Sections</h3>
        {incompleteFields.length > 0 ? (
          <>
          <ul>
            {incompleteFields.map((field, index) => (
              <li key={index}>
                <span>{field.section}</span>
                <a href={field.link} className="text-blue-500 ml-2 underline">Complete Now</a>
              </li>
            ))}
          </ul>
          </>
        ) : (
          <p>All sections are complete!</p>
        )}

        <button 
          onClick={() => setEditOff(!editOff)} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {editOff ? "Edit" : "Save"}
        </button>
      </section>
    </div>
  );
};


export default Preview;
