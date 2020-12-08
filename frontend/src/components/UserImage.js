import React from 'react';
import { generatePublicPath } from '../utils/generatePublicPath';

export default function UserImage({ title, data }) {
  return (
    <div className='w-48 h-48 rounded-full overflow-hidden mx-auto mt-8 shadow-2xl hover:scale-105 transform transition duration-300'>
      <img src={generatePublicPath(data)} alt={title} className='w-full h-full object-cover' />
    </div>
  );
}
