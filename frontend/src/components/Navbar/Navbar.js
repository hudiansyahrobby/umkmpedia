import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { signout } from '../../actions/userActions';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { getWishlist } from '../../actions/wishlistActions';
import { getCart } from '../../actions/cartActions';
import NavbarLink from './NavbarLink';
import MenuButton from '../Buttons/MenuButton';
import { getcategories } from '../../actions/categoryActions';
import useDeepCompareEffect from 'use-deep-compare-effect';
import NavbarDropdown from './NavbarDropdown';

export default function Navbar({ onOpen }) {
  const { user, authenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { carts } = useSelector((state) => state.cart);
  const { wishlists } = useSelector((state) => state.wishlist);
  const { categories } = useSelector((state) => state.category);

  useDeepCompareEffect(() => {
    if (user?.role === 'user') {
      dispatch(getWishlist());
    }
  }, [wishlists]);

  useDeepCompareEffect(() => {
    if (user?.role === 'user') {
      dispatch(getCart());
    }
  }, [carts]);

  useDeepCompareEffect(() => {
    dispatch(getcategories());
  }, [categories]);

  const onSignOutHandler = async () => {
    dispatch(signout(history));
  };

  let navbar;
  if (!authenticated) {
    navbar = (
      <>
        <NavbarLink link='/masuk' name='Masuk' />
        <NavbarLink link='/daftar' name='Daftar' />
      </>
    );
  } else {
    navbar = (
      <>
        {user?.role === 'user' && (
          <>
            <NavbarLink link='/favorit' icon={<AiFillHeart />} data={wishlists?.length} />
            <NavbarLink link='/keranjang' icon={<FaShoppingCart />} data={carts?.length} />
            <NavbarDropdown onSignOut={onSignOutHandler} picture={user?.profilPic} />
          </>
        )}
      </>
    );
  }

  return (
    <header className='z-20 bg-white text-black h-16 w-full px-4 top-0 bg-transparent fixed flex items-center justify-between border-b border-gray-300'>
      <Link to='/' className='text-xl uppercase font-bold tracking-wider'>
        UMKM<span className='text-primary'>Pedia</span>
      </Link>

      <MenuButton onOpen={onOpen} />
      <div className='hidden h-full md:flex md:items-center'>
        <NavbarLink link='/' name='Beranda' exact />
        <NavbarLink link='/produk' name='Produk' dropdown={categories} />
        {user?.role === 'admin' && <NavbarLink link='/admin' name='Admin' />}
        {navbar}
      </div>
    </header>
  );
}
