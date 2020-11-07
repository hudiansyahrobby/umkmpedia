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
      className={`fixed top-0 z-50 left-0 h-full w-1/2 bg-red-600 transform transition-all duration-300 ease-in-out ${
        !open ? '-translate-x-full' : 'translate-x-0'
      }`}
    >
      <NavLink
        to='/'
        exact
        activeClassName='bg-red-500'
        className='no-underline text-white block pl-4 py-3 border-b border-red-700 hover:bg-red-500 transition duration-300'
      >
        Home
      </NavLink>
      <NavLink
        to='/products'
        activeClassName='bg-red-500'
        className='no-underline text-white block pl-4 py-3 border-b border-red-700 hover:bg-red-500 transition duration-300'
      >
        Products
      </NavLink>

      {user?.role === 'admin' && (
        <>
          <NavLink
            to='/admin'
            activeClassName='bg-red-500'
            className='no-underline text-white block pl-4 py-3 border-b border-red-700 hover:bg-red-500 transition duration-300'
          >
            Admin
          </NavLink>
        </>
      )}

      {user?.role === 'user' || user?.role === 'admin' ? (
        <>
          <NavLink
            to='/cart'
            activeClassName='bg-red-500'
            className='no-underline text-white block pl-4 py-3 border-b border-red-700 hover:bg-red-500 transition duration-300'
          >
            Cart
          </NavLink>

          <NavLink
            to='/signout'
            className='mt-4 p-2 bg-red-500 hover:bg-red-400 transition-colors duration-300 block text-white text-center mx-6'
            onClick={onSignoutHandler}
          >
            Signout
          </NavLink>
        </>
      ) : (
        <NavLink
          to='/signin'
          className='mt-4 p-2 bg-red-500 hover:bg-red-400 transition-colors duration-300 block text-white text-center mx-6'
        >
          Signin
        </NavLink>
      )}
    </div>
  );
}
