// StarRating.js
import React from 'react';



type StarProps = {
    filled: boolean, // Is the star filled or empty?
  };

  type RatingProps = {
    rating:number
  }


const Star = ({ filled } : StarProps) => {
  const starStyle = {
    color: filled ? '#FFD700' : '#e4e5e9', // Yellow for filled, gray for empty
    fontSize: '25px',
    marginRight: '5px',
  };

  return (
    <span style={starStyle}>
      {filled ? '★' : '☆'}
    </span>
  );
};



const StarRating = ({ rating }: RatingProps) => {
  const maxRating = 5; // Maximum number of stars

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {Array.from({ length: maxRating }, (v, i) => (
        <Star key={i} filled={i < rating} />
      ))}
    </div>
  );
};

export default StarRating;
