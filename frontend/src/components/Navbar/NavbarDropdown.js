import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { generatePublicPath } from '../../utils/generatePublicPath';

export default function NavbarDropdown({ onSignOut, picture }) {
  const [show, setShow] = React.useState(false);
  const { user } = useSelector((state) => state.user);

  return (
    <div className='ml-3 relative'>
      <div>
        <button
          className='max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
          id='user-menu'
          aria-haspopup='true'
          onClick={() => setShow(!show)}
        >
          <span className='sr-only'>Open user menu</span>
          <img className='h-8 w-8 rounded-full' src={generatePublicPath(picture)} alt='' />
        </button>
      </div>

      <div
        className={`origin-top-right  absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 transition ease-out duration-100 ${
          show ? 'block transform opacity-100 scale-100' : 'hidden transform opacity-0 scale-95 '
        }`}
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='user-menu'
      >
        <NavLink
          to='/profil'
          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          role='menuitem'
        >
          Profil Saya
        </NavLink>

        <NavLink
          to='/riwayat'
          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          role='menuitem'
        >
          {user?.role === 'user' ? 'Riwayat Pembelian' : 'Riwayat Penjualan'}
        </NavLink>
        <button
          onClick={onSignOut}
          className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          role='menuitem'
        >
          Keluar
        </button>
      </div>
    </div>
  );
}
