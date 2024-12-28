import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
import render from "../assets/logo2.png";
import Landing from './Landing';




function Render() {
    const [count, setCount] = useState(0);
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setCount(1);
        }, 2000); // 1000ms = 2 sec

        return () => clearTimeout(timer);
    }, []);

    if (count === 0) {
        return (
            <div className="flex items-center justify-center w-screen h-screen bg-gray-50">
                <div className="">
                <div className="flex flex-col items-center">
                <div className="relative w-10 h-10 animate-spin">
                    <div className="absolute inset-0  border-transparent rounded-full bg-gradient-to-r from-blue-300 to-indigo-400 mask border-4 mask:border-4">
                        <div className="absolute inset-0 border-4 border-transparent rounded-full bg-white"></div>
                    </div>

                </div>
                <div className="">
                        <p className='text-[15px] text-blue-600 font-semibold'>MyStock</p>
                    </div>
                    </div>
                    <div className=" ml-3 bouncing-ball"></div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Landing />
            </div>
        );
    }
}

export default Render;
