import React from 'react';
import { IconContext } from 'react-icons';
import { AiFillHeart } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { getCart } from '../../actions/cartActions';
import { signout } from '../../actions/userActions';
import { getWishlist } from '../../actions/wishlistActions';
import DrawerLink from './DrawerLink';

export default function Drawer({ open }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.cart);
  const { wishlists } = useSelector((state) => state.wishlist);

  const onSignoutHandler = () => {
    dispatch(signout(history));
  };

  useDeepCompareEffect(() => {
    if (user?.role === 'user') {
      dispatch(getCart());
    }
  }, [carts]);

  useDeepCompareEffect(() => {
    if (user?.role === 'user') {
      dispatch(getWishlist());
    }
  }, [wishlists]);

  return (
    <div class='mt-16 pt-4 block md:hidden z-50 fixed inset-0 bg-white'>
      <div class='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
        <DrawerLink link='/' name='Beranda' exact />
        <DrawerLink link='/produk' name='Produk' />
        {user?.role === 'admin' && <DrawerLink link='/admin' name='Admin' />}
      </div>

      {user ? (
        <div class='pt-4 pb-3 border-t border-gray-700'>
          <div class='flex items-center px-5'>
            <div class='flex-shrink-0'>
              <img class='h-10 w-10 rounded-full' src={user?.profilPic} alt='Profil Picture' />
            </div>
            <div class='ml-3'>
              <div class='text-base font-medium leading-none text-gray-800'>{user?.name}</div>
              <div class='text-sm font-medium leading-none text-gray-600 mt-1'>{user?.email}</div>
            </div>

            <div className='ml-auto '>
              <button class='flex-shrink-0 p-1 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                <span class='sr-only'>Keranjang Belanja</span>
                <IconContext.Provider
                  value={{
                    className: `mr-2  inline-block`,
                    size: '1.6rem',
                  }}
                >
                  <NavLink to='/keranjang' className='relative mr-2'>
                    <FaShoppingCart />
                    <span className='absolute top-0 right-0 -mt-1 h-4 w-4 text-xs rounded-full bg-primary inline-flex justify-center items-center'>
                      {carts?.length}
                    </span>
                  </NavLink>
                </IconContext.Provider>
              </button>

              <button class='ml-auto flex-shrink-0 p-1 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                <span class='sr-only'>Produk Favorit</span>
                <IconContext.Provider
                  value={{
                    className: `mr-2  inline-block`,
                    size: '1.6rem',
                  }}
                >
                  <NavLink to='/favorit' className='relative mr-2'>
                    <AiFillHeart />
                    <span className='absolute top-0 right-0 -mt-1 h-4 w-4 text-xs rounded-full bg-primary inline-flex justify-center items-center'>
                      {wishlists?.length}
                    </span>
                  </NavLink>
                </IconContext.Provider>
              </button>
            </div>
          </div>
          <div class='mt-3 px-2'>
            {user?.role && (
              <div className='space-y-1'>
                <DrawerLink link='/profil' name='Profil Saya' />
                <DrawerLink
                  link='/riwayat'
                  name={user?.role === 'user' ? 'Riwayat Pembelian' : 'Riwayat Penjualan'}
                />
                <DrawerLink button name='Keluar' onClick={onSignoutHandler} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='px-3'>
          <DrawerLink link='/masuk' name='Masuk' />
        </div>
      )}
    </div>
  );
}
