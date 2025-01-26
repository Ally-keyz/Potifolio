import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
import render from "../assets/bg.jpg"; // Correct import for the background image
import Landing from './Landing';
import logo from "../assets/lo1.png"
import log from "../assets/lo.png"

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
        <p className="text-[20px] flex text-white  bg-gradient-to-r text-transparent bg-clip-text font-bold tracking-wide drop-shadow-lg">
                  <img src={log} className='w-10 relative left-10 mt-[44px] h-10' />
                  <img src={logo} className='w-32 mt-8 h-24' />
          </p>

                        </div>
                    </div>
                    <div className="ml-20 exploding-ball"></div>
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
