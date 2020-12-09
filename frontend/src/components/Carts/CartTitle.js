import React from 'react';
import { Link } from 'react-router-dom';

export default function CartTitle({ name, productId }) {
  return (
    <Link to={`/produk/${productId}`} className='uppercase font-bold text-sm md:text-lg'>
      {name}
    </Link>
  );
}
