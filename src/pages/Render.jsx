import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
import render from "../assets/bg.jpg"; // Correct import for the background image
import Landing from './Landing';
import logo from "../assets/lo1.png"

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
            <div
                className="relative flex p-24 justify-center w-screen h-screen bg-gray-300   bg-center"

            >
                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black opacity-75 z-0"></div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="flex flex-col items-center">
                        <div>
                        <p className="text-[24px] text-white mb-20 bg-gradient-to-r   bg-clip-text font-extrabold tracking-wide drop-shadow-lg">
                        <img src={logo} className='w-40 h-32' />
                         </p>

                        </div>
                    </div>
                    <div className="ml-16 exploding-ball"></div>
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
