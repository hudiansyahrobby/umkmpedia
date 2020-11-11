import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { signout } from '../../actions/userActions';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { getWishlist } from '../../actions/wishlistActions';
import { getCart } from '../../actions/cartActions';
import NavbarLink from './NavbarLink';
import MenuButton from '../Buttons/MenuButton';

export default function Navbar({ onOpen }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const { carts } = useSelector((state) => state.cart);
  const { wishlists } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (user.authenticated) {
      dispatch(getWishlist());
      dispatch(getCart());
    }
  }, [dispatch, user.authenticated]);

  const onSignOutHandler = async () => {
    dispatch(signout(history));
  };

  let navbar;
  if (!user.authenticated) {
    navbar = (
      <>
        <NavbarLink link='/masuk' name='Masuk' />
        <NavbarLink link='/daftar' name='Daftar' />
      </>
    );
  } else {
    navbar = (
      <>
        <NavbarLink link='/profil' name='Profil' />
        <NavbarLink link='/favorit' icon={<AiFillHeart />} data={wishlists?.length} />
        <NavbarLink link='/keranjang' icon={<FaShoppingCart />} data={carts?.length} />

        <button
          className='p-2 rounded-lg bg-primary hover:bg-orange-300 transition duration-300 ease-in-out'
          onClick={onSignOutHandler}
        >
          Keluar
        </button>
      </>
    );
  }

  return (
    <header className='z-20 bg-white text-black h-16 w-full px-4 top-0 flex items-center justify-between bg-transparent fixed'>
      <Link to='/' className='text-xl uppercase font-bold tracking-wider'>
        UMKM<span className='text-primary'>Pedia</span>
      </Link>

      <MenuButton onOpen={onOpen} />

      <div className='hidden sm:block'>
        <NavbarLink link='/' name='Beranda' exact />
        <NavbarLink link='/produk' name='Produk' />

        {user?.user?.role === 'admin' && <NavbarLink link='/admin' name='Admin' />}
        {navbar}
      </div>
    </header>
  );
}