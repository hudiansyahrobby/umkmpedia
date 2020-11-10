import React from 'react';
import { generatePublicPath } from '../../utils/generatePublicPath';

export default function ProductDetailImage({ name, image }) {
  return (
    <div className='mx-auto w-64 h-64 rounded-mammoth overflow-hidden'>
      <img
        src={generatePublicPath(image)}
        alt={name}
        className='w-full h-full rounded-mammoth object-contain object-center'
      />
    </div>
  );
}
