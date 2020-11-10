import React from 'react';

export default function QuantityButton({ onIncrease, onDecrease, quantity }) {
  return (
    <div className='text-center'>
      <p className='text-gray-lighter text-xl cursor-pointer' onClick={onIncrease}>
        +
      </p>
      <p className='text-gray-darkest'>{quantity}</p>
      <p className='text-gray-lighter text-xl cursor-pointer' onClick={onDecrease}>
        -
      </p>
    </div>
  );
}
