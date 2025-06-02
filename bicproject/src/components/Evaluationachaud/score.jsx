import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Score = ({ onChange }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleClick = (value) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div className="flex gap-2">
      {[...Array(4)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
              className="hidden"
            />
            <FaStar
              size={30}
              className="cursor-pointer transition-colors"
              color={
                ratingValue <= (hover || rating)
                  ? "#facc15"
                  : "#d1d5db"
              }
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Score;
