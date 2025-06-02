import React from "react";
import { FaStar } from "react-icons/fa";

const ScoreCard = ({ value = 0, ...props }) => {
  return (
    <div className="flex gap-2" {...props}>
      {[...Array(4)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <FaStar
            key={ratingValue}
            size={15}
            color={ratingValue <= value ? "#facc15" : "#d1d5db"}
          />
        );
      })}
    </div>
  );
};

export default ScoreCard;
