import React from 'react';
import LazyLoad from 'react-lazyload';
import { generatePublicPath } from '../../utils/generatePublicPath';

export default function CartImage({ image, name }) {
  return (
    <LazyLoad height={200} once>
      <div className='w-32 h-32 rounded-mammoth overflow-hidden mr-3'>
        <img
          src={generatePublicPath(image)}
          alt={name}
          className='w-full h-full object-cover object-center'
        />
      </div>
    </LazyLoad>
  );
}
