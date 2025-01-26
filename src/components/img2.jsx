import React, { useRef, useState } from 'react';
import me from "../assets/aa.png";
import TypewriterPlaceholder from './writer';
import vid from "../assets/vid3.mp4";

function Img2() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    alert("The video has finished playing!");
  };

  const handleWaiting = () => {
    setIsBuffering(true);
  };

  const handlePlaying = () => {
    setIsBuffering(false);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlayVideo();
    }
  };

  return (
    <div>
      <div className="flex relative top-[-20px] justify-center sm:w-[600px] w-full p-5 rounded-md h-[400px] scale-80 cursor-pointer hover:scale-110 transition-all duration-500 bg-white">
        {/* Video Section */}
        <div className="hidden sm:block sm:w-[600px] relative shadow-lg h-[410px] mt-5">
          <video
            ref={videoRef}
            src={vid}
            className="w-full h-full object-cover rounded-l-md"
            loop={true}
            onClick={togglePlayback} // Added onClick to toggle playback
            onPlay={() => setIsPlaying(true)}
            onPause={handlePause}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onWaiting={handleWaiting}
            onPlaying={handlePlaying}
          />
          {/* Mask Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black rounded-l-md bg-opacity-70 flex items-center justify-center">
              <button
                onClick={handlePlayVideo}
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition"
              >
                Play Video
              </button>
            </div>
          )}
          {/* Buffering Indicator */}
          {isBuffering && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold bg-black bg-opacity-50 rounded-l-md">
              Buffering...
            </div>
          )}
        </div>

        {/* Text Section */}
        <div className="w-full rounded-r-md bg-zinc-800 p-5 h-[400px]">
          <p className="text-center text-[18px] font-semibold text-green-300">
            What coding is about?
          </p>
          <p className="text-center text-[16px] font-semibold text-white">
            It's about consistency
          </p>
          <p className="text-center text-[16px] font-semibold text-white">
            It's about determination
          </p>
          <p className="text-center text-[16px] font-semibold text-white">
            It's about love
          </p>
          <div className="mt-20">
            <TypewriterPlaceholder />
          </div>
          {/* Playback Time Display */}
        </div>
      </div>
    </div>
  );
}

export default Img2;
