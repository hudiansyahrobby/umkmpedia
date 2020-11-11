import React, { useState } from 'react';

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  return (
    <div className='flex items-center'>
      <span className='mr-2'>Search:</span>
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          setFilter(e.target.value);
        }}
        className='shadow appearance-none border rounded w-full py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
      />
    </div>
  );
};