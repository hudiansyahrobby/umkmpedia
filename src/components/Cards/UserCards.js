import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaShoppingCart, FaShoppingBag } from 'react-icons/fa';
import UserCard from './UserCard';

export default function UserCards({ wishlists, carts, orders }) {
  return (
    <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-6'>
      <UserCard data={wishlists} icon={<AiFillHeart />} title='Produk Favorit' color='red' />
      <UserCard
        data={carts}
        icon={<FaShoppingCart />}
        title='Produk Dalam Keranjang'
        color='blue'
      />
      <UserCard data={orders} icon={<FaShoppingBag />} title='Produk Telah Diorder' color='green' />
    </div>
  );
}
