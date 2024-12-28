import React, { useState } from "react";
import axios from "axios";

const FileUploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStatus(null); // Reset status when a new file is selected
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file to upload.");

    const token = localStorage.getItem("ACCESS_TOKEN"); // Retrieve token from localStorage
    if (!token) {
      return alert("You are not authenticated. Please log in.");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadProgress(0);
      setUploadStatus(null);

      const response = await axios.post("http://localhost:5000/stock/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      });

      setUploadStatus({
        success: true,
        message: response.data.message || "File uploaded successfully!",
      });
    } catch (error) {
      setUploadStatus({
        success: false,
        message: error.response?.data?.error || "Failed to upload file.",
      });
    }
  };

  const resetForm = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadStatus(null);
  };

  return (
    <div className="flex justify-center p-3">
      <div className="w-full  max-w-md  p-6">
        <h2 className="text-[17px] font-bold text-center text-gray-600 mb-4">
          Upload stock progress
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select File
          </label>
          <div className="relative h-[100px] border-dashed border-2 border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100">
            <input
              type="file"
              accept=".xlsx,.csv,.pdf,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {file ? (
              <p className="text-center text-gray-600">{file.name}</p>
            ) : (
              <p className="text-center text-gray-400">
                Drag and drop your file here, or click to select
              </p>
            )}
          </div>
        </div>
        {file && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-gray-600">
              <span>{file.name}</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        {uploadStatus && (
          <div
            className={`mt-4 p-2 text-center rounded-lg ${
              uploadStatus.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {uploadStatus.message}
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleUpload}
            className="bg-gradient-to-r from-blue-400 to-indigo-400 cursor-pointer hover:from-blue-600 hover:to-indigo-400 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
            disabled={!file}
          >
            Upload
          </button>
          <button
            onClick={resetForm}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadForm;
