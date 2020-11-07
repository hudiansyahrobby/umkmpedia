import React from 'react';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

function Tab({ id, name, onClick }) {
  return (
    <>
      <span
        className='mr-4 text-gray-700  tracking-wider cursor-pointer hover:text-red-hell transition duration-300 font-semibold ease-in-out'
        onClick={() => onClick(id)}
        key={id}
      >
        {capitalizeFirstLetter(name)}
      </span>
    </>
  );
}

export default Tab;
