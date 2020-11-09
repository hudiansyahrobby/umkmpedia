import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { signout } from '../actions/userActions';

export default function Drawer({ open }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignoutHandler = () => {
    dispatch(signout());
    history.push('/signin');
  };

  return (
    <div
      className={`fixed top-0 z-50 left-0 h-full w-1/2 bg-white transform transition-all duration-300 ease-in-out ${
        !open ? '-translate-x-full' : 'translate-x-0'
      }`}
    >
      <NavLink
        to='/'
        exact
        activeClassName='bg-primary'
        className='no-underline text-black font-semibold block pl-4 py-3 border-b border-primary hover:bg-primary transition duration-300'
      >
        Beranda
      </NavLink>
      <NavLink
        to='/produk'
        activeClassName='bg-primary'
        className='no-underline text-black font-semibold block pl-4 py-3 border-b border-primary hover:bg-primary transition duration-300'
      >
        Produk
      </NavLink>

      {user?.role === 'admin' && (
        <>
          <NavLink
            to='/admin'
            activeClassName='bg-primary'
            className='no-underline text-black font-semibold block pl-4 py-3 border-b border-primary hover:bg-primary transition duration-300'
          >
            Admin
          </NavLink>
        </>
      )}

      {user?.role === 'user' || user?.role === 'admin' ? (
        <>
          <NavLink
            to='/keranjang'
            activeClassName='bg-primary'
            className='no-underline text-black font-semibold block pl-4 py-3 border-b border-primary hover:bg-primary transition duration-300'
          >
            Keranjang
          </NavLink>

          <div className='mx-6'>
            <button
              className='mt-4 p-2 bg-primary hover:bg-orange-300 transition-colors duration-300 text-black font-semibold text-center w-full'
              onClick={onSignoutHandler}
            >
              Keluar
            </button>
          </div>
        </>
      ) : (
        <NavLink
          to='/signin'
          className='mt-4 p-2 bg-primary hover:bg-orange-300 transition-colors duration-300 block text-black font-semibold text-center mx-6'
        >
          Masuk
        </NavLink>
      )}
    </div>
  );
}
