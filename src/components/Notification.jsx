import { useState, useEffect } from 'react';
import close from '../assets/closeB.png'

const Notification = ({ message, duration = 7000, onClose , color }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show notification when the component is mounted
    setShow(true);

    // Auto-close after the provided duration
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose(); // Trigger onClose callback if provided
    }, duration);

    return () => clearTimeout(timer); // Cleanup the timer when component unmounts
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-32 z-10 right-5 w-80 p-4 ${color} text-white shadow-lg rounded-lg flex justify-between items-center transition-transform duration-500 ease-in-out ${
        show ? 'translate-x-0' : 'translate-x-96'
      }`}
    >
      <span className='text-[10px] font-semibold'>{message}</span>
      <button
        onClick={() => {
          setShow(false);
          if (onClose) onClose(); // Trigger onClose callback if provided
        }}
        className="text-white text-xl font-semibold hover:text-gray-300 transition-colors duration-300"
      >
        <img src={close} alt="" className='w-3 h-3 ' />
      </button>
    </div>
  );
};

export default Notification;