import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { IconContext } from 'react-icons';
import { signout } from '../actions/userActions';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { getWishlist } from '../actions/wishlistActions';
import { getCart } from '../actions/cartActions';

function Header({ onOpen }) {
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
        <NavLink to='/masuk' className='mr-3 '>
          Masuk
        </NavLink>
        <NavLink to='/daftar' className='mr-3 '>
          Daftar
        </NavLink>
      </>
    );
  } else {
    navbar = (
      <>
        <NavLink
          to='/profil'
          className='mr-3  font-semibold tracking-wide hover:text-primary transition duration-300 ease-in-out'
          activeClassName='text-primary'
        >
          Profil
        </NavLink>

        <IconContext.Provider
          value={{
            className: `mr-2  inline-block`,
            size: '1.6rem',
          }}
        >
          <NavLink to='/daftar-keinginan' className='relative mr-2'>
            <AiFillHeart />
            <span className='absolute top-0 right-0 -mt-1 h-4 w-4 text-xs rounded-full bg-primary inline-flex justify-center items-center'>
              {wishlists?.length}
            </span>
          </NavLink>
        </IconContext.Provider>

        <IconContext.Provider
          value={{
            size: '1.6rem',
            className: 'mr-2  inline-block',
          }}
        >
          <NavLink to='/keranjang' className='relative mr-2'>
            <FaShoppingCart />
            <span className='absolute top-0 right-0 -mt-1 h-4 w-4 text-xs rounded-full bg-primary  inline-flex justify-center items-center'>
              {carts?.length}
            </span>
          </NavLink>
        </IconContext.Provider>

        <button
          className='p-2 rounded-lg bg-primary hover:text-white transition duration-300 ease-in-out'
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
        UMKM<span className='text-black'>Pedia</span>
      </Link>

      <IconContext.Provider
        value={{
          className:
            'sm:hidden cursor-pointer hover:text-gray-900 transition duration-300 ease-in-out',
          size: '2rem',
        }}
      >
        <div onClick={onOpen}>
          <HiMenu />
        </div>
      </IconContext.Provider>

      <div className='hidden sm:block'>
        <NavLink
          to='/'
          className='mr-3  font-semibold tracking-wide hover:text-primary transition duration-300 ease-in-out'
          exact
          activeClassName='text-primary'
        >
          Beranda
        </NavLink>
        <NavLink
          to='/produk'
          className='mr-3  font-semibold tracking-wide hover:text-primary transition duration-300 ease-in-out'
          activeClassName='text-primary'
        >
          Produk
        </NavLink>

        {user?.user?.role === 'admin' ? (
          <>
            <NavLink
              to='/admin'
              className='mr-3  font-semibold tracking-wide hover:text-primary transition duration-300 ease-in-out'
              activeClassName='text-primary'
            >
              Admin
            </NavLink>
          </>
        ) : null}
        {navbar}
      </div>
    </header>
  );
}

export default Header;
