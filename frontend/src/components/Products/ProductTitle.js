import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductTitle({ name, id }) {
  return (
    <Link to={`/produk/${id}`}>
      <h4 className='text-gray-900 mt-2 font-bold hover:text-gray-600 transition duration-300 ease-in-out truncate'>
        {name.toUpperCase()}
      </h4>
    </Link>
  );
}
