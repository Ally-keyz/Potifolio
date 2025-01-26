import React, { useState } from "react";
import icon1 from "../assets/edit.png"
import Notification from "./Notification";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FaCalendarAlt, FaTruck, FaBarcode, FaMapMarkedAlt, FaProductHunt, FaPlusCircle, FaSignOutAlt } from 'react-icons/fa';

const RegisterStockForm2 = () => {
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
  const [color,setColor] = useState("bg-red-500")
  const [success, setSuccess] = useState("");
  const [loading ,setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const triggerNotification = (message,color) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setColor(color)
};

const handleNotificationClose = () => {
    setShowNotification(false);
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

    const handleDateChange = (date) => {
      const formattedDate = format(date, "dd/MM/yyyy"); // Format as DD/MM/YYYY
      setFormData({ ...formData, entryDate: formattedDate });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
  
    const { entryDate, truck, wBill, originDestination, product, entry, dispatched, unitPrice } = formData;
  
    // Input validation
    if (!product) {
      triggerNotification("Product required","bg-red-500")
      setLoading(false)
      return;
    }
  
    if (!entry && !dispatched) {
      triggerNotification("Specify either entry or dispatched quantity.","bg-red-500")
      setLoading(false)
      return;
    }
  
    if (entry && dispatched) {
      triggerNotification("Only one of entry or dispatched can be specified.","bg-red-500")
      setLoading(false)
      return;
    }
  
    if (!unitPrice) {
      setError("Unit price is required.");
      triggerNotification("Unit price is required.","bg-red-500")
      setLoading(false)
      return;
    }
  
    const token = localStorage.getItem("ACCESS_TOKEN"); // Retrieve token from localStorage
    if (!token) {
        setLoading(false)
      return triggerNotification("Token has expired","bg-red-500");
    }
  
    try {
      // Make API call
      const response = await fetch("https://stock-managment-2.onrender.com/stock/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          entryDate,
          truck,
          wBill,
          originDestination,
          product,
          entry: entry ? parseInt(entry, 10) : 0,
          dispatched: dispatched ? parseInt(dispatched, 10) : 0,
          unitPrice: parseFloat(unitPrice), // Ensure the unitPrice is sent as a float
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        triggerNotification("Stock registered successfully","bg-green-500")
        setFormData({
          entryDate: "",
          truck: "",
          wBill: "",
          originDestination: "",
          product: "",
          entry: "",
          dispatched: "",
          unitPrice: "",
        });
      } else {
        triggerNotification(data.error || "An error occurred.","bg-red-500")
      }
    } catch (err) {
      triggerNotification("Server error. Please try again later.","bg-red-500")
      console.log(err.message)
    }finally{
        setLoading(false);
    }
  };
  

  return (
    <>
    <div className="bg-white rounded-lg p-5">
            <div  className="flex justify-center">
                 <p className='text-[15px] text-blue-500 mr-2 mt-1 font-semibold'>Register stock</p>
                <img onClick={()=>setModelOpen(true)} src={icon1} className='w-7 h-7' alt="Register" />
                </div>
      <div className="p-5 mr-5 ">
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className=" ml-20 flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-600" />
            <label className="block font-medium mb-1 text-[12px] text-gray-800">
              Dispatch Date <span className="text-red-500">*</span>
            </label>
            <DatePicker
              selected={
                formData.entryDate
                  ? new Date(formData.entryDate.split("/").reverse().join("-"))
                  : null
              }
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Enter date"
              className="block border-b mb-7 border-gray-300 w-[280px] px-3 py-2 text-[12px] font-semibold text-gray-900 rounded-sm mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
                  className="block border-b mb-7 border-gray-300 w-full px-3 py-2 text-[12px] font-semibold text-gray-900 rounded-sm mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
                  className="block border-b mb-7 border-gray-300 w-full px-3 py-2 text-[12px] font-semibold text-gray-900 rounded-sm mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
                  className="block border-b mb-7 border-gray-300 w-full px-3 py-2 text-[12px] font-semibold text-gray-900 rounded-sm mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
                  className="block border-b mb-7 border-gray-300 w-full px-3 py-2 text-[12px] font-semibold text-gray-900 rounded-sm mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
                  className="block border-b mb-7 border-gray-300 w-full px-3 py-2 text-[12px] font-semibold text-gray-900 rounded-sm mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
                  className="block border-b mb-7 border-gray-300 w-full px-3 py-2 text-[12px] font-semibold text-gray-900 rounded-sm mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
              </div>
            </div>
            <div className="p-10 mt-5 sm:ml-10 flex justify-center ">
              <button
                type="submit"
                className="text-center text-white bg-blue-500  text-[13px] font-semibold rounded-md cursor-pointer w-[450px] h-[35px]"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
                          {/* Notification */}
                          {showNotification && (
                <Notification
                    message={notificationMessage}
                    color={color}
                    duration={5000}  // Optional custom duration
                    onClose={handleNotificationClose}
                />
            )}
            </div>
    </>
  );
};

export default RegisterStockForm2;
