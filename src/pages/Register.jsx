import React from 'react'
import Notification from '../components/Notification'
import Spinner from '../components/Spinner'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../api';
import axios from 'axios';
import { ACCESS_TOKEN ,REFRESH_TOKEN } from '../constants';
import Navbar from './Navbar';

function Register() {
    const [nameMail, setNameMail] = useState('');
    const [Password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    
    const navigate = useNavigate(); 
  
    const triggerNotification = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
    };
  
    const handleNotificationClose = () => {
        setShowNotification(false);
    };


    const HandleLogin = async (e) => {
        e.preventDefault();  // Fix here
        setIsLoading(true);

        if (!nameMail || !Password) {
            triggerNotification("Please enter a name and password");
            setIsLoading(false);
            return;
        }

        try {
            const res = await axios.post('http://localhost:8000/myapp/auth/register', {
                username: nameMail,  // Change this according to what your API expects
                password: Password
            });

            if (res.status == 201) {  // Checking if response contains data
                triggerNotification('User registered successfuly')
            } else if(res.status == 400){
                triggerNotification('User already exists');
            }
            else{
                triggerNotification('Failed to login')
            }
        } catch (e) {
            triggerNotification(`${e.message} while registering `);
            console.log(e.message)
        } finally {
            setIsLoading(false);
        }
    };
  return (
    <>
    <Navbar />
    <div className='h-[585px] w-full flex bg-gray-900'>
    </div>
                {/* Notification */}
                {showNotification && (
            <Notification
                message={notificationMessage}
                duration={5000}  // Optional custom duration
                onClose={handleNotificationClose}
            />
        )}
    <div className="flex justify-center bg-gradient-to-r from-black to-gray-800 absolute left-16 sm:left-[470px] top-32  rounded-lg shadow-xl  w-[320px] h-96  ">
        <div className="">
        <div className=" mt-5 text-center mb-10 text-[18px] text-white font-extrabold">Register</div>
        
        <input
    type="text"
    value={nameMail}
    onChange={(e) => setNameMail(e.target.value)}
    className="block  w-full px-12 py-2 text-[10px] text-red-500 shadow-md rounded-lg mt-2  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    placeholder="Email or name"
  />
       <input
    type='password'
    value={Password}
    onChange={(e) => setPassword(e.target.value)}
    className="block  w-full px-12 py-2 text-[10px] text-red-500 shadow-md rounded-lg mt-2  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    placeholder="Password"
  />

   <Link onClick={HandleLogin} className="transition-colors duration-500 hover:bg-white">
   <div  className="text-center text-white bg-gradient-to-l from-blue-700 to-indigo-700 pt-1 mt-16    text-[11px] font-semibold rounded cursor-pointer     w-52 h-7 ">
   {isLoading ? <Spinner  />: 'Register'}
   </div>  
        </Link>
        <div className="tex-center text-[10px] mt-4 ml-12 text-white font-semibold">
            Have an account? <span className='text-red-500 cursor-pointer'><Link to={'/'}>Login</Link></span>
        </div>
        </div>

</div>
</>
  )
}

export default Register