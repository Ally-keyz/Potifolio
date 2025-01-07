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

  const closeModal2 = () => setModelOpen(false);

  const handleReportGeneration = () => {
    console.log("Report Format:", reportFormat);
    console.log("Report Type:", reportType);
    console.log("Month:", month);
    console.log("Year:", year);
  };

  return (
    <div className="min-h-screen   flex flex-col items-center">
      <div className="flex justify-end w-full mb-4">
        <div
          onClick={() => setModelOpen(true)}
          className="flex items-center mr-10 cursor-pointer transition-transform transform hover:scale-105"
        >
          <p className="text-sm text-gray-800 italic mr-2">Create reports</p>
          <img src={img2} className="w-6 h-6" alt="Download" />
        </div>
      </div>
      <div>
        <div className="mb-6 ml-3">
          <div className="inline-flex items-center py-2 px-4 bg-gray-50 rounded-md shadow-md">
            <p className="text-lg text-blue-500 font-bold">STOCK</p>
            <div className="border-l border-gray-300 mx-2 h-4"></div>
            <p className="text-lg text-gray-600 font-semibold">Reports</p>
          </div>
        </div>
        <TabsWithVirtualizedData />
      </div>
      <Modal isOpen={modelOpen} onClose={closeModal2}>
        <div className="p-8 w-full sm:w-[500px] bg-white rounded-lg shadow-lg">
          <h2 className="text-[17px] font-bold text-blue-500 text-center mb-6">Create Your Report</h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-[12px] font-medium mb-2">Report Format</label>
            <div className="flex space-x-4">
              {['word', 'excel'].map(format => (
                <label key={format} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value={format}
                    checked={reportFormat === format}
                    onChange={() => setReportFormat(format)}
                    className="form-radio text-gray-700"
                  />
                  <span className="text-gray-600">{format.charAt(0).toUpperCase() + format.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-[12px] font-medium mb-2">Report Type</label>
            <div className="flex space-x-4">
              {['monthly', 'annual'].map(type => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="reportType"
                    value={type}
                    checked={reportType === type}
                    onChange={() => setReportType(type)}
                    className="form-radio text-gray-700"
                  />
                  <span className="text-gray-600">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            {reportType === "monthly" && (
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 text-[12px] font-semibold mb-2">Month</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Enter Month"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 text-[12px] font-semibold mb-2">Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Enter Year"
                  />
                </div>
              </div>
            )}

            {reportType === "annual" && (
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2">Year</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Enter Year"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleReportGeneration}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
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