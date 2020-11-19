import React from 'react';
import { GiFrayedArrow } from 'react-icons/gi';
import { IconContext } from 'react-icons';

export default function OrderItem({ items }) {
  return (
    <ul className='mt-4'>
      {items?.map((cart) => {
        return (
          <li className='text-sm text-gray-700 mt-3' key={cart._id}>
            <IconContext.Provider
              value={{ className: 'text-primary inline-block mr-2', size: '1.6rem' }}
            >
              <span>
                <GiFrayedArrow />
              </span>
            </IconContext.Provider>
            <span className='font-semibold'>
              {cart.name} - {cart.quantity} {cart.unit}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
