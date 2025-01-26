import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Modal from '../components/Modal';
import i from "../assets/ic2.png";
import Footer from '../components/footer';
import Img2 from '../components/img2';

// Reusable ProjectCard Component
const ProjectCard = ({ title, description, link, image, openModal }) => (
  <motion.div
    className="bg-gradient-to-r p-5 hover:scale-[1.05] sm:scale-95 scale-110 transition-all duration-500 transform from-green-300 to-zinc-800 w-full sm:w-[350px] h-[250px] rounded-md shadow-md mb-6 sm:mb-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-full h-full p-5 bg-zinc-800 rounded-md">
      <p className='text-green-300 text-[18px] text-center font-semibold'>{title}</p>
      <p className='text-white text-[15px] text-center font-semibold'>{description}</p>
      <div className="flex justify-center mt-5">
        <button
          onClick={openModal}
          className="px-5 mt-5 text-[15px] py-2 rounded-full border border-green-300 text-white font-medium hover:bg-green-500 transition">
          View details
        </button>
      </div>
    </div>
  </motion.div>
);

// Main Component (Project Library)
const ProjectLibrary = () => {
  const [modelOpen, setModelOpen] = useState(false); // Modal state

  const openModal = () => setModelOpen(true); // Function to open the modal
  const closeModal = () => setModelOpen(false); // Function to close the modal

  const projects = [
    {
      title: "Vuduka",
      description: "Rwanda's first online platform for easy bus tickets booking",
      link: "https://vuduka.com",
      image: "", // Add an image if necessary
    },
    {
      title: "Mystock",
      description: "MINAGRI (RAB) stock management system for managing stock keepers and tracking activities.",
      link: "https://mystock.com",
      image: "", // Add an image if necessary
    },
    {
      title: "Chemistry Equation",
      description: "A Python chemistry equation formulator system that formulates given chemistry equations.",
      link: "https://chemistryformulator.com",
      image: "", // Add an image if necessary
    },
    {
      title: "php progress",
      description: "This is my journey to learning different php progress",
      link: "https://project4.com",
      image: "", // Add an image if necessary
    },
    {
      title: "TypeScript  progress",
      description: "Path guide to becoming a typescript expert",
      link: "https://project5.com",
      image: "", // Add an image if necessary
    },
    {
      title: "leetCode problems",
      description: "My journey to solving different leetCode problems",
      link: "https://project6.com",
      image: "", // Add an image if necessary
    },
    {
      title: "CS50-course",
      description: "A havard computer science cource notes and projects",
      link: "https://project6.com",
      image: "", // Add an image if necessary
    },
    {
      title: "Node&Nest-progress",
      description: "My entire journey to learning node js and nest js ",
      link: "https://project6.com",
      image: "", // Add an image if necessary
    },
    {
      title: "Machine Learning progress",
      description: "Different machine learning algorithms towards solving different problems",
      link: "https://project6.com",
      image: "", // Add an image if necessary
    },
  ];

  return (
    <>
      <Navbar />
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 1 } },
        }}
        initial="hidden"
        animate="visible"
        className="h-screen sm:p-32 p-10 sm:mt-0 bg-zinc-800 shadow-md rounded-t-md "
      >
        <div className="flex justify-center sm:mt-0 mt-10 p-4">
          <motion.p
            className="text-[24px] sm:text-[30px] font-semibold mt-4"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <p className="text-center text-[20px] text-white sm:text-[24px] text-stroke mb-8 bg-gradient-to-r from-green-300 to-zinc-800 bg-clip-text font-extrabold tracking-wide drop-shadow-lg">
              Projects Library
            </p>
          </motion.p>
        </div>

        {/* Use grid layout to display 3 projects per row */}
        <div className="grid grid-cols-1 sm:overflow-visible overflow-auto sm:h-full h-[1500px] sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              link={project.link}
              image={project.image}
              openModal={openModal} // Pass openModal function to the ProjectCard
            />
          ))}
        </div>
      </motion.div>

      <div className="w-full h-screen bg-zinc-900"></div>
      <div className="w-full h-screen flex justify-center bg-zinc-800">
        <Img2 />
      </div>
       <div className="w-full p-20 h-[400px] bg-zinc-900"><Footer/>
       </div>

      {/* Modal */}
      <Modal isOpen={modelOpen} onClose={closeModal}>
  <div className="p-5 w-full sm:w-[400px] h-[300px] bg-zinc-800 rounded-md shadow-lg animate-fade-in">
    {/* Modal Header */}
    <div className="text-center">
      <h2 className="text-green-300 text-xl font-bold">Check out this project</h2>
    </div>

    {/* Modal Content */}
    <div className="p-5">
      <p className="text-white text-center text-[15px] mt-2 font-semibold">
        View project on:
      </p>
      <div className="p-2 flex justify-center items-center gap-4 mt-4">
        {/* GitHub Icon */}
        <img
          src={i}
          className="w-10 h-10 transition-transform transform hover:scale-110"
          alt="GitHub Icon"
        />
        {/* GitHub Link */}
        <a
          href="https://github.com/Ally-keyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-300 text-[15px] font-semibold hover:text-green-400 hover:underline"
        >
          github.com/Ally-keyz
        </a>
      </div>
    </div>

    {/* Button to Close or Open GitHub */}
    <div className="flex justify-center mt-6">
      <a
        href="https://github.com/Ally-keyz"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-all"
      >
        Visit GitHub
      </a>
      <button
        onClick={closeModal}
        className="ml-4 bg-zinc-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-zinc-600 transition-all"
      >
        Close
      </button>
    </div>
  </div>
</Modal>

    </>
  );
};

export default ProjectLibrary;
