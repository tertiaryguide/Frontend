import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { getCookie } from "../../lib/utils";
import { useAuth } from "../contexts/AuthContext";
import EditablePersonalInformation from "../components/editable-personal-information";
import EditableAcademicHistory from "../components/editable-academic-history";
import EditableGuardianInformation from "../components/editable-guardian-information";

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

const Preview = () => {
  const [data, setData] = useState(null);
  const [incompleteFields, setIncompleteFields] = useState([]);
  const { logout } = useAuth();

  // Memoize userID and token to prevent infinite re-renders
  const userID = useMemo(() => getCookie("userId"), []);
  const token = useMemo(() => getCookie("token"), []);

  useEffect(() => {
    if (!userID || !token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/applicant/${userID}/fetch-data`,
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
        `http://localhost:8000/api/applicant/${userID}/update-personal-info`,
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

  const updateAcademicHistory = async (updatedHistory) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/applicant/${userID}/update-academic-history`,
        { academicHistory: updatedHistory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.academicHistory) {
        setData((prev) => ({
          ...prev,
          academicHistory: response.data.academicHistory,
        }));
      }
    } catch (error) {
      console.error("Error updating academic history:", error);
    }
  };

  const updateGuardianInfo = async (updatedGuardiannfo) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/applicant/${userID}/update-academic-history`,
        { caretaker: updatedGuardiannfo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.academicHistory) {
        setData((prev) => ({
          ...prev,
          academicHistory: response.data.academicHistory,
        }));
      }
    } catch (error) {
      console.error("Error updating academic history:", error);
    }
  };

  return (
    <div className="w-4/5 mx-auto">
      <header className="h-16 flex items-center justify-between">
        <h1>Preview</h1>
        <button onClick={logout} className="bg-blue-500 p-3 rounded-sm text-white">Log Out</button>
      </header>

      {data ? (
        <>
          {data.personalInfo && (
            <EditablePersonalInformation
              data={data.personalInfo}
              updateData={updatePersonalInfo}
            />
          )}
          {data.academicHistory && (
            <EditableAcademicHistory
              data={data.academicHistory}
              updateData={updateAcademicHistory}
            />
          )}
          {data.academicHistory && (
            <EditableGuardianInformation
              data={data.guardianInfo}
              updateData={updateGuardianInfo}
            />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}

      {incompleteFields.length > 0 ? (
        <>
          <h3 className="mt-4">Incomplete Sections</h3>
          <ul className="list-disc list-inside">
            {incompleteFields.map((field, index) => (
              <li key={index}>
                <span>{field.section}</span>
                <a href={field.link} className="text-red--500 ml-2 underline">
                  Complete Now
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>All sections are complete!</p>
      )}
    </div>
  );
};

export default Preview;
