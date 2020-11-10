import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signout } from '../../actions/userActions';
import DrawerLink from './DrawerLink';

export default function Drawer({ open }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignoutHandler = () => {
    dispatch(signout());
    history.push('/masuk');
  };

  return (
    <div
      className={`fixed top-0 z-50 left-0 h-full w-1/2 bg-white transform transition-all duration-300 ease-in-out ${
        !open ? '-translate-x-full' : 'translate-x-0'
      }`}
    >
      <DrawerLink link='/' name='Beranda' exact />
      <DrawerLink link='/produk' name='Produk' />

      {user?.role === 'admin' && <DrawerLink link='/admin' name='Admin' />}

      {user?.role === 'user' || user?.role === 'admin' ? (
        <>
          <DrawerLink link='/keranjang' name='Keranjang' />
          <DrawerLink link='/favorit' name='Produk Favorit' />
          <DrawerLink button name='Keluar' onClick={onSignoutHandler} />
        </>
      ) : (
        <DrawerLink button name='Masuk' onClick={onSignoutHandler} />
      )}
    </div>
  );
}
