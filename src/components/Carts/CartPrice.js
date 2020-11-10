import React from 'react';

export default function CartPrice({ price }) {
  return <h3 className='mt-2 text-gray-darker font-semibold'>${price}</h3>;
}
