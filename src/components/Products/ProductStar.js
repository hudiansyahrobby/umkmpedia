import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { IconContext } from 'react-icons';

export default function ProductStar({ rating, color, size }) {
  return (
    <div className='rating flex mr-2 -ml-1'>
      <IconContext.Provider value={{ size: size }}>
        {Array(rating)
          .fill()
          .map((_, index) => {
            return (
              <div key={index} className={color}>
                <AiFillStar />
              </div>
            );
          })}
      </IconContext.Provider>
    </div>
  );
}
