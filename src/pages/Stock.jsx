import React, { useState, useEffect } from "react";
import img1 from "../assets/i3.png";
import img2 from "../assets/download.png";
import Modal from "../components/Modal";
import FileUploadForm from "../components/FileUpload";
import "../components/custom-scrollbar.css";

function Stock() {
    const [modelOpen, setModelOpen] = useState(false);
    const [stockData, setStockData] = useState([]); // Initialize as an empty array
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false); // Add loading state

    const closeModal2 = () => setModelOpen(false);

    //download report
        const handleDownload = async () => {
          try {
            const response = await fetch("http://localhost:5000/stock/download", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`, // Ensure the user is authenticated
              },
            });
      
            if (!response.ok) {
              throw new Error("Failed to download stock report.");
            }
      
            // Create a Blob from the response
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
      
            // Create a link element to trigger the download
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "stocks_report.xlsx"); // File name
            document.body.appendChild(link);
            link.click();
      
            // Clean up
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
          } catch (error) {
            console.error("Error downloading the stock report:", error);
            alert("There was an error downloading the report. Please try again.");
          }
        };

    // Fetch stock data with pagination
    const fetchStocks = async (page) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/stock/myStock?page=${page}&limits=10`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`, // Assuming you use JWT for auth
                },
            });
            const data = await response.json();
            setStockData(data.stocks || []); // Ensure it's always an array
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
            console.log(data.stocks)
        } catch (error) {
            console.error('Error fetching stocks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStocks(currentPage);
    }, [currentPage]);

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    

    return (
        <>
            <div className="flex justify-end sm:w-[970px] p-5 w-full">
                <div className="flex justify-evenly">
                    <div onClick={() => setModelOpen(true)} className="cursor-pointer flex mr-5">
                        <p className='text-[12px] text-gray-600 mr-2 mt-1 font-semibold'>Register new stock</p>
                        <img src={img1} className='w-7 h-7' alt="Register" />
                    </div>
                    <div onClick={handleDownload} className="cursor-pointer flex">
                        <p className='text-[12px] text-blue-500 mr-2 mt-1 font-semibold'>Download report</p>
                        <img src={img2} className='w-7 h-7' alt="Download" />
                    </div>
                </div>
            </div>

            <div className="p-1">
    <div className="flex justify-center p-3">
        <p className='text-[16px] text-blue-500 font-bold'>
            Current stock 
        </p>
    </div>

    {/* Table Section */}
    <div className="w-full h-[350px] overflow-auto scrollbar-custom rounded-md border-gray-200 border shadow-md p-5 flex flex-col">
        {/* Loading indicator */}
        {loading ? (
            <div className="flex justify-center  items-center h-screen">
                <div className="bouncing-ball"></div>
            </div>
        ) : (
            <>
                {/* Check if data is empty */}
                {stockData && stockData.length === 0 ? (
                    <p className="text-center text-gray-500">No stock data available</p>
                ) : (
                    <div className="mt-2 flex rounded-md shadow-md justify-center  w-full">
                        <table className="w-full  text-center text-[14px] text-gray-800 ">
                            <thead>
                                <tr className="border-b bg-blue-400 font-extrabold text-[13px] text-white">
                                    <th className="py-3 px-5">Products</th>
                                    <th className="py-3 px-5">Entry Date</th>
                                    <th className="py-3 px-5">Truck</th>
                                    <th className="py-3 px-5">Origin/Destination</th>
                                    <th className="py-3 px-5">Entry</th>
                                    <th className="py-3 px-5">Dispatched</th>
                                    <th className="py-3 px-5">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockData.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`border-t border-gray-300 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                                    >
                                        <td className="py-3 text-[12px] font-semibold text-gray-800 px-5">{item.product === "Unknown" ? "Beans" : item.product}</td>
                                        <td className="py-3 text-[12px] font-semibold text-gray-800 px-5">{item.entryDate}</td>
                                        <td className="py-3 text-[12px] font-semibold text-gray-800 px-5">{item.truck}</td>
                                        <td className="py-3 text-[12px] font-semibold text-gray-800 px-5">{item.originDestination}</td>
                                        <td className="py-3 text-[12px] font-semibold text-gray-800 px-5">{item.entry}</td>
                                        <td className="py-3 text-[12px] font-semibold text-gray-800 px-5">{item.dispatched}</td>
                                        <td className="py-3 text-[12px] font-semibold text-gray-800 px-5">{item.balance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </>
        )}
    </div>

    {/* Pagination Buttons */}
    <div className="flex justify-center mt-4 space-x-4">
        <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
        >
            Previous
        </button>
        <span className="text-gray-600 text-[12px] font-semibold mt-2">Page <span className="text-blue-700">{currentPage}</span>  of <span className="text-black">{totalPages}</span></span>
        <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
        >
            Next
        </button>
    </div>
</div>


            {/* Modal component for stock registration */}
            <Modal isOpen={modelOpen} onClose={closeModal2}>
                <div className="p-5 sm:p-0 w-full sm:w-[600px] h-[400px] bg-white rounded-md">
                    {/* Registration form content */}
                    <FileUploadForm />
                </div>
            </Modal>
        </>
    );
}

export default Stock;

