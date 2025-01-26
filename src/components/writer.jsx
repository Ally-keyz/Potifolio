import React, { useState, useEffect } from 'react';
import { FaHeart, FaLifeRing, FaSkullCrossbones } from 'react-icons/fa'; // Import the icons
import Modal from './Modal';

const TypewriterPlaceholder = () => {
  const [displayText, setDisplayText] = useState(''); // Placeholder text to display
  const [typingIndex, setTypingIndex] = useState(0); // Current character index
  const [deleting, setDeleting] = useState(false); // Deleting state
  const [textArrayIndex, setTextArrayIndex] = useState(0); // Current array index
  const [color, setColor] = useState('bg-red-500');

  // Array of placeholder texts
  const placeholderTexts = [
    "INEZA MANZI ALPE",
    "CODING ON HEART",
    "CODING FOR LIFE",
    "DIE CODING",
  ];

  const typingSpeed = 100; // Typing speed in ms
  const deletingSpeed = 50; // Deleting speed in ms
  const pauseDuration = 1000; // Pause before starting to delete or switching text

  useEffect(() => {
    const currentText = placeholderTexts[textArrayIndex];
    let timeout;

    if (!deleting) {
      // Typing mode
      if (typingIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + currentText[typingIndex]);
          setTypingIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => setDeleting(true), pauseDuration);
      }
    } else {
      // Deleting mode
      if (typingIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
          setTypingIndex((prev) => prev - 1);
        }, deletingSpeed);
      } else {
        // Pause before switching text
        timeout = setTimeout(() => {
          setDeleting(false);
          setTextArrayIndex((prev) => (prev + 1) % placeholderTexts.length); // Move to the next text
        }, pauseDuration);
      }
    }

    return () => clearTimeout(timeout);
  }, [typingIndex, deleting, textArrayIndex]); // Watch for typingIndex, deleting, and textArrayIndex changes

  // Function to render icons based on the current text
  const renderIcon = (text) => {
    switch (text) {
      case "CODING ON HEART":
        return <FaHeart className="inline-block mr-2 text-red-500" />;
      case "CODING FOR LIFE":
        return <FaLifeRing className="inline-block mr-2 text-green-500" />;
      case "DIE CODING":
        return <FaSkullCrossbones className="inline-block mr-2 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <p className="text-[35px] text-green-300 font-serif flex items-center">
        {renderIcon(placeholderTexts[textArrayIndex])}
        {displayText}
      </p>
    </div>
  );
};

export default TypewriterPlaceholder;
