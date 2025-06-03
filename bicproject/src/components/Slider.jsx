import React, { useState, useEffect } from 'react';
import slide1 from '../assets/slider8.jpg';
import slide2 from '../assets/slider2.jpg';
import slide3 from '../assets/slider3.jpg';
import slide4 from '../assets/slider4.webp';
import slide5 from '../assets/slider6.jpg';

const Slider = () => {
  const slides = [slide1, slide2, slide3, slide4, slide5];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);

  return (
    <div className="w-full  mx-auto flex flex-col gap-3 items-center justify-center p-4">
      <div className="relative w-full h-60 overflow-hidden rounded-lg shadow-md">
        <img
          src={slides[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-full object-cover transition duration-700 ease-in-out"
        />
      </div>
      <div className="flex mt-4 gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              current === index ? 'bg-yellow-500' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
