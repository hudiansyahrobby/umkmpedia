import React from 'react';
import { IconContext } from 'react-icons';
import { MdDelete } from 'react-icons/md';

export default function DeleteButton({ onClick }) {
  return (
    <button
      className='bg-red-600 text-white p-1 md:p-2 mt-2 rounded-lg hover:bg-white border-2 border-red-600 transition duration-300 ease-in-out hover:text-red-600 font-semibold tracking-wider text-xs'
      onClick={onClick}
    >
      Hapus
      <IconContext.Provider
        value={{ color: 'text-white', size: '1.2rem', className: 'ml-1 inline-block' }}
      >
        <span>
          <MdDelete />
        </span>
      </IconContext.Provider>
    </button>
  );
}
