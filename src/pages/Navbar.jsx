import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import render from "../assets/log.png";

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
    <nav className={`${scrolled ? 'w-full   fixed z-50 transition-all duration-700 ease-in-out   bg-custom-gradient    ':'w-full   fixed z-50 transition-all duration-700 ease-in-out   bg-custom-gradient '}`}>
      <div className="">
              <div className="ml-10 mt-3 flex">
                <img src={render} alt="" className="w-7 h-7 mr-1" />
                <p className=" font-bold text-[17px]">MyStock</p>
              </div>
      </div>
    </nav>
  );
};

export default Navbar;


