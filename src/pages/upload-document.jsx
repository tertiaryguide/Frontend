// import React, { useState } from "react";
// import axios from "axios";
// import { getCookie } from "../../lib/utils";

// const userID = getCookie("userID");

// const SingleDocumentUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadedUrl, setUploadedUrl] = useState("");
//   const [isUploading, setIsUploading] = useState(false);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]); // Only one file selected
//   };

//   // Upload file to Cloudinary
//   const uploadToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "tg-app"); // Replace with your preset
//     formData.append("cloud_name", "difk80lzg"); // Replace with your Cloudinary name

//     const response = await axios.post(
//       "https://api.cloudinary.com/v1_1/difk80lzg/image/upload",
//       formData
//     );

//     return response.data.secure_url; // URL of the uploaded file
//   };

//   // Handle the upload process
//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first!");
//       return;
//     }

//     setIsUploading(true);

//     try {
//       const url = await uploadToCloudinary(selectedFile);
//       setUploadedUrl(url);

//       // Send URL to backend for storage
//       await axios.post(`https://tg-backend-snex.onrender.com/api/${userID}/upload-file`, {
//         fileUrl: url,
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
//             {uploadedUrl}
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleDocumentUpload;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../lib/utils";


const DocumentUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedField, setSelectedField] = useState(""); // Store document type
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
    const [userID, setUserID] = useState(null);
    const [token, setToken] = useState(null);
  // Get userID and token after component mounts
  useEffect(() => {
    const storedUserID = getCookie("userId");
    const storedToken = getCookie("token");
    setUserID(storedUserID);
    setToken(storedToken);
  }, []);
  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle document type selection
  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
  };

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tg-app"); // Replace with your preset
    formData.append("cloud_name", "difk80lzg"); // Replace with your Cloudinary name

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/difk80lzg/image/upload",
      formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );{
      stack.map.join(', ') 
  }

    return response.data.secure_url; // URL of the uploaded file
  };

  // Handle the upload process
  const handleUpload = async () => {
    if (!selectedFile || !selectedField) {
      alert("Please select a file and document type.");
      return;
    }

    setIsUploading(true);
    try {
      // Upload to Cloudinary
      const fileUrl = await uploadToCloudinary(selectedFile);
      setUploadedUrl(fileUrl);

      // Send URL and document type to backend for storage
      await axios.post(`https://tg-backend-snex.onrender.com/api/applicant/${userID}/upload-file`, {
        fileUrl,
        selectedField,
      });

      alert("File uploaded and stored successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <select value={selectedField} onChange={handleFieldChange}>
        <option value="">Select Document Type</option>
        <option value="birthCertificate">Birth Certificate</option>
        <option value="passport">Passport</option>
        <option value="transcript">Transcript</option>
        <option value="nationalID">National ID</option>
      </select>

      <input
        type="file"
        onChange={handleFileChange}
      />

      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload File"}
      </button>

      {uploadedUrl && (
        <div>
          <h2>Uploaded File:</h2>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            View Uploaded File
          </a>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
