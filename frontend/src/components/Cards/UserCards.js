import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaShoppingCart, FaShoppingBag } from 'react-icons/fa';
import UserCard from './UserCard';

export default function UserCards({ wishlists, carts, orders }) {
  return (
    <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-6'>
      <UserCard
        data={wishlists}
        icon={<AiFillHeart />}
        title='Produk Favorit'
        mainColor='text-red-700'
        bgColor='bg-red-500'
        textColor='bg-red-300'
      />
      <UserCard
        data={carts}
        icon={<FaShoppingCart />}
        title='Produk Dalam Keranjang'
        mainColor='text-blue-700'
        bgColor='bg-blue-500'
        textColor='bg-blue-300'
      />
      <UserCard
        data={orders}
        icon={<FaShoppingBag />}
        title='Produk Telah Diorder'
        mainColor='text-green-700'
        bgColor='bg-green-500'
        textColor='bg-green-300'
      />
    </div>
  );
}
