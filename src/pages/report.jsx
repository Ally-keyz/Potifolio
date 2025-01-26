import React, { useState } from "react";
import TabsWithVirtualizedData from "../components/reportTabs";
import img2 from "../assets/download.png";
import Modal from "../components/Modal";

function Report() {
  const [modelOpen, setModelOpen] = useState(false);
  const [reportFormat, setReportFormat] = useState(""); // Word or Excel
  const [reportType, setReportType] = useState(""); // Monthly or Annual
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const closeModal = () => setModelOpen(false);

  const handleReportGeneration = async () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) {
      alert("Token has expired. Please log in again.");
      return;
    }

    const queryParams = new URLSearchParams({
      month: month || "2",
      year: year || "2012",
    });

    const endpoint = reportType === "monthly" ? "monthly" : "annual";
    const format = reportFormat === "excel" ? "excel" : "word";

    try {
      const response = await fetch(
        `https://stock-managment-2.onrender.com/myStock/reports/${endpoint}/${format}?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to generate the report.");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${reportType}_${format}_report.${format === "excel" ? "xlsx" : "docx"}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Error generating report: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex justify-end w-full mb-4">
        <div
          onClick={() => setModelOpen(true)}
          className="flex items-center mr-16 cursor-pointer hover:scale-105"
        >
          <p className="text-[13px] text-gray-600 font-semibold mr-2">Create reports</p>
          <img src={img2} className="w-6 h-6" alt="Download" />
        </div>
      </div>

      <div className="mb-6 flex justify-start sm:w-[970px] w-full">
        <div className="inline-flex py-2 px-4 bg-gray-50 rounded-md shadow-sm">
          <p className="text-[16px] text-blue-500 font-bold">STOCK</p>
          <div className="border-l border-gray-300 mx-2 h-6"></div>
          <p className="text-[16px] text-gray-600 font-semibold">Reports</p>
        </div>
      </div>

      <TabsWithVirtualizedData />

      <Modal isOpen={modelOpen} onClose={closeModal}>
        <div className="p-8 w-full sm:w-[500px] bg-white rounded-lg shadow-lg">
          <h2 className="text-[17px] font-bold text-blue-500 text-center mb-6">Create Your Report</h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Report Format</label>
            <div className="flex space-x-4">
              {["word", "excel"].map((format) => (
                <label key={format} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value={format}
                    checked={reportFormat === format}
                    onChange={() => setReportFormat(format)}
                  />
                  <span className="text-gray-600">{format.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Report Type</label>
            <div className="flex space-x-4">
              {["monthly", "annual"].map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="reportType"
                    value={type}
                    checked={reportType === type}
                    onChange={() => setReportType(type)}
                  />
                  <span className="text-gray-600">{type.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>

          {reportType === "monthly" && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Month</label>
              <input
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-full"
                placeholder="Enter month (1-12)"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Enter year"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleReportGeneration}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Generate Report
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Report;
