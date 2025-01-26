import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const technologyStack = [
  'React',
  'Node.js',
  'MongoDB',
  'Python',
  'Django',
  'TailwindCSS',
  'JavaScript',
  'Express.js',
  'Socket.IO',
  'Machine Learning',
  'PostgreSQL',
];

const TechnologyStackRain = () => {
  const [stackItems, setStackItems] = useState([]);
  const containerRef = useRef(null); // Reference to the container div

  useEffect(() => {
    const interval = setInterval(() => {
      if (stackItems.length < 5) { // Limiting the number of items on screen at a time
        setStackItems((prev) => [
          ...prev,
          {
            text: technologyStack[Math.floor(Math.random() * technologyStack.length)],
            id: Math.random().toString(36).substring(7), // Generate unique ID
          },
        ]);
      }
    }, 2800); // Increase the interval time to slow things down

    return () => clearInterval(interval); // Cleanup interval
  }, [stackItems]);

  const handleAnimationComplete = (id) => {
    setStackItems((prev) => prev.filter(item => item.id !== id)); // Remove the item after animation is complete
  };

  return (
    <div
      ref={containerRef} // Attach the reference to the container div
      className="p-20 h-[500px]"
    >
      {stackItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{
            y: -100, // All items start from the same position above the container
            opacity: 0,
          }}
          animate={{ y: '100%', opacity: 1 }} // Animate to the bottom of the container
          exit={{ opacity: 0 }}
          onAnimationComplete={() => handleAnimationComplete(item.id)}
          transition={{
            duration: 4, // Duration for slow drop
            type: 'tween', // Use tween for smooth animation
          }}
          className="absolute text-center text-white bg-green-500 px-4 py-2 rounded-full shadow-md"
          style={{
            left: `${Math.random() * 70}%`, // Randomize horizontal position (between 0% and 70%)
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
};

export default TechnologyStackRain;
