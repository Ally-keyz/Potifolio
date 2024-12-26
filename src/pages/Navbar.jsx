import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); 
  const [openModal, setIsModalOpen] = useState(false);
  const openModals = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false); 
  const [teacherName, setNameMail] = useState('');
  const [teacherPassword, setPassword] = useState(''); 
  const navigate = useNavigate();

  const handleTeacherLogin = async (event) => {
    event.preventDefault();
  
    if (!teacherName || !teacherPassword) {
      alert("Please fill in all fields");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/teacherAuth/teacherLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacherName: teacherName,
          teacherPassword: teacherPassword,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        
        const token = data.token;
        if (token) {
          localStorage.setItem('authToken', token); // Store token in localStorage
          alert("Logged in successfully");
          navigate('/Teacher'); // Navigate to dashboard
        } else {
          alert("Token not received. Please try again.");
        }
      } else {
        alert(data.error || "Failed to login");
        navigate('/')
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred during login");
    }
};  
    
  useEffect(() => {
   const handleScroll = () => {
     if (window.scrollY > 100) {
       setScrolled(true);
     } else {             
       setScrolled(false);
     }
   };
   window.addEventListener('scroll', handleScroll);
   return () => {
     window.removeEventListener('scroll', handleScroll);
   };      
   
                                                
 }, [])

  return (
    <nav className={`${scrolled ? 'w-full   fixed z-50 transition-all duration-700 ease-in-out shadow-sm  bg-custom-gradient bg-black   ':'w-full   fixed z-50 transition-all duration-700 ease-in-out shadow-sm  bg-custom-gradient bg-black '}`}>
      <div className="w-full flex items-center h-16 justify-between sm:justify-around px-4">
        <div className="flex items-center ">
          <h1 className="text-white font-semibold  text-lg">Django <span className='text-red-500'>Mastering</span></h1>
        </div>
        <div className="hidden md:flex items-center space-x-4">
            <NavLink to={'/'} className={({isActive})=> isActive ? 'text-red-400 text-[13px] underline underline-offset-8':'text-white text-[13px]  transition-colors duration-300  hover:underline hover:underline-offset-8' } >Home</NavLink>
            <NavLink to={'/Register'} className={({isActive})=> isActive ? 'text-red-400  text-[13px] underline underline-offset-8':'text-white text-[13px]  transition-colors duration-300  hover:underline hover:underline-offset-8' } >Register</NavLink>
            <NavLink to={'/Projects'} className={({isActive})=> isActive ? 'text-red-400  text-[13px] underline underline-offset-8':'text-white text-[13px]  transition-colors duration-300  hover:underline hover:underline-offset-8' } >Projects</NavLink>
            <NavLink to={'/Turtorials'} className={({isActive})=> isActive ? 'text-red-400  text-[13px] underline underline-offset-8':'text-white text-[13px]  transition-colors duration-300  hover:underline hover:underline-offset-8' } >Turtorials</NavLink>
            
      
        </div>
        <div className="hidden md:flex items-center space-x-4">

          <a href="#help" className="text-white hover:text-blue-500 transition-colors duration-300 hover:underline hover:underline-offset-8" style={{fontSize:14}}>Help</a>
        </div>
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-500 px-2 pt-2 pb-3 space-y-1">
          <a href="#home" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Home</a>
          <a href="#download" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Download</a>
          <a href="#about" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">About</a>
          <a href="#contact" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


