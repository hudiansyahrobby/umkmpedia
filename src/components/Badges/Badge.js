import React from 'react';

function Badge({ data }) {
  return (
    <div className='mr-2'>
      <span className='py-2 px-3 rounded-md bg-gray-lightest text-gray-normal tracking-wider text-sm font-semibold'>
        {data}
      </span>
    </div>
  );
}

export default Badge;
