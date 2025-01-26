import React from 'react';
import { motion } from 'framer-motion';
import ic from "../assets/ic1.png";  // Instagram icon
import i from "../assets/ic2.png";  // GitHub icon
import con from "../assets/ic3.png"

const Footer = () => {
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, staggerChildren: 0.2 } },
  };

  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const iconVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.5 } },
  };

  return (
    <motion.footer
      className=""
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="container border-t border-white mx-auto px-6">
        <div className="text-center">
          <motion.h3 className="text-3xl mt-5 text-white font-bold mb-4" variants={textVariant}>
            Stay Connected
          </motion.h3>
          <motion.p className="text-[15px] font-semibold text-white mb-8" variants={textVariant}>
            I'm always open to discuss new projects, ideas, or opportunities to collaborate.
          </motion.p>

          <motion.div className="flex justify-center gap-6 mb-6" variants={containerVariant}>
            <a
              href="https://www.instagram.com/am_manzi__/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <motion.img
                src={ic}
                className="w-10 h-10 sm:w-12 sm:h-12"
                alt="Instagram"
                variants={iconVariant}
              />
            </a>
            <a
              href="https://github.com/Ally-keyz"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <motion.img
                src={i}
                className="w-10 h-10 sm:w-12 sm:h-12"
                alt="GitHub"
                variants={iconVariant}
              />
            </a>
            <a
              href="https://github.com/Ally-keyz"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer flex text-green-300"
            >
              <motion.img
                src={con}
                className="w-10 h-10  sm:w-12 sm:h-12"
                alt="whatsapp"
                variants={iconVariant}
              />
              <p className='mt-3 font-semibold ml-2'>+250793216191</p>

            </a>
          </motion.div>

          <motion.p className="text-sm text-white font-medium mb-2" variants={textVariant}>
            © 2025 Ineza Manzi Alpe | All Rights Reserved
          </motion.p>

          <motion.div className="text-sm text-white" variants={textVariant}>
            <p>Designed and Developed with ❤️</p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
