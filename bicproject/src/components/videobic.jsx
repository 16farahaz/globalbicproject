import React from 'react';
import video from '../assets/video.mp4';

const VideoBic = () => {
  return (
    <div className='w-800 h-full mx-auto flex flex-col gap-4 items-center justify-center p-4 '>
      <video
        autoPlay
        muted
        loop
        className="w-800 max-w-3xl aspect-video rounded-lg shadow-lg"
      >
        <source src={video}  />
        Your browser does not support the video tag. 
        <a href={video} download className="text-blue-500 underline">Download the video</a>
      </video>
    </div>
  );
};

export default VideoBic;
