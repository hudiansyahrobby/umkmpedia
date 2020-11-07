import React from 'react';
import { Link } from 'react-router-dom';

function Category({ children, image, id }) {
  return (
    <div className='overflow-hidden h-24 md:h-32 w-full max-w-xs rounded-mammoth '>
      <Link
        to={`/products/${id}`}
        style={{
          backgroundImage: `linear-gradient( to right, rgba(0, 0, 0) , rgba(0, 0, 0, 0)), url(${image})`,
        }}
        className='w-full h-full bg-cover bg-center flex justify-center items-center cursor-pointer hover:scale-110 transform transition duration-300 ease-in-out'
      >
        <h3 className='text-3xl font-semibold text-white tracking-widest text-center absolute'>
          {children}
        </h3>
      </Link>
    </div>
  );
}

export default Category;
