import React from 'react';

export default function ProductDetailTitle({ name }) {
  return <h2 className='font-bold text-2xl tracking-wide'>{name.toUpperCase()}</h2>;
}
