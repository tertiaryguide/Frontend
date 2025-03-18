import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { getCookie } from "../../lib/utils";
import { useAuth } from "../contexts/AuthContext";


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

const TestPage = () => {
  const [data, setData] = useState(null);
  const [incompleteFields, setIncompleteFields] = useState([]);
  const [activeTab, setActiveTab] = useState("preview");
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  // Memoize userID and token to prevent infinite re-renders
  const userID = useMemo(() => getCookie("userId"), []);
  const token = useMemo(() => getCookie("token"), []);

  useEffect(() => {
    if (!userID || !token) return;
    
    const fetchData = async () => {
      setLoading(true);
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
          setEditableData((prev) =>
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userID, token]);

  const updatePersonalInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `https://tg-backend-snex.onrender.com/api/applicant/${userID}/update-personal-info`,
        { personalInfo: editableData.personalInfo },
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
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating personal info:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateAcademicInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `https://tg-backend-snex.onrender.com/api/applicant/${userID}/update-academic-info`,
        { academicHistory: editableData.academicHistory },
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
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating academic info:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateGuardianInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `https://tg-backend-snex.onrender.com/api/applicant/${userID}/update-guardian-info`,
        { guardianInfo: editableData.guardianInfo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.guardianInfo) {
        setData((prev) => ({
          ...prev,
          guardianInfo: response.data.guardianInfo,
        }));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating guardian info:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setEditableData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Display an editable data row
  const EditableDataRow = ({ label, section, field, value }) => (
    <div className="flex border-b">
      <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">{label}</div>
      <div className="p-3 w-2/3 text-sm">
        {isEditing ? (
          <input
            type="text"
            value={editableData[section]?.[field] || ""}
            onChange={(e) => handleInputChange(section, field, e.target.value)}
            className="w-full p-1 border rounded"
          />
        ) : (
          value
        )}
      </div>
    </div>
  );

  // Display data table row
  const DataRow = ({ label, value }) => (
    <div className="flex border-b">
      <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">{label}</div>
      <div className="p-3 w-2/3 text-sm">{value}</div>
    </div>
  );

  // Display editable subject row
  const EditableSubjectRow = ({ index, subject, grade }) => (
    <div className="flex border-b">
      <div className="p-3 w-2/3 text-sm border-r">
        {isEditing ? (
          <input
            type="text"
            value={editableData.academicHistory?.results?.[index]?.subject || subject}
            onChange={(e) => {
              const updatedResults = [...(editableData.academicHistory?.results || [])];
              if (!updatedResults[index]) {
                updatedResults[index] = { subject: "", grade: "" };
              }
              updatedResults[index].subject = e.target.value;
              handleInputChange("academicHistory", "results", updatedResults);
            }}
            className="w-full p-1 border rounded"
          />
        ) : (
          subject
        )}
      </div>
      <div className="p-3 w-1/3 text-sm text-center">
        {isEditing ? (
          <input
            type="text"
            value={editableData.academicHistory?.results?.[index]?.grade || grade}
            onChange={(e) => {
              const updatedResults = [...(editableData.academicHistory?.results || [])];
              if (!updatedResults[index]) {
                updatedResults[index] = { subject: "", grade: "" };
              }
              updatedResults[index].grade = e.target.value;
              handleInputChange("academicHistory", "results", updatedResults);
            }}
            className="w-full p-1 border rounded text-center"
          />
        ) : (
          grade
        )}
      </div>
    </div>
  );

  // Display subject row
  const SubjectRow = ({ subject, grade }) => (
    <div className="flex border-b">
      <div className="p-3 w-2/3 text-sm border-r">{subject}</div>
      <div className="p-3 w-1/3 text-sm text-center">{grade}</div>
    </div>
  );

  // Display editable guardian information section
  const EditableGuardianSection = ({ index, title, name, occupation, alive, nationality, address, contact }) => (
    <div className="mb-8">
      <h3 className="font-medium text-lg mb-4">{title}</h3>
      <div className="border rounded overflow-hidden">
        <div className="flex border-b">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">{`${title}'s Name`}</div>
          <div className="p-3 w-2/3 text-sm">
            {isEditing ? (
              <input
                type="text"
                value={editableData.guardianInfo?.[index]?.name || name}
                onChange={(e) => {
                  const updatedGuardians = [...(editableData.guardianInfo || [])];
                  if (!updatedGuardians[index]) {
                    updatedGuardians[index] = { 
                      type: title.toLowerCase(), 
                      name: "", 
                      occupation: "",
                      alive: "",
                      nationality: "",
                      address: "",
                      contact: ""
                    };
                  }
                  updatedGuardians[index].name = e.target.value;
                  handleInputChange("guardianInfo", "", updatedGuardians);
                }}
                className="w-full p-1 border rounded"
              />
            ) : (
              name
            )}
          </div>
        </div>
        <div className="flex border-b">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">Occupation</div>
          <div className="p-3 w-2/3 text-sm">
            {isEditing ? (
              <input
                type="text"
                value={editableData.guardianInfo?.[index]?.occupation || occupation}
                onChange={(e) => {
                  const updatedGuardians = [...(editableData.guardianInfo || [])];
                  if (!updatedGuardians[index]) {
                    updatedGuardians[index] = { 
                      type: title.toLowerCase(), 
                      name: "", 
                      occupation: "",
                      alive: "",
                      nationality: "",
                      address: "",
                      contact: ""
                    };
                  }
                  updatedGuardians[index].occupation = e.target.value;
                  handleInputChange("guardianInfo", "", updatedGuardians);
                }}
                className="w-full p-1 border rounded"
              />
            ) : (
              occupation
            )}
          </div>
        </div>
        <div className="flex border-b">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">Alive</div>
          <div className="p-3 w-2/3 text-sm">
            {isEditing ? (
              <select
                value={editableData.guardianInfo?.[index]?.alive || alive}
                onChange={(e) => {
                  const updatedGuardians = [...(editableData.guardianInfo || [])];
                  if (!updatedGuardians[index]) {
                    updatedGuardians[index] = { 
                      type: title.toLowerCase(), 
                      name: "", 
                      occupation: "",
                      alive: "",
                      nationality: "",
                      address: "",
                      contact: ""
                    };
                  }
                  updatedGuardians[index].alive = e.target.value;
                  handleInputChange("guardianInfo", "", updatedGuardians);
                }}
                className="w-full p-1 border rounded"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            ) : (
              alive
            )}
          </div>
        </div>
        <div className="flex border-b">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">Nationality</div>
          <div className="p-3 w-2/3 text-sm">
            {isEditing ? (
              <input
                type="text"
                value={editableData.guardianInfo?.[index]?.nationality || nationality}
                onChange={(e) => {
                  const updatedGuardians = [...(editableData.guardianInfo || [])];
                  if (!updatedGuardians[index]) {
                    updatedGuardians[index] = { 
                      type: title.toLowerCase(), 
                      name: "", 
                      occupation: "",
                      alive: "",
                      nationality: "",
                      address: "",
                      contact: ""
                    };
                  }
                  updatedGuardians[index].nationality = e.target.value;
                  handleInputChange("guardianInfo", "", updatedGuardians);
                }}
                className="w-full p-1 border rounded"
              />
            ) : (
              nationality
            )}
          </div>
        </div>
        <div className="flex border-b">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">Address</div>
          <div className="p-3 w-2/3 text-sm">
            {isEditing ? (
              <textarea
                value={editableData.guardianInfo?.[index]?.address || address}
                onChange={(e) => {
                  const updatedGuardians = [...(editableData.guardianInfo || [])];
                  if (!updatedGuardians[index]) {
                    updatedGuardians[index] = { 
                      type: title.toLowerCase(), 
                      name: "", 
                      occupation: "",
                      alive: "",
                      nationality: "",
                      address: "",
                      contact: ""
                    };
                  }
                  updatedGuardians[index].address = e.target.value;
                  handleInputChange("guardianInfo", "", updatedGuardians);
                }}
                className="w-full p-1 border rounded"
                rows="2"
              />
            ) : (
              address
            )}
          </div>
        </div>
        <div className="flex">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">Contact</div>
          <div className="p-3 w-2/3 text-sm">
            {isEditing ? (
              <input
                type="text"
                value={editableData.guardianInfo?.[index]?.contact || contact}
                onChange={(e) => {
                  const updatedGuardians = [...(editableData.guardianInfo || [])];
                  if (!updatedGuardians[index]) {
                    updatedGuardians[index] = { 
                      type: title.toLowerCase(), 
                      name: "", 
                      occupation: "",
                      alive: "",
                      nationality: "",
                      address: "",
                      contact: ""
                    };
                  }
                  updatedGuardians[index].contact = e.target.value;
                  handleInputChange("guardianInfo", "", updatedGuardians);
                }}
                className="w-full p-1 border rounded"
              />
            ) : (
              contact
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Display guardian information section
  const GuardianSection = ({ title, name, occupation, alive, nationality, address, contact }) => (
    <div className="mb-8">
      <h3 className="font-medium text-lg mb-4">{title}</h3>
      <div className="border rounded overflow-hidden">
        <div className="flex border-b">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">{`${title}'s Name`}</div>
          <div className="p-3 w-2/3 text-sm">{name}</div>
        </div>
        <div className="flex border-b">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">Occupation</div>
          <div className="p-3 w-2/3 text-sm">{occupation}</div>
        </div>
        <div className="flex border-b">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">Alive</div>
          <div className="p-3 w-2/3 text-sm">{alive}</div>
        </div>
        <div className="flex border-b">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">Nationality</div>
          <div className="p-3 w-2/3 text-sm">{nationality}</div>
        </div>
        <div className="flex border-b">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">Address</div>
          <div className="p-3 w-2/3 text-sm">{address}</div>
        </div>
        <div className="flex">
          <div className="bg-blue-50 p-3 w-1/3 font-medium text-sm text-gray-700">Contact</div>
          <div className="p-3 w-2/3 text-sm">{contact}</div>
        </div>
      </div>
    </div>
  );

  // Document card component
  const DocumentCard = ({ title }) => (
    <div className="border rounded p-4 flex items-center gap-3">
      <div className="text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center w-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleEditClick = () => {
    setIsEditing(true);
    setEditableData({...data});
  };

  const handleSaveClick = async () => {
    // Determine which section to update based on activeTab
    if (activeTab === "personal") {
      await updatePersonalInfo();
    } else if (activeTab === "education") {
      await updateAcademicInfo();
    } else if (activeTab === "guardian") {
      await updateGuardianInfo();
    } else {
      // For preview tab, update all sections
      await updatePersonalInfo();
      await updateAcademicInfo();
      await updateGuardianInfo();
    }
    
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditableData({...data});
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <header className="bg-slate-700 text-white px-8 py-4 flex justify-between items-center w-full">
        <div className="font-bold text-xl">LOGO</div>
        <div className="flex gap-4">
          {isEditing ? (
            <>
              <button 
                onClick={handleSaveClick}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white text-sm flex items-center gap-2"
              >
                {loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                )}
                Save Changes
              </button>
              <button 
                onClick={handleCancelClick}
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white text-sm"
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              onClick={handleEditClick}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white text-sm"
            >
              Edit Information
            </button>
          )}
          <button 
            onClick={logout} 
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white text-sm"
          >
            Log out
          </button>
        </div>
      </header>

      {/* Applicant name and info */}
      <div className="bg-slate-600 text-white px-8 py-4 w-full">
        <h1 className="text-xl font-medium">Preview: {data.personalInfo?.firstName} {data.personalInfo?.lastName}</h1>
        <p className="text-sm text-gray-200">See all information you provided for this application</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b px-8 bg-white w-full">
        <TabButton name="personal" label="Personal" active={activeTab === "personal"} />
        <TabButton name="education" label="Education" active={activeTab === "education"} />
        <TabButton name="guardian" label="Guardian" active={activeTab === "guardian"} />
        <TabButton name="documents" label="Documents" active={activeTab === "documents"} />
        <TabButton name="preview" label="Preview" active={activeTab === "preview"} />
      </div>

      {/* Main Content */}
      <div className="px-8 py-6 w-full max-w-6xl mx-auto">
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
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "personal" && (
          <div>
            <div className="mb-8">
              <div className="border rounded overflow-hidden">
                <EditableDataRow 
                  label="Surname" 
                  section="personalInfo" 
                  field="lastName" 
                  value={data.personalInfo?.lastName || "Ayisi"} 
                />
                <EditableDataRow 
                  label="Other Names" 
                  section="personalInfo" 
                  field="firstName" 
                  value={data.personalInfo?.firstName || "Solomon Annan"} 
                />
                <EditableDataRow 
                  label="Date of Birth" 
                  section="personalInfo" 
                  field="dob" 
                  value={data.personalInfo?.dob || "08/03/2000"} 
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="border rounded overflow-hidden">
                <EditableDataRow 
                  label="Nationality" 
                  section="personalInfo" 
                  field="nationality" 
                  value={data.personalInfo?.nationality || "Ghanaian"} 
                />
                <EditableDataRow 
                  label="Residential Address" 
                  section="personalInfo" 
                  field="address" 
                  value={data.personalInfo?.address || "Albaji Building No. 3\nLakeside, Adenta\nAccra, Ghana"} 
                />
                <EditableDataRow 
                  label="Digital Address" 
                  section="personalInfo" 
                  field="digitalAddress" 
                  value={data.personalInfo?.digitalAddress || "GR-123-6776"} 
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="border rounded overflow-hidden">
                <DataRow label="Email Address" value={data.email || "solomonaaa@gmail.com"} />
                <EditableDataRow 
                  label="Telephone Number" 
                  section="personalInfo" 
                  field="phone" 
                  value={data.personalInfo?.phone || "0555533444"} 
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "education" && (
          <div>
            <div className="mb-8">
              <div className="border rounded overflow-hidden">
                <EditableDataRow 
                  label="School" 
                  section="academicHistory" 
                  field="schoolName" 
                  value={data.academicHistory?.schoolName || "Mfantsipim School"} 
                />
                <EditableDataRow 
                  label="Course" 
                  section="academicHistory" 
                  field="course" 
                  value={data.academicHistory?.course || "General Arts"} 
                />
                <EditableDataRow 
                  label="Batch Year" 
                  section="academicHistory" 
                  field="graduationYear" 
                  value={data.academicHistory?.graduationYear || "2024/25"} 
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="border rounded overflow-hidden">
                <EditableDataRow 
                  label="Examination Type" 
                  section="academicHistory" 
                  field="examType" 
                  value={data.academicHistory?.examType || "WASSCE"} 
                />
                <EditableDataRow 
                  label="Index Number" 
                  section="academicHistory" 
                  field="indexNumber" 
                  value={data.academicHistory?.indexNumber || "210787362"} 
                />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-medium text-lg mb-4">Examination Results</h3>
              <div className="border rounded overflow-hidden">
                <div className="flex border-b bg-blue-50">
                  <div className="p-3 w-2/3 font-medium text-sm text-gray-700 border-r">Subject</div>
                  <div className="p-3 w-1/3 font-medium text-sm text-center text-gray-700">Aggregate</div>
                </div>
                <EditableSubjectRow index={0} subject="Core Mathematics" grade="A1" />
                <EditableSubjectRow index={1} subject="English Language" grade="B2" />
                <EditableSubjectRow index={2} subject="Integrated Science" grade="B2" />
                <EditableSubjectRow index={3} subject="Social Studies" grade="A1" />
                <EditableSubjectRow index={4} subject="History" grade="A1" />
                <EditableSubjectRow index={5} subject="Government" grade="B2" />
                <EditableSubjectRow index={6} subject="Literature" grade="B3" />
                <EditableSubjectRow index={7} subject="Economics" grade="A1" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "guardian" && (
          <div>
            <EditableGuardianSection 
              index={0}
              title="Mother"
              name="Ama Ama Amama"
              occupation="Nurse"
              alive="Yes"
              nationality="Ghana"
              address="Koforidua"
              contact="0244567383"
            />

            <EditableGuardianSection 
              index={1}
              title="Father"
              name="Kwaku Kwaws"
              occupation="Policeman"
              alive="Yes"
              nationality="Ghana"
              address="Koforidua"
              contact="0244567383"
            />
          </div>
        )}

        {activeTab === "documents" && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <DocumentCard title="Birth Certificate.pdf" />
            <DocumentCard title="National ID" />
            <button 
              className="col-span-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Upload New Document
            </button>
          </div>
        )}
</div>
</div>
  )}

  export default TestPage