import React, { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import Navbar from "./Navbar";
import emailjs from "emailjs-com";
import Notification from "../components/Notification";
import Modal from "../components/Modal";
import Footer from "../components/footer";
import { motion } from "framer-motion"; // Import framer-motion

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const triggerNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000); // Auto-hide notification
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  const closeModal = () => setModalOpen(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setModalOpen(true);

    emailjs
      .send(
        "service_fln5k12", // Replace with your EmailJS service ID
        "template_cnisk5d", // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          to_name: "Manzi", // Replace with recipient's name
          message: `from ${formData.email} : ${formData.message}`,
          reply_to: "manzialpe@gmail.com",
        },
        "gd-JFuxBpDeJ2Nd5M" // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
          triggerNotification("Message sent successfully ");
          setSuccessMessage("Message sent successfully we will reply to you soon");
          setErrorMessage("");
          setLoading(false);
          setModalOpen(false);
          setFormData({ name: "", message: "" ,email:""}); // Reset form
        },
        (error) => {
          console.error(error.text);
          setErrorMessage("Failed to send the message. Please try again.");
          setLoading(false);
          setModalOpen(false);
        }
      );
  };

  return (
    <>
      <Navbar />
      <div className="bg-zinc-800 min-h-screen sm:p-24">
        <div className="text-center mt-10 mb-10">
          <motion.h1
            className="text-[20px] font-bold text-green-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-[14px] font-semibold text-white mt-20 sm:mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            We'd love to hear from you. Please fill out the form below or use the information provided.
          </motion.p>
        </div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            className="bg-white w-full p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-[20px] font-semibold text-gray-800 mb-4">Message us</h2>
            <form onSubmit={sendEmail} autoComplete="off">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-zinc-600 font-semibold mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-zinc-800 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Send Message
              </button>
            </form>
            {successMessage && (
              <p className="mt-4 text-green-500 font-semibold">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="mt-4 text-red-500 font-semibold">{errorMessage}</p>
            )}
          </motion.div>

          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-zinc-950 p-5 rounded-lg shadow-lg">
              <h2 className="text-[20px] font-bold text-white mb-4">Contact Information</h2>
              <div className="flex items-center gap-4 mb-4">
                <MapPin className="text-green-600 w-6 h-6" />
                <div>
                  <p className="font-semibold text-gray-400">Address</p>
                  <p className="text-gray-600">123 Main Street, Kigali, Rwanda</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <Phone className="text-green-600 w-6 h-6" />
                <div>
                  <p className="font-semibold text-gray-400">Phone</p>
                  <p className="text-gray-600">+250 793 216 191</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-green-600 w-6 h-6" />
                <div>
                  <p className="font-semibold text-gray-400">Email</p>
                  <p className="text-gray-600">manzialpe@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31109.64037202609!2d30.061716402504844!3d-1.9440722999999931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca743243f3b61%3A0xe40b8b8fbc3c7b7f!2sKigali%20City%2C%20Rwanda!5e0!3m2!1sen!2s!4v1689332150837!5m2!1sen!2s"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-none"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="h-full w-full p-10 bg-zinc-950">
        <Footer />
      </div>

      {showNotification && (
        <Notification
          message={notificationMessage}
          duration={5000}
          onClose={handleNotificationClose}
          color={"bg-gradient-to-r from-green-300 to-zinc-800"}
        />
      )}

      <Modal isOpen={modalOpen} onClose={closeModal}>
        <div className="flex justify-center">
          <div className="">
            <div className="text-[20px] font-semibold text-green-500">Sending...</div>
            <div className="ml-10 exploding-ball"></div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ContactUs;
