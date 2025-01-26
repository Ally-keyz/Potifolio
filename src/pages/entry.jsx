import React, { useState, useEffect } from "react";
import icon1 from "../assets/edit.png";
import img2 from "../assets/download.png";
import i1 from "../assets/i1.png";
import AdvancedStockForm from "../components/stockForm";
import { useNavigate } from "react-router-dom";

function Entry() {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "Invalid date"; // Handle undefined or null dates

    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date"; // Handle invalid dates

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://stock-managment-2.onrender.com/stock/inGoing", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log("API Response:", data); // Log the response
        setStockData(data.stock);
        console.log(data.stock)
      } catch (err) {
        setError("Failed to fetch stock data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div>
      <div className="p-5 sm:w-[970px] w-full flex justify-end">
        <div className="flex justify-evenly">
          <div onClick={()=> navigate("/Home/Report")} className="cursor-pointer flex">
            <p className="text-[12px] text-gray-700 mr-2 mt-1 font-semibold">
              Go to reports
            </p>
            <img src={i1} className="w-7 h-7" alt="Download" />
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="w-[150px] h-[40px] flex justify-evenly items-center bg-gray-100 rounded-md">
          <p className="text-[14px] text-blue-500 font-bold">STOCK</p>
          <p className="w-[1.5px] h-4 bg-blue-500"></p>
          <p className="text-[14px] text-gray-700 font-bold">Entry</p>
        </div>
      </div>

      <div className="w-full bg-white h-[650px] overflow-auto scrollbar-custom rounded-md border-gray-200 border  p-5 flex flex-col">
        <AdvancedStockForm />
      </div>

      <div className="mt-5">
        {loading ? (
            <div className="flex justify-center p-[100px] h-screen">
            <div className="tex-[14px] font-semibold text-gray-500">Loading...</div>
        </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : stockData.length === 0 ? (
          <p className="text-center text-gray-500">No stock data available</p>
        ) : (
          <div className="p-5 w-full overflow-auto scrollbar-custom h-[360px] shadow-md rounded-md">
            <div className="p-2 flex justify-center">
              <p className="text-blue-500 font-extrabold text-[15px]">Entry truck</p>

            </div>
          <div className="w-full shadow-lg scrollbar-custom h-full overflow-auto rounded-t-sm">
            <table className="w-full text-center text-[14px] text-gray-800">
              <thead>
                <tr className="border-b bg-blue-400 font-extrabold text-[13px] text-white">
                  <th className="py-3 px-5">Products</th>
                  <th className="py-3 px-5">Entry Date</th>
                  <th className="py-3 px-5">Truck</th>
                  <th className="py-3 px-5">Origin/Destination</th>
                  <th className="py-3 px-5">Entry</th>
                  <th className="py-3 px-5">Unit Price</th>
                  <th className="py-3 px-5">Solde</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(stockData) && stockData.length > 0 ? (
                  stockData.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-t h-[40px]  ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <td className="text-yellow-700 font-semibold text-[12px]">{item.entry === "Unknown" ? "Beans" : item.entry}</td>
                      <td className="text-green-700 font-semibold text-[12px]">{formatDate(item.date)}</td>
                      <td className="text-gray-700 font-semibold text-[12px]">{item.plaque}</td>
                      <td className="text-orange-500 font-semibold text-[12px]">{item.destination}</td>
                      <td className="text-blue-700 font-semibold text-[12px]">{item.value}</td>
                      <td className="text-gray-700 font-semibold text-[12px]">{item.unitPrice}</td>
                      <td className="text-red-700 font-semibold text-[12px]">{item.solde}</td>
                    </tr>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No stock data available</p>
                )}
              </tbody>
            </table>
          </div>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Entry;
