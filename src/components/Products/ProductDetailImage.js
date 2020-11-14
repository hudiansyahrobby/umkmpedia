import React from 'react';
import { generatePublicPath } from '../../utils/generatePublicPath';

export default function ProductDetailImage({ name, image }) {
  return (
    <div className='mx-auto'>
      <img
        src={generatePublicPath(image)}
        alt={name}
        className='w-full h-full object-contain object-center'
      />
    </div>
  );
}
