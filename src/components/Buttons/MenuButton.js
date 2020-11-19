import React from 'react';
import { HiMenu } from 'react-icons/hi';
import { IconContext } from 'react-icons';

export default function MenuButton({ onOpen }) {
  return (
    <IconContext.Provider
      value={{
        className:
          'md:hidden cursor-pointer hover:text-gray-900 transition duration-300 ease-in-out',
        size: '2rem',
      }}
    >
      <div onClick={onOpen}>
        <HiMenu />
      </div>
    </IconContext.Provider>
  );
}
