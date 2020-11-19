import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { IconContext } from 'react-icons';

export default function AddressName({ address, user }) {
  const userAddress = address?.map((city, index) => {
    if (city.city_id === user.city) {
      return (
        <React.Fragment key={index}>
          <IconContext.Provider
            value={{ className: 'text-primary inline-block mr-2', size: '1.6rem' }}
          >
            <span>
              <HiLocationMarker />
            </span>
          </IconContext.Provider>
          <h2 className='font-semibold text-sm'>
            {user.fullAddress}, {city.type} {city.city_name} , Provinsi {city.province}, Kode Pos{' '}
            {city.postal_code}{' '}
          </h2>
        </React.Fragment>
      );
    }
  });

  return <div className='mt-4 flex items-center border-2 border-primary p-4'>{userAddress}</div>;
}
