import React from 'react';
import { NavLink } from 'react-router-dom';

export default function DrawerLink({ link, exact, name, button, onClick }) {
  if (button) {
    return (
      <div className='mx-6'>
        <button
          className='mt-4 p-2 bg-primary hover:bg-orange-300 transition-colors duration-300 text-black font-semibold text-center w-full'
          onClick={onClick}
        >
          {name}
        </button>
      </div>
    );
  } else {
    return (
      <NavLink
        to={link}
        exact={exact}
        activeClassName='bg-primary'
        className='no-underline text-black font-semibold block pl-4 py-3 border-b border-primary hover:bg-primary transition duration-300'
      >
        {name}
      </NavLink>
    );
  }
}
