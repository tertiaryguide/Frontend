// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { getCookie } from "../../lib/utils";


// const DocumentUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [selectedField, setSelectedField] = useState(""); // Store document type
//   const [uploadedUrl, setUploadedUrl] = useState("");
//   const [isUploading, setIsUploading] = useState(false);
//     const [userID, setUserID] = useState(null);
//     const [token, setToken] = useState(null);
//   // Get userID and token after component mounts
//   useEffect(() => {
//     const storedUserID = getCookie("userId");
//     const storedToken = getCookie("token");
//     setUserID(storedUserID);
//     setToken(storedToken);
//   }, []);
//   // Handle file selection
//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   // Handle document type selection
//   const handleFieldChange = (e) => {
//     setSelectedField(e.target.value);
//   };

//   // Upload file to Cloudinary
//   const uploadToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "tg-app"); // Replace with your preset
//     formData.append("cloud_name", "difk80lzg"); // Replace with your Cloudinary name

//     const response = await axios.post(
//       "https://api.cloudinary.com/v1_1/difk80lzg/image/upload",
//       formData, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//       }
//     );{
//       stack.map.join(', ') 
//   }

//     return response.data.secure_url; // URL of the uploaded file
//   };

//   // Handle the upload process
//   const handleUpload = async () => {
//     if (!selectedFile || !selectedField) {
//       alert("Please select a file and document type.");
//       return;
//     }

//     setIsUploading(true);
//     try {
//       // Upload to Cloudinary
//       const fileUrl = await uploadToCloudinary(selectedFile);
//       setUploadedUrl(fileUrl);

<<<<<<< HEAD
//       // Send URL and document type to backend for storage
//       await axios.post(`https://tg-backend-snex.onrender.com/api/applicant/${userID}/upload-file`, {
//         fileUrl,
//         selectedField,
=======
//       // Send URL to backend for storage
//       await axios.post(`https://tg-backend-snex.onrender.com/api/${userID}/upload-file`, {
//         fileUrl: url,
>>>>>>> af721752875a74feb901eb0fc5911f39b789bbec
//       });

//       alert("File uploaded and stored successfully!");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("Failed to upload file.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div>
//       <select value={selectedField} onChange={handleFieldChange}>
//         <option value="">Select Document Type</option>
//         <option value="birthCertificate">Birth Certificate</option>
//         <option value="passport">Passport</option>
//         <option value="transcript">Transcript</option>
//         <option value="nationalID">National ID</option>
//       </select>

//       <input
//         type="file"
//         onChange={handleFileChange}
//       />

//       <button onClick={handleUpload} disabled={isUploading}>
//         {isUploading ? "Uploading..." : "Upload File"}
//       </button>

//       {uploadedUrl && (
//         <div>
//           <h2>Uploaded File:</h2>
//           <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
//             View Uploaded File
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentUpload;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../lib/utils";

const DocumentUpload = () => {
  const [userID, setUserID] = useState(null);
  const [token, setToken] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState({
    passport: { file: null, preview: null, uploaded: false, url: "" },
    nationalID: { file: null, preview: null, uploaded: false, url: "" },
    birthCertificate: { file: null, preview: null, uploaded: false, url: "" }
  });

  // Get userID and token after component mounts
  useEffect(() => {
    const storedUserID = getCookie("userId");
    const storedToken = getCookie("token");
    setUserID(storedUserID);
    setToken(storedToken);
  }, []);

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      Object.values(documents).forEach(doc => {
        if (doc.preview) URL.revokeObjectURL(doc.preview);
      });
    };
  }, [documents]);

  // Handle file selection
  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    if (!file) return;

    setDocuments(prev => ({
      ...prev,
      [docType]: {
        ...prev[docType],
        file: file,
        preview: URL.createObjectURL(file),
        uploaded: false
      }
    }));
  };

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tg-app");
    formData.append("cloud_name", "difk80lzg");
    
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/difk80lzg/image/upload",
      formData
    );
    
    return response.data.secure_url;
  };

  // Handle the upload process for a specific document
  const handleUpload = async (docType) => {
    const docData = documents[docType];
    if (!docData.file) {
      alert(`Please select a ${docType.replace(/([A-Z])/g, ' $1').toLowerCase()} file first.`);
      return;
    }

    setIsUploading(true);
    try {
      // Upload to Cloudinary
      const fileUrl = await uploadToCloudinary(docData.file);
      
      // Send URL and document type to backend for storage
      await axios.post(`https://tg-backend-snex.onrender.com/api/applicant/${userID}/upload-file`, {
        fileUrl,
        selectedField: docType
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      
      // Update state to reflect successful upload
      setDocuments(prev => ({
        ...prev,
        [docType]: {
          ...prev[docType],
          uploaded: true,
          url: fileUrl
        }
      }));
    } catch (error) {
      console.error(`Error uploading ${docType}:`, error);
      alert(`Failed to upload ${docType}.`);
    } finally {
      setIsUploading(false);
    }
  };

  // Check if all required documents are uploaded
  const allDocumentsUploaded = Object.values(documents).every(doc => doc.uploaded);

  const documentTypes = [
    { key: "passport", label: "Passport" },
    { key: "nationalID", label: "National ID" },
    { key: "birthCertificate", label: "Birth Certificate" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">Document Upload</h1>
          <p className="text-sm text-gray-500">Please upload clear copies of your identification documents</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Required Documents</h2>
          
          <div className="space-y-6">
            {documentTypes.map((docType) => (
              <div key={docType.key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{docType.label}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Upload a clear, legible scan or photo of your {docType.label.toLowerCase()}
                    </p>
                    
                    {documents[docType.key].uploaded ? (
                      <div className="mt-2 flex items-center text-green-600">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Successfully uploaded
                      </div>
                    ) : (
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Choose file
                        </label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange(e, docType.key)}
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-medium
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    {documents[docType.key].preview && (
                      <div className="w-16 h-16 relative border border-gray-200 rounded">
                        <img 
                          src={documents[docType.key].preview} 
                          alt={`${docType.label} preview`} 
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleUpload(docType.key)}
                      disabled={isUploading || !documents[docType.key].file || documents[docType.key].uploaded}
                      className={`px-4 py-2 rounded-md ${
                        documents[docType.key].uploaded
                          ? "bg-green-100 text-green-700"
                          : documents[docType.key].file
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {isUploading && documents[docType.key].file && !documents[docType.key].uploaded
                        ? "Uploading..."
                        : documents[docType.key].uploaded
                          ? "Uploaded"
                          : "Upload"}
                    </button>
                  </div>
                </div>

                {documents[docType.key].url && (
                  <div className="mt-3">
                    <a 
                      href={documents[docType.key].url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View uploaded document
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Go Back
          </button>
          <button
            disabled={!allDocumentsUploaded}
            className={`px-4 py-2 rounded-md ${
              allDocumentsUploaded 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-gray-200 text-gray-500"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;