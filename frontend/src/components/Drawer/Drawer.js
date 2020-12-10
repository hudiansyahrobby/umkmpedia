import React from 'react';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { AiFillHeart } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { getCart } from '../../actions/cartActions';
import { signout } from '../../actions/userActions';
import { getWishlist } from '../../actions/wishlistActions';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { generatePublicPath } from '../../utils/generatePublicPath';
import DrawerLink from './DrawerLink';

export default function Drawer({ open }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.cart);
  const { wishlists } = useSelector((state) => state.wishlist);
  const { categories } = useSelector((state) => state.category);

  const [showProduct, setShowProduct] = useState();

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
    <div className='mt-16 pt-4 block md:hidden z-50 fixed inset-0 bg-white'>
      <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
        <DrawerLink link='/' name='Beranda' exact />

        <DrawerLink
          onClick={() => setShowProduct(!showProduct)}
          button
          name='Produk'
          icon={!showProduct ? <FiChevronDown /> : <FiChevronUp />}
        />
        {showProduct && categories?.length > 0 && (
          <ul className='pl-8'>
            <li className='text-gray-900 w-full hover:bg-orange-300 block px-3 py-2 rounded-md text-base font-medium'>
              <NavLink className='block w-full' to={`/produk`}>
                &gt; Semua Produk
              </NavLink>
            </li>
            {categories?.map(({ name, _id }) => {
              return (
                <li
                  key={_id}
                  className='text-gray-900 w-full hover:bg-orange-300 block px-3 py-2 rounded-md text-base font-medium'
                >
                  <NavLink className='block w-full' to={`/produk?category=${_id}`}>
                    &gt; {capitalizeFirstLetter(name)}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}

        {user?.role === 'admin' && <DrawerLink link='/admin' name='Admin' />}
      </div>

      {user ? (
        <div className='pt-4 pb-3 border-t border-gray-700'>
          <div className='flex items-center px-5'>
            <div className='flex-shrink-0'>
              <LazyLoad height={200} once>
                <img
                  className='h-10 w-10 rounded-full'
                  src={generatePublicPath(user?.profilPic)}
                  alt=''
                />
              </LazyLoad>
            </div>
            <div className='ml-3'>
              <div className='text-base font-medium leading-none text-gray-800'>{user?.name}</div>
              <div className='text-sm font-medium leading-none text-gray-600 mt-1'>
                {user?.email}
              </div>
            </div>

            <div className='ml-auto text-right'>
              <button className='p-1 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                <span className='sr-only'>Keranjang Belanja</span>
                <IconContext.Provider
                  value={{
                    className: `mr-2 inline-block`,
                    size: '1.3rem',
                  }}
                >
                  <NavLink to='/keranjang' className='relative ml-1'>
                    <FaShoppingCart />
                    <span className='absolute top-0 right-0 -mt-1 h-4 w-4 text-xs rounded-full bg-primary inline-flex justify-center items-center'>
                      {carts?.length}
                    </span>
                  </NavLink>
                </IconContext.Provider>
              </button>

              <button className='p-1 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                <span className='sr-only'>Produk Favorit</span>
                <IconContext.Provider
                  value={{
                    className: `mr-2 inline-block`,
                    size: '1.3rem',
                  }}
                >
                  <NavLink to='/favorit' className='relative ml-1'>
                    <AiFillHeart />
                    <span className='absolute top-0 right-0 -mt-1 h-4 w-4 text-xs rounded-full bg-primary inline-flex justify-center items-center'>
                      {wishlists?.length}
                    </span>
                  </NavLink>
                </IconContext.Provider>
              </button>
            </div>
          </div>
          <div className='mt-3 px-2'>
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
        <div className='px-2'>
          <DrawerLink link='/masuk' name='Masuk' />
          <DrawerLink link='/daftar' name='Daftar' />
        </div>
      )}
    </div>
  );
}
