import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';

export default function NavbarLink({ link, name, icon, data, exact }) {
  if (icon) {
    return (
      <IconContext.Provider
        value={{
          className: `mr-2  inline-block`,
          size: '1.6rem',
        }}
      >
        <NavLink to={link} className='relative mr-2'>
          {icon}
          <span className='absolute top-0 right-0 -mt-1 h-4 w-4 text-xs rounded-full bg-primary inline-flex justify-center items-center'>
            {data}
          </span>
        </NavLink>
      </IconContext.Provider>
    );
  } else {
    return (
      <NavLink
        to={link}
        exact={exact}
        className='mr-3  font-semibold tracking-wide hover:text-primary transition duration-300 ease-in-out'
        activeClassName='text-primary'
      >
        {name}
      </NavLink>
    );
  }
}
