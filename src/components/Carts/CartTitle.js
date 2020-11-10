import React from 'react';
import { Link } from 'react-router-dom';

export default function CartTitle({ name, productId }) {
  return (
    <Link to={`/product/${productId}`} className='uppercase font-bold text-lg'>
      {name}
    </Link>
  );
}
