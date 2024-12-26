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
            <div className="flex items-center justify-center w-screen h-screen bg-gray-300">
                <div className="flex flex-col items-center">
                    <img src={render} alt="" className="w-[200px] h-[150px] mb-2" />
                    <div className="ml-3 bouncing-ball"></div>
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
