import React from 'react';
import { NavLink } from 'react-router-dom';

export default function DrawerLink({ link, exact, name, button, onClick, buttonLink }) {
  if (button) {
    return (
      <button
        className='w-full text-gray-900 hover:bg-orange-300 block text-left px-3 py-2 rounded-md text-base font-medium'
        onClick={onClick}
      >
        {name}
      </button>
    );
  } else {
    return (
      <NavLink
        to={link}
        exact={exact}
        activeClassName='bg-primary text-white block px-3 py-2 rounded-md text-base font-medium'
        className='text-gray-900  hover:bg-orange-300 block px-3 py-2 rounded-md text-base font-medium'
      >
        {name}
      </NavLink>
    );
  }
}
