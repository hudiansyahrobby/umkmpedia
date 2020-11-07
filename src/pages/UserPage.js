import React, { useEffect } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaShoppingCart, FaShoppingBag } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../actions/cartActions';
import { getOrder } from '../actions/orderActions';
import { getWishlist } from '../actions/wishlistActions';
import Layout from '../components/Layout';
import Title from '../components/Title';

function UserPage() {
  const { user } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.cart);
  const { orders } = useSelector((state) => state.order);
  const { wishlists } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlist());
    dispatch(getCart());
    dispatch(getOrder());
  }, [dispatch]);

  return (
    <Layout>
      <div className='mt-24'>
        <Title align='text-center' margin='mx-auto'>
          Profil Saya
        </Title>
        <div className='w-48 h-48 rounded-full overflow-hidden mx-auto mt-8 shadow-2xl hover:scale-105 transform transition duration-300'>
          <img src={user?.profilPic} alt='Profil' className='w-full h-full object-cover' />
        </div>

        <div className='mt-8'>
          <h2 className='text-center font-bold text-xl text-gray-900 capitalize'>{user?.name}</h2>
          <h2 className='mt-1 text-center font-light text-sm text-gray-600 '>{user?.mail}</h2>
          <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-6'>
            <IconContext.Provider
              value={{
                className: `mr-2 bg-red-500 text-red-hell rounded-lg p-1`,
                size: '2rem',
              }}
            >
              <div className='flex items-center bg-red-300 p-4 rounded-md'>
                <AiFillHeart />
                <span className='text-red-700 font-semibold'>
                  {wishlists?.length} Produk Favorit
                </span>
              </div>
            </IconContext.Provider>

            <IconContext.Provider
              value={{ size: '2rem', className: 'p-2 rounded-lg bg-blue-sea mr-2 text-white' }}
            >
              <div className='flex items-center bg-blue-300 p-4 rounded-md'>
                <FaShoppingCart />
                <span className='text-blue-700 font-semibold'>
                  {carts?.length} Produk Dalam Keranjang
                </span>
              </div>
            </IconContext.Provider>

            <IconContext.Provider
              value={{ size: '2rem', className: 'p-2 rounded-lg bg-green-600 mr-2 text-white' }}
            >
              <div className='flex items-center bg-green-300 p-4 rounded-md'>
                <FaShoppingBag />
                <span className='text-green-700 font-semibold'>
                  {orders?.length} Produk Telah Diorder
                </span>
              </div>
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserPage;
