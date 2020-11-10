import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { IconContext } from 'react-icons';

export default function FavoriteButton({ onClick, favorited, size, absolute }) {
  let style;
  if (absolute) {
    style = 'absolute top-0 right-0 mt-2 mr-2 ';
  }
  return (
    <IconContext.Provider
      value={{
        className: `bg-red-500 transition duration-300 ease-in-out rounded-lg  ${
          !favorited ? 'text-white hover:text-red-600' : 'text-red-600 hover:text-white'
        }  ${style} ${absolute ? 'p-1' : 'p-2'}`,
        size: size,
      }}
    >
      <button onClick={onClick}>
        <AiFillHeart />
      </button>
    </IconContext.Provider>
  );
}
