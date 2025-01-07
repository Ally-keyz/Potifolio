import React from 'react';
import Notification from '../components/Notification';
import Spinner from '../components/Spinner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { ACCESS_TOKEN } from '../constants';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import render from "../assets/log.png";
import vid from "../assets/vid.mp4";

function Landing() {
    const [nameMail, setNameMail] = useState('');
    const [Password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [color, setColor] = useState("bg-red-500");

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const navigate = useNavigate();

    const triggerNotification = (message, color) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setColor(color);
    };

    const handleNotificationClose = () => {
        setShowNotification(false);
    };

    const HandleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!nameMail || !Password) {
            triggerNotification("Please enter a name and password", "bg-red-500");
            setIsLoading(false);
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/users/login', {
                email: nameMail,
                password: Password
            });

            if (res && res.data) {
                localStorage.setItem("ACCESS_TOKEN", res.data.token);
                localStorage.setItem("USER", JSON.stringify(res.data.user));
                navigate('/Home');
            } else {
                triggerNotification('Failed to login', "bg-red-500");
            }
        } catch (e) {
            if (e.status === 401) {
                triggerNotification(`Unauthorized please register`, "bg-red-500");
            } else if (e.status == 400) {
                triggerNotification(`Not found`, "bg-red-500");
            } else {
                triggerNotification(`Error ${e.message} while logging in`, "bg-red-500");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className='sm:h-[585px] h-screen w-full flex sm:p-5 bg-blue-900 justify-center items-center'>
                {/* Notification */}
                {showNotification && (
                    <Notification
                        message={notificationMessage}
                        color={color}
                        duration={5000}
                        onClose={handleNotificationClose}
                    />
                )}
                <div className="flex flex-col sm:flex-row justify-center items-center w-full">
                    {/* Video Section */}
                    <div className="hidden sm:block sm:w-[300px] relative shadow-lg h-[410px] mt-5">
                        <video
                            src={vid}
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-cover rounded-l-md"
                        />
                        {/* Mask Overlay */}
                        <div className="absolute inset-0 bg-black rounded-l-md bg-opacity-65 flex items-center justify-center">
                        <div className="">
                            <p className='text-blue-500  ml-5 font-bold text-[17px]'>MINAGRI STOCK</p>
                            <p className='text-white font-semibold text-[17px]'>MANAGMENT SYSTEM</p>
                        </div>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="flex justify-center  shadow-lg mt-5 bg-white  rounded-r-md w-full sm:w-[440px] h-[410px]">
                        <div className="">
                            <div className="flex justify-center">
                                <img src={render} alt="" className="w-[150px] mr-1" />
                            </div>

                            <input
                                type="text"
                                value={nameMail}
                                onChange={(e) => setNameMail(e.target.value)}
                                className="block border-b-2 bg-white border-blue-500 w-full sm:w-[320px] px-[25px] py-2 mb-8 text-[14px] text-gray-600 font-semibold shadow-sm rounded-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800"
                                placeholder="Email or name"
                            />
                            <div className="relative w-full">
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    value={Password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block border-b-2 bg-white border-blue-500 w-full sm:w-[320px] px-[25px] py-2 text-[14px] font-semibold text-gray-600 shadow-sm rounded-sm mt-2 focus:outline-none focus:ring-blue-800 focus:border-blue-800"
                                    placeholder="Password"
                                />
                                <div
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                >
                                    {isPasswordVisible ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                                </div>
                            </div>

                            <Link onClick={HandleLogin} className="flex justify-center w-full ">
                                <div className="transition-colors   duration-500 hover:bg-blue-700 text-center text-white bg-blue-600 pt-1 mt-16 text-[15px] font-bold rounded-md cursor-pointer w-72 h-[32px]">
                                    {isLoading ? <Spinner /> : 'Login'}
                                </div>
                            </Link>
                            <div className="flex justify-center">
                                <div className="text-center text-[10px] mt-4 text-blue-400 font-semibold">
                                    Enter your credentials
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Landing;
