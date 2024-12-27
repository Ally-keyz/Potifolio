import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-5 h-5 border-4 border-dotted rounded-full animate-spin border-white"></div>
    </div>
  );
};

export default Spinner;