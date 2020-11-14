import React from 'react';
import Button from './Buttons/Button';

export default function UserBiodata({ name, email }) {
  return (
    <>
      <h2 className='text-center font-bold text-xl text-gray-900 capitalize'>{name}</h2>
      <h2 className='mt-1 text-center font-light text-sm text-gray-600'>{email}</h2>
      <Button
        background='bg-primary hover:bg-orange-400'
        size='big'
        variant='mx-auto w-40 mt-4 block font-bold'
        link='/profil/update'
      >
        Update Profil
      </Button>
    </>
  );
}
