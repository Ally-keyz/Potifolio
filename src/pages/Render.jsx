import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
import render from "../assets/log.png";
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
            <div className="flex items-center justify-center w-screen h-screen ">
                <div className="">
                <div className="flex flex-col items-center">
                <div className="">
                        <img src={render} alt="" className="w-[200px] h-[200px] mr-1" />
                    </div>
                    </div>
                    <div className=" ml-20 bouncing-ball"></div>
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
