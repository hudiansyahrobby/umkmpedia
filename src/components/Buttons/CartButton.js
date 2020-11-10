import React from 'react';
import { IconContext } from 'react-icons';
import { FaShoppingCart } from 'react-icons/fa';

export default function CartButton({ onClick, size, styling }) {
  return (
    <IconContext.Provider
      value={{
        className: `p-2 rounded-lg bg-blue-sea hover:bg-white border-2 border-blue-sea hover:text-blue-sea transition duration-500 ease-in-out text-white ${styling}`,
        size: size,
      }}
    >
      <button onClick={onClick}>
        <FaShoppingCart />
      </button>
    </IconContext.Provider>
  );
}
