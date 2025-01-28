import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../lib/utils";

const userID = getCookie("userID");
const MultipleFileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  // Upload files to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tg-app"); // Replace with your preset
    formData.append("cloud_name", "difk80lzg"); // Replace with your Cloudinary name

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/difk80lzg/image/upload",
      formData
    );

    return response.data.secure_url; // URL of the uploaded file
  };

  // Handle the upload process
  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const urls = await Promise.all(
        selectedFiles.map((file) => uploadToCloudinary(file))
      );
      setUploadedUrls(urls);

      // Send URLs to backend for storage
      await axios.post(`http://localhost:8000/api/${userID}/upload-files`, { fileUrls: urls });
      alert("Files uploaded and stored successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files.");
    } finally {
      setIsUploading(false);
    }
  };
 
  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload Files"}
      </button>

      {/* <h2>Uploaded Files:</h2>
      <ul>
        {uploadedUrls.map((url, index) => (
          <li key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default MultipleFileUpload;
