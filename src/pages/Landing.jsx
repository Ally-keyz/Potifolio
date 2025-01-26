import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // For animations
import Navbar from './Navbar';
import TypewriterPlaceholder from '../components/writer';
import me from "../assets/me.jpg";
import ic from "../assets/ic1.png";
import i from "../assets/ic2.png";
import { useNavigate } from 'react-router-dom';
import TechnologyStackRain from '../components/stack';
import Footer from '../components/footer';
import Modal from '../components/Modal';
import ic3 from "../assets/ic3.png"
import Img from '../components/img';
import { X } from 'lucide-react';

function Landing() {
    const [typedText, setTypedText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [hasScrolledDown, setHasScrolledDown] = useState(false);
    const fullText = "IINEZA MANZI ALPE";
    const navigate = useNavigate();
    const [modelOpen ,setModelOpen] = useState(false)


    const closeModal2 = () => setModelOpen(false);

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            setTypedText((prev) => prev + fullText[index]);
            index++;
            if (index === fullText.length) {
                index = 0;
                setTypedText('');
            }
        }, 300);

        return () => clearInterval(typingInterval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll >= scrollPosition) {
                setHasScrolledDown(false);
                setHasScrolledDown(true);
            } else {
                setHasScrolledDown(true);
            }
            setScrollPosition(currentScroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollPosition]);

    const containerVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 1 },
        },
    };

    const textVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    const highlightVariant = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.5 } },
    };

    const imageVariant = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 1 } },
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen w-full flex flex-col justify-center items-center bg-zinc-800 sm:px-20 px-6 rounded-t-lg ">
                <motion.div
                    className="max-w-[600px] w-full text-center sm:text-left"
                    variants={containerVariant}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h2
                        className="text-white text-sm font-semibold"
                        variants={textVariant}
                    >
                        Software Developer
                    </motion.h2>
                    <motion.p
                        className="text-3xl sm:text-4xl text-white font-semibold mt-4"
                        variants={textVariant}
                    >
                        Hello, I'm
                    </motion.p>
                    <motion.p
                        className="text-2xl sm:text-3xl text-green-300 font-serif mt-2"
                        variants={highlightVariant}
                    >
                        <TypewriterPlaceholder />
                    </motion.p>
                    <motion.p
                        className="text-sm sm:text-base font-medium text-white mt-4"
                        variants={textVariant}
                    >
                        I am an innovative software developer dedicated to creating advanced
                        technologies to solve daily problems we face in this world.
                    </motion.p>
                    <motion.div
                        className="mt-6 flex flex-wrap justify-center sm:justify-start items-center gap-4"
                        variants={textVariant}
                    >
                        <button className="px-6 py-2 rounded-full border border-green-300 text-white font-medium hover:bg-green-500 transition">
                            Download CV
                        </button>
                        <a
                            href="https://www.instagram.com/am_manzi__/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer"
                        >
                            <img src={ic} className="w-10 h-10 sm:w-12 sm:h-12" alt="Instagram" />
                        </a>
                        <a
                            href="https://github.com/Ally-keyz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer"
                        >
                            <img src={i} className="w-10 h-10 sm:w-12 sm:h-12" alt="GitHub" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
            <div className=" sm:px-20 py-10 bg-zinc-900">
                <motion.div
                    variants={containerVariant}
                    initial="hidden"
                    animate={hasScrolledDown ? "visible" : "hidden"}
                    className="relative top-[-100px] h-auto sm:h-[500px] bg-zinc-700 shadow-md rounded-md p-6"
                >
                    <div className="flex justify-center p-4">
                        <motion.p
                            className="text-[24px] sm:text-[30px] font-semibold mt-4"
                            variants={textVariant}
                        >
                            <p className="text-center text-[20px] text-white  sm:text-[24px] text-stroke  mb-8 bg-gradient-to-r from-green-300 to-zinc-800 bg-clip-text font-extrabold tracking-wide drop-shadow-lg">
                                Fantastic projects worked on
                            </p>
                            <div>
                                <div className="sm:flex w-full justify-around gap-6">
                                    <div className="bg-gradient-to-r p-5 hover:scale-[1.05] sm:scale-95 scale-110 transition-all duration-500 transform from-green-300 to-zinc-800 w-full sm:w-[350px] h-[250px] rounded-md shadow-md mb-6 sm:mb-0">
                                        <div className="w-full h-full p-5 bg-zinc-800 rounded-md ">

                                            <p className='text-green-300 text-[18px] text-center font-semibold'>Vuduka</p>
                                            <p className='text-white text-[15px] text-center font-semibold'>Rwandan first online platform for <br/> easy bus tickets booking</p>
                                            <div className="flex justify-center">
                                            <a                             target="_blank"
                            rel="noopener noreferrer" href='https://vuduka.netlify.app/'>
                                            <button className="px-5 mt-10 text-[15px] py-2 rounded-full border border-green-300 text-white font-medium hover:bg-green-500 transition">
                                           View project
                                        </button>
                                        </a>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r p-5 hover:scale-[1.05] transition-all duration-500 transform sm:scale-95 scale-110 from-green-300 to-zinc-800 w-full sm:w-[350px] h-[250px] rounded-md shadow-md mb-6 sm:mb-0">
                                    <div className="w-full h-full p-5 bg-zinc-800 rounded-md ">
                                    <p className='text-green-300 text-[18px] text-center font-semibold'>mystock</p>
                                            <p className='text-white text-[15px] text-center font-semibold'>MINAGRI (RAB) stock managment system  for managing  there  stock keeper and track there activities.</p>
                                            <div className="flex justify-center">
                                            <a                             target="_blank"
                            rel="noopener noreferrer" href='https://agristock.netlify.app/'>
                                            <button className="px-5 mt-5 text-[15px] py-2 rounded-full border border-green-300 text-white font-medium hover:bg-green-500 transition">
                                           View project
                                        </button>
                                        </a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="w-full sm:w-[350px] hover:scale-[1.05] sm:scale-95 scale-110 transition-all duration-500 transform h-[250px] rounded-md shadow-md">
                                    <div className="w-full h-full p-10 bg-zinc-800 rounded-md ">
                                    <p className='text-green-300 text-[18px] text-center font-semibold'>Chemistry equation</p>
                                            <p className='text-white text-[15px] text-center font-semibold'>Python chemistry equation formulator , a system that is able to formulate a given chemistry equation and give the output</p>
                                            <div className="flex justify-center">
                                                <a                             target="_blank"
                            rel="noopener noreferrer" href='https://github.com/Ally-keyz/Python-chemistry_calculator'>
                                            <button className="px-5 mt-5 text-[15px] py-2 rounded-full border border-green-300 text-white font-medium hover:bg-green-500 transition">
                                           View project
                                        </button>
                                        </a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </motion.p>
                    </div>
                </motion.div>
            </div>
            <div className="bg-zinc-700 mt-20 flex justify-center sm:p-10 w-full h-screen">

                <div className="bg-zinc-900  flex justify-center sm:p-10 relative top-[-100px] sm:w-[900px] w-full h-[450px] sm:rounded-md">
                    <div className="">
                    <div className="text-white text-center mb-10 sm:mb-0 text-[17px] font-bold">Technology stack</div>
                    <div className="flex justify-center">
                    <div onClick={()=>setModelOpen(true)} className="bg-gradient-to-r  cursor-pointer p-5 hover:scale-[1.05] transition-all duration-500 transform sm:scale-95 scale-110  from-zinc-700 to-zinc-800 w-full sm:w-[350px] h-[250px] rounded-md shadow-md mb-10 sm:mb-0">
                        <div className="w-full h-[100px] p-5 rounded-md border border-white">
                        <div className="text-green-300 text-center text-[16px] font-bold">NODE JS</div>
                        <div className="text-orange-300 text-center text-[16px] font-bold">SOCKET IO</div>
                        <div className="text-blue-300 text-center text-[16px] font-bold">TYPE SCRIPT</div>
                        </div>
                        <div className="text-white mt-5 text-center text-[14px] font-semibold">For backend development</div>
                    </div>
                    </div>
                    <div className="sm:flex ">
                        <div onClick={()=>setModelOpen(true)} className="bg-gradient-to-r cursor-pointer p-5 hover:scale-[1.05] transition-all duration-500 transform sm:scale-95 scale-110 from-zinc-700 to-zinc-800 w-full sm:w-[350px] h-[250px] rounded-md shadow-md mb-10 sm:mb-0">
                        <div className="w-full h-[100px] p-5 rounded-md border border-white">
                        <div className="text-blue-300 text-center text-[16px] font-bold">REACT JS</div>
                        <div className="text-purple-300 text-center text-[16px] font-bold">TAILWIND CSS</div>
                        <div className="text-blue-300 text-center text-[16px] font-bold">TYPE SCRIPT</div>
                        </div>
                        <div className="text-white mt-5 text-center text-[14px] font-semibold">For front end development</div>
                        </div>
                        <div onClick={()=>setModelOpen(true)} className="bg-gradient-to-r cursor-pointer p-5 hover:scale-[1.05] transition-all duration-500 transform sm:scale-95 scale-110 from-zinc-700 to-zinc-800 w-full sm:w-[350px] h-[250px] rounded-md shadow-md mb-10 sm:mb-0">
                        <div className="w-full h-[100px] p-5 rounded-md border border-white">
                        <div className="text-green-300 text-center text-[16px] font-bold">PYTHON</div>
                        <div className="text-blue-300 text-center text-[16px] font-bold">DJANGO</div>
                        <div className="text-red-300 text-center text-[16px] font-bold">PANDAS</div>
                        </div>
                        <div className="text-white mt-5 text-center text-[14px] font-semibold">For web development</div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                    <div onClick={()=>setModelOpen(true)} className="bg-gradient-to-r p-5 cursor-pointer hover:scale-[1.05] transition-all duration-500 transform sm:scale-95 scale-110 from-zinc-700 to-zinc-800 w-full sm:w-[350px] h-[250px] rounded-md shadow-md mb-10 sm:mb-0">
                    <div className="w-full h-[100px] p-5 rounded-md border border-white">
                        <div className="text-green-300 text-center text-[16px] font-bold">MACHINE LEARNING</div>
                        <div className="text-orange-300 text-center text-[16px] font-bold">KERAS</div>
                        <div className="text-blue-300 text-center text-[16px] font-bold">TENSOR FLOW</div>
                        </div>
                        <div className="text-white mt-5 text-center text-[14px] font-semibold">For machine learning</div>
                    </div>
                    </div>

                    </div>
                </div>
            </div>

            <div className="w-full h-[100px] bg-zinc-300">

            </div>
            <div className="w-full flex justify-center sm:mt-0 mt-56 sm:p-64 h-screen bg-zinc-800">
                <Img />
            </div>
            <div className="w-full sm:p-64 h-screen bg-zinc-950">
                <Footer/>
            </div>
            <Modal isOpen={modelOpen} onClose={closeModal2}>
      <div className="p-5 w-full sm:w-[400px] h-[300px] bg-zinc-800 rounded-md relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-white text-xl"
          onClick={closeModal2}
        >
          <X />
        </button>

        <div className="text-white text-center text-[16px] font-bold">
          Discover more about me
        </div>

        <div className="p-5 flex justify-center">
          <img src={ic3} className="w-10 h-10" alt="Phone Icon" />
          <p className="text-green-300 text-[15px] ml-2 mt-2 font-semibold">Catch me up on:</p>
          <a
            href="tel:+250793216191"
            className="text-white text-[15px] font-semibold mt-2 hover:text-green-300 transition"
          >
            +250793216191
          </a>
        </div>

        <div className="p-5">
          <p className="text-white text-center text-[15px] ml-2 mt-2 font-semibold">
            View many of my projects on
          </p>
          <div className="p-2 flex justify-center">
            <img src={i} className="w-10 h-10" alt="GitHub Icon" />
            <p className="text-green-300 text-[15px] ml-2 mt-2 font-semibold">Github:</p>
            <a
              href="https://github.com/Ally-keyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-[15px] font-semibold mt-2 hover:text-green-300 transition"
            >
              https://github.com/Ally-keyz
            </a>
          </div>
        </div>
      </div>
    </Modal>
        </>
    );
}

export default Landing;
