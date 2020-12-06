import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { IconContext } from 'react-icons';

export default function AddressName({ address }) {
  return (
    <div className='mt-4 flex items-center border-2 border-primary p-4'>
      <IconContext.Provider value={{ className: 'text-primary inline-block mr-2', size: '1.6rem' }}>
        <span>
          <HiLocationMarker />
        </span>
      </IconContext.Provider>
      <h2 className='font-semibold text-sm'>{address}</h2>
    </div>
  );
}
