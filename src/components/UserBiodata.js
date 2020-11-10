import React from 'react';

export default function UserBiodata({ name, email }) {
  return (
    <>
      <h2 className='text-center font-bold text-xl text-gray-900 capitalize'>{name}</h2>
      <h2 className='mt-1 text-center font-light text-sm text-gray-600 '>{email}</h2>
    </>
  );
}
