import React from 'react';

export default function ProductDetailReview({ score, number }) {
  return (
    <h3 className='ml-2 text-xs font-semibold'>
      {score} <span className='font-light'>( {number} review )</span>
    </h3>
  );
}
