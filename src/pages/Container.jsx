import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Modal from '../components/Modal';
import log from "../assets/log.png";
import icon1 from "../assets/i1.png";
import icon2 from "../assets/i2.png";
import icon3 from "../assets/i3.png";
import icon4 from "../assets/i4.png";
import icon5 from "../assets/i5.png";
import icon6 from "../assets/i6.png";
import user from "../assets/person.png";



const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const[users,setUsers] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState("");
  const [modelOpen ,setModelOpen] = useState(false)


const closeModal2 = () => setModelOpen(false);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch("http://worldtimeapi.org/api/timezone/Africa/Kigali");
        const data = await response.json();

        // Parse the datetime string from the API
        const date = new Date(data.datetime); // Creates a Date object
        const hour = date.getUTCHours() + 2; // Adjust for Kigali timezone (UTC+2)

        // Format the time to AM/PM
        const formattedTime = date.toLocaleTimeString("en-US", {
          timeZone: "Africa/Kigali",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

        setTime(formattedTime);

        // Set greeting based on the hour
        if (hour >= 0 && hour < 12) {
          setGreeting("Good Morning");
        } else if (hour >= 12 && hour < 18) {
          setGreeting("Good Afternoon");
        } else {
          setGreeting("Good Evening");
        }
      } catch (error) {
        console.error("Failed to fetch time:", error);
        setGreeting("Hello"); // Fallback greeting
        console.log(time);
      }
    };

    fetchTime();
  }, []);


  // Check for token in localStorage


  useEffect(() => {

    const token = localStorage.getItem("ACCESS_TOKEN");
    const user = localStorage.getItem("USER");
    if (user){
      try {
        const parsedUser = JSON.parse(user);
        setUsers(parsedUser);
      } catch (e) {
        console.error("Error parsing user data:", e);
        setUsers(null); // Clear the user state if parsing fails
      }
    }
    if (!token || !user) {
      navigate('/');
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="flex   h-screen">
      <div className="p-3">
        <div className={`fixed z-20 h-full rounded-md bg-blue-200 shadow-sm text-white flex flex-col pt-10 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-[200px]'} md:relative md:translate-x-0 w-[200px]`}>
          <div className="flex justify-center font-bold text-[18px]">
            <div className="w-[10000px] flex text-black text-[13px] h-[80px] rounded-t-md bg-blue-200 relative top-[-40px]">
              <div className=" mb-10 ml-3 justify-center flex">
                <img src={log} alt="" className="w-[155px] h-[155px] mr-1" />
              </div>
            </div>
          </div>
          <nav className="flex-1 px-2 py-1 space-y-1">
            <NavLink
              to="Home"
              className={({ isActive }) =>
                `flex button text-[9px] items-center px-2 py-2 text-sm font-semibold rounded transition-colors duration-700 ${
                  isActive ? 'text-blue-400 bg-blue-300' : 'text-gray-400 hover:bg-gray-200'
                }`
              }
            >
              <img src={icon2} className="w-5 h-5 mr-2" alt="" />
              <p>Dashboard</p>
            </NavLink>
            <NavLink
              to="Stock"
              className={({ isActive }) =>
                `flex button text-[9px] items-center px-2 py-2 text-sm font-semibold rounded transition-colors duration-700 ${
                  isActive ? 'text-blue-400 bg-blue-300' : 'text-gray-500 hover:bg-gray-200'
                }`
              }
            >
              <img src={icon4} className="w-5 h-5 mr-2" alt="" />
              <p>Stock</p>
            </NavLink>
            <NavLink
              to="Entry"
              className={({ isActive }) =>
                `flex button text-[9px] items-center px-2 py-2 text-sm font-semibold rounded transition-colors duration-700 ${
                  isActive ? 'text-blue-400 bg-blue-300' : 'text-gray-500 hover:bg-gray-200'
                }`
              }
            >
              <img src={icon3} className="w-5 h-5 mr-2" alt="" />
              <p>Entery</p>
            </NavLink>
            <NavLink
              to="Dispatched"
              className={({ isActive }) =>
                `flex button text-[9px] items-center px-2 py-2 text-sm font-semibold rounded transition-colors duration-700 ${
                  isActive ? 'text-blue-400 bg-blue-300' : 'text-gray-500 hover:bg-gray-200'
                }`
              }
            >
              <img src={icon5} className="w-5 h-5 mr-2" alt="" />
              <p>Dispatch</p>
            </NavLink>
            <NavLink
              to="Report"
              className={({ isActive }) =>
                `flex button text-[9px] items-center px-2 py-2 text-sm font-semibold rounded transition-colors duration-700 ${
                  isActive ? 'text-blue-400 bg-blue-300' : 'text-gray-500 hover:bg-gray-200'
                }`
              }
            >
              <img src={icon6} className="w-5 h-5 mr-2" alt="" />
              <p>Report</p>
            </NavLink>
          </nav>
          <div className="flex pl-5 mb-10 cursor-pointer"></div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="p-2 mt-4 fixed w-full z-50 flex sm:justify-between justify-around">
          <div>
            <div className="">
            <h2 className="hidden sm:block text-[16px] text-gray-600 font-bold">Welcome <span className='text-blue-500'>{users.name}</span></h2>
            <h1 className="text-[12px] hidden sm:block text-gray-300 font-semibold">{greeting}! {time} </h1>
            </div>
          </div>
          <div onClick={()=>setModelOpen(true)} className="sm:mr-[300px] cursor-pointer w-[200px] flex  rounded-full bg-gray-100">
            <img src={user}  className='w-10   h-10' alt="" />  
            <p className='text-[13px] font-semibold text-gray-600 mt-[10px] ml-10'>Store manager</p>
          </div>
          <button className="md:hidden text-blue-400" onClick={toggleSidebar}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </header>
        <main className="flex-1 p-6 overflow-auto mt-16 scrollbar-custom">
          {children}
        </main>
      </div>
      <Modal isOpen={modelOpen} onClose={closeModal2}>
        <div className="p-5 sm:p-0 w-full sm:w-[400px] h-[300px] bg-white rounded-md">
          <div className="flex justify-center p-4 w-full">
          <img src={user} className='w-10 h-10' alt="" />
          </div>
          <div className="w-full flex justify-center p-5">
            <div className="">
          <p className='text-[15px] text-blue-500  font-bold'>Store manager: <span className='text-gray-500'>{users.name}</span></p>
          <p className='text-[15px] text-blue-500  font-bold'>Branch: <span className='text-gray-500'>{users.wareHouse}</span></p>
          </div>
          </div>
          <div className="w-full flex justify-center mt-1">
            <div onClick={handleLogout} className="text-center  text-white bg-gradient-to-l from-blue-400 to-indigo-400 pt-1 mt-16    text-[13px] font-semibold rounded cursor-pointer     w-64 h-[28px] ">
              Log Out
            </div>
          </div>
              </div>
        </Modal>
    </div>
  );
};

export default Layout;

