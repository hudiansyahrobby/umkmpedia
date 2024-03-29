import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

export default function NavbarLink({ link, name, icon, data, exact, dropdown }) {
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
      <span className='group py-5'>
        <NavLink
          to={link}
          exact={exact}
          className={`mr-3 group font-semibold tracking-wide hover:text-primary transition duration-300 ease-in-out`}
          activeClassName='text-primary'
        >
          {name}
        </NavLink>
        {dropdown?.length > 0 && (
          <div className='absolute left-0 mt-5 w-full shadow-lg px-4 py-6 bg-white hidden group-hover:block border-b border-gray-300'>
            <ul className='grid grid-rows-4 grid-flow-col gap-1 text-black font-semibold'>
              {dropdown?.map((_dropdown) => {
                return (
                  <React.Fragment key={_dropdown._id}>
                    <li className='hover:bg-gray-300 p-2'>
                      <NavLink to={`/produk?category=${_dropdown._id}`} className='block'>
                        {capitalizeFirstLetter(_dropdown.name)}
                      </NavLink>
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        )}
      </span>
    );
  }
}
