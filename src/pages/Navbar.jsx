import React, { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';
import logo from "../assets/lo1.png";
import Modal from '../components/Modal';
import log from "../assets/lo.png"



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
      const [modelOpen ,setModelOpen] = useState(false)


      const closeModal2 = () => setModelOpen(false);
      const closeModal = () => setModelOpen(false);

      const [message, setMessage] = useState(""); // State for message input

      // Handle form submission to open WhatsApp with the message
      const handleSendMessage = () => {
        if (message.trim()) {
          const phoneNumber = "+250793216191"; // Your WhatsApp number
          const encodedMessage = encodeURIComponent(message);
          const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
          window.open(url, "_blank");
          setMessage(""); // Clear message input after sending
          closeModal2(); // Close the modal
        }
      };



  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
    setDropdownVisible(false);
  };



  return (
    <nav className={`w-full fixed bg-transparent z-50 rounded-t-lg  ${scrolled ? ' transition-all duration-700 ease-in-out rounded-t-lg ' : ''}`}>
      <div className="flex items-center justify-around h-16 px-4">
        {/* Logo */}
        <div>
        <p className="text-[20px] flex text-white  bg-gradient-to-r text-transparent bg-clip-text font-bold tracking-wide drop-shadow-lg">
                  <img src={log} className='w-10 relative left-9 mt-[38px] h-10' />
                  <img src={logo} className='w-28 mt-8 h-20' />
          </p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-green-300 font-semibold text-[13px] underline underline-offset-4' : 'text-gray-300 underline-offset-4 font-semibold text-[13px] hover:underline'}>
           Home
          </NavLink>
          <NavLink to="/Projects" className={({ isActive }) => isActive ? 'text-green-300 font-semibold text-[13px] underline underline-offset-4' : 'text-gray-300 underline-offset-4 font-semibold text-[13px] hover:underline'}>
            Projects
          </NavLink>
          <NavLink to="/Contact" className={({ isActive }) => isActive ? 'text-green-300 font-semibold text-[13px] underline underline-offset-4' : 'text-gray-300  font-semibold underline-offset-4 text-[13px] hover:underline'}>
            Contact us
          </NavLink>
          <NavLink >
            <button onClick={()=>setModelOpen(true)} className='w-[100px] h-[40px] border-green-200  border rounded-full hover:text-zinc-800  text-white transition-all duration-500 font-semibold text-[14px] hover:bg-green-200'>Hire me</button>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex justify-end md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="bg-gray-700 p-2 rounded-md text-white"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            ) : (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <Modal isOpen={modelOpen} onClose={closeModal2}>
        <div className="p-10 w-full sm:w-[400px] h-[300px] bg-zinc-800 rounded-md">
          <h2 className="text-white text-center text-[20px] font-semibold mb-4">WhatsApp</h2>

          <div className="mb-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              className="w-full p-3 text-white bg-zinc-700 rounded-md focus:outline-none"
            />
          </div>

          <div className="flex justify-center gap-4 mt-16">
            <button
              onClick={handleSendMessage}
              className="px-20 py-2 text-white border border-white rounded-full hover:bg-green-500 transition-all duration-75"
            >
              Send
            </button>
            <button
              onClick={closeModal}
              className="px-6 py-2 text-white bg-red-500 rounded-full hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

{/* Mobile Menu Dropdown */}
{isOpen && (
  <div className="md:hidden bg-zinc-700 p-4 space-y-4">
    <NavLink to="/" className="block text-gray-100 font-semibold underline-offset-4 text-[13px] hover:underline">Home</NavLink>
    <NavLink to="/Projects" className="block text-gray-100 font-semibold underline-offset-4 text-[13px] hover:underline">Projects</NavLink>
    <NavLink to="/Contact" className="block text-gray-100 font-semibold underline-offset-4 text-[13px] hover:underline">Contact</NavLink>
    <NavLink >
            <button onClick={()=>setModelOpen(true)} className='w-[100px] h-[40px] mt-3 rounded-full bg-green-500 text-white font-bold text-[14px] hover:bg-green-500'>Hire me</button>
    </NavLink>
  </div>
)}
    </nav>
  );
};

export default Navbar;
