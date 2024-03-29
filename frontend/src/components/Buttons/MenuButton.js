import React from 'react';
import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { IconContext } from 'react-icons';

export default function MenuButton({ onOpen, open }) {
  return (
    <IconContext.Provider
      value={{
        className:
          'md:hidden cursor-pointer hover:text-gray-900 transition duration-300 ease-in-out',
        size: '2rem',
      }}
    >
      <div onClick={onOpen}>{!open ? <HiMenu /> : <MdClose />}</div>
    </IconContext.Provider>
  );
}
