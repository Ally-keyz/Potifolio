import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logo2.png';
import schedule from '../assets/schedule-icon-35779.png';
import right from '../assets/right-arrow-icon-7589.png';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate =  useNavigate()

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
const handleLogout = ()=>{
    localStorage.clear()
    navigate('/')
}



  return (
    <div className="flex h-screen">
      <div className={`fixed z-20 h-full   bg-gray-800 shadow-sm text-white flex flex-col pt-10 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-36`}>
        <div className="flex justify-center font-bold text-[18px]">
          <div className="w-[10000px] flex  text-blue-500 h-[60px] bg-gray-800 relative top-[-40px]">
            <div className="ml-5 mt-3 flex">
              <h1 className="text-red-500 mt-1 mr-2 font-bold flex justify-center text-[15px]"><span className='text-white mr-1'>Django</span> Master</h1>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-2 py-1 space-y-1">
          <NavLink to="/Home" className="flex button text-[9px] text-red-500 items-center px-2 py-2 text-sm font-semibold rounded transition-colors duration-700 hover:bg-black">
          <img src={schedule} className="mr-3 h-5 w-5" alt="Schedule" />
            Home
          </NavLink>
        </nav>
        <div className="flex pl-5 mb-10 cursor-pointer">
          <div onClick={handleLogout} className="text-[12px]  pr-3 font-semibold hover:text-black transition-colors duration-700 text-red-500">
            Log <span className='text-white'>Out</span>
          </div>
          <div>
            <img src={right} className="mr-3 h-5 w-5" alt="Logout" />
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm shadow-gray-100  p-9 fixed w-full z-50 flex justify-evenly items-center">
  
    <div className="flex justify-end items-center">
         
          </div>
          <button className="md:hidden text-blue-400" onClick={toggleSidebar}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </header>
        <main className="flex-1 p-6 overflow-auto   mt-16 scrollbar-custom">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

