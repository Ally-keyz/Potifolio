import React, { useState } from "react";
import icon1 from "../assets/edit.png"
import { FaCalendarAlt, FaTruck, FaBarcode, FaMapMarkedAlt, FaProductHunt, FaPlusCircle, FaSignOutAlt } from 'react-icons/fa';

const RegisterStockForm = () => {
  const [formData, setFormData] = useState({
    entryDate: "",
    truck: "",
    wBill: "",
    originDestination: "",
    product: "",
    entry: "",
    unitPrice:"",
    dispatched: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { entryDate, truck, wBill, originDestination, product, entry, dispatched , unitPrice } = formData;

    // Input validation
    if (!product) {
      setError("Product name is required.");
      return;
    }

    if (!entry && !dispatched) {
      setError("Specify either entry or dispatched quantity.");
      return;
    }

    if (entry && dispatched) {
      setError("Only one of entry or dispatched can be specified.");
      return;
    }

    try {
      // Make API call
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entryDate,
          truck,
          wBill,
          originDestination,
          product,
          entry: entry ? parseInt(entry, 10) : 0,
          dispatched: dispatched ? parseInt(dispatched, 10) : 0,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Stock operation recorded successfully.");
        setFormData({
          entryDate: "",
          truck: "",
          wBill: "",
          originDestination: "",
          product: "",
          entry: "",
          dispatched: "",
        });
      } else {
        setError(data.error || "An error occurred.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <>
            <div  className="flex justify-center ">
                 <p className='text-[13px] text-blue-500 mr-2 mt-1 font-semibold'>Register stock entry</p>
                <img onClick={()=>setModelOpen(true)} src={icon1} className='w-7 h-7' alt="Register" />
                </div>
      <div className="p-5 mr-5">
        {error && <div className="mb-4 p-3 text-red-700 bg-red-100 rounded">{error}</div>}
        {success && <div className="mb-4 p-3 text-green-700 bg-green-100 rounded">{success}</div>}
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="ml-20 flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-600" />
                <label className="block font-medium text-[12px] text-gray-800">
                  Entry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="entryDate"
                  value={formData.entryDate}
                  onChange={handleChange}
                  className="block border-b border-gray-400 w-full sm:w-[370px] px-[25px] py-2 mb-8 text-[13px] text-gray-600 shadow-sm rounded-sm mt-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="ml-20 flex items-center">
                <FaTruck className="mr-2 text-gray-600" />
                <label className="block font-medium mb-1 text-[12px] text-gray-800">
                  Truck <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="truck"
                  value={formData.truck}
                  onChange={handleChange}
                  placeholder="Truck"
                  className="block border-b border-gray-400 w-full sm:w-[370px] px-[25px] py-2 mb-8 text-[13px] text-gray-600 shadow-sm rounded-sm mt-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="ml-20 flex items-center">
                <FaBarcode className="mr-2 text-gray-600" />
                <label className="block font-medium mb-1 text-[12px] text-gray-800">
                  Waybill <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="wBill"
                  value={formData.wBill}
                  onChange={handleChange}
                  placeholder="Waybill Number"
                  className="block border-b border-gray-400 w-full sm:w-[370px] px-[25px] py-2 mb-8 text-[13px] text-gray-600 shadow-sm rounded-sm mt-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="ml-20 flex items-center">
                <FaMapMarkedAlt className="mr-2 text-gray-600" />
                <label className="block font-medium mb-1 text-[12px] text-gray-800">
                  Origin/Destination <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="originDestination"
                  value={formData.originDestination}
                  onChange={handleChange}
                  placeholder="Origin or Destination"
                  className="block border-b border-gray-400 w-full sm:w-[370px] px-[25px] py-2 mb-8 text-[13px] text-gray-600 shadow-sm rounded-sm mt-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="ml-20 flex items-center">
                <FaProductHunt className="mr-2 text-gray-600" />
                <label className="block font-medium mb-1 text-[12px] text-gray-800">
                  Product <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="block border-b border-gray-400 w-full sm:w-[370px] px-[25px] py-2 mb-8 text-[13px] text-gray-600 shadow-sm rounded-sm mt-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="ml-20 flex items-center">
                <FaPlusCircle className="mr-2 text-gray-600" />
                <label className="block font-medium mb-1 text-[12px] text-gray-800">
                  Entry Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="entry"
                  value={formData.entry}
                  onChange={handleChange}
                  placeholder="Entry Quantity"
                  className="block border-b border-gray-400 w-full sm:w-[370px] px-[25px] py-2 mb-8 text-[13px] text-gray-600 shadow-sm rounded-sm mt-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="ml-20 flex items-center">
                <FaSignOutAlt className="mr-2 text-gray-600" />
                <label className="block font-medium mb-1 text-[12px] text-gray-800">
                  Dispatched Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="dispatched"
                  value={formData.dispatched}
                  onChange={handleChange}
                  placeholder="Dispatched Quantity"
                  className="block border-b border-gray-400 w-full sm:w-[370px] px-[25px] py-2 mb-8 text-[13px] text-gray-600 shadow-sm rounded-sm mt-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="ml-20 flex items-center">
                <FaSignOutAlt className="mr-2 text-gray-600" />
                <label className="block font-medium mb-1 text-[12px] text-gray-800">
                  Unite price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  placeholder="Unity price"
                  className="block border-b border-gray-400 w-full sm:w-[370px] px-[25px] py-2 mb-8 text-[13px] text-gray-600 shadow-sm rounded-sm mt-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="p-10 mt-5 flex justify-center">
              <button
                type="submit"
                className="text-center text-white bg-gradient-to-l from-blue-500 to-indigo-500 text-[13px] font-semibold rounded cursor-pointer w-[400px] h-[35px]"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterStockForm;
